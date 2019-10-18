const express = require('express');
const router = express.Router();


// Cliente Model
const Cliente = require('../models/cliente');

// GET all Clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// GET all Clientes
router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  res.json(cliente);
});

// ADD a new cliente
router.post('/', async (req, res) => {
  resultado = await Cliente.guardarCliente(req.body);
  res.json({status: resultado});
});

// UPDATE a new cliente
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const newCliente = {title, description};
  await Cliente.findByIdAndUpdate(req.params.id, newCliente);
  res.json({status: 'Cliente Updated'});
});

router.delete('/:id', async (req, res) => {
  await Cliente.findByIdAndRemove(req.params.id);
  res.json({status: 'Cliente Deleted'});
});

module.exports = router;