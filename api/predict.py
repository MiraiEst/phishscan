"""Vercel function exposed at /api/predict."""

from ml_model.app import app

__all__ = ["app"]
