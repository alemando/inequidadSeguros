const express = require('express');
const router = express.Router();


// Cliente Model
const Cliente = require('../models/cliente');
// GET all Clientes

router.get('/', async (req, res) => {
  const clientes = await Cliente.obtenerClientes();
  res.json(clientes);
});

// GET one Cliente by documento
router.post('/getByDocumento', async (req, res) => {
  const cliente = await Cliente.obtenerCliente(req.body.documento);
  res.json(cliente);
});

// ADD a new cliente
router.post('/save', async (req, res) => {
  resultado = await Cliente.guardarCliente(req.body);
  res.json(resultado);
});

// UPDATE a cliente
router.post('/updateByDocumento', async (req, res) => {
  resultado = await Cliente.actualizarCliente(req.body);
  res.json({status: resultado});
});
// Delete a cliente
router.post('/borrar', async (req, res) => {
  resultado = await Cliente.borrarCliente(req.body.documento);
  res.json({status: resultado});
});

module.exports = router;
