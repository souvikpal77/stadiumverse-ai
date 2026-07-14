import logging
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    TranslationRequest,
    TranslationResponse,
    HealthResponse,
)

from app.ai.router import (
    AgentRouter,
    TRANSLATION_AGENT,
    EMERGENCY_AGENT,
)

from app.ai.context import ContextManager
from app.ai.memory import ConversationMemory
from app.ai.rag import RAGPipeline

from app.core.config import settings
from app.services.firebase import get_db

from app.utils.json_loader import load_json

logger = logging.getLogger("stadiumverse.api.v1")

router = APIRouter()


# -------------------------------------------------------
# HEALTH
# -------------------------------------------------------

@router.get("/health", response_model=HealthResponse)
async def check_health():

    firebase_status = (
        "connected"
        if get_db() is not None
        else "disconnected"
    )

    gemini_status = (
        "configured"
        if settings.GEMINI_API_KEY
        else "unconfigured"
    )

    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        services={
            "firebase": firebase_status,
            "gemini_api": gemini_status,
        },
    )


# -------------------------------------------------------
# CHAT
# -------------------------------------------------------

@router.post("/ai/chat", response_model=ChatResponse)
async def chat_interaction(
    request: ChatRequest,
    background_tasks: BackgroundTasks,
):

    session_id = request.session_id
    user_msg = request.message

    history = ConversationMemory.get_history(session_id)

    merged_context = await ContextManager.assemble_context(
        request.context
    )

    merged_context["chat_history"] = history

    augmented_msg = RAGPipeline.augment_prompt(user_msg)

    try:

        dispatch_result = await AgentRouter.dispatch(
            augmented_msg,
            merged_context,
        )

    except Exception as e:

        logger.error(f"Dispatcher Error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Failed to execute AI agent.",
        )

    response_text = dispatch_result["response"]

    agent_resolved = dispatch_result["agent_resolved"]

    actions = dispatch_result.get(
        "actions_triggered",
        [],
    )

    background_tasks.add_task(
        ConversationMemory.save_message,
        session_id,
        "user",
        user_msg,
    )

    background_tasks.add_task(
        ConversationMemory.save_message,
        session_id,
        "assistant",
        response_text,
    )

    return ChatResponse(
        session_id=session_id,
        agent_resolved=agent_resolved,
        response=response_text,
        actions_triggered=actions,
    )
# -------------------------------------------------------
# TRANSLATION
# -------------------------------------------------------

@router.post(
    "/ai/translate",
    response_model=TranslationResponse,
)
async def translate_text(request: TranslationRequest):

    context = {
        "target_language": request.target_language
    }

    prompt = (
        f"Translate the following text: "
        f"'{request.text}' "
        f"to {request.target_language}"
    )

    try:

        translated_text = await TRANSLATION_AGENT.execute(
            prompt,
            context,
        )

        return TranslationResponse(
            original_text=request.text,
            translated_text=translated_text,
            target_language=request.target_language,
        )

    except Exception as e:

        logger.error(f"Translation Error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Translation failed.",
        )


# -------------------------------------------------------
# EMERGENCY
# -------------------------------------------------------

@router.post(
    "/ai/emergency",
    response_model=ChatResponse,
)
async def emergency_alert(
    request: ChatRequest,
    background_tasks: BackgroundTasks,
):

    try:

        response_text = await EMERGENCY_AGENT.execute(
            request.message,
            request.context,
        )

        background_tasks.add_task(
            ConversationMemory.save_message,
            request.session_id,
            "user",
            request.message,
        )

        background_tasks.add_task(
            ConversationMemory.save_message,
            request.session_id,
            "assistant",
            response_text,
        )

        return ChatResponse(
            session_id=request.session_id,
            agent_resolved="emergency",
            response=response_text,
            actions_triggered=[
                "DISPATCH_SECURITY",
                "DISPATCH_MEDICAL",
                "LOG_INCIDENT",
            ],
        )

    except Exception as e:

        logger.error(f"Emergency Error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Emergency service unavailable.",
        )


# -------------------------------------------------------
# LIVE DASHBOARD
# -------------------------------------------------------

@router.get("/dashboard")
async def dashboard():

    system = load_json("system_status.json")

    return {
        "event": system.get("event"),
        "weather": system.get("weather"),
        "gates": system.get("gates"),
        "alerts": system.get("alerts"),
        "system": system.get("system"),
    }


@router.get("/parking")
async def parking():

    return load_json("parking.json")


@router.get("/crowd")
async def crowd():

    crowd = load_json("crowd_status.json")

    gate_data = {
        k: v for k, v in crowd.items()
        if k.startswith("Gate")
    }

    occupancies = [
        int(v["occupancy"].replace("%", ""))
        for v in gate_data.values()
    ]

    crowd_level = round(sum(occupancies) / len(occupancies))

    recommended_gate = min(
        gate_data.items(),
        key=lambda x: int(x[1]["occupancy"].replace("%", ""))
    )[0]

    return {
        "crowd_level": crowd_level,
        "recommended_gate": recommended_gate,
        "gates": gate_data
    }
# -------------------------------------------------------
# COMPLETE DASHBOARD STATUS
# -------------------------------------------------------

@router.get("/dashboard/status")
async def dashboard_status():

    crowd = load_json("crowd_status.json")
    parking = load_json("parking.json")
    system = load_json("system_status.json")

    try:
        volunteers = load_json("volunteers.json")
    except Exception:
        volunteers = {}

    gate_data = {
        k: v for k, v in crowd.items()
        if k.startswith("Gate")
    }

    occupancies = [
        int(v["occupancy"].replace("%", ""))
        for v in gate_data.values()
    ]

    crowd_percentage = round(sum(occupancies) / len(occupancies))

    recommended_gate = min(
        gate_data.items(),
        key=lambda x: int(x[1]["occupancy"].replace("%", ""))
    )[0]

    available_parking = sum(
        p["available"]
        for p in parking.values()
    )

    total_parking = sum(
        p["capacity"]
        for p in parking.values()
    )

    volunteer_count = len(volunteers)

    return JSONResponse(
        {
            "stadium_health": system.get("stadiumHealth", 98),
            "crowd_level": crowd_percentage,
            "recommended_gate": recommended_gate,
            "navigation_users": system.get("navigationUsers", 0),
            "available_parking": available_parking,
            "total_parking": total_parking,
            "volunteers": volunteer_count,
            "weather": system.get("weather", "Unknown"),
            "event": system.get("event", "World Cup 2026"),
            "alerts": system.get("alerts", []),
            "system_status": system.get("scenario", "Operational"),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )