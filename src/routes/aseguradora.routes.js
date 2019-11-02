const express = require('express');
const router = express.Router();


// Aseguradora Model
const Aseguradora = require('../models/aseguradora');

// GET all Aseguradoras
router.get('/', async (req, res) => {
  const aseguradoras = await Aseguradora.obtenerAseguradoras();
  res.json(aseguradoras);
});

// GET aseguradora by nit
router.get('/:nit', async (req, res) => {
  const aseguradora = await Aseguradora.obtenerAseguradora(req.params.nit);
  res.json(aseguradora);
});

// ADD a new aseguradora
router.post('/save', async (req, res) => {
  resultado = await Aseguradora.guardarAseguradora(req.body);
  res.json(resultado);
});

module.exports = router;