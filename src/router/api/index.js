const authRoutes = require('./auth');
const userRoutes = require('./user');
const productRoutes = require('./product');

module.exports = [
    authRoutes,
    userRoutes,
    productRoutes
]