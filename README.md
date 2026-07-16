# 🏟 StadiumVerse AI

> **The AI Operating System for Smart Stadiums**  
> **FIFA World Cup 2026 | GenAI Hackathon Project**

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![GitHub Actions](https://img.shields.io/github/actions/workflow/status/souvikpal77/stadiumverse-ai/ci.yml?branch=main)
![License](https://img.shields.io/badge/License-MIT-success)

---

# 🌍 Live Demo

### 🚀 Frontend

https://stadiumverse-ai-alpha.vercel.app

### ⚙ Backend API

https://stadiumverse-ai.onrender.com

---

# 📖 Overview

StadiumVerse AI is a next-generation **AI-powered Smart Stadium Operating System** built for the **FIFA World Cup 2026 Hackathon**.

The platform leverages **Generative AI**, **predictive analytics**, and a **multi-agent architecture** to enhance stadium operations, crowd safety, emergency response, fan engagement, and venue intelligence.

Rather than functioning as a single chatbot, StadiumVerse AI acts as an intelligent operating system where specialized AI agents collaborate to support fans, volunteers, organizers, and stadium operators in real time.

---

# ✨ Key Features

### 🤖 AI Fan Assistant

Gemini-powered conversational assistant that answers stadium-related questions using natural language.

### 🏟 Live Smart Stadium Dashboard

Displays live operational insights including:

- Crowd density
- Parking availability
- Weather
- Stadium health
- Active alerts

### 🚶 Smart Indoor Navigation

- AI-powered gate recommendation
- Route optimization
- Crowd-aware navigation

### 📊 Crowd Prediction

Predicts congestion before it occurs and recommends the safest entry routes.

### 🚨 Emergency Management

Supports:

- Live emergency alerts
- Incident monitoring
- AI evacuation recommendations
- Gate rerouting

### 🌐 Multi-Agent AI

Dedicated AI agents for:

- Fan Assistance
- Navigation
- Crowd Intelligence
- Emergency Operations
- Volunteers
- Translation
- Stadium Operations

### ☁ Cloud Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Automated testing using **GitHub Actions**

---

# 🏗 Architecture

The system follows a modular architecture consisting of:

```
React Frontend
        │
        ▼
 FastAPI Backend
        │
        ▼
 AI Service Layer
        │
 ├── Fan Agent
 ├── Navigation Agent
 ├── Crowd Agent
 ├── Emergency Agent
 ├── Volunteer Agent
 ├── Translation Agent
 └── Operations Agent
        │
        ▼
 Gemini AI + Firebase
```

Detailed architecture is available in:

- docs/architecture.md

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest

## Backend

- FastAPI
- Python 3.12
- Gemini AI
- Firebase
- REST API
- Pytest

## DevOps

- GitHub Actions
- Render
- Vercel
- Git

---

# 🤖 AI Agents

| Agent | Responsibility |
|--------|---------------|
| 🎫 Fan Assistant | Fan support & FAQs |
| 🧭 Navigation Agent | Smart routing |
| 👥 Crowd Agent | Crowd monitoring & prediction |
| 🚨 Emergency Agent | Incident management |
| 🙋 Volunteer Agent | Volunteer coordination |
| 🌍 Translation Agent | Multilingual assistance |
| ⚙ Operations Agent | Stadium monitoring |

---

# 📂 Project Structure

```
stadiumverse-ai/
│
├── backend/
│   ├── app/
│   ├── prompts/
│   ├── tests/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── tests/
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── ai-modules.md
│   └── deployment.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── LICENSE
└── README.md
```

---

# 🚀 Quick Start

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

copy .env.example .env

uvicorn app.main:app --reload --port 8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

copy .env.example .env

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔑 Environment Variables

## Backend

```
GEMINI_API_KEY=

FIREBASE_CREDENTIALS_PATH=
```

## Frontend

```
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
```

---

# 🧪 Testing

## Backend

```bash
pytest
```

✅ 13 Passing Tests

---

## Frontend

```bash
npm run test
```

✅ Component Tests using Vitest

---

## Continuous Integration

Every push automatically runs:

- Backend Tests
- Frontend Tests
- GitHub Actions CI

---

# 📚 Documentation

Detailed documentation is available inside the **docs/** folder.

- Architecture
- API
- AI Modules
- Deployment Guide

---

# 📸 Screenshots

> *(Add screenshots here before final submission)*

- Dashboard
- AI Assistant
- Smart Navigation
- Crowd Prediction
- Emergency Simulation
- Parking Dashboard

---

# 👨‍💻 Developer

**Souvik Pal**

B.Tech CSE (IoT, Cybersecurity & Blockchain)

Institute of Engineering & Management, Kolkata

GitHub

https://github.com/souvikpal77

LinkedIn

https://www.linkedin.com/in/souvik-pal-182453388

---

# 📜 License

This project is licensed under the **MIT License**.