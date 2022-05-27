const BaseRepository = require("./base.repository");
const { User } = require('../models');

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async findByEmail(value) {
        return this.findBy({ column: 'email', value: value });
    }
}

module.exports = new UserRepository(User);