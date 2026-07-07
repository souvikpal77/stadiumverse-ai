import os
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings

logger = logging.getLogger("stadiumverse.firebase")

db = None

def init_firebase() -> None:
    """
    Initializes the Firebase Admin SDK using configured service credentials.
    In the absence of a credentials file, logs warnings and avoids app crash.
    """
    global db
    
    # Check if firebase is already initialized
    if firebase_admin._apps:
        try:
            db = firestore.client()
            logger.info("Firebase Firestore client retrieved successfully (already initialized).")
            return
        except Exception as e:
            logger.error(f"Error retrieving Firestore client: {e}")
            return

    cred_path = settings.FIREBASE_CREDENTIALS_PATH
    
    if not cred_path or not os.path.exists(cred_path):
        logger.warning(
            f"Firebase service credentials not found at path: {cred_path}. "
            "Firestore operations will fail. Running in local fallback/mock mode."
        )
        return

    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        logger.info("Firebase Admin SDK successfully initialized.")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin SDK: {e}")
        db = None

def get_db():
    """
    Dependency or helper to access the Firestore client.
    """
    if db is None:
        # Attempt deferred initialization (e.g. if config changed)
        init_firebase()
    return db
