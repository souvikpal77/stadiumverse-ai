import logging
import google.generativeai as genai
from app.core.config import settings

logger = logging.getLogger("stadiumverse.gemini")

# Recommended Gemini model
DEFAULT_MODEL = "models/gemini-3.5-flash"


def init_gemini():
    """
    Configure the Gemini SDK.
    Called once when the FastAPI application starts.
    """

    if not settings.GEMINI_API_KEY:
        logger.warning(
            "GEMINI_API_KEY is not configured in environment variables."
        )
        return

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        logger.info("Google Gemini configured successfully.")

    except Exception as e:
        logger.exception("Failed to configure Gemini SDK.")
        raise e


def get_gemini_model(
    model_name: str = DEFAULT_MODEL,
    system_instruction: str | None = None,
):
    """
    Returns a configured Gemini model instance.
    """

    print("\n====================================")
    print("USING GEMINI MODEL:", model_name)
    print("====================================\n")

    logger.info(f"Creating Gemini model: {model_name}")

    try:
        return genai.GenerativeModel(
            model_name=model_name,
            system_instruction=system_instruction,
        )

    except Exception as e:
        logger.exception("Failed to create Gemini model.")
        raise e