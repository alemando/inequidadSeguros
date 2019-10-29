const express = require('express');
const router = express.Router();

// Seguro Model
const Criterio = require('../models/criterio');

// Get all seguros
router.get('/', async (req,res)=>{
  const criterio = await Criterio.obtenerCriterio();
  res.json(criterio);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Criterio.guardarCriterio(req.body);
  res.json({status: resultado});
});

module.exports = router;
