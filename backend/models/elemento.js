// export db
const {DataTypes} = require('sequelize');
const db = require('../config/database');
//define the table model´s for the db 
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
//export object 
module.exports = elemento;