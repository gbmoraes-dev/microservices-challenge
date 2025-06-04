import { app } from './app.ts'

import { env } from '../env.ts'

app.listen({ host: env.HOSTNAME, port: env.PORT}).then(() => {
  console.log(`🚀 [ORDERS] HTTP server is running on port ${env.PORT}`)
})
