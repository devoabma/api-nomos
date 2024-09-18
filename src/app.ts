import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { env } from './env'
import { appRouter } from './http/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

// Processo de transformação dos dados de entrada e saída das rotas da aplicação.
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Nomos',
      description:
        'API privada do sistema de solicitações feitas pelos advogados ao Inss Digital GERID.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: env.WEB_URL,
  credentials: true,
})

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
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

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Devemos usar uma ferramenta de log. Ex: Sentry, Datadog e etc.
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})
