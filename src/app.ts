import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyRateLimit from '@fastify/rate-limit'
import { fastify } from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { appRouter } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: '@nomos-auth',
    signed: false,
  },
})

app.register(fastifyCors, {
  origin: env.WEB_URL,
  credentials: true,
})

app.register(fastifyCookie)

app.register(fastifyRateLimit, {
  max: 15,
  timeWindow: '1 minute',
})

app.register(appRouter)

app.setErrorHandler((error, _request, reply) => {
  // Log se for erro de validação do Zod.
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Houve um erro na validação dos dados.',
      issues: error.format(),
    })
  }

  // Verifica se o erro é de rate limit.
  if (error.statusCode === 429) {
    return reply.status(429).send({
      message: 'Limite de requisições excedido. Tente novamente mais tarde.',
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Devemos usar uma ferramenta de log. Ex: Sentry, Datadog e etc.
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})
