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

// Update categoria
router.post('/update',async (req,res) => {
  resultado = await Categoria.actualizarCategoria(req.body);
  res.json(resultado)
});

//Change status categoria
router.post('/estado',async (req,res) => {
  resultado = await Categoria.actualizarCategoriaEstado(req.body);
  res.json(resultado)
});

module.exports = router;
