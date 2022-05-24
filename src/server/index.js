const express = require('express');
const Router = require('../router/index');

class Server {

    constructor(port) {
        this.port = port;
        this.app = express();
        this.router = Router;
    }

    start() {
        this._setupRoutes();
        this._listen();
    }

    _setupRoutes() {
        this.router.create(this.app);
    }

    _listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started at port ${this.port}...`);
        });
    }
}

module.exports = Server;