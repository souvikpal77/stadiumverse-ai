import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
JSON_DIR = BASE_DIR / "data" / "json"


def load_json(filename: str):
    file_path = JSON_DIR / filename

    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)