const express = require('express');
const router = express.Router();

// Aseguradora Model
const Aseguradora = require('../models/aseguradora');

// GET all Aseguradoras
router.get('/', async (req, res) => {
  const aseguradoras = await Aseguradora.find();
  res.json(aseguradoras);
});

// GET all Aseguradoras
router.get('/:id', async (req, res) => {
  const aseguradora = await Aseguradora.findById(req.params.id);
  res.json(aseguradora);
});

// ADD a new aseguradora
router.post('/', async (req, res) => {
  resultado = await Aseguradora.guardarAseguradora(req.body);
  res.json({status: resultado});
});

// UPDATE a new aseguradora
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const newAseguradora = {title, description};
  await Aseguradora.findByIdAndUpdate(req.params.id, newAseguradora);
  res.json({status: 'Aseguradora Updated'});
});

router.delete('/:id', async (req, res) => {
  await Aseguradora.findByIdAndRemove(req.params.id);
  res.json({status: 'Aseguradora Deleted'});
});

module.exports = router;