const todosDbRoute = async (fastify, options, done) => {
  fastify.post("/", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { status, content } = request.body;
      const { rows } = await fastify.pg.query(
        "INSERT INTO todos  (status, content) VALUES ($1, $2) RETURNING *",
        [false, content]
      );
      reply.code(201).send(rows[0]);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.get("/", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { rows } = await fastify.pg.query("SELECT * FROM todos");
      reply.code(201).send(rows);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.get("/:id", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { id } = request.params;
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE id = $1",
        [id]
      );
      reply.code(201).send(rows[0]);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.get("/finished", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE status = 'true'"
      );
      reply.code(201).send(rows);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.get("/unfinished", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE status = 'false'"
      );
      reply.code(201).send(rows);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { id } = request.params;
      const { rows } = await fastify.pg.query(
        "DELETE FROM todos WHERE id = $1",
        [id]
      );
      reply.send(`The element with id ${id} was removed.`);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  fastify.put("/:id", async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { id } = request.params;
      const { status, content } = request.body;
      const { rows } = await fastify.pg.query(
        "UPDATE todos SET status = $2,content = $3 WHERE id = $1 RETURNING *",
        [id, status, content]
      );
      reply.code(201).send(rows[0]);
    } catch (err) {
      reply.send(err);
    } finally {
      client.release();
    }
  });

  done();
};

module.exports = { todosDbRoute };
