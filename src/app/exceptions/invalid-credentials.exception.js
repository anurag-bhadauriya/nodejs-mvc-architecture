const BaseException = require('./base-exception');
const INVALID_CREDS = 'Invalid Login credentials !';

class InvalidCredentialException extends BaseException {

    constructor(message = INVALID_CREDS, status = 403) {
        super(message, status);
    }

}
module.exports = InvalidCredentialException;