# StadiumVerse AI - Frontend React Client

This is the React client application for StadiumVerse AI, configured with Vite, TypeScript, and Tailwind CSS v4.

## Core Features Setup
- **Decoupled Architecture**: All cognitive agent endpoints and Gemini models are routed exclusively through the FastAPI backend to ensure secret keys and prompts are not exposed client-side.
- **Firebase Web Client**: Firebase Web SDK configuration is established in `src/config/firebase.ts` for managing user authentication and client-side database listeners.
- **Client proxy AI service**: Located in `src/services/ai.ts` to interface with the FastAPI orchestrator.

## Project Structure

- `src/config/firebase.ts`: Firebase Web SDK initializer (Auth, Firestore).
- `src/services/ai.ts`: Client API service wrapper querying backend agent routers.
- `src/components/`: Modular UI component placeholders.
- `src/hooks/`: Custom React lifecycle hooks.
- `src/layouts/`: Shared layout frames.
- `src/types/`: Declared TypeScript types.
- `src/utils/`: Standard helper utilities.
- `tests/`: Automated React component testing suites (Vitest).

## Local Development Setup

### 1. Prerequisites
- Node.js `v20.x` or later
- npm or yarn package manager

### 2. Dependency Setup
```bash
npm install
```

### 3. Environment Setup
Configure the client-side variables by creating a `.env` file:
```bash
copy .env.example .env
```
Ensure `VITE_API_URL` points to your running FastAPI server (e.g. `http://localhost:8000/api/v1`).

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

## Code Quality and Testing

- **Linting**: Run `npm run lint` to trace typescript or styling issues.
- **Autoformatting**: Run `npm run format` to standardise layout using Prettier.
- **Unit Testing**: Run `npm run test` to run Vitest unit test suites.
- **Build compilation**: Run `npm run build` to compile TypeScript and generate production assets.
