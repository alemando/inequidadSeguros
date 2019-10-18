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
aseguradoraSchema.statics.guardarAseguradora = async function(datos) {
    const aseguradoraNueva = new aseguradoras({nit:datos.nit,nombre:datos.nombre,contacto:datos.contacto});
    try {
        await aseguradoraNueva.save();
        return "aseguradora guardada";
    } catch (error) {
        if (error.errors.nit.kind==="unique") return "El nit ingresado ya existe en nuestra base de datos";
        else return "error desconocido";
    }
};
const aseguradoras = mongoose.model('aseguradoras',aseguradoraSchema);

module.exports = aseguradoras;