from fastapi import APIRouter
from app.api.v1.api import router as v1_router

api_router = APIRouter()

# Include version 1 API endpoints
api_router.include_router(v1_router, prefix="/v1")
