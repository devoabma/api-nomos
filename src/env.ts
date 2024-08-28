import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  // coerce => Busca algum dado e converte para um formato dele.
  PORT: z.coerce.number().default(3891),
  DATABASE_URL: z.string().url(),
  API_PROTHEUS: z.string().url(),
  SECURITY_CODE: z.string(),
  RESEND_API_KEY: z.string(),
  JWT_SECRET: z.string(),
})

// safeParse => Tenta fazer a validação para saber se existem essas informações das variáveis.
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Variáveis de ambiente inválidas.', _env.error.format())

  throw new Error('❌ Variáveis de ambiente inválidas.')
}

export const env = _env.data
