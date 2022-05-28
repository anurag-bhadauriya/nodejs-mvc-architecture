const mailDrivers = require('./drivers');
const Sender = require('./sender');

class DriverManager {

    driver(name, configution) {
        const driver = mailDrivers[name];
        return new Sender(new driver(configution));
    }
}

module.exports = new DriverManager();