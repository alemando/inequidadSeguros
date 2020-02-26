const express = require('express');
const router = express.Router();

// Categoria Model
const Categoria = require('../models/categoria');

// GET all Categorias
router.get('/', async (req, res) => {
  const categorias = await Categoria.obtenerCategorias();
  res.json(categorias);
});
// Get Categoria Habilitadas
router.get('/habilitadas', async (req, res) => {
  const categoria = await Categoria.obtenerCategoriaHabilitadas();
  res.json(categoria);
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

//POST change status
router.post('/status', async (req,res)=>{
  const admin = true
  resultado = await Categoria.cambiarEstadoCat(req.body.nombre,admin);
  res.json(resultado)
})

module.exports = router;
