from app.agents.base_agent import BaseAgent

class CrowdAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Crowd", prompt_file="crowd.txt")

    async def execute(self, user_message: str, context: dict = None) -> str:
        # Custom logic before/after Gemini generation can be added here
        return await super().execute(user_message, context)
