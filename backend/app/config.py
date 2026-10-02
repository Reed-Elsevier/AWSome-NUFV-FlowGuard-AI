import os
from pathlib import Path
from dotenv import load_dotenv

# Search for .env in current working dir or project root
root_dir = Path(__file__).resolve().parent.parent.parent
env_path = root_dir / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

class Settings:
    DATA_ROOT: str = os.getenv("DATA_ROOT", str(root_dir / "data"))
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "anthropic").lower().strip()
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "").strip()
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "").strip()
    AI_MODEL: str = os.getenv("AI_MODEL", "").strip()
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    @property
    def is_ai_configured(self) -> bool:
        if self.AI_PROVIDER == "openai":
            return bool(self.OPENAI_API_KEY)
        return bool(self.ANTHROPIC_API_KEY)

    @property
    def active_model(self) -> str:
        if self.AI_MODEL:
            return self.AI_MODEL
        if self.AI_PROVIDER == "openai":
            return "gpt-4o-mini"
        return "claude-3-5-sonnet-20241022"

settings = Settings()
