import logging
from typing import List, Dict, Any
from app.services.firebase import get_db

logger = logging.getLogger("stadiumverse.ai.memory")

class ConversationMemory:
    @staticmethod
    def get_history(session_id: str, limit: int = 10) -> List[Dict[str, str]]:
        """
        Loads the recent chat logs for the session from Firestore database.
        Returns a list of structured messages, e.g. [{"role": "user", "content": "..."}]
        """
        db = get_db()
        history = []

        if not session_id:
            return history

        if db is not None:
            try:
                # Retrieve last 'limit' messages ordered by timestamp
                messages_ref = (
                    db.collection("sessions")
                    .document(session_id)
                    .collection("messages")
                    .order_by("timestamp", direction="DESCENDING")
                    .limit(limit)
                )
                
                # Fetch docs (reversing because we fetched descending)
                docs = list(messages_ref.stream())
                docs.reverse()
                
                for doc in docs:
                    data = doc.to_dict()
                    history.append({
                        "role": data.get("role", "user"),
                        "content": data.get("content", "")
                    })
            except Exception as e:
                logger.error(f"Failed to retrieve chat history from Firestore: {e}")
                
        return history

    @staticmethod
    def save_message(session_id: str, role: str, content: str) -> None:
        """
        Persists a newly exchanged message into the session's Firestore subcollection.
        """
        db = get_db()
        if not session_id or db is None:
            return

        try:
            from datetime import datetime, timezone
            
            message_data = {
                "role": role,
                "content": content,
                "timestamp": datetime.now(timezone.utc)
            }
            
            db.collection("sessions").document(session_id).collection("messages").add(message_data)
        except Exception as e:
            logger.error(f"Failed to persist chat message to Firestore: {e}")
