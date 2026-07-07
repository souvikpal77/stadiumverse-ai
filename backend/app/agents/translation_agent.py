from app.agents.base_agent import BaseAgent

class TranslationAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Translation", prompt_file="translation.txt")

    async def execute(self, user_message: str, context: dict = None) -> str:
        # Multi-language translation pre/post formatting can be added here
        return await super().execute(user_message, context)
