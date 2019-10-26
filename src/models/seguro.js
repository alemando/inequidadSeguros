const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

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
  valor_total: {
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
  idCliente: {
    type: Schema.ObjectId,
    ref: "clientes",
    require: true,
    trim: true
  },
  idBien: {
    type: Schema.ObjectId,
    ref: "bienes",
    require: true,
    trim: true
  },
  idVendedor: {
    type: Schema.ObjectId,
    ref: "vendedores",
    require: true,
    trim: true
  },
  idAseguradora: {
    type: Schema.ObjectId,
    ref: "aseguradoras",
    require: true,
    trim: true
  },
  arrayCriterios: {
    type: [Schema.ObjectId],
    ref: "criterios",
    require: false,
    trim: true
  }
});
seguroSchema.plugin(uniqueValidator);

seguroSchema.statics.guardarSeguro = async function(datos) {
  let cliente = await clientes.exist({documento: datos.idCliente})
  let bien = await bienes.exist({id: datos.idBien})
  let vendedor = await vendedores.exist({documentoVen: datos.idVendedor})
  let aux = true
  for (var i = 0; i < datos.length; i++) {
    let criterio = await criterios.exist({numero: datos.numero})
};

const seguros = mongoose.model('seguros',seguroSchema);
