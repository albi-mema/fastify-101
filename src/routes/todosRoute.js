let todos = require("../todos.json");

const itemSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    status: { type: "boolean" },
    content: { type: "string" }
  },
};

const getTODOsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: { itemSchema },
      },
    },
  },
};

const getTODOOpts = {
  schema: {
    response: {
      200: itemSchema 
    },
  },
};


const postTODOopts ={
  schema:{
    response:{
      201:{
        id: { type: "integer" },
        status: { type: "boolean" },
        content: { type: "string" }
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
    const todo = todos.find((todo) => todo.id === id)
    
    reply.send(todo)
  });

  fastify.get("/finished", getTODOsOpts, (request, reply) => {
    const todo = todos.filter((todo) => todo.status == true) 
    reply.send(todo);
  });

  fastify.get("/unfinished", getTODOsOpts, (request, reply) => {
    reply.send(todos.filter((todo) => todo.status == false));
  });

  fastify.post("/",postTODOopts,(request,response) => {
    const {id,status,content} = request.body
    const item = {id:todos.length + 1,"status":false,content}
    todos.push(item)
    reply.code(201).send(item)
  })

  done();
};

module.exports = { todosRoute };















