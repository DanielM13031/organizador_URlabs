const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes/index.js'); 
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '..', 'frontend', 'build', 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'Hola_no_se_que_poner_como_clave_segura_jajajajaja',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

// Rutas
app.use(routes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Rutas para la aplicación React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Inicializar el servidor
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));
