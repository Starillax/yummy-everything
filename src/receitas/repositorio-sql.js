const { Receita } = require('./model');
const Sequelize = require('sequelize');

class ReceitasRepository {
    constructor() {
    }

    async save(rcp) {
        await Receita.create(rcp);
    }

    async detail(id) {
        const ex = await Receita.findByPk(id)
        return ex;
    }

    async list() {
        const listagem = await Receita.findAll();
        return listagem;
    }
}

module.exports = ReceitasRepository;