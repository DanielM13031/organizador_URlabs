const {Sequelize} = require('sequelize');

const db = new Sequelize('CompoVault','postgres','13031',{
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = db