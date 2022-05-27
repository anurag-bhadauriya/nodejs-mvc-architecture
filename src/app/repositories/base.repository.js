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
        return record;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        return await this.model.findOne({
            where: {
                id: id
            }
        });
    }

    async create() { }

    async update() { }

    async delete() { }


}

module.exports = BaseRepository;