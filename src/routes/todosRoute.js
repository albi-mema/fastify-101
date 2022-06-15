let todos = require("../todos.json");


const getTODOsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items:{
          type: "object",
          properties: {
            id: { type: "integer" },
            status: { type: "boolean" },
            content: { type: "string" }
          },
        },
      },
    },
  },
};

const getTODOOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "integer" },
          status: { type: "boolean" },
          content: { type: "string" }
        },
      },
    },
  },
};


const postTODOopts ={
  schema:{
    response:{
      201:{
        type: "object",
        properties: {
          id: { type: "integer" },
          status: { type: "boolean" },
          content: { type: "string" }
        },
      },
    }
  }
}


const deleteTODOopts ={
  schema:{
    response:{
      201:{
        type: "object",
        properties:{ 
          message:{ type:"string"}
        }
      },
    }
  }
}






const todosRoute = (fastify, options, done) => {
  
  fastify.get("/", getTODOsOpts, function (request, reply) {
    reply.send(todos);
  });

  fastify.get("/:id", getTODOOpts, (request, reply) => {
    const { id } = request.params
    const todo = todos.find((todo) => todo.id == id)
    
    reply.send(todo)
  });

  fastify.get("/finished", getTODOsOpts, (request, reply) => {
    const todo = todos.filter((todo) => todo.status == true) 
    reply.send(todo);
  });

  fastify.get("/unfinished", getTODOsOpts, (request, reply) => {
    reply.send(todos.filter((todo) => todo.status == false));
  });

  fastify.post("/",postTODOopts,(request,reply) => {
    const {id,status,content} = request.body
    const item = {id:todos.length + 1,"status":false,content}
    todos.push(item)
    reply.code(201).send(item)
  })

  fastify.delete("/:id",deleteTODOopts,(request,reply) => {
    const {id} = request.params
    todos = todos.filter((todo) => todo.id != id )
    reply.send(`Item ${id} was removed!`)
  })

  fastify.put("/:id",(request, reply) => {
    const {id} = request.params
    const {status,content} = request.body
    const todo = todos.find((item) => item.id == id)
    todo.status = status
    todo.content = content

    reply.send(todo)
  })

  done();
};

module.exports = { todosRoute };















