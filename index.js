const server = require("./api/server");
const port = 4000;

server.listen(port, () => console.log(`\n** Running on port ${port}**\n`));
