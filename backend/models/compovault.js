// exportar la base de datos
const {DataTypes} = require('sequelize');
const db = require('../config/database');

//definir la tabla con sus atributos
const compovault = db.define('compovault', {
    n_serial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
    }
});

//exportar el objeto
module.exports = compovault;
