notes = require("../notes.json");

const noteRoute = (fastify, options, done) => {
  fastify.get("/notes", function (req, reply) {
    return notes;
  });

  fastify.get("/notes/:id", (req, reply) => {
    const id = parseInt(req.params.id);
    const note = notes.find((note) => note.id === id);
    return note;
  });

  done();
};

module.exports = { noteRoute };
