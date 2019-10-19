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

bienSchema.statics.guardarBien = async function(datos) {
    const bienNuevo = new bienes({documentoCliente:datos.documentoCliente,categoria:datos.categoria,caracteristicas:datos.caracteristicas,documento:datos.documento});
    try {
        await bienNuevo.save();
        return "bien guardado";
    } catch (error) {
        if (error.errors.id.kind==="unique") return "El documento ingresado ya existe en nuestra base de datos";
        else return "error desconocido";
    }
};

bienSchema.statics.obtenerBienes = async function() {
  try{
    let bienesall = await bienes.find();
    return bienesall
  } catch(error){
    return "Has cometido un error fatal\n" +error;
  }
};

const bienes = mongoose.model('bienes',bienSchema);

module.exports = bienes
