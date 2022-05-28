const BaseException = require('./base-exception');
const BAD_REQUEST_MSG = 'Bad Request !';

class BadRequestException extends BaseException {

    constructor(message = BAD_REQUEST_MSG, status = 400) {
        super(message, status);
    }

}
module.exports = BadRequestException;