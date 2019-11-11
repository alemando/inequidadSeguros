const express = require('express');
const router = express.Router();

// Seguro Model
const Seguro = require('../models/seguro');

// Get all seguros
router.get('/', async (req,res)=>{
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// GET one seguro by id
router.get('/:id', async (req, res) => {
  const seguro = await Seguro.obtenerSeguro(req.params._id);
  res.json(seguro);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Seguro.guardarSeguro(req.body);
  res.json(resultado);
});

module.exports = router;
