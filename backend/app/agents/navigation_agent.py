from app.agents.base_agent import BaseAgent
from app.utils.json_loader import load_json

# Load JSON data
ROUTES = load_json("stadium_map.json")
CROWD_STATUS = load_json("crowd_status.json")


class NavigationAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Navigation",
            prompt_file="navigation.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower().strip()

        # ---------------------------------------------------------
        # Find seat section
        # ---------------------------------------------------------
        found_section = None

        for section in ROUTES.keys():
            if section.lower() in message:
                found_section = section
                break

        # ---------------------------------------------------------
        # Seat request without section
        # ---------------------------------------------------------
        if (
            "seat" in message
            or "section" in message
            or "row" in message
        ) and found_section is None:

            return (
                "🪑 **Seat Finder**\n\n"
                "Please provide your **Section**.\n\n"
                "Example:\n"
                "• Section A4\n"
                "• Section B2\n"
                "• Section C1"
            )

        # ---------------------------------------------------------
        # Seat Found
        # ---------------------------------------------------------
        if found_section:

            route = ROUTES[found_section]

            gate = route["gate"]

            gate_info = CROWD_STATUS.get(gate)

            recommended_gate = gate
            warning = ""

            if gate_info:

                density = gate_info["density"]

                if density >= 80:

                    best_gate = min(
                        CROWD_STATUS.items(),
                        key=lambda item: item[1]["density"]
                    )

                    recommended_gate = best_gate[0]

                    warning = (
                        "\n\n"
                        f"⚠️ {gate} is currently crowded "
                        f"({density}% occupancy).\n"
                        f"✅ Suggested Entrance: {recommended_gate}"
                    )

            return (
                "🪑 **Seat Location Found**\n\n"
                f"📍 **Section:** {found_section}\n"
                f"🚪 **Gate:** {recommended_gate}\n"
                f"🏢 **Corridor:** {route['corridor']}\n"
                f"🚶 **Walking Time:** {route['walk_time']}\n"
                f"🚻 **Nearest Restroom:** {route['restroom']}\n"
                f"🍔 **Nearest Food Court:** {route['food_court']}\n"
                f"🏥 **Medical Center:** {route['medical']}\n"
                f"♿ **Accessible Route:** {'Yes' if route['accessible'] else 'No'}"
                f"{warning}\n\n"
                "Enjoy the match! ⚽"
            )

        # ---------------------------------------------------------
        # Food Court
        # ---------------------------------------------------------
        if any(word in message for word in [
            "food",
            "food court",
            "restaurant",
            "canteen",
            "burger",
            "pizza"
        ]):

            return (
                "🍔 **Nearest Food Court**\n\n"
                "📍 Location: Corridor 2\n"
                "🚶 Walking Time: 2 minutes\n"
                "👥 Crowd Level: Medium\n"
                "⏳ Estimated Queue: 5 minutes"
            )

        # ---------------------------------------------------------
        # Restroom
        # ---------------------------------------------------------
        if any(word in message for word in [
            "restroom",
            "washroom",
            "toilet",
            "bathroom"
        ]):

            return (
                "🚻 **Nearest Restroom**\n\n"
                "📍 Corridor 2\n"
                "🚶 Walking Time: 1 minute"
            )

        # ---------------------------------------------------------
        # Medical
        # ---------------------------------------------------------
        if any(word in message for word in [
            "medical",
            "hospital",
            "doctor",
            "clinic",
            "first aid"
        ]):

            return (
                "🏥 **Medical Center**\n\n"
                "📍 Ground Floor\n"
                "🚶 Walking Time: 3 minutes\n"
                "👨‍⚕️ Emergency doctors available 24×7"
            )

        # ---------------------------------------------------------
        # Exit
        # ---------------------------------------------------------
        if "exit" in message:

            return (
                "🚪 **Nearest Exit**\n\n"
                "Gate A\n"
                "🚶 Walking Time: 3 minutes"
            )

        # ---------------------------------------------------------
        # Elevator
        # ---------------------------------------------------------
        if any(word in message for word in [
            "lift",
            "elevator",
            "accessible",
            "wheelchair"
        ]):

            return (
                "♿ **Accessible Route**\n\n"
                "Nearest elevator is beside Corridor 2.\n"
                "Wheelchair friendly route available."
            )

        # ---------------------------------------------------------
        # Parking shortcut
        # ---------------------------------------------------------
        if "parking" in message:

            return (
                "🚗 Parking is located outside Gates A and B.\n\n"
                "For live parking availability please ask:\n"
                "**Parking Status**"
            )

        # ---------------------------------------------------------
        # Fallback to Gemini
        # ---------------------------------------------------------
        return await super().execute(user_message, context)