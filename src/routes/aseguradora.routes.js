const express = require('express');
const router = express.Router();


// Aseguradora Model
const Aseguradora = require('../models/aseguradora');
// GET all Aseguradoras

router.get('/', async (req, res) => {
  const aseguradoras = await Aseguradora.obtenerAseguradoras();
  res.json(aseguradoras);
});

// GET one Aseguradora by documento
router.post('/getByNit', async (req, res) => {
  const aseguradora = await Aseguradora.obtenerAseguradora(req.body.nit);
  res.json(aseguradora);
});

// ADD a new aseguradora
router.post('/save', async (req, res) => {
  resultado = await Aseguradora.guardarAseguradora(req.body);
  res.json(resultado);
});

// UPDATE a aseguradora
router.post('/updateByNit', async (req, res) => {
  resultado = await Aseguradora.actualizarAseguradora(req.body);
  res.json({status: resultado});
});
// Delete a aseguradora
router.post('/delete', async (req, res) => {
  resultado = await Aseguradora.borrarAseguradora(req.body.nit);
  res.json({status: resultado});
});

module.exports = router;