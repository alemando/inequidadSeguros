const express = require('express');
const router = express.Router();


// Criterio Model
const CriterioBase = require('../models/criterioBase');
// GET all Criterios

router.get('/', async (req, res) => {
  const criterios = await CriterioBase.obtenerCriteriosBase();
  res.json(criterios);
});

// GET one Criterio by numero
router.post('/getById', async (req, res) => {
  const crit = await CriterioBase.obtenerCriterioBase(req.body._id);
  res.json(crit);
});

// ADD a new criterio
router.post('/save', async (req, res) => {
  resultado = await CriterioBase.guardarCriterioBase(req.body);
  res.json({status: resultado});
});

// UPDATE a criterio
router.post('/updateById', async (req, res) => {
  resultado = await CriterioBase.actualizarCriterioBase(req.body);
  res.json({status: resultado});
});
// Delete a criterio
router.post('/borrar', async (req, res) => {
  resultado = await CriterioBase.borrarCriterioBase(req.body);
  res.json({status: resultado});
});

module.exports = router;