const LogController = require('../../app/controllers/api/log.controller');
const { auth } = require('../../app/middlewares/auth');

module.exports = {
    group: {
        prefix: '/logs',
        middleware: [auth]
    },
    routes: [
        {
            method: 'get',
            path: '/date-list',
            handler: LogController.index
        },
        {
            method: 'get',
            path: '/:date',
            handler: LogController.show
        }
    ]
}