//llamar los modelos de la tablas
const usuario = require('./usuario');
const compovault = require('./compovault');
const elemento = require('./elemento');
//establecer las relaciones netre las tablas
usuario.belongsTo(compovault, { foreignKey: 'serial_cv' });
elemento.belongsTo(compovault, { foreignKey: 'e_serial_cv' });

module.exports = {
    usuario,
    compovault,
    elemento
};
