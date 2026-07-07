from app.agents.base_agent import BaseAgent

class EmergencyAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Emergency", prompt_file="emergency.txt")

    async def execute(self, user_message: str, context: dict = None) -> str:
        # High priority alert triggers could bypass standard prompts or execute APIs
        return await super().execute(user_message, context)
