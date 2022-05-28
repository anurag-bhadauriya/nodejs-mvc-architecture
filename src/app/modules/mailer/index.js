const mailConfig = require('../../../config/mail');
const DriverManager = require('./lib/driver-manager');

class Mailer {

    constructor(config) {
        this.config = config;
        this.driver = this._determineDriver();
    }

    // Check what kind of driver it needs ie smtp or pop3
    _determineDriver() {
        const connectionType = this.config.connection;
        return DriverManager.driver(connectionType, this.config[connectionType]);
    }

    async send(view, cb) {
        return await this.driver.send(view, cb)
            .then(res => { })
            .catch(err => {
                throw new Error(err.message)
            });
    }
}

module.exports = new Mailer(mailConfig);