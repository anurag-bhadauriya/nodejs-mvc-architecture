const authRoutes = require('./auth');
const userRoutes = require('./user');
const productRoutes = require('./product');
const logRoutes = require('./log');

module.exports = [
    authRoutes,
    userRoutes,
    productRoutes,
    logRoutes
]