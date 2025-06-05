import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const invoices = pgTable('invoices', {
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  orderId: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
