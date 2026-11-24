// Usage: DATABASE_URL=... node scripts/import-quiz-results.mjs path/to/quiz_results.csv
// Imports a Supabase CSV export of `quiz_results` into Neon, preserving ids and timestamps.
import { readFileSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'

const [, , file] = process.argv
if (!file || !process.env.DATABASE_URL) {
  console.error('Usage: DATABASE_URL=... node scripts/import-quiz-results.mjs <csv>')
  process.exit(1)
}

// Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines in quotes).
function parseCsv(text) {
  const rows = []
  let row = [], field = '', inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQ = false
      else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some(v => v !== '')) rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

const [header, ...data] = parseCsv(readFileSync(file, 'utf8').replace(/^﻿/, ''))
const records = data.map(r => {
  const o = Object.fromEntries(header.map((h, i) => [h.trim(), r[i]]))
  return {
    id: Number(o.id),
    created_at: o.created_at || null,
    completed_at: o.completed_at || null,
    personality_type: o.personality_type ?? '',
    session_id: o.session_id,
    completed: ['true', 't', '1'].includes(String(o.completed).trim().toLowerCase()),
  }
})

const sql = neon(process.env.DATABASE_URL)
await sql.query(
  `INSERT INTO quiz_results (id, created_at, completed_at, personality_type, session_id, completed)
   SELECT id, COALESCE(created_at, now()), completed_at, personality_type, session_id, completed
   FROM json_to_recordset($1::json) AS t(
     id bigint, created_at timestamptz, completed_at timestamptz,
     personality_type text, session_id text, completed boolean)
   ON CONFLICT (id) DO UPDATE SET
     created_at = EXCLUDED.created_at, completed_at = EXCLUDED.completed_at,
     personality_type = EXCLUDED.personality_type, session_id = EXCLUDED.session_id,
     completed = EXCLUDED.completed`,
  [JSON.stringify(records)]
)
await sql.query(`SELECT setval(pg_get_serial_sequence('quiz_results','id'), COALESCE((SELECT MAX(id) FROM quiz_results), 1))`)
const [{ count }] = await sql.query('SELECT count(*) FROM quiz_results')
console.log(`Imported ${records.length} rows; table now has ${count}.`)
