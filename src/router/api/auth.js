const AuthController = require('../../app/controllers/api/auth.controller');
const { validate } = require('../../app/middlewares/validate');
const ValidationRules = require('../../app/validators');

module.exports = {
    group: {
        prefix: '/auth'
    },
    routes: [
        {
            method: 'post',
            path: '/login',
            middleware: [ValidationRules.loginRules, validate],
            handler: AuthController.login
        },
        {
            method: 'post',
            path: '/register',
            middleware: [ValidationRules.registerRules, validate],
            handler: AuthController.register
        }
    ]
}