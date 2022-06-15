notes = require("../notes.json");

const userRoute = (fastify, options, done) => {
  fastify.get("/users", (req, reply) => {
    const users = notes.map((note) => note.first_name);
    return users;
  });

  fastify.get("/users/:first_name", (req, reply) => {
    const first_name = req.params.first_name;
    const note = notes.find((note) => note.first_name === first_name);
    return note;
  });

  done();
};

module.exports = { userRoute };
