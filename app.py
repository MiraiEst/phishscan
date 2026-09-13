"""Root entrypoint used by Vercel for the Flask backend."""

from ml_model.app import app

__all__ = ["app"]
