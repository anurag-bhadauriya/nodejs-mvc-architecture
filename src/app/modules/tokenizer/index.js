const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const appConfig = require('../../../config/app-config');

class Tokenizer {
    constructor(appConfig) {
        this.config = appConfig;
    }

    generateAccessToken(user) {
        return jwt.sign(user, this.config.appKey, { expiresIn: this.config.tokenExpiresIn });
    }

    generateRefreshToken(length = 40) {
        return this.generateRandomToken(length);
    }

    generateRandomToken(length = 40) {
        return crypto.randomBytes(length).toString('hex');
    }
}

module.exports = new Tokenizer(appConfig);