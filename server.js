require('module-alias/register');
const Server = require('@root/src/server');

const port = 8080;
const app = new Server(port);
app.start();
