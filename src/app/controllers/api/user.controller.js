const UserRepository = require('../../repositories/user.repository');

class UserController {

    async getAllUsers(req, res) {
        const users = await UserRepository.getAll();
        res.send(users);
    }

    async findUserById(req, res) {
        const id = req.params.id;
        const user = await UserRepository.findById(id);
        res.send(user);
    }
}

module.exports = new UserController();