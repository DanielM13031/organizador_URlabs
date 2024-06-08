const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
//definir la tabla con sus atributos
const elemento = sequelize.define('elemento',{
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