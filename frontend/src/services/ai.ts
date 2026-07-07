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
  agent_resolved: 'crowd' | 'navigation' | 'operations' | 'emergency' | 'volunteer' | 'translation' | 'fan' | string
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const AIService = {
  /**
   * Conveys fan/staff queries to the backend AI agent router.
   */
  async chat(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.detail || 'Failed to communicate with AI Agents.')
    }

    return response.json()
  },

  /**
   * Directly routes a text string to the backend's translation agent.
   */
  async translate(payload: TranslationRequestPayload): Promise<TranslationResponsePayload> {
    const response = await fetch(`${API_BASE_URL}/ai/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.detail || 'Translation request failed.')
    }

    return response.json()
  },

  /**
   * Emergency escalation route bypassing soft conversation rules.
   */
  async reportEmergency(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    const response = await fetch(`${API_BASE_URL}/ai/emergency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.detail || 'Failed to dispatch emergency services.')
    }

    return response.json()
  },
}
export default AIService
