require('dotenv').config();

module.exports = {
    appKey: process.env.APP_KEY,
    appEnv: process.env.NODE_ENV,
    tokenExpiresIn: 3600
}