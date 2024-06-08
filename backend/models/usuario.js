// export db
const { DataTypes } = require('sequelize');
const db = require('../config/database');
//define the table model´s for the db 
const usuario = db.define('usuario', {
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
//export object 
module.exports = usuario;
