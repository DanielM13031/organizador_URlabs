// backend/models/index.js
const usuario = require('./usuario');
const compovault = require('./compovault');
const elemento = require('./elemento');

usuario.hasMany(compovault, { foreignKey: 'serial_cv' });
compovault.belongsTo(usuario, { foreignKey: 'serial_cv' });

elemento.belongsTo(compovault, { foreignKey: 'e_serial_cv' });
compovault.hasMany(elemento, { foreignKey: 'e_serial_cv' });

module.exports = {
    usuario,
    compovault,
    elemento
};

