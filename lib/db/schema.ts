import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const hsbPropertyRequirements = pgTable(
  'hsb_property_requirements',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    interest: text('interest').notNull(),
    preferredLocation: text('preferred_location').notNull(),
    budgetRange: text('budget_range'),
    details: text('details'),
    ipHash: text('ip_hash').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('hsb_property_requirements_ip_created_idx').on(table.ipHash, table.createdAt),
    index('hsb_property_requirements_created_idx').on(table.createdAt),
  ],
)
