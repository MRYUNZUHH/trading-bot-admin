from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware     
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1 import api_router
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up Trading Bot Admin API...")
    Base.metadata.create_all(bind=engine)
    yield
    logger.info("Shutting down Trading Bot Admin API...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json", 
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,       
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router - v2 fix
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Trading Bot Admin API"}        

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": settings.VERSION}
