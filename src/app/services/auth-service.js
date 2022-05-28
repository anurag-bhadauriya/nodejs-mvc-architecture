const bcrypt = require('bcrypt');
const Tokenizer = require('../modules/tokenizer');
const { RefreshToken } = require('../models');

class AuthService {

    async isPasswordAMatch(attempted, original) {
        return await bcrypt.compare(attempted, original);
    }

    async generateTokens(payload) {
        console.log('PLI: ', payload.id);
        const refreshToken = Tokenizer.generateRefreshToken();

        await RefreshToken.create({
            token: refreshToken,
            userId: payload.id
        });

        return {
            accessToken: Tokenizer.generateAccessToken(payload),
            refreshToken: refreshToken
        };
    }

}

module.exports = new AuthService();