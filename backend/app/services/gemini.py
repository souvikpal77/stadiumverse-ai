import logging
import google.generativeai as genai
from app.core.config import settings

logger = logging.getLogger("stadiumverse.gemini")

def init_gemini() -> None:
    """
    Initializes the Google Generative AI (Gemini) SDK.
    Logs warning if API key is not configured.
    """
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        logger.warning(
            "GEMINI_API_KEY is not configured in environment variables. "
            "AI Agent systems will fail to run."
        )
        return

    try:
        genai.configure(api_key=api_key)
        logger.info("Google Generative AI (Gemini) SDK configured successfully.")
    except Exception as e:
        logger.error(f"Failed to configure Gemini SDK: {e}")

def get_gemini_model(model_name: str = "gemini-1.5-flash", system_instruction: str = None):
    """
    Helper to construct a GenerativeModel instance with optional system guidelines.
    """
    if not settings.GEMINI_API_KEY:
        raise ValueError("Gemini API Key is not set in backend settings.")
        
    try:
        model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=system_instruction
        )
        return model
    except Exception as e:
        logger.error(f"Error creating GenerativeModel '{model_name}': {e}")
        raise e
