const express = require('express');
const router = express.Router();

// Bien Model
const Bienes = require('../models/bien');

// GET all bienes
router.get('/', async (req, res) => {
  const bienes = await Bienes.obtenerBienes();
  res.json(bienes);
});

// GET Bienes by Clientes
router.get('/:idCliente', async (req, res) => {
  const bienes = await Bienes.obtenerBienesPorCliente(req.params.idCliente);
  res.json(bienes);
});

// ADD a new bien
router.post('/save', async (req, res) => {
  resultado = await Bienes.guardarBien(req);
  res.json({status: resultado});
});

module.exports = router;
