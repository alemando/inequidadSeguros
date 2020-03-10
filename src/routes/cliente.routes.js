const express = require('express');
const router = express.Router();


// Cliente Model
const Cliente = require('../models/cliente');

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
  resultado = await Cliente.topCinco();
  res.json(resultado)
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
})



module.exports = router;
