const { Receita } = require('./model');
const { Ingrediente } = require('./ingredientes-model');
const Sequelize = require('sequelize');

class ReceitasRepository {
    constructor() {
    }

    async save(rcp) {
        await Receita.create(rcp);
    }

    async detail(id) {
        const rcp = await Receita.findByPk(id);
        const ings = await Ingrediente.findAll({ 
            where: { id_receita: id }
        });

        return {
            rcp, ings
        }
    }

    async list() {
        const listagem = await Receita.findAll();
        return listagem;
    }

    async delete(id) {
        const rcp = await Receita.findByPk(id);
        console.log(rcp)
        await rcp.destroy();
    }
}

module.exports = ReceitasRepository;