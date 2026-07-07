import logging
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.schemas.chat import ChatRequest, ChatResponse, TranslationRequest, TranslationResponse, HealthResponse
from app.ai.router import AgentRouter, TRANSLATION_AGENT, EMERGENCY_AGENT
from app.ai.context import ContextManager
from app.ai.memory import ConversationMemory
from app.ai.rag import RAGPipeline
from app.core.config import settings
from app.services.firebase import get_db

logger = logging.getLogger("stadiumverse.api.v1")
router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def check_health():
    """
    Validates backend environment key configs and database connection.
    """
    firebase_status = "connected" if get_db() is not None else "disconnected"
    gemini_status = "configured" if settings.GEMINI_API_KEY else "unconfigured"
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        services={
            "firebase": firebase_status,
            "gemini_api": gemini_status
        }
    )

@router.post("/ai/chat", response_model=ChatResponse)
async def chat_interaction(request: ChatRequest, background_tasks: BackgroundTasks):
    """
    Core entrypoint to converse with StadiumVerse AI agents.
    Resolves agent routing, injects session history, queries Gemini, and logs conversations.
    """
    session_id = request.session_id
    user_msg = request.message
    
    # 1. Retrieve session history from Firestore
    history = ConversationMemory.get_history(session_id)
    
    # 2. Assemble real-time context and RAG documents
    merged_context = await ContextManager.assemble_context(request.context)
    
    # Incorporate history log in execution context
    merged_context["chat_history"] = history
    
    # Augment the prompt using the RAG pipeline
    augmented_msg = RAGPipeline.augment_prompt(user_msg)
    
    # 3. Route & execute corresponding agent
    try:
        dispatch_result = await AgentRouter.dispatch(augmented_msg, merged_context)
    except Exception as e:
        logger.error(f"Error executing agent dispatcher: {e}")
        raise HTTPException(status_code=500, detail="Failed to execute AI agent service.")
        
    response_text = dispatch_result["response"]
    agent_resolved = dispatch_result["agent_resolved"]

    # 4. Persist interaction logs asynchronously using FastAPI BackgroundTasks
    background_tasks.add_task(ConversationMemory.save_message, session_id, "user", user_msg)
    background_tasks.add_task(ConversationMemory.save_message, session_id, "assistant", response_text)

    return ChatResponse(
        session_id=session_id,
        agent_resolved=agent_resolved,
        response=response_text,
        actions_triggered=[]
    )

@router.post("/ai/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    """
    Direct endpoint routing directly to the Translation Agent.
    """
    context = {"target_language": request.target_language}
    prompt = f"Translate the following text: '{request.text}' to {request.target_language}"
    
    try:
        translated_text = await TRANSLATION_AGENT.execute(prompt, context)
        return TranslationResponse(
            original_text=request.text,
            translated_text=translated_text,
            target_language=request.target_language
        )
    except Exception as e:
        logger.error(f"Translation execution failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to run translation model.")

@router.post("/ai/emergency", response_model=ChatResponse)
async def emergency_alert(request: ChatRequest, background_tasks: BackgroundTasks):
    """
    Critical escalation pathway. Instantly routes to the emergency agent.
    """
    try:
        response_text = await EMERGENCY_AGENT.execute(request.message, request.context)
        
        # Save to database
        background_tasks.add_task(ConversationMemory.save_message, request.session_id, "user", request.message)
        background_tasks.add_task(ConversationMemory.save_message, request.session_id, "assistant", response_text)
        
        return ChatResponse(
            session_id=request.session_id,
            agent_resolved="emergency",
            response=response_text,
            actions_triggered=["DISPATCH_EMERGENCY_TEAM"]
        )
    except Exception as e:
        logger.error(f"Emergency execution failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to run emergency routing.")
