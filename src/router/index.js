const express = require('express');
const _ = require('lodash');
const webRoutes = require('./web/index');

class Router {
    constructor() {
        this.router = express.Router();
        this.webRoutes = webRoutes;
    }

    create(app) {
        // TODO - attach some middleware

        // TODO - attach some routes
        app.get('/', (req, res) => {
            res.send('Server is up & running...');
        });

        // TODO - attach routes via router class
        this._attachWebRoutes();

        // TODO - handle 404 error
        // TODO - handle other exceptions

        // TODO - register this router
        app.use(this.router);
    }

    _attachWebRoutes() {
        this._attachRoutes(this.webRoutes);
    }

    _attachApiRoutes() {
        // this._attachRoutes(this.apiRoutes, '/api');
    }

    /**
     * Attaches the api paths/routes in generic manner
     * @param {*} routeGroups 
     * @param {*} prefix 
     */
    _attachRoutes(routeGroups, prefix = '') {
        _.forEach(routeGroups, ({ group, routes }) => {
            _.forEach(routes, ({ method, path, handler }) => {
                this.router[method](prefix + group.prefix + path, handler);
            });
        });
    }
}

// Singleton pattern since we're returning the object
module.exports = new Router()