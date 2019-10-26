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
    telefono: {
        type: String,
        require: true,
        trim:true
    },
    correo: {
        type: String,
        require: true,
        trim:true
    }
});
aseguradoraSchema.plugin(uniqueValidator);

aseguradoraSchema.statics.guardarAseguradora = async function(datos) {
    const aseguradoraNueva = new aseguradoras(
        {nit:datos.nit,
        nombre:datos.nombre,
        telefono:datos.telefono,
        correo:datos.correo});
    try {
        await aseguradoraNueva.save();
        return "aseguradora guardada";
    } catch (error) {
        if (error.errors.nit.kind==="unique") return "El nit ingresado ya existe en nuestra base de datos";
        else return "error desconocido";
    }
};
aseguradoraSchema.statics.obtenerAseguradoras = async function() {
    try {
        let aseguradorasli = await aseguradoras.find();
        return aseguradorasli;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener las aseguradoras\n"+ error;
    }
}
aseguradoraSchema.statics.obtenerAseguradora = async function(nit) {
    try {
        let aseguradora = await aseguradoras.findOne({nit:nit});
        return aseguradora;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el aseguradora\n"+ error;
    }
}
aseguradoraSchema.statics.actualizarAseguradora = async function(datos) {
    try {
        let aseguradoraActualizado = await aseguradoras.findOneAndUpdate(
            {nit:datos.nit},
             {$set:{nombre:datos.nombre,
                telefono:datos.telefono,
                correo:datos.correo}},
             {new:true, runValidators:true, context:'query'})
        return "Aseguradora actualizada\n" + aseguradoraActualizado;
    } catch (error) {
        return "la aseguradora no se pudo actualizar debido a un error inesperado\n" + error;
    }
}
aseguradoraSchema.statics.borrarAseguradora = async function(nit){
    try {
        let respuesta = await aseguradoras.findOneAndDelete({nit:nit})
        return respuesta;
    } catch (error) {
        return "la aseguradora no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}
const aseguradoras = mongoose.model('aseguradoras',aseguradoraSchema);

module.exports = aseguradoras;
