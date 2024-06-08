const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

//definir la tabla con sus atributos
const compovault = sequelize.define('compovault', {
    n_serial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
    }
});

//exportar el objeto
module.exports = compovault;
