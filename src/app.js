const fastify = require("fastify");

const { noteRoute } = require("./routes/noteRoutes");
const { userRoute } = require("./routes/userRoutes");

const build = (opts = {}) => {
  const app = fastify(opts);
  app.register(noteRoute);
  app.register(userRoute);
  return app;
};

module.exports = { build };
