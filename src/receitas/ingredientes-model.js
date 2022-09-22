const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Receita } = require('./model');

class Ingrediente extends Model {}
    
Ingrediente.init({
    id_ingrediente: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    texto: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    modelName: 'ingrediente'
});

Ingrediente.belongsTo(Receita,
{
    foreignKey: 'id_receita'
});

Receita.hasMany(Ingrediente, 
{
    foreignKey: 'id_receita'
});

sequelizeCon.sync();

module.exports = { Ingrediente };