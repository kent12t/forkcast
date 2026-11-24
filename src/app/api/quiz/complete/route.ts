import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { sessionId, personalityType } = await req.json()
    if (
      typeof sessionId !== 'string' || !sessionId || sessionId.length > 100 ||
      typeof personalityType !== 'string' || !personalityType || personalityType.length > 100
    ) {
      return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 })
    }
    if (!sql) throw new Error('DATABASE_URL is not set')

    await sql`
      UPDATE quiz_results
      SET personality_type = ${personalityType},
          completed = true,
          completed_at = now()
      WHERE session_id = ${sessionId} AND completed = false
    `
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error completing quiz:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
