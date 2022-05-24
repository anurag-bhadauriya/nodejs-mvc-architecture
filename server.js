const Server = require('./src/server/index');

const port = 8080;
const app = new Server(port);
app.start();
