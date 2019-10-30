const express = require('express');
const router = express.Router();

// Seguro Model
const Seguro = require('../models/seguro');

// Get all seguros
router.get('/', async (req,res)=>{
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// GET one Seguro by documento
router.post('/getById', async (req, res) => {
  const seguro = await Seguro.obtenerSeguro(req.body.id);
  res.json(seguro);
});

// ADD seguro
router.post('/save', async (req, res) =>{
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

//Obtener datos principales del seguro
router.get('/principal', async (req,res)=>{
  resultado= await Seguro.obtenerPrincipal();
  res.json(resultado);
});

//Link para ver la información completa de un seguro en específico (Sale de /principal)
router.get('/principal/:id', async(req,res)=>{
  let respuesta = await Seguro.findById({_id: req.url.split('/')[2]});
  res.json(respuesta);
});

module.exports = router;
