const login = require('./auth/login');
const register = require('./auth/register');

module.exports = {
    loginRules: login,
    registerRules: register
}