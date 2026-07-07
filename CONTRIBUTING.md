# Contributing to StadiumVerse AI

Thank you for your interest in contributing to StadiumVerse AI! We welcome contributions of all types: bug fixes, feature proposals, documentation improvements, and more.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs
- Search existing issues to verify the bug has not already been reported.
- Open a new issue with a clear title, description, steps to reproduce, and expected/actual behavior.

### Suggesting Enhancements
- Open an issue explaining the proposed feature, the use case it addresses, and how it fits into the project's overall design.

### Submitting Pull Requests (PRs)
1. Fork the repository and create your branch from `main`.
2. Keep branches small and focused on a single topic. Use descriptive names like `feature/agent-router` or `fix/firebase-config`.
3. Ensure your code complies with project conventions (e.g., Prettier/ESLint rules for frontend, PEP8 conventions for Python backend).
4. Run code linters, formats, and tests before submitting:
   - **Frontend**: `npm run lint` and `npm run format`
   - **Backend**: `pytest`
5. Include unit tests for new behavior.
6. Commit changes with clear, descriptive commit messages.
7. Open a PR pointing to the `main` branch of this repository.

## Development Guidelines

### Git Branching Model
- `main` is the stable development branch.
- `feature/*` for new features and extensions.
- `fix/*` for bug fixes.
- `docs/*` for documentation improvements.

### Commit Messages
Follow semantic commit formatting:
- `feat: add crowd management agent`
- `fix: resolve CORS issue on dev server`
- `docs: update deployment instructions`
- `chore: update node dependency versions`
