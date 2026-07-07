import logging
from typing import Dict, Any
from app.services.firebase import get_db

logger = logging.getLogger("stadiumverse.ai.context")

class ContextManager:
    @staticmethod
    async def get_stadium_context() -> Dict[str, Any]:
        """
        Retrieves real-time global stadium telemetry and status details.
        Reads from Firestore under the 'stadium_status' collections if connected.
        """
        db = get_db()
        context = {
            "current_event": "Champions League Final - StadiumVerse Arena",
            "weather": "Clear, 22C",
            "gate_status": "All gates open",
            "active_alerts": []
        }

        if db is not None:
            try:
                # Firestore read boilerplate
                doc_ref = db.collection("metadata").document("stadium_status")
                doc = doc_ref.get()
                if doc.exists:
                    db_context = doc.to_dict()
                    context.update(db_context)
            except Exception as e:
                logger.error(f"Error querying stadium context from Firestore: {e}")

        return context

    @classmethod
    async def assemble_context(cls, user_context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Merges global stadium states with user-specific session geolocations.
        """
        global_context = await cls.get_stadium_context()
        merged = {**global_context}
        if user_context:
            merged.update(user_context)
        return merged
