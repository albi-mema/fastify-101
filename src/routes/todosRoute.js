let todos = require('../todos.json')
const {
  putTODOopts,
  deleteTODOopts,
  postTODOopts,
  getTODOsOpts,
  getTODOOpts
} = require('../schemas/schema')

const todosRoute = (fastify, options, done) => {
  fastify.get('/', getTODOsOpts, function (request, reply) {
    reply.send(todos)
  })

  fastify.get('/:id', getTODOOpts, (request, reply) => {
    const id = request.params
    const todo = todos.find((todo) => todo.id === id)

    reply.send(todo)
  })

  fastify.get('/done', getTODOsOpts, (request, reply) => {
    const todo = todos.filter((todo) => todo.status === true)
    reply.send(todo)
  })

  fastify.get('/not_done', getTODOsOpts, (request, reply) => {
    reply.send(todos.filter((todo) => todo.status === false))
  })

  fastify.post('/', postTODOopts, (request, reply) => {
    const { content } = request.body
    const item = { id: todos.length + 1, status: false, content }
    todos.push(item)
    reply.code(201).send(item)
  })

  fastify.delete('/:id', deleteTODOopts, (request, reply) => {
    const { id } = request.params
    todos = todos.filter((todo) => todo.id !== id)
    reply.send(`Item ${id} was removed!`)
  })

  fastify.put('/:id', putTODOopts, (request, reply) => {
    const { id } = request.params
    const { status, content } = request.body
    const todo = todos.find((item) => item.id === id)
    todo.status = status
    todo.content = content

    reply.send(todo)
  })

  done()
}

module.exports = { todosRoute }
