import { neon } from '@neondatabase/serverless'

// Server-only: DATABASE_URL must never be exposed to the browser.
const databaseUrl = process.env.DATABASE_URL

export const sql = databaseUrl ? neon(databaseUrl) : null
