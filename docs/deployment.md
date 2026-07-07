# Deployment Guide

This document describes how to deploy the StadiumVerse AI foundation in production environments.

## 1. Environment Configurations

StadiumVerse AI expects separate configurations for development, staging, and production environments.

### Production Environment Variables Checklist

#### Backend
- `ENV`: Set to `production`
- `PORT`: Server port (default: `8000`)
- `GEMINI_API_KEY`: Production Gemini API key (restricted and monitored via Google Cloud Console).
- `FIREBASE_CREDENTIALS_PATH`: Path to the production service account credentials JSON.
- `ALLOWED_ORIGINS`: JSON array of production frontend domains (e.g., `["https://stadiumverse.ai"]`).

#### Frontend
- `VITE_FIREBASE_API_KEY`: Production Firebase client key.
- `VITE_FIREBASE_PROJECT_ID`: Production project ID.
- `VITE_API_URL`: URL of the production FastAPI backend (e.g., `https://api.stadiumverse.ai`).

---

## 2. Backend Deployment

The backend is built as a standard FastAPI Python application.

### Containerization (Dockerfile Blueprint)
A recommended setup uses Docker to run the backend in a containerized environment (such as Google Cloud Run, AWS Fargate, or Kubernetes):

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 3. Frontend Deployment

The frontend is a static React application built using Vite.

### Build Production Bundle
Run the build script in the `frontend/` directory:
```bash
npm run build
```
This generates a static single-page application inside the `dist/` directory.

### Hosting Solutions
The static files in `dist/` can be deployed to CDN hosting services:
- **Firebase Hosting**: Easily deployed with the Firebase CLI (`firebase deploy --only hosting`).
- **Netlify / Vercel**: Integrated via GitHub repositories.
- **AWS S3 + CloudFront**: For scalable enterprise distribution.
