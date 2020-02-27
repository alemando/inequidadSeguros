const express = require('express');
const router = express.Router();

// Vendedor Model
const Vendedor = require('../models/vendedor');

// GET all vendedores
router.get('/', async (req, res) => {
  const vendedores = await Vendedor.obtenerVendedores();
  res.json(vendedores);
});

// GET one Vendedor by documento
router.get('/:id', async (req, res) => {
  const vendedor = await Vendedor.obtenerVendedor(req.params.id);
  res.json(vendedor);
});

// ADD a new vendedor
router.post('/save', async (req, res) => {
  resultado = await Vendedor.guardarVendedor(req.body, req.session.esAdmin);
  res.json(resultado);
});

// req.body 3 parametros: documento, contrasena y nuevacontrasena
router.post('/cambiarContrasena', async (req, res) => {
  resultado = await Vendedor.cambiarContrasenaVendedor(req.session._id, req.body);
  res.json(resultado);
});
//Inhabilitar vendedor
router.post('/inhabilitar', async(req,res)=>{
  let respuesta = await Vendedor.CambiarEstadoVendedor(req.body.id, req.session.esAdmin)
  res.json(respuesta);
})

//EDIT a Vendedor
router.post('/edit', async(req,res) => {
  res.json(await Vendedor.editarVendedor(req.body, req.session.esAdmin));
})

module.exports = router;
