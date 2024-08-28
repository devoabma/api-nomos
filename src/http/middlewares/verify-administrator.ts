import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyAdministrator(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== roleToVerify) {
      return reply.status(401).send({
        message: 'Acesso não autorizado, somente administradores ❌',
      })
    }
  }
}
