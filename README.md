# StadiumVerse AI

StadiumVerse AI is a next-generation multi-agent AI framework designed to orchestrate stadium operations, crowd safety, fan experiences, and general venue management. This workspace contains the decoupled frontend and backend foundations for the platform.

## Features

- 🤖 **Fan Assistant Chat** — Gemini-powered AI assistant for fan queries.
- 🏟️ **Real-Time Stadium Dashboard** — Live crowd density, parking, weather, and system health.
- 🚶 **Smart Navigation** — AI-assisted gate recommendations and indoor routing.
- 📊 **Crowd Prediction** — Predicts congestion and recommends the best entry gate.
- 🚨 **Emergency Management** — Emergency reporting and live incident monitoring.
- 🌐 **Multi-Agent AI Architecture** — Specialized AI agents for fans, volunteers, operations, emergencies, navigation, and translation.
- ☁️ **Cloud Deployment** — Backend deployed on Render and frontend hosted on Vercel.

## Project Structure

```
stadiumverse-ai/
├── docs/                      # Architectural, API, AI and deployment documents
├── backend/                   # FastAPI backend (Python 3.12)
│   ├── app/                   # Core application logic, routers, and agents
│   └── prompts/               # System instruction prompt files for AI agents
├── frontend/                  # React (Vite) + TypeScript + Tailwind CSS v4 frontend
│   └── src/                   # Source files for views, state, and UI components
├── LICENSE                    # MIT License
└── README.md                  # Root instructions
```

## Quick Start Setup

For detailed instructions on configuration and development setups, refer to the project documentation:
- [Architecture & Design Details](docs/architecture.md)
- [API Spec & Protocol Endpoints](docs/api.md)
- [AI Engine & Multi-Agent Layer Configuration](docs/ai-modules.md)
- [Deployment Guide](docs/deployment.md)

### 1. Prerequisites
- **Node.js**: `v20.x` or later (for Frontend)
- **Python**: `v3.12.x` (for Backend)
- **npm** or yarn package managers

### 2. Backend Installation & Launch
Navigate to the `backend/` directory:
```bash
cd backend
# Create a virtual environment
python -m venv venv
# Activate virtual environment (Windows Powershell)
.\venv\Scripts\Activate.ps1
# Install dependencies
pip install -r requirements.txt
# Copy environment file and configure variables
copy .env.example .env
# Run the FastAPI server in development mode
uvicorn app.main:app --reload --port 8000
```
The interactive Swagger API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Frontend Installation & Launch
Navigate to the `frontend/` directory:
```bash
cd frontend
# Install node packages
npm install
# Copy environment file and configure variables
copy .env.example .env
# Run the React + Vite development server
npm run dev
```
The React frontend will be running at [http://localhost:5173](http://localhost:5173).

## Environment Variable Setup
Ensure you configure the following keys in your backend `.env` file to fully integrate the platform:
- `GEMINI_API_KEY`: API token generated via Google AI Studio.
- `FIREBASE_CREDENTIALS_PATH`: Absolute path to your Firebase Admin SDK service account key JSON file.

On the frontend `.env` file, configure the Firebase Client Web SDK variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Testing, Linting and Formatting

### Frontend
- **Lint**: `npm run lint`
- **Format check**: `npm run format:check` (Fix with `npm run format`)
- **Unit test**: `npm run test`

### Backend
- **Unit test**: `pytest`
- **Lint/Check**: Run standard Python formatters like `black` or `ruff` if installed.
