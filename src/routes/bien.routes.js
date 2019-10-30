const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');
const mongoose = require('../database.js')
let gfs;
//intento por almacenar archivos
mongoose.connection.once('open',() => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection=('uploads');
})
let mongoUri = "mongodb+srv://alemando:WJ94TvthTuJUwF3U@seguros-llnl8.mongodb.net/test?retryWrites=true&w=majority"
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
//fin del intento





// Bien Model
const Bienes = require('../models/bien');

// GET all bienes
router.get('/', async (req, res) => {
  const bienes = await Bienes.obtenerBienes();
  res.json(bienes);
});

// GET Bienes by Clientes
router.post('/getByidCliente', async (req, res) => {
  console.log(req);
  
  const bienes = await Bienes.obtenerBienesPorCliente(req.body.documentoCliente);
  res.json(bienes);
});

// ADD a new bien
router.post('/save', upload.single('documentos'),async (req, res) => {
  resultado = await Bienes.guardarBien(req);
  res.json({status: resultado});
});

// UPDATE a new bien
router.post('/updateById', async (req, res) => {
  resultado = await Bienes.actualizarBien(req.body);
  res.json({status: resultado});
});

router.post('/borrar', async (req, res) => {
  resultado = await Bienes.borrarBien(req.body.id);
  res.json({status: resultado});
});
router.get('/getPdfByName', async (req, res) => {
  let documento = await mongoose.connection.db.collection('uploads.files').findOne({filename:req.body.filename}) 
  res.json(documento)
});
module.exports = router;
