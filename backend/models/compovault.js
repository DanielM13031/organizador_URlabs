// export db
const {DataTypes} = require('sequelize');
const db = require('../config/database');

//define the table model´s for the db 
const compovault = db.define('compovault', {
    n_serial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
    }
});

//export object 
module.exports = compovault;
