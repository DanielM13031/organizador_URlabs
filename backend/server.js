const app = require('./app');
const PORT = app.get('port'); 


// start the server
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))

module.exports = app;