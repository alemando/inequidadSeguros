const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const categorias = require('./categoria')
const seguros = require('./seguro')
const Schema = mongoose.Schema;

const criterioSchema = Schema({
    idSeguro:{
        type: Schema.Types.ObjectId,
        ref:"seguros",
        require: true,
    },
    nombre: {
        type: String,
        require: true,
        trim:true,
    },
    descripcion:{
        type: String,
        require: true,
        trim: true,
    },
    monto_cubrir: {
        type: Number,
        require: true,
        trim:true
    },
    deducible: {
      type: String,
      require: true,
      trim:true
    },
    observaciones: {
      type: String,
      require: false,
      trim: true
    }
});

criterioSchema.plugin(uniqueValidator);

criterioSchema.statics.guardarCriterio = async function(datos) {
    const criterioNuevo = new criterios(
        {idSeguro:datos.idSeguro,
          nombre:datos.nombre,
          descripcion:datos.descripcion,
          monto_cubrir:datos.monto_cubrir,
          deducible:datos.deducible,
          observaciones:datos.observaciones});
    try {
        var seguro = await seguros.obtenerSeguro(datos.idSeguro)
        var exists = false
        for (var i = 0; i<seguro.arrayCriterios.length; i++){
            if(datos.nombre == seguro.arrayCriterios[i].nombre){exists=true;break}
        }
        if(!exists){
            await criterioNuevo.save();
            await seguros.agregarCriterio(criterioNuevo)
            return "Criterio guardado"}
        else{
            return "El criterio de nombre: "+datos.nombre+", ya existe para el seguro "+ seguro._id
        }
    } catch (error) {
        return "Error desconocido: \n"+error;
    }
};

criterioSchema.statics.obtenerCriterios = async function() {
    try {
        let listado = await criterios.find();
        return listado;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los criterios\n"+ error;
    }
}

criterioSchema.statics.obtenerCriterio = async function(id) {
    try {
        let criterio = await criteriosBase.findById(id);
        return criterio;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el criterio\n"+ error;
    }
}

criterioSchema.statics.actualizarCriterio = async function(datos) {
    try {
        let criterioActualizado = await criteriosBase.findByIdAndUpdate(datos._id, 
            {$set:{idSeguro:datos.idSeguro,
                nombre:datos.nombre,
                descripcion:datos.descripcion,
                monto_cubrir:datos.monto_cubrir,
                deducible:datos.deducible,
              observaciones:datos.observaciones}}, 
                {new:true, runValidators:true, context:'query'})
        return "Criterio actualizado\n" + criterioActualizado;
    } catch (error) {
        return "El criterio no se pudo actualizar debido a un error inesperado\n" + error;
    }
}

criterioSchema.statics.borrarCriterio = async function(datos){
    try {
        let respuesta = await criteriosBase.findOneAndDelete({idSeguro:datos.idSeguro, nombre:datos.nombre})
        let respuesta1 = await categorias.findByIdAndUpdate(datos.idSeguro,{$pull:{arrayCriterios:{nombre:datos.nombre}}})
        return respuesta +"\n" + respuesta1;
    } catch (error) {
        return "El criterio no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

const criterios = mongoose.model('criterios', criterioSchema);

module.exports = criterios;
