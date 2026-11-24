import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 100) {
      return NextResponse.json({ ok: false, error: 'invalid sessionId' }, { status: 400 })
    }
    if (!sql) throw new Error('DATABASE_URL is not set')

    await sql`
      INSERT INTO quiz_results (personality_type, session_id, completed)
      VALUES ('', ${sessionId}, false)
    `
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error starting quiz:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
