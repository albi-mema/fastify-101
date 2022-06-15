const { build } = require("./app");
const app = build({ logger: true });
const notes = require("./notes.json");

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
