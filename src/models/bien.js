const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bienSchema = Schema({
    id: {
        type: String,
        require: true,
        trim:true,
    },
    documentoCliente: {
        type: String,
        require: true,
        trim:true
    },
    categoria: {
        type: String,
        require: true,
        trim:true
    },
    caracteristicas: {
        type: String,
        require: true,
        trim:true
    },
    documentos: {
        type: Buffer,
        require: false
    }
});
bienSchema.plugin(uniqueValidator);
const bienes = mongoose.model('bienes',bienSchema);

module.exports = {
    bienes
}