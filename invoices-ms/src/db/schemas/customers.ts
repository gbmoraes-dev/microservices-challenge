import { date, pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const customers = pgTable('customers', {
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  address: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  country: text().notNull(),
  dateOfBirth: date({ mode: 'date' }),
})
