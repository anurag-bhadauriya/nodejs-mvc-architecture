'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        underscored: true,
        tableName: 'users',
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword

        }
    });
    return User;
};

/**
 * Change the password from text to hashed version
 * @param {*} user 
 * @returns user with the hashed password if the password is updated
 */
const hashPassword = async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    return user;
}