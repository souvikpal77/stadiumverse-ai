import logging
from typing import Tuple

from app.agents.crowd_agent import CrowdAgent
from app.agents.navigation_agent import NavigationAgent
from app.agents.operations_agent import OperationsAgent
from app.agents.emergency_agent import EmergencyAgent
from app.agents.volunteer_agent import VolunteerAgent
from app.agents.translation_agent import TranslationAgent
from app.agents.fan_agent import FanAgent

logger = logging.getLogger("stadiumverse.ai.router")

# Singleton Agents
CROWD_AGENT = CrowdAgent()
NAVIGATION_AGENT = NavigationAgent()
OPERATIONS_AGENT = OperationsAgent()
EMERGENCY_AGENT = EmergencyAgent()
VOLUNTEER_AGENT = VolunteerAgent()
TRANSLATION_AGENT = TranslationAgent()
FAN_AGENT = FanAgent()


class AgentRouter:

    @staticmethod
    def route_query(message: str, context: dict = None) -> Tuple[str, object]:

        msg = message.lower().strip()
        role = (context or {}).get("role", "").lower()

        # =====================================================
        # EMERGENCY
        # =====================================================

        emergency_keywords = [
            "emergency", "fire", "medical", "ambulance", "doctor",
            "injury", "injured", "fight", "security",
            "bomb", "collapse", "evacuate", "help me"
        ]

        if any(k in msg for k in emergency_keywords):
            return "emergency", EMERGENCY_AGENT

        # =====================================================
        # TRANSLATION
        # =====================================================

        translation_keywords = [
            "translate", "translation", "spanish", "french",
            "german", "arabic", "english", "hindi",
            "bengali", "japanese", "korean", "chinese"
        ]

        if any(k in msg for k in translation_keywords):
            return "translation", TRANSLATION_AGENT

        # =====================================================
        # NAVIGATION  (CHECK BEFORE FAN)
        # =====================================================

        navigation_keywords = [
            "where is my seat",
            "find my seat",
            "my seat",
            "seat",
            "section",
            "row",
            "block",
            "gate",
            "navigate",
            "navigation",
            "route",
            "direction",
            "directions",
            "locate",
            "location",
            "take me",
            "way",
            "exit",
            "entrance",
            "stairs",
            "lift",
            "elevator",
            "escalator",
            "where is gate"
        ]

        if any(k in msg for k in navigation_keywords):
            return "navigation", NAVIGATION_AGENT

        # =====================================================
        # CROWD
        # =====================================================

        crowd_keywords = [
            "crowd",
            "queue",
            "waiting",
            "wait time",
            "busy",
            "traffic",
            "rush",
            "capacity",
            "least crowded",
            "less crowded",
            "crowded"
        ]

        if any(k in msg for k in crowd_keywords):
            return "crowd", CROWD_AGENT

        # =====================================================
        # OPERATIONS
        # =====================================================

        operations_keywords = [
            "scanner",
            "camera",
            "maintenance",
            "repair",
            "broken",
            "cleaning",
            "generator",
            "electricity",
            "hvac",
            "water leak"
        ]

        if role == "operator" or any(k in msg for k in operations_keywords):
            return "operations", OPERATIONS_AGENT

        # =====================================================
        # VOLUNTEER
        # =====================================================

        volunteer_keywords = [
            "volunteer",
            "task",
            "assignment",
            "shift",
            "duty"
        ]

        if role == "volunteer" or any(k in msg for k in volunteer_keywords):
            return "volunteer", VOLUNTEER_AGENT

        # =====================================================
        # FAN
        # =====================================================

        fan_keywords = [
            "food",
            "food court",
            "restaurant",
            "eat",
            "meal",
            "burger",
            "pizza",
            "snack",
            "coffee",
            "tea",
            "cafe",
            "parking",
            "shop",
            "souvenir",
            "jersey",
            "wifi",
            "ticket",
            "schedule",
            "fixture",
            "kickoff",
            "match",
            "hello",
            "hi",
            "hey",
            "thanks",
            "thank you"
        ]

        if any(k in msg for k in fan_keywords):
            return "fan", FAN_AGENT

        # =====================================================
        # DEFAULT
        # =====================================================

        return "fan", FAN_AGENT

    @classmethod
    async def dispatch(cls, message: str, context: dict = None) -> dict:

        agent_name, agent = cls.route_query(message, context)

        logger.info("=" * 60)
        logger.info(f"MESSAGE : {message}")
        logger.info(f"ROUTED TO : {agent_name.upper()}")
        logger.info("=" * 60)

        response = await agent.execute(message, context)

        return {
            "agent_resolved": agent_name,
            "response": response,
            "actions_triggered": []
        }