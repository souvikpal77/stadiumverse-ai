from app.agents.base_agent import BaseAgent

class NavigationAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Navigation", prompt_file="navigation.txt")

    async def execute(self, user_message: str, context: dict = None) -> str:
        # Specialized spatial layout reasoning can be handled here
        return await super().execute(user_message, context)
