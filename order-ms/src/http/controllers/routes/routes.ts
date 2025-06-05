import type { FastifyInstance } from 'fastify'

import { z } from 'zod/v4'

import { createOrder } from '../create-order.ts'

export async function orderRoutes(app: FastifyInstance) {
  app.post(
    '/orders',
    {
      schema: {
        body: z.object({
          amount: z.coerce.number(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    createOrder,
  )
}
