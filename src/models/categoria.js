const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const categoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim:true,
        unique:true
    }
});
categoriaSchema.plugin(uniqueValidator);
const categorias = mongoose.model('categorias',categoriaSchema);

module.exports = {
    categorias
}