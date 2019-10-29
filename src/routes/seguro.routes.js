const express = require('express');
const router = express.Router();


// Cliente Model
const Seguro = require('../models/seguro');
// GET all Clientes

router.get('/', async (req, res) => {
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// GET one Cliente by documento
router.post('/getById', async (req, res) => {
  const seguro = await Seguro.obtenerSeguro(req.body.id);
  res.json(seguro);
});

// ADD a new seguro
router.post('/save', async (req, res) => {
  resultado = await Seguro.guardarSeguro(req.body);
  res.json({status: resultado});
});

 //UPDATE a seguro
router.post('/updateById', async (req, res) => {
  resultado = await Seguro.actualizarSeguro(req.body);
  res.json({status: resultado});
});
 //Delete a seguro
router.post('/borrar', async (req, res) => {
  resultado = await Seguro.borrarSeguro(req.body.id);
  res.json({status: resultado});
});

router.get('/principales', async (req,res)=>{
  resultado= await Seguro.obtenerDatosPrincipales();
  res.json(resultado);
});

module.exports = router;
