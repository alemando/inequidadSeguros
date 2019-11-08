const express = require('express');
const router = express.Router();

// Seguro Model
const Seguro = require('../models/seguro');

// Get all seguros
router.get('/', async (req,res)=>{
  const seguros = await Seguro.obtenerSeguros();
  res.json(seguros);
});

// GET one Cliente by documento
router.post('/getById', async (req, res) => {
  const seguro = await Seguro.obtenerSeguro(req.body._id);
  res.json(seguro);
});

// ADD seguro
router.post('/save', async (req, res) =>{
  resultado = await Seguro.guardarSeguro(req.body);
  res.json({status: resultado});
});

//Get all seguros modificado
router.get('/principal', async(req,res)=>{
  resultado = await Seguro.obtenerPrincipal();
  res.send(resultado);
 //UPDATE a seguro
});
router.post('/updateById', async (req, res) => {
  resultado = await Seguro.actualizarSeguro(req.body);
  res.json({status: resultado});
});
 //Delete a seguro
router.post('/borrar', async (req, res) => {
  resultado = await Seguro.borrarSeguro(req.body._id);
  res.json({status: resultado});
});

router.get('/principales', async (req,res)=>{
  resultado= await Seguro.obtenerDatosPrincipales();
  res.json(resultado);
});

//Agregar criterios al seguro
router.post('/addCriterios', async (req, res) =>{
  resultado = await Seguro.agregarCriterios(req.body)
  res.json({status: resultado})
})

//Obtener los datos de los criterios de un seguro
router.post('/getCriterios', async(req, res) =>{
  resultado = await Seguro.criteriosSeguro(req.body._id)
  res.json(resultado)
})

//Borrar un criterio con el _id del seguro al que pertenece y a su nombre
router.post('/deleteCriterioSeguro', async(req,res)=>{
  resultado = await Seguro.borrarCriterioSeguro(req.body)
  res.json({status: resultado})
})

//Actualizar un criterio de un seguro
router.post('/updateCriterioSeguro', async(req,res)=>{
  resultado = await Seguro.actualizarCriterioSeguro(req.body)
  res.json({status: resultado})
})

module.exports = router;
