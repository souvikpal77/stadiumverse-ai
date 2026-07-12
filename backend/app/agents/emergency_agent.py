import random

from app.agents.base_agent import BaseAgent
from app.data.emergency import EMERGENCY_DATA


class EmergencyAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Emergency Response",
            prompt_file="emergency.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower()

        incident_id = f"EMR-2026-{random.randint(1000,9999)}"

        # -------------------------------------------------
        # Medical Emergency
        # -------------------------------------------------

        medical_keywords = [
            "medical",
            "doctor",
            "ambulance",
            "injured",
            "injury",
            "first aid",
            "fainted",
            "unconscious",
            "heart",
            "bleeding"
        ]

        if any(word in message for word in medical_keywords):

            info = EMERGENCY_DATA["medical"]

            return (
                "🚨 **MEDICAL EMERGENCY ACTIVATED**\n\n"

                f"🆔 Incident ID\n"
                f"`{incident_id}`\n\n"

                f"🟢 Status\n"
                f"{info['status']}\n\n"

                f"👨‍⚕️ Medical Team ETA\n"
                f"{info['team_eta']}\n\n"

                f"👮 Security Team ETA\n"
                f"{info['security_eta']}\n\n"

                f"❤️ Nearest AED\n"
                f"{info['aed']}\n\n"

                f"🚪 Nearest Exit\n"
                f"{info['nearest_exit']}\n\n"

                "📢 Please stay calm.\n"
                "Do not move the injured person unless necessary.\n"
                "Emergency responders are on the way."
            )

        # -------------------------------------------------
        # Fire Emergency
        # -------------------------------------------------

        fire_keywords = [
            "fire",
            "smoke",
            "burning",
            "flames",
            "explosion"
        ]

        if any(word in message for word in fire_keywords):

            info = EMERGENCY_DATA["fire"]

            return (
                "🔥 **FIRE EMERGENCY ACTIVATED**\n\n"

                f"🆔 Incident ID\n"
                f"`{incident_id}`\n\n"

                f"🔴 Status\n"
                f"{info['status']}\n\n"

                f"🚒 Fire Response ETA\n"
                f"{info['team_eta']}\n\n"

                f"👮 Security ETA\n"
                f"{info['security_eta']}\n\n"

                f"🚪 Evacuate Through\n"
                f"{info['nearest_exit']}\n\n"

                "⚠ Leave the area immediately.\n"
                "Do not use elevators.\n"
                "Follow stadium staff instructions."
            )

        # -------------------------------------------------
        # Security Emergency
        # -------------------------------------------------

        security_keywords = [
            "fight",
            "security",
            "bomb",
            "weapon",
            "knife",
            "gun",
            "attack",
            "violence",
            "suspicious"
        ]

        if any(word in message for word in security_keywords):

            info = EMERGENCY_DATA["security"]

            return (
                "🚔 **SECURITY ALERT ACTIVATED**\n\n"

                f"🆔 Incident ID\n"
                f"`{incident_id}`\n\n"

                f"🟠 Status\n"
                f"{info['status']}\n\n"

                f"👮 Security ETA\n"
                f"{info['security_eta']}\n\n"

                f"🚪 Safe Exit\n"
                f"{info['nearest_exit']}\n\n"

                "⚠ Stay away from the affected area.\n"
                "Follow announcements.\n"
                "Security personnel have been notified."
            )

        # -------------------------------------------------
        # Generic Emergency
        # -------------------------------------------------

        if "help" in message or "emergency" in message:

            return (
                "🚨 **Emergency Assistance Requested**\n\n"

                f"🆔 Incident ID\n"
                f"`{incident_id}`\n\n"

                "Our emergency response team has been notified.\n\n"

                "Please tell us the emergency type:\n\n"

                "• Medical\n"
                "• Fire\n"
                "• Security\n"
                "• Other\n\n"

                "Stay calm.\n"
                "Help is on the way."
            )

        # -------------------------------------------------
        # Gemini Fallback
        # -------------------------------------------------

        return await super().execute(user_message, context)