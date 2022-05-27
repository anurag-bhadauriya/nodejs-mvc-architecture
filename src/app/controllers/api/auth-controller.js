const InvalidCredentialException = require('../../exceptions/invalid-credentials.exception');
const UserRepository = require('../../repositories/user.repository');
const AuthService = require('../../services/auth-service');

class AuthController {

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

            res.send({ user, ...tokens });
        } catch (err) {
            throw new InvalidCredentialException();
        }

    }

    async register(req, res) {
        res.send('Register');
    }
}

module.exports = new AuthController();