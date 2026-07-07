from app.agents.base_agent import BaseAgent

class FanAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Fan", prompt_file=None)
        self.system_instruction = (
            "You are the Fan Engagement Copilot for StadiumVerse AI. "
            "Your role is to help spectators have an amazing experience. "
            "Help with stadium food recommendations, merchandise locations, schedules, fun facts, "
            "and general trivia. Keep your tone cheerful, exciting, and fan-friendly!"
        )

    async def execute(self, user_message: str, context: dict = None) -> str:
        return await super().execute(user_message, context)
