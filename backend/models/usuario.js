// export db
const { DataTypes } = require('sequelize');
const db = require('../config/database');
//define the table models for the db 
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
        allowNull: false,
        references:{
            model: 'compovault',
            key: 'n_serial'
        }
    }
});
//export object 
module.exports = usuario;
