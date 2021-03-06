const express = require('express');
const router = express.Router();


// Cliente Model
const Cliente = require('../models/cliente');
const Seguro = require('../models/seguro');

// GET all Clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.obtenerClientes(req.session.esAdmin);
  res.json(clientes);
});


// GET Cliente by documento
router.get('/habilitados', async (req, res) => {
  const cliente = await Cliente.obtenerClientesConBienesHabilitados();
  res.json(cliente);
});

router.get('/topcinco', async(req,res)=>{
  resultado = await Cliente.topCinco(req.session.esAdmin);
  res.json(resultado)
})
// Get top clientes por vendedor
router.get('/bestclients', async (req,res)=>{
  // Si se quiere probar con postman cambiar parametro req.body._id y enviar el id del vendedor como json
  const seguros = await Seguro.MejoresClientes(req.session._id);
  res.json(seguros);
})

// GET Cliente by documento
router.get('/:documento', async (req, res) => {
  const cliente = await Cliente.obtenerCliente(req.params.documento);
  res.json(cliente);
});

// ADD a new cliente
router.post('/save', async (req, res) => {
  let resultado = await Cliente.guardarCliente(req.body, req.session._id);
  res.json(resultado);
});

//GET clientes with bienes
router.post('/withBienes', async(req, res) =>{
  const clientes = await Cliente.obtenerClientesConBienes();
  res.json(clientes);
});

// UPDATE cliente
router.post('/update', async (req,res) =>{
  const resultado = await Cliente.actualizarCliente(req.body, req.session.esAdmin);
  res.json(resultado);
});
//POST change status
router.post('/status', async (req,res)=>{
  resultado = await Cliente.cambiarEstadoCliente(req.body.documento, req.session.esAdmin);
  res.json(resultado)
});

//POST Cantidad de clientes registrados entre fechas
router.post('/cantidadClientesFechas', async(req,res) => {
  if (req.body.fechaInicio && req.body.fechaFin){
    let respuesta = await Cliente.clientesCreadosEntreFechas(req.session._id,req.body.fechaInicio,req.body.fechaFin);
    res.json(respuesta);
  }else{ //Por defecto envia los clientes creados entre hoy y un mes antes
    let respuesta = await Cliente.clientesCreadosEntreFechas(req.session._id);
    res.json(respuesta);
  }
});




module.exports = router;
