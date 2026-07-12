from app.agents.base_agent import BaseAgent

from app.utils.json_loader import load_json

FACILITIES = load_json("facilities.json")
PARKING_STATUS = load_json("parking.json")
MATCH_SCHEDULE = load_json("schedule.json")


class FanAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Fan Assistant",
            prompt_file="fan.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower()

        # ------------------------
        # Parking
        # ------------------------
        if "parking" in message:

            response = "🚗 **Parking Status**\n\n"

            for name, info in PARKING_STATUS.items():
                response += (
                    f"📍 {name}\n"
                    f"Available: {info['available']}/{info['total']}\n"
                    f"Status: {info['status']}\n\n"
                )

            return response

        # ------------------------
        # Match Schedule
        # ------------------------
        if "schedule" in message or "match" in message or "fixture" in message:

            response = "📅 **Today's Match Schedule**\n\n"

            for match in MATCH_SCHEDULE:
                response += (
                    f"⚽ {match['match']}\n"
                    f"🕒 Kickoff: {match['kickoff']}\n"
                    f"🚪 Gates Open: {match['gate_open']}\n\n"
                )

            return response

        # ------------------------
        # Facilities
        # ------------------------
        for facility, info in FACILITIES.items():

            if facility.lower() in message:

                return f"""
📍 {facility}

Location:
{info['location']}

Distance:
{info['distance']}

Floor:
{info['floor']}
"""

        # ------------------------
        # Default to Gemini
        # ------------------------
        return await super().execute(user_message, context)