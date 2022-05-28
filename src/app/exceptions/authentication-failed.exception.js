const BaseException = require('./base-exception');
const INVALID_CREDS = 'You need to be authenticated to perform this action!';

class AuthenticationFailedException extends BaseException {

    constructor(message = INVALID_CREDS, status = 403) {
        super(message, status);
    }

}
module.exports = AuthenticationFailedException;