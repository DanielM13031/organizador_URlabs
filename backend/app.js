const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



// settings

app.set('port', process.env.PORT || 4000);
app.set('frontend', path.join(__dirname, 'frontend'));


// routes



//middlewares
app.use(cors());
app.use(bodyParser.json());
// FOR REACT
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
// FOR FOREIGNS ROUTES
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});
// static files





// start the server
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))

module.exports = app;