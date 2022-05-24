const pageController = require('../../app/controllers/web/page-controller');

module.exports = {
    group: {
        prefix: '/pages'
    },
    routes: [
        {
            method: 'get',
            path: '/',
            handler: pageController.home
        },
        {
            method: 'get',
            path: '/about',
            handler: pageController.about
        },
        {
            method: 'get',
            path: '/contact',
            handler: pageController.contact
        }
    ]
}