export interface ChatRequestPayload {
  session_id: string
  message: string
  context?: {
    current_location?: string
    role?: 'fan' | 'volunteer' | 'operator' | string
    [key: string]: any
  }
}

export interface ChatResponsePayload {
  session_id: string
  agent_resolved:
    | 'crowd'
    | 'navigation'
    | 'operations'
    | 'emergency'
    | 'volunteer'
    | 'translation'
    | 'fan'
    | string
  response: string
  actions_triggered: string[]
}

export interface TranslationRequestPayload {
  text: string
  target_language: string
}

export interface TranslationResponsePayload {
  original_text: string
  translated_text: string
  target_language: string
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const AIService = {
  /**
   * Sends a chat message to the AI backend.
   */
  async chat(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    console.log("================================");
    console.log("📤 REQUEST TO BACKEND");
    console.log(payload);
    console.log("================================");

    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      console.error("❌ Backend Error:", errorData)

      throw new Error(
        errorData?.detail || 'Failed to communicate with AI Agents.'
      )
    }

    const data: ChatResponsePayload = await response.json()

    console.log("================================");
    console.log("✅ BACKEND RESPONSE");
    console.log(data);
    console.log("Agent:", data.agent_resolved);
    console.log("================================");

    return data
  },

  /**
   * Translation endpoint.
   */
  async translate(
    payload: TranslationRequestPayload
  ): Promise<TranslationResponsePayload> {
    const response = await fetch(`${API_BASE_URL}/ai/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData?.detail || 'Translation request failed.'
      )
    }

    return await response.json()
  },

  /**
   * Emergency endpoint.
   */
  async reportEmergency(
    payload: ChatRequestPayload
  ): Promise<ChatResponsePayload> {
    console.log("🚨 Emergency Request", payload)

    const response = await fetch(`${API_BASE_URL}/ai/emergency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData?.detail || 'Failed to dispatch emergency services.'
      )
    }

    const data: ChatResponsePayload = await response.json()

    console.log("🚨 Emergency Response", data)

    return data
  },
}

export default AIService