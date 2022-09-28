const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Usuario } = require('../usuarios/model');

class Receita extends Model {}
    
Receita.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    modoDeFazer: DataTypes.STRING,
    imagem: DataTypes.STRING,
    usuarioEmail: DataTypes.STRING
}, { 
    sequelize: sequelizeCon,
    modelName: 'receita'
});

Receita.belongsTo(Usuario);

Usuario.hasMany(Receita, {
    onDelete: 'CASCADE'
});


module.exports = { Receita };