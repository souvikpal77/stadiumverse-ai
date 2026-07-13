from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

CROWD_DATA = load_json("crowd_status.json")


class CrowdAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Crowd Intelligence",
            prompt_file="crowd.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower().strip()

        # =====================================================
        # Individual Location
        # =====================================================

        for location, info in CROWD_DATA.items():

            if location.lower() in message:

                return (
                    "👮 Crowd Intelligence\n\n"
                    f"📍 {location}\n\n"
                    f"Status : {info['status']} {info['crowd_level']}\n"
                    f"Queue : {info['wait_time']}\n"
                    f"Occupancy : {info['occupancy']}\n"
                    f"Recommendation : {info['recommendation']}"
                )

        # =====================================================
        # Best Gate
        # =====================================================

        if any(word in message for word in [
            "least crowded",
            "best gate",
            "which gate",
            "fastest gate"
        ]):

            gates = {
                k: v
                for k, v in CROWD_DATA.items()
                if k.lower().startswith("gate")
            }

            best_gate = min(
                gates.items(),
                key=lambda x: int(x[1]["occupancy"].replace("%", ""))
            )

            info = best_gate[1]

            return (
                "✅ Recommended Entrance\n\n"
                f"🚪 {best_gate[0]}\n\n"
                f"Status : {info['status']} {info['crowd_level']}\n"
                f"Queue : {info['wait_time']}\n"
                f"Occupancy : {info['occupancy']}\n"
                f"Recommendation : {info['recommendation']}"
            )

        # =====================================================
        # Full Crowd Report
        # =====================================================

        if any(word in message for word in [
            "crowd",
            "crowd status",
            "show crowd",
            "queue",
            "busy",
            "traffic",
            "status"
        ]):

            response = "👮 Crowd Intelligence\n\n"
            response += "👥 Live Crowd Status\n\n"

            for location, info in CROWD_DATA.items():

                response += (
                    f"📍 {location}\n"
                    f"Status : {info['status']} {info['crowd_level']}\n"
                    f"Queue : {info['wait_time']}\n"
                    f"Occupancy : {info['occupancy']}\n"
                    f"Recommendation : {info['recommendation']}\n\n"
                )

            gates = {
                k: v
                for k, v in CROWD_DATA.items()
                if k.lower().startswith("gate")
            }

            best_gate = min(
                gates.items(),
                key=lambda x: int(x[1]["occupancy"].replace("%", ""))
            )

            response += (
                "━━━━━━━━━━━━━━━━━━━━━━\n"
                "✅ Best Entrance\n\n"
                f"{best_gate[0]}\n"
                f"{best_gate[1]['status']} {best_gate[1]['crowd_level']}\n"
                f"Queue : {best_gate[1]['wait_time']}\n"
                f"Occupancy : {best_gate[1]['occupancy']}"
            )

            return response

        # =====================================================
        # Gemini Fallback
        # =====================================================

        return await super().execute(user_message, context)