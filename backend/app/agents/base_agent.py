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
        Helper to read instructions from backend/prompts/ directory.
        Falls back to a default system instruction if file is missing.
        """
        if not prompt_file:
            return f"You are the {self.name} Agent for StadiumVerse AI."

        # Compute path relative to backend root
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        prompt_path = os.path.join(base_dir, "prompts", prompt_file)

        if not os.path.exists(prompt_path):
            logger.warning(f"System instructions file not found at: {prompt_path}. Using base fallback.")
            return f"You are the {self.name} Agent for StadiumVerse AI."

        try:
            with open(prompt_path, "r", encoding="utf-8") as f:
                return f.read().strip()
        except Exception as e:
            logger.error(f"Error loading system prompt file '{prompt_file}': {e}")
            return f"You are the {self.name} Agent for StadiumVerse AI."

    async def execute(self, user_message: str, context: dict = None) -> str:
        """
        Processes user query using Gemini API.
        Can be overridden by sub-agents to handle specialized tools/APIs.
        """
        # Package supplementary state context in prompt if available
        context_str = ""
        if context:
            context_str = f"\n\n[Active Session Context]\n{context}"

        prompt = f"{user_message}{context_str}"
        
        try:
            # Instantiate client model with system instruction template
            model = get_gemini_model(system_instruction=self.system_instruction)
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Execution failed inside Agent '{self.name}': {e}")
            return f"An error occurred within the {self.name} Agent while processing your request."
