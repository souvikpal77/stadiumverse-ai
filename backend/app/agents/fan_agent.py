from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

FOOD = load_json("food.json")
RESTROOM = load_json("restroom.json")
PARKING = load_json("parking.json")
SCHEDULE = load_json("schedule.json")
SYSTEM = load_json("system_status.json")
MERCHANDISE = load_json("merchandise.json")
WIFI = load_json("wifi.json")


class FanAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Fan Assistant",
            prompt_file="fan.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower().strip()

        # -------------------------------------------------
        # FOOD COURT / COFFEE
        # -------------------------------------------------

        if any(word in message for word in [
            "food",
            "food court",
            "restaurant",
            "eat",
            "burger",
            "pizza",
            "snack",
            "coffee",
            "cafe"
        ]):

            if "coffee" in message or "cafe" in message:
                info = FOOD["Coffee Shop"]
                title = "☕ Coffee Shop"
            else:
                info = FOOD["Food Court"]
                title = "🍔 Food Court"

            return (
                f"{title}\n\n"
                f"📍 Location : {info['location']}\n"
                f"📏 Distance : {info['distance']}\n"
                f"🏢 Floor : {info['floor']}"
            )

        # -------------------------------------------------
        # RESTROOM
        # -------------------------------------------------

        if any(word in message for word in [
            "restroom",
            "toilet",
            "washroom",
            "bathroom"
        ]):

            info = RESTROOM["Restroom"]

            return (
                "🚻 Restroom\n\n"
                f"📍 Location : {info['location']}\n"
                f"📏 Distance : {info['distance']}\n"
                f"🏢 Floor : {info['floor']}"
            )

        # -------------------------------------------------
        # PARKING
        # -------------------------------------------------

        if "parking" in message:

            response = "🚗 Parking Status\n\n"

            for name, info in PARKING.items():

                response += (
                    f"📍 {name}\n"
                    f"Available : {info['available']}\n"
                    f"Status : {info['status']}\n\n"
                )

            return response

        # -------------------------------------------------
        # MATCH SCHEDULE
        # -------------------------------------------------

        if any(word in message for word in [
            "schedule",
            "match",
            "fixture",
            "today"
        ]):

            response = "📅 Today's Match Schedule\n\n"

            for game in SCHEDULE["today"]:

                response += (
                    f"⚽ {game['match']}\n"
                    f"🕒 Kickoff : {game['kickoff']}\n"
                    f"🚪 Gates Open : {game['gates_open']}\n\n"
                )

            return response

        # -------------------------------------------------
        # MERCHANDISE
        # -------------------------------------------------

        if any(word in message for word in [
            "shop",
            "store",
            "merchandise",
            "souvenir",
            "jersey"
        ]):

            info = MERCHANDISE["Main Store"]

            return (
                "🛍 Merchandise Store\n\n"
                f"📍 Location : {info['location']}\n"
                f"🕒 Timing : {info['timing']}"
            )

        # -------------------------------------------------
        # WIFI
        # -------------------------------------------------

        if "wifi" in message:

            return (
                "📶 Stadium WiFi\n\n"
                f"SSID : {WIFI['ssid']}\n"
                f"Password : {WIFI['password']}"
            )

        # -------------------------------------------------
        # SYSTEM STATUS
        # -------------------------------------------------

        if any(word in message for word in [
            "system status",
            "stadium status",
            "system"
        ]):

            return (
                "🟢 Stadium Status\n\n"
                f"🏆 Event : {SYSTEM['event']}\n"
                f"🌤 Weather : {SYSTEM['weather']}\n"
                f"🚪 Gates : {SYSTEM['gates']}\n"
                f"⚠ Alerts : {SYSTEM['alerts']}\n"
                f"💻 System : {SYSTEM['system']}"
            )

        # -------------------------------------------------
        # FALLBACK TO GEMINI
        # -------------------------------------------------

        return await super().execute(user_message, context)