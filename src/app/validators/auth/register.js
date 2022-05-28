const { body } = require('express-validator');

module.exports = (() => {
    return [

        body('firstName')
            .notEmpty()
            .withMessage('First Name cannot be empty !'),

        body('lastName')
            .notEmpty()
            .withMessage('Last Name cannot be empty  !'),

        body('email')
            .isEmail()
            .withMessage('Email needs to be a valid address !'),

        body('password')
            .notEmpty()
            .withMessage('Password field can not be empty')
    ]
})()