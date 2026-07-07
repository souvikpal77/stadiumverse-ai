import logging
from typing import List, Dict, Any
from app.services.firebase import get_db

logger = logging.getLogger("stadiumverse.ai.rag")

class RAGPipeline:
    @staticmethod
    def retrieve_guidelines(query: str, limit: int = 3) -> List[Dict[str, Any]]:
        """
        Queries Firestore for documents/guidelines matching terms in the query.
        Returns matches as a list of document details.
        """
        db = get_db()
        matched_documents = []

        if db is not None:
            try:
                # Placeholder matching logic: query Firestore collection 'kb' (Knowledge Base)
                # Production implementations will use embedding vectors or Firestore Search Indexes.
                kb_ref = db.collection("knowledge_base")
                docs = kb_ref.limit(limit).stream()
                
                for doc in docs:
                    data = doc.to_dict()
                    matched_documents.append({
                        "title": data.get("title", "Guide Section"),
                        "content": data.get("content", "")
                    })
            except Exception as e:
                logger.error(f"Error executing knowledge retrieval: {e}")

        # Static fallback if database has not been populated or is disconnected
        if not matched_documents:
            matched_documents.append({
                "title": "Stadium Map Guide",
                "content": "Gates A-D lead to West stands. Concessions are located in corridors 1, 2, and 5."
            })
            
        return matched_documents

    @classmethod
    def augment_prompt(cls, prompt: str, search_query: str = None) -> str:
        """
        Appends relevant knowledge base documents to the prompt content.
        """
        query = search_query or prompt
        docs = cls.retrieve_guidelines(query)
        
        if not docs:
            return prompt
            
        docs_str = "\n".join([f"Source [{d['title']}]: {d['content']}" for d in docs])
        augmented = (
            f"Use the following reference guidelines if relevant to answer the query:\n"
            f"{docs_str}\n\n"
            f"Query: {prompt}"
        )
        return augmented
