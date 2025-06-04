import type { FastifyInstance } from 'fastify'

import { createOrder } from '../create-order.ts'
import { z } from 'zod'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/orders', {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      })
    }
  }, createOrder)
}
