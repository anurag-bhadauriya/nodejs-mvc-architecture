const express = require('express');
const Router = require('../router');
const Scheduler = require('../app/scheduler');
const WebSocket = require('../socket');
const http = require('http');

class Server {

    constructor(port) {
        this.port = port;
        this.app = express();
        this.router = Router;
        this.server = http.createServer(this.app);
    }

    start() {
        this._setupRoutes();
        // this._startScheduler(); // Uncomment to start the schedulers
        this._openWebSocket();
        this._listen();
    }

    _setupRoutes() {
        this.router.create(this.app);
    }

    _startScheduler() {
        Scheduler.scheduleTasks();
    }

    _openWebSocket() {
        const ws = new WebSocket(this.server);
        ws.startListening();
    }

    _listen() {
        this.server.listen(this.port, () => {
            console.log(`Server started at port ${this.port}...`);
        });
    }
}

module.exports = Server;