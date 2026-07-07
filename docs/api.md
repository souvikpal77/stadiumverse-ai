# API Specifications

This document defines the REST API design conventions, response payloads, error-handling behaviors, and structural routes for StadiumVerse AI.

## 1. Global Conventions

- **Base Path**: `/api/v1`
- **Content-Type**: `application/json`
- **Response Format**: Standard JSON structures, utilizing HTTP status codes to communicate outcome.

### Generic Error Payload
If an API call fails, the response will follow this schema:
```json
{
  "detail": {
    "error_code": "INVALID_PARAMETERS",
    "message": "A descriptive error message specifying what failed.",
    "fields": {
      "session_id": "Field is required"
    }
  }
}
```

## 2. API Endpoint Blueprints

### Health Assessment
Check backend availability and dependencies (Firestore connector & Gemini API key configuration).

- **Route**: `GET /api/v1/health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-07-07T07:55:00Z",
    "services": {
      "firebase": "connected",
      "gemini_api": "configured"
    }
  }
```

### Multi-Agent Interaction Dispatcher
Send message payloads to the central orchestrator router, which delegates tasks to individual specialized agents.

- **Route**: `POST /api/v1/ai/chat`
- **Request Body**:
  ```json
  {
    "session_id": "string (UUID v4 or Firestore document ID)",
    "message": "string (raw user input message)",
    "context": {
      "current_location": "string (optional)",
      "role": "fan | volunteer | operator"
    }
  }
  ```
- **Response**:
  ```json
  {
    "session_id": "string",
    "agent_resolved": "crowd | navigation | operations | emergency | volunteer | translation | fan",
    "response": "string (AI generated response)",
    "actions_triggered": []
  }
  ```

### Specialized Operations Routes
Direct invocation points for specific operations (e.g. submitting translation requests or reporting emergencies).

- **Route**: `POST /api/v1/ai/translate`
- **Request Body**:
  ```json
  {
    "text": "string",
    "target_language": "string"
  }
  ```

- **Route**: `POST /api/v1/ai/emergency`
  - Instantly bypasses basic conversational reasoning to coordinate direct security alerts.
