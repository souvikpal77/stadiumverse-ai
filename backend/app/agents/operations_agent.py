from app.agents.base_agent import BaseAgent

class OperationsAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Operations", prompt_file="operations.txt")

    async def execute(self, user_message: str, context: dict = None) -> str:
        # Operations ticketing or sensor updates can be handled here
        return await super().execute(user_message, context)
