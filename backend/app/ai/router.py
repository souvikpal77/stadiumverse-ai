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

# =====================================================
# Singleton Agents
# =====================================================

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
        # EMERGENCY (Highest Priority)
        # =====================================================

        emergency_keywords = [
            "emergency",
            "fire",
            "medical emergency",
            "ambulance",
            "doctor",
            "injured",
            "injury",
            "fight",
            "security",
            "bomb",
            "collapse",
            "evacuate",
            "help me"
        ]

        if any(k in msg for k in emergency_keywords):
            return "emergency", EMERGENCY_AGENT

        # =====================================================
        # TRANSLATION
        # =====================================================

        translation_keywords = [
            "translate",
            "translation",
            "translate to",
            "hindi",
            "bengali",
            "english",
            "spanish",
            "french",
            "arabic",
            "german",
            "japanese",
            "korean",
            "chinese"
        ]

        if any(k in msg for k in translation_keywords):
            return "translation", TRANSLATION_AGENT

        # =====================================================
        # CROWD
        # =====================================================

        crowd_keywords = [
            "crowd",
            "crowded",
            "least crowded",
            "best gate",
            "fastest gate",
            "queue",
            "wait",
            "waiting",
            "traffic",
            "occupancy",
            "density",
            "busy"
        ]

        if any(k in msg for k in crowd_keywords):
            return "crowd", CROWD_AGENT

        # =====================================================
        # VOLUNTEER
        # =====================================================

        volunteer_keywords = [
            "volunteer",
            "volunteers",
            "helper",
            "staff",
            "task",
            "assignment",
            "shift",
            "duty",
            "gate a volunteer",
            "gate b volunteer",
            "gate c volunteer",
            "gate d volunteer",
            "food court volunteer",
            "medical center volunteer",
            "vip entrance volunteer"
        ]

        if role == "volunteer" or any(k in msg for k in volunteer_keywords):
            return "volunteer", VOLUNTEER_AGENT

        # =====================================================
        # OPERATIONS
        # =====================================================

        operations_keywords = [
            "camera",
            "scanner",
            "maintenance",
            "repair",
            "broken",
            "generator",
            "electricity",
            "power",
            "water leak",
            "hvac",
            "cleaning"
        ]

        if role == "operator" or any(k in msg for k in operations_keywords):
            return "operations", OPERATIONS_AGENT

        # =====================================================
        # NAVIGATION
        # =====================================================

        navigation_keywords = [

            # Seats
            "seat",
            "my seat",
            "find my seat",
            "section",
            "row",
            "block",

            # Gates
            "gate",
            "gate a",
            "gate b",
            "gate c",
            "gate d",

            # Locations
            "food court",
            "restroom",
            "washroom",
            "toilet",
            "bathroom",
            "medical center",
            "atm",

            # Directions
            "navigate",
            "navigation",
            "route",
            "direction",
            "directions",
            "where is",
            "take me",
            "locate",
            "location",

            # Accessibility
            "exit",
            "lift",
            "elevator",
            "wheelchair",
            "accessible"
        ]

        if any(k in msg for k in navigation_keywords):
            return "navigation", NAVIGATION_AGENT

        # =====================================================
        # FAN ASSISTANT
        # =====================================================

        fan_keywords = [
            "parking",
            "schedule",
            "fixture",
            "match",
            "today",
            "wifi",
            "internet",
            "merchandise",
            "shop",
            "store",
            "souvenir",
            "jersey",
            "ticket",
            "system",
            "system status",
            "stadium status",
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
    async def dispatch(cls, message: str, context: dict = None):

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