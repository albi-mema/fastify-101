const fastify = require("fastify");
const fastifySwagger = require('@fastify/swagger');


const { todosRoute } = require("./routes/todosRoute");

const build = (opts = {},optsSwagger) => {
  const app = fastify(opts);
  app.register(fastifySwagger,optsSwagger);
  app.register(todosRoute);
  return app;
};

module.exports = { build };
