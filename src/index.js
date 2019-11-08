const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

//DB
const { mongoose} = require('./database.js');

//Importing Routes
const indexRoutes = require('./routes/index.routes.js');
const clienteRoutes = require('./routes/cliente.routes.js');
const aseguradoraRoutes = require('./routes/aseguradora.routes.js')
const bienRoutes= require('./routes/bien.routes.js')
const categoriaRoutes = require('./routes/categoria.routes.js')
const seguroRoutes = require('./routes/seguro.routes.js')
const vendedorRoutes = require('./routes/vendedor.routes.js')

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Routes
app.use(indexRoutes)
app.use('/api/clientes', clienteRoutes);
app.use('/api/aseguradoras', aseguradoraRoutes);
app.use('/api/bienes', bienRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/seguros', seguroRoutes);
app.use('/api/vendedores', vendedorRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//HTML en todas las rutas para react
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
