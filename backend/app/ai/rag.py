import logging
from typing import List, Dict, Any
from app.services.firebase import get_db

logger = logging.getLogger("stadiumverse.ai.rag")


class RAGPipeline:

    @staticmethod
    def retrieve_guidelines(query: str, limit: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieve relevant knowledge from Firestore.
        """

        db = get_db()
        matched_documents = []

        if db is not None:
            try:
                kb_ref = db.collection("knowledge_base")
                docs = kb_ref.limit(limit).stream()

                for doc in docs:
                    data = doc.to_dict()

                    matched_documents.append(
                        {
                            "title": data.get("title", "Guide"),
                            "content": data.get("content", ""),
                        }
                    )

            except Exception as e:
                logger.error(e)

        if not matched_documents:
            matched_documents = [
                {
                    "title": "Stadium Guide",
                    "content": (
                        "West Stand is accessible via Gates A-D. "
                        "Food courts are located in Corridors 1,2 and 5."
                    ),
                }
            ]

        return matched_documents

    @classmethod
    def augment_prompt(cls, prompt: str) -> str:
        """
        IMPORTANT:
        Never modify the user's original message for routing.
        Just return it.
        """

        return prompt

    @classmethod
    def build_context(cls, prompt: str) -> str:
        """
        Optional helper.
        This is only for Gemini after routing.
        """

        docs = cls.retrieve_guidelines(prompt)

        knowledge = "\n\n".join(
            [
                f"{doc['title']}:\n{doc['content']}"
                for doc in docs
            ]
        )

        return f"""
Knowledge Base

{knowledge}

User Question:
{prompt}
"""