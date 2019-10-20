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
router.post('/getByidCliente', async (req, res) => {
  const bienes = await Bienes.obtenerBienesPorCliente(req.body.documentoCliente);
  res.json(bienes);
});

// ADD a new bien
router.post('/save', async (req, res) => {
  resultado = await Bienes.guardarBien(req.body);
  res.json({status: resultado});
});

// UPDATE a new bien
router.post('/updateById', async (req, res) => {
  resultado = await Bienes.actualizarBien(req.body);
  res.json({status: resultado});
});

router.post('/borrar', async (req, res) => {
  resultado = await Bienes.borrarBien(req.body.id);
  res.json({status: resultado});
});

module.exports = router;
