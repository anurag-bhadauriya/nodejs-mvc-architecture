const UserController = require("../../app/controllers/api/user.controller");

module.exports = {
    group: {
        prefix: '/user'
    },
    routes: [
        {
            method: 'get',
            path: '/:id',
            handler: UserController.findUserById
        },
        {
            method: 'get',
            path: '/',
            handler: UserController.getAllUsers
        }
    ]
}