const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')
const fastifyPostgres = require('@fastify/postgres')

const { todosRoute } = require('./routes/todosRoute')
const { todosDbRoute } = require('./routes/db/todosDbRoute')

const build = (opts = {}, optsSwagger = {}, optsPostgres = {}) => {
  const app = fastify(opts)
  app.register(fastifyPostgres, optsPostgres)
  app.register(fastifySwagger, optsSwagger)
  app.register(todosRoute, { prefix: '/v1' })
  app.register(todosDbRoute, { prefix: '/v2' })
  return app
}

module.exports = { build }
