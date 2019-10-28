const express = require('express');
const router = express.Router();

// Seguro Model
const Vendedor = require('../models/vendedor.js');

// Get all seguros
router.get('/', async (req,res)=>{
  const vendedores = await Vendedor.obtenerVendedor();
  res.json(vendedores);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Vendedor.guardarVendedor(req.body);
  res.json({status: resultado});
});

module.exports = router;
