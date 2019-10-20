const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bienSchema = Schema({
    id: {
        type: String,
        require: true,
        trim:true,
    },
    idCliente: {
        type: Schema.ObjectId,
        ref: "clientes",
        require: false,
        trim:true
    },
    documentoCliente: {
      type: String,
      require: true,
      trim: true
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
    return "Ha ocurrido algo al intentar obetener bienes\n" +error;
  }
};

bienSchema.statics.obtenerBienesPorCliente = async  function(documentoCliente){
  try {
    let bienesall = await bienes.find({documentoCliente: documentoCliente});
    return bienesall;
  } catch (error) {
    return "Ha ocurrido algo al intentar obtener bienes por cliente\n" + error
  }
};

bienSchema.statics.actualizarBien = async function(datos){
  try {
    let bienActualizado = await bienes.findOneAndUpdate({id:datos.id},{$set:{categoria:datos.categoria, caracteristicas: datos.caracteristicas, documentos: datos.documentos}},{new:true, runValidators:true,context:'query'})
    return bienActualizado
  } catch (error) {
    return "El bien no  pudo ser actualizado\n" + error
  }
};

bienSchema.statics.borrarBien = async function(id){
  try {
    let bienBorrado = await bienes.findOneAndRemove({id: id})
    return bienBorrado
  } catch (error) {
    return "El bien no  pudo se pudo borrar\n" + error
  }
};

const bienes = mongoose.model('bienes',bienSchema);

module.exports = bienes;
