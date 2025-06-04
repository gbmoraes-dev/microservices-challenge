import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

import { customers } from './customers.ts'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'canceled'
])

export const orders = pgTable('orders', {
  id: text().$defaultFn(() => createId()).primaryKey(),
  customerId: text().notNull().references(() => customers.id),
  amount: integer().notNull(),
  status: orderStatusEnum().notNull().default('pending'),
  createdAt: timestamp().defaultNow().notNull(),
})
