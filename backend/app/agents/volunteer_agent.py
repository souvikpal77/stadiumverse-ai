from app.agents.base_agent import BaseAgent

class VolunteerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Volunteer", prompt_file=None)
        self.system_instruction = (
            "You are the Volunteer Coordination Agent for StadiumVerse AI. "
            "Your role is to assist volunteers with shifts assignment queries, check-in instructions, "
            "and localized stadium procedures. Be encouraging, clear, and helpful."
        )

    async def execute(self, user_message: str, context: dict = None) -> str:
        return await super().execute(user_message, context)
