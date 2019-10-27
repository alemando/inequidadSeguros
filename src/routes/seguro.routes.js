const express = require('express');
const router = express.Router();

// Seguro Model
const Seguro = require('../models/seguro');

// Get all seguros
router.get('/', async (req,res)=>{
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Seguro.guardarSeguro(req.body);
  res.json({status: resultado});
});

module.exports = router;
