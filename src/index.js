const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Iniciando BD
const { mongoose } = require('./database');

//Importing Routes
const indexRoutes = require('./routes/index.routes');
const clienteRoutes = require('./routes/cliente.routes');

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use(indexRoutes)

app.use('/clientes', clienteRoutes)

//Static files
app.use(express.static(path.join(__dirname, 'public')));



//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});