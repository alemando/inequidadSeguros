const express = require('express');
const router = express.Router();


// Aseguradora Model
const Aseguradora = require('../models/aseguradora');

// GET all Aseguradoras
router.get('/', async (req, res) => {
  const aseguradoras = await Aseguradora.obtenerAseguradoras();
  res.json(aseguradoras);
});

// Get Aseguradoras Habilitadas
router.get('/enabled', async (req, res) => {
  resultado = await Aseguradora.obtenerAseguradorasHabilitadas();
  res.json(resultado);
});

// GET aseguradoras con más seguros aprobados
router.get('/mostSold', async (req,res) =>{
  resultado = await Aseguradora.mejoresAseguradoras(req.session.esAdmin);
  res.json(resultado);
});

// GET aseguradora by nit
router.get('/:nit', async (req, res) => {
  const aseguradora = await Aseguradora.obtenerAseguradora(req.params.nit);
  res.json(aseguradora);
});

//POST Cambiar estado de aseguradora
router.post('/disable', async (req,res) => { 
  resultado = await Aseguradora.CambiarEstadoAseguradora(req.body.id, req.session.esAdmin);
  res.json(resultado);
});

// ADD a new aseguradora
router.post('/save', async (req, res) => {
  resultado = await Aseguradora.guardarAseguradora(req.body);
  res.json(resultado);
  
});

// UPDATE aseguradora
router.post('/update', async (req,res) =>{ 
  const resultado = await Aseguradora.actualizarAseguradora(req.body, req.session.esAdmin);
  res.json(resultado);
});

module.exports = router;