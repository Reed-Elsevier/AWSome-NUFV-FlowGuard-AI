from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.app.data.validation import validate_datasets
from backend.app.api.processes import router as processes_router
from backend.app.api.analysis import router as analysis_router
from backend.app.api.simulator import router as simulator_router
from backend.app.api.ai_value import router as ai_value_router
from backend.app.api.ask import router as ask_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup validation
    print("[Startup] Validating operational datasets...")
    validation = validate_datasets()
    if validation["status"] == "error":
        print(f"[Warning] Dataset validation warnings: {validation['errors']}")
    else:
        print("[Startup] All required datasets validated successfully.")
    yield
    print("[Shutdown] FlowGuard AI backend shutting down.")

app = FastAPI(
    title="FlowGuard AI",
    description="AI-Powered Process Intelligence and AI Value Audit API",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for local Vite development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pathlib import Path
from fastapi.staticfiles import StaticFiles

# Register routers
app.include_router(processes_router)
app.include_router(analysis_router)
app.include_router(simulator_router)
app.include_router(ai_value_router)
app.include_router(ask_router)

# Mount built frontend if available
frontend_dist = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="static")


@app.get("/health")
def health_check():
    """Health check endpoint providing status of service, datasets, and AI configuration."""
    validation = validate_datasets()
    return {
        "status": "healthy" if validation["status"] == "valid" else "degraded",
        "service": "FlowGuard AI",
        "version": "1.0.0",
        "ai_provider": settings.AI_PROVIDER,
        "ai_configured": settings.is_ai_configured,
        "active_model": settings.active_model,
        "datasets": {
            tbl: info.get("status") for tbl, info in validation["tables"].items()
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main.py:app", host=settings.HOST, port=settings.PORT, reload=True)
