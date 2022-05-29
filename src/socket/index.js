const ws = require('ws');
const Tokenizer = require('../app/modules/tokenizer');
const sockets = [];

class WebSocket {

    constructor(server) {
        this.server = server;
        this.ws = new ws.Server({ 'noServer': true });

        this._ping();
        this._handleUpgrade();
    }

    _handleUpgrade() {
        this.server.on('upgrade', (request, socket, head) => {
            const id = Tokenizer.generateRandomToken();

            this.ws.handleUpgrade(request, socket, head, (socket) => {
                socket.id = id;
                sockets.push(socket);
                this.ws.emit('connection', socket);
            });
        });
    }

    _ping() {
        setInterval(() => {
            console.log(`WebSocket clients count: ${this.ws.clients.size}`);
            for (const client of this.ws.clients) {
                if (client.isAlive === false)
                    return client.terminate();
                client.isAlive = false;
                client.ping()
            }
        }, 2000);
    }

    startListening() {
        this.ws.on('connection', (socket) => {
            socket.on('message', (message) => {
                for (const elem of sockets) {
                    elem.send(message);
                }
            });

            socket.on('pong', () => {
                socket.isAlive = true;
            });
        });
    }
}

module.exports = WebSocket;