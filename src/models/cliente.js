const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const clienteSchema = Schema({
    documento: {
        type: String,
        require: true,
        trim:true,
        unique:true
    },
    nombre: {
        type: String,
        require: true,
        trim:true
    },
    apellido1: {
        type: String,
        require: true,
        trim:true
    },
    apellido2: {
      type: String,
      require: true,
      trim:true
    },
    direccion: {
        type: String,
        trim:true,
        require:true
    },
    telefono: {
        type: String,
        trim:true,
        require:true
    },
    fechaNacimiento: {
        type: String,
        trim:true,
        require:true
    },
    ingresos: {
        type: String,
        trim:true,
        require:true
    },
    egresos: {
        type: String,
        trim:true,
        require:true
    }

});
clienteSchema.plugin(uniqueValidator);
const clientes = mongoose.model('clientes', clienteSchema);

module.exports = {
    clientes
}