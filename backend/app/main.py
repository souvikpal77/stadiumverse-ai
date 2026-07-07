import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.services.firebase import init_firebase
from app.services.gemini import init_gemini
from app.api.router import api_router

# Configure logging style
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("stadiumverse.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles application startup and shutdown lifecycle hooks.
    """
    logger.info("Initializing StadiumVerse AI Backend...")
    # Initialize service connections
    init_firebase()
    init_gemini()
    yield
    logger.info("Shutting down StadiumVerse AI Backend...")

app = FastAPI(
    title="StadiumVerse AI API",
    description="Multi-Agent AI Orchestrator and backend services for venue management.",
    version="0.1.0",
    lifespan=lifespan
)

# Enforce Cross-Origin Resource Sharing (CORS) rules
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API endpoints
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    """
    Root status check.
    """
    return {
        "app": "StadiumVerse AI API",
        "version": "0.1.0",
        "docs_url": "/docs",
        "status": "online"
    }
