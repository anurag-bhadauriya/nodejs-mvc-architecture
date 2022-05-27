const ModelNotFoundException = require("../exceptions/model-not-found.exception");

class BaseRepository {

    constructor(model) {
        this.model = model;
    }

    async findBy({ column, value }) {
        const where = {};
        where[column] = value;
        const record = await this.model.findOne({
            where: where
        });
        if (!record) {
            throw new ModelNotFoundException(this.model.name);
        }
        return record;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        const data = await this.model.findOne({
            where: {
                id: id
            }
        });
        if (!data) {
            throw new ModelNotFoundException(this.model.name);
        }
        return data;
    }

    async create() { }

    async update() { }

    async delete() { }


}

module.exports = BaseRepository;