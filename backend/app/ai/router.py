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

# Instantiate singleton agent handlers
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
        """
        Determines the appropriate agent handler based on keywords or context.
        Returns a tuple: (agent_name, agent_instance)
        """
        msg_lower = message.lower()
        role = (context or {}).get("role", "").lower()

        # 1. Emergency Escalation
        emergency_keywords = ["fire", "smoke", "hurt", "injured", "medical", "fight", "security", "collapse"]
        if any(kw in msg_lower for kw in emergency_keywords):
            return "emergency", EMERGENCY_AGENT

        # 2. Translation Request
        translation_keywords = ["translate", "spanish", "french", "german", "mandarin", "how do you say", "in english"]
        if any(kw in msg_lower for kw in translation_keywords):
            return "translation", TRANSLATION_AGENT

        # 3. Navigation / Wayfinding
        navigation_keywords = ["where", "how to get", "locate", "directions", "restroom", "gate", "section", "seat", "exit", "stairs", "elevator"]
        if any(kw in msg_lower for kw in navigation_keywords):
            return "navigation", NAVIGATION_AGENT

        # 4. Operations (Staff Role specific or operational keywords)
        operations_keywords = ["malfunction", "broken", "leak", "hvac", "scanner", "restock", "shift", "cleaning"]
        if any(kw in msg_lower for kw in operations_keywords) or role == "operator":
            return "operations", OPERATIONS_AGENT

        # 5. Volunteer queries
        if "volunteer" in msg_lower or role == "volunteer":
            return "volunteer", VOLUNTEER_AGENT

        # 6. Crowd density / queue sizing
        crowd_keywords = ["crowd", "busy", "line length", "queue", "capacity", "wait time", "concession queue"]
        if any(kw in msg_lower for kw in crowd_keywords):
            return "crowd", CROWD_AGENT

        # 7. Fallback to general Fan Agent
        return "fan", FAN_AGENT

    @classmethod
    async def dispatch(cls, message: str, context: dict = None) -> dict:
        """
        Orchestrates session routing and execute the selected agent.
        """
        agent_name, agent = cls.route_query(message, context)
        logger.info(f"Routing query to agent: {agent_name}")
        
        response_text = await agent.execute(message, context)
        
        return {
            "agent_resolved": agent_name,
            "response": response_text,
            "actions_triggered": []
        }
