const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const webRoutes = require('./web');
const apiRoutes = require('./api');

class Router {
    constructor() {
        this.router = express.Router();
        this.webRoutes = webRoutes;
        this.apiRoutes = apiRoutes;
    }

    create(app) {
        // TODO - attach some middleware
        this._attachMiddlewares();

        // TODO - attach some routes
        app.get('/', (req, res) => {
            res.send('Server is up & running...');
        });

        // TODO - attach routes via router class
        this._attachWebRoutes();
        this._attachApiRoutes();

        // TODO - handle 404 error
        this._handlePageNotFound();

        // TODO - handle other exceptions
        this._handleExceptions();

        // TODO - register this router
        app.use(this.router);
    }

    /**
     * Handles if none of the paths gets matched
     */
    _handlePageNotFound() {
        this.router.all('*', (req, res) => {
            res.status(404).send('Path not found !');
        });
    }

    _handleExceptions() {
        this.router.use((err, req, res, next) => {
            err.statusCode = err.status || 500;
            return res.status(err.statusCode).send({
                message: err.message
            });
        });
    }

    _catchError(route) {
        return (req, res, next) => {
            route(req, res, next).catch((err) => next(err));
        }
    }

    _attachMiddlewares() {
        this.router.use(bodyParser.json());
    }

    _attachWebRoutes() {
        this._attachRoutes(this.webRoutes);
    }

    _attachApiRoutes() {
        this._attachRoutes(this.apiRoutes, '/api');
    }

    /**
     * Attaches the api paths/routes and their middlewares in generic manner
     * @param {*} routeGroups 
     * @param {*} prefix 
     */
    _attachRoutes(routeGroups, prefix = '') {
        _.forEach(routeGroups, ({ group, routes }) => {
            _.forEach(routes, ({ method, path, middleware = [], handler }) => {
                this.router[method](
                    prefix + group.prefix + path,
                    [...group.middleware || [], ...middleware],
                    this._catchError(handler)
                );
            });
        });
    }
}

// Singleton pattern since we're returning the object
module.exports = new Router()