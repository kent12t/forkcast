// Client helpers: talk to our own API routes (which hold the DB credentials).

async function post(path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return true
  } catch (error) {
    console.error(`Error calling ${path}:`, error)
    return false
  }
}

// Start a new quiz attempt
export const startQuizAttempt = (sessionId: string) =>
  post('/api/quiz/start', { sessionId })

// Complete a quiz attempt
export const completeQuizAttempt = (sessionId: string, personalityType: string) =>
  post('/api/quiz/complete', { sessionId, personalityType })
