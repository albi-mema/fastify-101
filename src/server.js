const { build } = require("./app");

const app = build(
  {
    logger: true,
  },
  {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Fastify api",
      },
    },
  },
  {
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
  }
);

const todos = require("./todos.json");

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
