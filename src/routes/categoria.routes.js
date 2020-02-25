const express = require('express');
const router = express.Router();

// Categoria Model
const Categoria = require('../models/categoria');

// GET all Categorias
router.get('/', async (req, res) => {
  const categorias = await Categoria.obtenerCategorias();
  res.json(categorias);
});

// GET one Categoria by nombre
router.get('/:nombre', async (req, res) => {
  const categoria = await Categoria.obtenerCategoria(req.params.nombre);
  res.json(categoria);
});

// ADD a new categoria
router.post('/save', async (req, res) => {
  resultado = await Categoria.guardarCategoria(req.body);
  res.json(resultado);
});
//Actualizar nombre de la categoria
router.post('/update', async (req, res) => {
  resultado = await Categoria.actualizarCategoriaById(req.body.id,req.body.nombre,true);
  console.log(resultado);
  res.json(resultado);
});

module.exports = router;