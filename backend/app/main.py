import os
from typing import Any

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Import homework modules to trigger registration
import app.homeworks.des  # noqa: F401

from app.homeworks.registry import registry

app = FastAPI(title="ECE 404 Homework Oracle")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "changeme")


def _verify_admin(authorization: str | None) -> None:
    if not authorization or authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(status_code=401, detail="Invalid admin token")


# --- Public endpoints ---


@app.get("/homeworks")
def list_homeworks() -> list[dict[str, Any]]:
    return [hw.to_summary() for hw in registry.list_enabled()]


@app.get("/homeworks/{hw_id}")
def get_homework(hw_id: str) -> dict[str, Any]:
    hw = registry.get(hw_id)
    if hw is None or not hw.enabled:
        raise HTTPException(status_code=404, detail="Homework not found")
    return hw.to_summary()


@app.post("/oracle/{hw_id}")
def run_oracle(hw_id: str, inputs: dict[str, Any]) -> dict[str, Any]:
    hw = registry.get(hw_id)
    if hw is None or not hw.enabled:
        raise HTTPException(status_code=404, detail="Homework not found")
    try:
        result = hw.oracle_function(inputs)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"result": result}


# --- Admin endpoints ---


@app.post("/admin/homeworks/{hw_id}/enable")
def enable_homework(
    hw_id: str, authorization: str | None = Header(default=None)
) -> dict[str, str]:
    _verify_admin(authorization)
    hw = registry.get(hw_id)
    if hw is None:
        raise HTTPException(status_code=404, detail="Homework not found")
    hw.enabled = True
    return {"status": "enabled"}


@app.post("/admin/homeworks/{hw_id}/disable")
def disable_homework(
    hw_id: str, authorization: str | None = Header(default=None)
) -> dict[str, str]:
    _verify_admin(authorization)
    hw = registry.get(hw_id)
    if hw is None:
        raise HTTPException(status_code=404, detail="Homework not found")
    hw.enabled = False
    return {"status": "disabled"}
