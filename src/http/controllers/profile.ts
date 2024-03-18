import { FastifyReply, FastifyRequest } from "fastify"

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
  } catch (error) {
    throw error
  }

  return reply.status(200).send()
}
