const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/app-config');
const InvalidCredentialException = require('../../exceptions/invalid-credentials.exception');
const UserRepository = require('../../repositories/user.repository');

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;
        const queryObject = { column: 'email', value: email };
        const user = await UserRepository.findBy(queryObject);
        // const user = await UserRepository.findByEmail(email);

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new InvalidCredentialException();
        }
        const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
        // const signingKey = require('crypto').randomBytes(64).toString('hex');
        const appKey = config.appKey;
        const accessToken = jwt.sign(payload, appKey, { expiresIn: config.tokenExpiresIn });

        res.send({ user, ...{ accessToken } });
    }

    async register(req, res) {
        res.send('Register');
    }
}

module.exports = new AuthController();