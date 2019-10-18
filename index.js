const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { mongoose} = require('./database.js');
//Importing Routes

const indexRoutes = require('./src/routes/index.routes.js');
const clienteRoutes = require('./src/routes/cliente.routes.js');
const aseguradoraRoutes = require('./src/routes/aseguradora.routes.js')

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes

app.use(indexRoutes);

app.use('/clientes', clienteRoutes);
app.use('/aseguradoras', aseguradoraRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});