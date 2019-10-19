const express = require('express');
const router = express.Router();


// Bien Model
const Bienes = require('../models/bien');

// GET all bienes
router.get('/', async (req, res) => {
  const bienes = await Bienes.obtenerBienes();
  res.json(bienes);
});

// GET all Bienes
router.get('/:id', async (req, res) => {
  const bienes = await Bienes.findById(req.params.id);
  res.json(bienes);
});

// ADD a new bien
router.post('/', async (req, res) => {
  resultado = await Bienes.guardarBien(req.body);
  res.json({status: resultado});
});

// UPDATE a new bien
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const newBien = {title, description};
  await Bienes.findByIdAndUpdate(req.params.id, newBien);
  res.json({status: 'Bien Updated'});
});

router.delete('/:id', async (req, res) => {
  await Bienes.findByIdAndRemove(req.params.id);
  res.json({status: 'Bien Deleted'});
});

module.exports = router;
