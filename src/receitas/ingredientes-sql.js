const { Ingrediente } = require('./ingredientes-model');
const Sequelize = require('sequelize');

class IngredientesRepository {
    constructor() {
    }

    async save(ing) {
        await Ingrediente.create(ing);
    }

}

module.exports = IngredientesRepository;