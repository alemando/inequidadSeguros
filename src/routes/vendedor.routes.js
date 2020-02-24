const express = require('express');
const router = express.Router();

// Vendedor Model
const Vendedor = require('../models/vendedor');

// GET all vendedores
router.get('/', async (req, res) => {
  const vendedores = await Vendedor.obtenerVendedores();
  res.json(vendedores);
});

// GET one Vendedor by documento
router.get('/:id', async (req, res) => {
  const vendedor = await Vendedor.obtenerVendedor(req.params.id);
  res.json(vendedor);
});

// ADD a new vendedor
router.post('/save', async (req, res) => {
  resultado = await Vendedor.guardarVendedor(req.body, true);
  res.json(resultado);
});


module.exports = router;
