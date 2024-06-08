// exportar la base de datos
const {DataTypes} = require('sequelize');
const db = require('../config/database');
//definir la tabla con sus atributos
const elemento = db.define('elemento',{
    elemento:{
        type: DataTypes.STRING,
        allowNull: false
    },

    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    e_serial_cv:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
//exporatar el objeto
module.exports = elemento;