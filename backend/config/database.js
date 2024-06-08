//connection with db
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CompoVault', 'postgres', '13031', {
  host: 'localhost',
  dialect: 'postgres'
});

// ! check connection
/*
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
*/

module.exports = sequelize;
