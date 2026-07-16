import os
import logging
from typing import Optional

from app.services.gemini import get_gemini_model

logger = logging.getLogger("stadiumverse.agents.base")


class BaseAgent:
    def __init__(self, name: str, prompt_file: Optional[str] = None):
        self.name = name
        self.system_instruction = self._load_prompt_template(prompt_file)

    def _load_prompt_template(self, prompt_file: Optional[str]) -> str:
        """
        Reads the system prompt from backend/prompts/.
        Falls back to a default prompt if the file is missing.
        """

        if not prompt_file:
            return f"You are the {self.name} Agent for StadiumVerse AI."

        base_dir = os.path.dirname(
            os.path.dirname(
                os.path.dirname(os.path.abspath(__file__))
            )
        )

        prompt_path = os.path.join(base_dir, "prompts", prompt_file)

        if not os.path.exists(prompt_path):
            logger.warning(
                f"Prompt file not found: {prompt_path}. Using default prompt."
            )
            return f"You are the {self.name} Agent for StadiumVerse AI."

        try:
            with open(prompt_path, "r", encoding="utf-8") as file:
                return file.read().strip()

        except Exception as e:
            logger.exception(e)
            return f"You are the {self.name} Agent for StadiumVerse AI."

    async def execute(self, user_message: str, context: dict = None) -> str:
        """
        Executes the agent using Gemini.
        """

        context_str = ""

        if context:
            context_str = f"\n\n[Context]\n{context}"

        prompt = f"{user_message}{context_str}"

        try:
            model = get_gemini_model(
                system_instruction=self.system_instruction
            )

            response = model.generate_content(prompt)

            if hasattr(response, "text") and response.text:
                return response.text

            return "The AI returned an empty response."

        except Exception:
            logger.exception(
                f"Execution failed inside Agent '{self.name}'"
            )

            return (
                "I'm having trouble reaching the AI assistant right now. "
                "Please try again in a moment."
            )