from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

VOLUNTEERS = load_json("volunteers.json")


class VolunteerAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Volunteer Assistant",
            prompt_file="volunteer.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower()

        # ------------------------------------------
        # Show all volunteers
        # ------------------------------------------

        if any(word in message for word in [
            "volunteer",
            "volunteers",
            "staff",
            "helper"
        ]):

            response = "🦺 **Volunteer Assignments**\n\n"

            for location, info in VOLUNTEERS.items():

                response += (
                    f"📍 **{location}**\n"
                    f"Volunteer : {info['volunteer']}\n"
                    f"Task : {info['task']}\n\n"
                )

            return response

        # ------------------------------------------
        # Individual location
        # ------------------------------------------

        for location, info in VOLUNTEERS.items():

            if location.lower() in message:

                return (
                    f"🦺 **Volunteer Information**\n\n"
                    f"📍 Location : {location}\n"
                    f"Volunteer : {info['volunteer']}\n"
                    f"Task : {info['task']}"
                )

        # ------------------------------------------
        # Gemini fallback
        # ------------------------------------------

        return await super().execute(user_message, context)