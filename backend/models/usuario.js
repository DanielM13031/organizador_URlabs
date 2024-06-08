// backend/models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//definir la tabla con sus atributos
const usuario = sequelize.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serial_cv: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
//exportar el objeto
module.exports = usuario;
