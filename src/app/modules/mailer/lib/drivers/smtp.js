const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

class Smtp {
    constructor(config) {
        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            auth: config.auth
        });
        this._setCompiler();
    }

    _setCompiler() {
        this.transporter.use('compile', hbs({
            viewEngine: {
                defaultLayout: false
            },
            viewPath: 'src/views/emails/',
            extName: '.hbs'
        }));
    }

    send(message) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(message, (error, res) => {
                if (error) {
                    console.log(error.message);
                    reject(error);
                }
                else
                    resolve(res);
            });
        });
    }
}

module.exports = Smtp;