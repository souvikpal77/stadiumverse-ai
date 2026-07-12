from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

# Load JSON data
CROWD_DATA = load_json("crowd_status.json")


class CrowdAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Crowd Intelligence",
            prompt_file="crowd.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower().strip()

        # -------------------------------------------------
        # Show all crowd information
        # -------------------------------------------------

        if any(word in message for word in [
            "crowd",
            "queue",
            "busy",
            "wait",
            "status",
            "traffic"
        ]):

            response = "👥 **Live Crowd Intelligence**\n\n"

            for location, info in CROWD_DATA.items():

                response += (
                    f"📍 **{location}**\n"
                    f"Status : {info['status']} {info['crowd_level']}\n"
                    f"Queue : {info['wait_time']}\n"
                    f"Occupancy : {info['occupancy']}\n"
                    f"Recommendation : {info['recommendation']}\n\n"
                )

            # Find least crowded location
            best_location = min(
                CROWD_DATA.items(),
                key=lambda x: int(x[1]["occupancy"].replace("%", ""))
            )

            response += (
                "━━━━━━━━━━━━━━━━━━━━━━\n"
                "✅ **Best Option Right Now**\n\n"
                f"📍 {best_location[0]}\n"
                f"{best_location[1]['status']} {best_location[1]['crowd_level']}\n"
                f"Queue : {best_location[1]['wait_time']}\n"
                f"Occupancy : {best_location[1]['occupancy']}"
            )

            return response

        # -------------------------------------------------
        # Individual Location
        # -------------------------------------------------

        for location, info in CROWD_DATA.items():

            if location.lower() in message:

                return (
                    f"👥 **Live Crowd Information**\n\n"
                    f"📍 Location : {location}\n\n"
                    f"Status : {info['status']} {info['crowd_level']}\n"
                    f"Queue Time : {info['wait_time']}\n"
                    f"Occupancy : {info['occupancy']}\n\n"
                    f"💡 Recommendation\n"
                    f"{info['recommendation']}"
                )

        # -------------------------------------------------
        # Best Gate
        # -------------------------------------------------

        if any(word in message for word in [
            "best gate",
            "least crowded",
            "which gate",
            "fastest gate"
        ]):

            gates = {
                k: v for k, v in CROWD_DATA.items()
                if k.lower().startswith("gate")
            }

            best_gate = min(
                gates.items(),
                key=lambda x: int(x[1]["occupancy"].replace("%", ""))
            )

            info = best_gate[1]

            return (
                "✅ **Recommended Entrance**\n\n"
                f"🚪 {best_gate[0]}\n"
                f"{info['status']} {info['crowd_level']}\n"
                f"Queue : {info['wait_time']}\n"
                f"Occupancy : {info['occupancy']}\n\n"
                f"💡 {info['recommendation']}"
            )

        # -------------------------------------------------
        # Fallback to Gemini
        # -------------------------------------------------

        return await super().execute(user_message, context)