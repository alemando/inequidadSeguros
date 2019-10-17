const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose} = require('./database.js');
//Importing Routes

const indexRoutes = require('./src/routes/index.routes.js');
const clienteRoutes = require('./src/routes/cliente.routes.js');

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