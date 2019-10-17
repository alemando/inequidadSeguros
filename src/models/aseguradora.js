const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const aseguradoraSchema = Schema({
    nit: {
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
    contacto: {
        type: String,
        require: true,
        trim:true
    }
});
aseguradoraSchema.plugin(uniqueValidator);
const aseguradoras = mongoose.model('aseguradoras',aseguradoraSchema);

module.exports = {
    aseguradoras
}