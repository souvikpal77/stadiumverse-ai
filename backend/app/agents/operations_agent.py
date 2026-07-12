from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

OPERATIONS = load_json("operations.json")


class OperationsAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Operations",
            prompt_file="operations.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower()

        # ------------------------------------------
        # Show all operations status
        # ------------------------------------------

        if any(word in message for word in [
            "operations",
            "system",
            "status",
            "all systems",
            "devices"
        ]):

            response = "🛠 **Operations Dashboard**\n\n"

            for device, info in OPERATIONS.items():

                response += (
                    f"📡 **{device}**\n"
                    f"Status : {info['status']}\n"
                    f"Location : {info['location']}\n\n"
                )

            return response

        # ------------------------------------------
        # Individual device
        # ------------------------------------------

        for device, info in OPERATIONS.items():

            if device.lower() in message:

                return (
                    f"🛠 **{device}**\n\n"
                    f"Status : {info['status']}\n"
                    f"Location : {info['location']}"
                )

        # ------------------------------------------
        # Gemini fallback
        # ------------------------------------------

        return await super().execute(user_message, context)