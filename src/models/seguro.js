const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const clientes = require('../models/cliente');
const vendedores = require('../models/vendedor');
const bienes = require('../models/bien');
const aseguradoras = require('../models/aseguradora');
const criterios = require('../models/criterio');

const seguroSchema = Schema({
  fechaInicio: {
    type: Date,
    require: true,
    trim: true,
  },
  fechaFin: {
    type: Date,
    require: false,
    trim: true
  },
  valortotal: {
    type: Number,
    require: true,
    trim: true
  },
  fechaPago: {
    type: Date,
    require: true,
    trim: true
  },
  estado: {
    type: String,
    require: true,
    trim: true
  },
  observaciones:{
    type: String,
    require: true,
    trim: true
  },
  documentoCliente: {
    type: String,
    require: true,
    trim: true
  },
  idBien: {
    type: String,
    require: true,
    trim: true
  },
  documentoVendedor: {
    type: String,
    require: true,
    trim: true
  },
  nitAseguradora: {
    type: String,
    require: true,
    trim: true
  },
  arrayCriterios: {
    type: [Number],
    require: false,
    trim: true
  }
});
seguroSchema.plugin(uniqueValidator);

seguroSchema.statics.guardarSeguro = async function(datos) {
  let cliente = await clientes.findOne({documento:datos.documentoCliente});
  let vendedor = await vendedores.findOne({documentoVendedor:datos.documentoVendedor});
  let bien = await bienes.findById({_id:datos.idBien});
  let aseguradora = await aseguradoras.findOne({nit:datos.nitAseguradora});
  let aux = true;
  for (var i = 0; i < datos.arrayCriterios.length; i++) {
    console.log(datos.arrayCriterios[i])
    let criterio = await criterios.findOne({numero:datos.arrayCriterios[i]});
    console.log(criterio);
    if(!criterio){
      aux = false
      console.log("Entre if")
    }
  }
  console.log(cliente,vendedor,aseguradora,bien,aux)
  if(cliente && vendedor && bien && aseguradora && aux){
    const seguro = new seguros({
      fechaInicio: datos.fechaInicio,
      fechaFin: datos.fechaFin,
      valortotal: datos.valortotal,
      fechaPago: datos.fechaPago,
      estado: datos.estado,
      observaciones: datos.observaciones,
      documentoCliente: datos.documentoCliente,
      idBien: datos.idBien,
      docuementoVendedor: datos.docuementoVendedor,
      nitAseguradora: datos.nitAseguradora,
      arrayCriterios: datos.arrayCriterios
    });
    try {
        await seguro.save();
        return "seguro guardado";
    } catch (error) {
         return "error desconocido\n" + error;
    }
  }else {
    return "Algun elemento no existe"
  }
};

seguroSchema.statics.obtenerSeguros = async function() {
  try{
    let segurosall = await seguros.find();
    return segurosall
  } catch(error){
    return "Ha ocurrido algo al intentar obetener seguros\n" +error;
  }
};

const seguros = mongoose.model('seguros',seguroSchema);

module.exports = seguros;
