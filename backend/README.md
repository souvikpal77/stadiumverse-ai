# StadiumVerse AI - Backend API Services

This is the FastAPI backend application that orchestrates stadium workflows, multi-agent AI systems, and interacts securely with Google Gemini API and Firebase Firestore.

## Directory Layout

- `app/main.py`: FastAPI server setup with middlewares and routers.
- `app/core/config.py`: Environment configuration management using Pydantic Settings.
- `app/api/`: Versioned API routers and handlers.
- `app/ai/`: Cognitive orchestration logic including memory, context-bundling, RAG, and agent routing.
- `app/agents/`: Specific agent instances (e.g. crowd agent, translation agent, fan agent).
- `app/services/`: Client integrations for external APIs (Firebase, Gemini).
- `prompts/`: Template system instructions for AI agents.
- `tests/`: Automated unit and integration tests.

## Local Setup

### 1. Environment Requirements
- Python `v3.12.x`
- Pip package manager

### 2. Dependency Installation
Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows Powershell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Setup Configuration
Generate a `.env` file from the template:
```bash
copy .env.example .env
```
Fill in the `GEMINI_API_KEY` and the path to `FIREBASE_CREDENTIALS_PATH`.

### 4. Running the Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
- Interactive docs will be served at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
- Alternative Redoc served at [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc).

## Running Tests
To run backend automated test suites:
```bash
pytest
```
