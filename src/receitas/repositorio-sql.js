const { Exercicio } = require('./model');
const Sequelize = require ('sequelize');

class ExerciciosRepository {
    constructor() {
    }

    async save(ex) {
        await Exercicio.create(ex);
    }

    async random() {
        const ex = await Exercicio.findOne({
            order: 
                Sequelize.literal('random()')
        })
        return ex;
    }

    async detail(id) {
        const ex = await Exercicio.findByPk(id)
        return ex;
    }

    async list(disciplina) {
        const listagem = await Exercicio.findAll({
            where: { 
                disciplina
            }
        })
        return listagem;
    }
}

module.exports = ExerciciosRepository;