const express = require('express');
const router = express.Router();


// Categoria Model
const Categoria = require('../models/categoria');

// GET all Categorias
router.get('/', async (req, res) => {
  const categorias = await Categoria.obtenerCategorias();
  res.json(categorias);
});

// GET one Categoria by documento
router.post('/getByNombre', async (req, res) => {
  const categoria = await Categoria.obtenerCategoria(req.body.nombre);
  res.json(categoria);
});

// ADD a new categoria
router.post('/save', async (req, res) => {
  resultado = await Categoria.guardarCategoria(req.body);
  res.json(resultado);
});

//Agregar criterios base a la categoría
router.post('/addCriteriosBase', async (req, res) =>{
  resultado = await Categoria.agregarCriteriosBase(req.body)
  res.json({status: resultado})
})

//Obtener los datos de los criterios base de una categoría
router.post('/getCriteriosBase', async(req, res) =>{
  resultado = await Categoria.criteriosCategoria(req.body.nombre)
  res.json(resultado)
})

//Borrar un criterio con el nombre de la categoría a la que pertenece y a su nombre
router.post('/deleteCriterioCategoria', async(req,res)=>{
  resultado = await Categoria.borrarCriterioCategoria(req.body)
  res.json({status: resultado})
})

router.post('/updateCriterioCategoria', async(req,res)=>{
  resultado = await Categoria.actualizarCriterioCategoria(req.body)
  res.json({status: resultado})
})

module.exports = router;