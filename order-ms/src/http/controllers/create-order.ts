import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod/v4'

import { trace } from '@opentelemetry/api'

import { db } from '../../db/client.ts'

import { schema } from '../../db/schemas/index.ts'

import { dispatchOrderCreated } from '../../broker/messages/order-created.ts'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    amount: z.coerce.number().positive(),
  })

  const { amount } = createOrderBodySchema.parse(request.body)

  console.log('✨ Creating order with amount:', amount)

  const [order] = await db
    .insert(schema.orders)
    .values({
      customerId: 'dqmraubpbtoqdwz0w2q2mlct',
      amount,
    })
    .returning()

  trace.getActiveSpan()?.setAttribute('order_id', order.id)

  dispatchOrderCreated({
    orderId: order.id,
    amount,
    customer: {
      id: 'dqmraubpbtoqdwz0w2q2mlct',
    },
  })

  return reply.status(201).send()
}
