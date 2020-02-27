const express = require('express');
const router = express.Router();

// Seguro Model
const Seguro = require('../models/seguro');

// Get all seguros
router.get('/', async (req,res)=>{
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// GET one seguro by id
router.get('/:id', async (req, res) => {
  const seguro = await Seguro.obtenerSeguro(req.params._id);
  res.json(seguro);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Seguro.guardarSeguro(req.body);
  res.json(resultado);
});

//Link para ver la información completa de un seguro en específico (Sale de /principal)
router.get('/principal/:id', async(req,res)=>{
  let respuesta = await Seguro.findById({_id: req.url.split('/')[2]});
  res.json(respuesta);
});

router.post('/finiquitar/:id', async(req,res)=>{
  let respuesta = await Seguro.cambiarEstado(req.params.id,req.body.estado, req.session.esAdmin)
  res.json(respuesta);
})
//Borrar seguro por Id de seguro
router.get('/remove/:id', async(req,res)=>{
  let { id } = req.params;
  let respuesta = await Seguro.borrarSeguro(id, req.session.esAdmin);
  res.json(respuesta);
});
module.exports = router;
