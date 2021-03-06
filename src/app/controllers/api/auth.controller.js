const BadRequestException = require('../../exceptions/bad-request.exception');
const InvalidCredentialException = require('../../exceptions/invalid-credentials.exception');
const UserRepository = require('../../repositories/user.repository');
const AuthService = require('../../services/auth-service');
const nodemailer = require('nodemailer');
const mailConfig = require('../../../config/mail');
const Mail = require('../../modules/mailer');
const logger = require('../../modules/logger');

class AuthController {

    constructor() { }

    async login(req, res) {
        const { email, password } = req.body;
        const queryObject = { column: 'email', value: email };

        try {
            const user = await UserRepository.findBy(queryObject);
            if (!await AuthService.isPasswordAMatch(password, user.password)) {
                throw new Error();
            }
            const payload = {
                id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName
            };
            const tokens = await AuthService.generateTokens(payload);

            res.send(parsedResponse(user, tokens));
        } catch (err) {
            throw new InvalidCredentialException();
        }

    }

    async register(req, res) {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        try {
            const user = await UserRepository.create(data);
            const token = await AuthService.generateTokens({ id: user.id });

            // Uncomment below code to send mail while registering a user

            // await Mail.send('user-registration-template', (message) => {
            //     message
            //         .from(mailConfig.from)
            //         .to(data.email)
            //         .subject(`Account creation confirmation.`)
            //         .with({
            //             firstName: data.firstName,
            //             lastName: data.lastName,
            //             email: data.email
            //         });
            // });

            res.send(parsedResponse(user, token));
        } catch (e) {
            logger.error('AuthController | register | ', e);
            throw new BadRequestException(e);
        }
    }


}

const parsedResponse = (user, tokens) => {
    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        ...tokens
    }
}

module.exports = new AuthController();