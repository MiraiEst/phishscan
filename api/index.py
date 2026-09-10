"""Vercel entrypoint for the Flask API."""

from ml_model.app import app

__all__ = ["app"]
