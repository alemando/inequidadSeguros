const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const fs = require('fs');
// Bien Model
const Bienes = require('../models/bien');

// GET all bienes
router.get('/', async (req, res) => {
  const bienes = await Bienes.obtenerBienes();
  res.json(bienes);
});

// GET Bienes by Clientes
router.get('/:idCliente', async (req, res) => {
  const bienes = await Bienes.obtenerBienesPorCliente(req.params.idCliente);
  res.json(bienes);
});

// GET Documento Bien
router.get('/documento/:idBien', async (req, res) => {
  const bien = await Bienes.obtenerBienPorId(req.params.idBien);
  let file = bien.documento.archivo
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('content-type', 'application/pdf');
  res.send(file);
  //Se debe hacer algo en caso de que no llegue
});


// ADD a new bien
router.post('/save', upload.single('documento'), async (req, res) => {
  resultado = await Bienes.guardarBien(req);
  res.json(resultado);
});

module.exports = router;
