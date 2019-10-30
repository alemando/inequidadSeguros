const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const categorias = require('./categoria')
const Schema = mongoose.Schema;

const criterioBaseSchema = Schema({
    categoria:{
        type: String,
        require: true,
        trim: true
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
    }
});

criterioBaseSchema.plugin(uniqueValidator);

criterioBaseSchema.statics.guardarCriterioBase = async function(datos) {
    const criterioNuevo = new criteriosBase(
        {categoria:datos.categoria,
            nombre:datos.nombre,
            descripcion:datos.descripcion,
            monto_cubrir:datos.monto_cubrir,
            deducible:datos.deducible,});
    try {
        var criteriosCategoria = await categorias.obtenerCategoria(datos.categoria)
        var exists = false
        for (var i = 0; i<criteriosCategoria.criteriosBase.length; i++){
            if(datos.nombre == criteriosCategoria.criteriosBase[i].nombre){exists=true;break}
        }
        if(!exists){
            await criterioNuevo.save();
            await categorias.agregarCriterioBase(criterioNuevo)
            return "Criterio guardado"}
        else{
            return "El criterio de nombre: "+datos.nombre+", ya existe para la categoría "+datos.categoria
        }
    } catch (error) {
        return "Error desconocido: \n"+error;
    }
};

criterioBaseSchema.statics.obtenerCriteriosBase = async function() {
    try {
        let listado = await criteriosBase.find();
        return listado;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los criterios\n"+ error;
    }
}

criterioBaseSchema.statics.obtenerCriterioBase = async function(id) {
    try {
        let criterio = await criteriosBase.findById(id);
        return criterio;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el criterio\n"+ error;
    }
}

criterioBaseSchema.statics.actualizarCriterioBase = async function(datos) {
    try {
        let criterioActualizado = await criteriosBase.findByIdAndUpdate(datos._id, 
            {$set:{categoria:datos.categoria,
                nombre:datos.nombre,
                descripcion:datos.descripcion,
                monto_cubrir:datos.monto_cubrir,
                deducible:datos.deducible}}, 
                {new:true, runValidators:true, context:'query'})
        return "Criterio actualizado\n" + criterioActualizado;
    } catch (error) {
        return "El criterio no se pudo actualizar debido a un error inesperado\n" + error;
    }
}

criterioBaseSchema.statics.borrarCriterioBase = async function(datos){
    try {
        let respuesta = await criteriosBase.findOneAndDelete({categoria:datos.categoria, nombre:datos.nombre})
        let respuesta1 = await categorias.findOneAndUpdate({nombre:datos.categoria},{$pull:{criteriosBase:{nombre:datos.nombre}}})
        return respuesta +"\n" + respuesta1;
    } catch (error) {
        return "El criterio no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

const criteriosBase = mongoose.model('criteriosBase', criterioBaseSchema);

module.exports = criteriosBase;