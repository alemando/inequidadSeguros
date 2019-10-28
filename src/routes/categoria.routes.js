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

// UPDATE a categoria
// router.post('/updateByNombre', async (req, res) => {
//   resultado = await Categoria.actualizarCategoria(req.body);
//   res.json({status: resultado});
// });
// Delete a categoria
router.post('/borrar', async (req, res) => {
  resultado = await Categoria.borrarCategoria(req.body.nombre);
  res.json({status: resultado});
});

module.exports = router;