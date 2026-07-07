# AI Engine & Multi-Agent Architecture

StadiumVerse AI uses a multi-agent framework designed to delegate user prompts, system events, and sensors to specialized cognitive modules.

## 1. Agent Specialty Directory

The multi-agent cluster contains seven domain-specific agents:

1. **Crowd Agent (`crowd_agent.py`)**
   - **Specialty**: Monitors stadium density, queue times at concession stands, and gate traffic.
   - **Core Flow**: Analyzes incoming telemetry and suggests crowd-control measures or route diversions.

2. **Navigation Agent (`navigation_agent.py`)**
   - **Specialty**: Handles indoor positioning queries, pathfinding, and point-of-interest directions inside the stadium.
   - **Core Flow**: Generates human-friendly route walkthroughs based on spatial data.

3. **Operations Agent (`operations_agent.py`)**
   - **Specialty**: Facilitates staff shift coordination, inventory tracking, facility maintenance, and scheduling.
   - **Core Flow**: Resolves task dispatch requests.

4. **Emergency Agent (`emergency_agent.py`)**
   - **Specialty**: Monitors fire safety, medical emergencies, structural alerts, and security alerts.
   - **Core Flow**: Bypasses soft agent dialogs to push immediate structured responses, alerts, and instructions.

5. **Volunteer Agent (`volunteer_agent.py`)**
   - **Specialty**: Manages volunteer check-ins, tasks assignment updates, and venue information sharing.

6. **Translation Agent (`translation_agent.py`)**
   - **Specialty**: High-fidelity translation of spectator queries and localized audio announcements to international visitors.

7. **Fan Agent (`fan_agent.py`)**
   - **Specialty**: General-purpose fan engagement, trivia, ticket details, seat queries, and dining suggestions.

---

## 2. Orchestration Components

### Agent Router (`app/ai/router.py`)
- Analyzes incoming messages and extracts the user's intent.
- Determines which agent (or sequence of agents) should process the request.
- Falls back to the standard Fan Agent if no specific specialty is resolved.

### Context Assembly (`app/ai/context.py`)
- Gathers real-time context before querying Gemini (e.g. current stadium status, user's seat geolocation, and general notifications).
- Combines this data into the prompt context wrapper.

### Conversational Memory (`app/ai/memory.py`)
- Manages chat history window sizes and summaries.
- Pulls history from Firestore documents to maintain a stateless backend.

### Retrieval-Augmented Generation / RAG (`app/ai/rag.py`)
- Integrates stadium guides, seat map indexes, and FAQ vector data into agent system instructions.
