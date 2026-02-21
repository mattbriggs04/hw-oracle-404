from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable


@dataclass
class InputField:
    name: str
    label: str
    type: str = "text"

    def to_dict(self) -> dict[str, str]:
        return {"name": self.name, "label": self.label, "type": self.type}


@dataclass
class Homework:
    id: str
    title: str
    description: str
    input_schema: list[InputField]
    oracle_function: Callable[[dict[str, Any]], dict[str, Any]]
    enabled: bool = True

    def to_summary(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "input_schema": [f.to_dict() for f in self.input_schema],
        }


class HomeworkRegistry:
    def __init__(self) -> None:
        self._homeworks: dict[str, Homework] = {}

    def register(self, hw: Homework) -> None:
        self._homeworks[hw.id] = hw

    def get(self, hw_id: str) -> Homework | None:
        return self._homeworks.get(hw_id)

    def list_enabled(self) -> list[Homework]:
        return [hw for hw in self._homeworks.values() if hw.enabled]

    def list_all(self) -> list[Homework]:
        return list(self._homeworks.values())


registry = HomeworkRegistry()
