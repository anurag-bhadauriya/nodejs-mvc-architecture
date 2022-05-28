const _ = require('lodash');
const jwt = require('jsonwebtoken');
const appConfig = require('../../config/app-config');
const AuthenticationFailedException = require('../exceptions/authentication-failed.exception');
const UserRepository = require('../repositories/user.repository');
/**
 * Authorization middleware for each request
 * 1. Check the authorization header & token availability
 * 2. Check if the token is valid ( Not been altered by user): done using jwt.verify
 * 3. Check if the user which is encoded in token is available in database
 */
exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = !_.isUndefined(authHeader) && authHeader.split(' ')[1];

    if (!token) {
        return next(new AuthenticationFailedException());
    }

    await jwt.verify(token, appConfig.appKey, async (err, payload) => {
        if (err)
            return next(new AuthenticationFailedException(`The authentication token is invalid!`));

        try {
            const authUser = await UserRepository.findById(payload.id);
            // Set this user so that it will be available in the controller functions 
            req.user = authUser;
            next();
        } catch (e) {
            return next(new AuthenticationFailedException(`User not found!`, 401));
        }
    });
}