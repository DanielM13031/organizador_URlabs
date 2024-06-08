const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('CompoVault','postgres','13031',{
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize