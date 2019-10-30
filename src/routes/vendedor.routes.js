const express = require('express');
const router = express.Router();

// Vendedor Model
const Vendedor = require('../models/vendedor');

// GET all vendedores
router.get('/', async (req, res) => {
  const vendedores = await Vendedor.obtenerVendedores();
  //res.json(vendedores);
  res.json({estado:"No sirve nada copnm postman"});
});

// GET one Vendedor by documento
router.post('/getById', async (req, res) => {
  const vendedor = await Vendedor.obtenerVendedor(req.body.id);
  res.json(vendedor);
});

// ADD a new vendedor
router.post('/save', async (req, res) => {
  //resultado = await Vendedor.guardarVendedor(req.body);
  res.json({statdo: "resultado"});
});

// UPDATE a vendedor
router.post('/updateById', async (req, res) => {
  resultado = await Vendedor.actualizarVendedor(req.body);
  res.json({status: resultado});
});

// Delete a vendedor
router.post('/borrar', async (req, res) => {
  resultado = await Vendedor.borrarVendedor(req.body.id);
  res.json({status: resultado});
});

module.exports = router;
