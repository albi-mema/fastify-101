/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  putTODOopts,
  deleteTODOopts,
  postTODOopts,
  getTODOsOpts,
  getTODOOpts
} = require('./../../schemas/schema')

const todosDbRoute = async (fastify, options, done) => {
  fastify.post('/', postTODOopts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { content } = request.body
      const { rows } = await fastify.pg.query(
        'INSERT INTO todos  (status, content) VALUES ($1, $2) RETURNING *',
        [false, content]
      )
      reply.code(201).send(rows[0])
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.get('/', getTODOsOpts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { rows } = await fastify.pg.query('SELECT * FROM todos')
      reply.code(201).send(rows)
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.get('/:id', getTODOOpts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const { rows } = await fastify.pg.query(
        'SELECT * FROM todos WHERE id = $1',
        [id]
      )
      reply.code(201).send(rows[0])
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.get('/done', getTODOsOpts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE status = 'true'"
      )
      reply.code(201).send(rows)
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.get('/not_done', getTODOsOpts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE status = 'false'"
      )
      reply.code(201).send(rows)
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.delete('/:id', deleteTODOopts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const { rows } = await fastify.pg.query(
        'DELETE FROM todos WHERE id = $1',
        [id]
      )
      reply.send(`The element with id ${id} was removed.`)
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  fastify.put('/:id', putTODOopts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const { status, content } = request.body
      const { rows } = await fastify.pg.query(
        'UPDATE todos SET status = $2,content = $3 WHERE id = $1 RETURNING *',
        [id, status, content]
      )
      reply.code(201).send(rows[0])
    } catch (err) {
      reply.send(err)
    } finally {
      client.release()
    }
  })

  done()
}

module.exports = { todosDbRoute }
