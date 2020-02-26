const express = require('express');
const router = express.Router();


// Cliente Model
const Cliente = require('../models/cliente');

// GET all Clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.obtenerClientes();
  res.json(clientes);
});

// GET Cliente by documento
router.get('/:documento', async (req, res) => {
  const cliente = await Cliente.obtenerCliente(req.params.documento);
  res.json(cliente);
});

// ADD a new cliente
router.post('/save', async (req, res) => {
  let resultado = await Cliente.guardarCliente(req.body);
  res.json(resultado);
});

//GET clientes with bienes
router.post('/withBienes', async(req, res) =>{
  const clientes = await Cliente.obtenerClientesConBienes();
  res.json(clientes);
});

// UPDATE cliente
router.post('/update/:documento', async (req,res) =>{ 
  const resultado = await Cliente.actualizarCliente(req.body, true);
  res.json(resultado);
});

module.exports = router;
