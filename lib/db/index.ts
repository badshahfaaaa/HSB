import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const globalForDatabase = globalThis as typeof globalThis & {
  hsbPool?: Pool
  hsbDatabase?: ReturnType<typeof drizzle<typeof schema>>
}

const pool =
  globalForDatabase.hsbPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 5_000,
  })

export const db = globalForDatabase.hsbDatabase ?? drizzle(pool, { schema })

if (process.env.NODE_ENV !== 'production') {
  globalForDatabase.hsbPool = pool
  globalForDatabase.hsbDatabase = db
}
