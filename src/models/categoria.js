const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const categoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim:true,
        unique:true
    },
    criteriosBase: [{_id:Schema.Types.ObjectId,nombre:String, descripcion:String, monto_cubrir:Number, deducible:String}]
});
categoriaSchema.plugin(uniqueValidator);

categoriaSchema.statics.guardarCategoria = async function(datos) {
    const categoriaNuevo = new categorias({nombre:datos.nombre, criteriosBase:datos.criteriosBase});
    try {
        await categoriaNuevo.save();
        return "categoria guardada";
    } catch (error) {
        if (error.errors.nombre.kind==="unique") return "La categoria ingresada ya existe en nuestra base de datos";
        else return "error desconocido";
    }
};
categoriaSchema.statics.obtenerCategorias = async function() {
    try {
        let categoriasLi = await categorias.find();
        return categoriasLi;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener las categorias\n"+ error;
    }
}
categoriaSchema.statics.obtenerCategoria = async function(nombre) {
    try {
        let categoria = await categorias.findOne({nombre:nombre});
        return categoria;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el categoria\n"+ error;
    }
}
categoriaSchema.statics.actualizarCategoria = async function(datos) {
    try {
        let categoriaActualizado = await categorias.findOneAndUpdate({nombre:datos.nombre}, {$set:{nombre:datos.nombre, criteriosBase:datos.criteriosBase}}, {new:true, runValidators:true, context:'query'})
        return "Categoria actualizado\n" + categoriaActualizado;
    } catch (error) {
        return "el categoria no se pudo actualizar debido a un error inesperado\n" + error;
    }
}

categoriaSchema.statics.borrarCategoria = async function(nombre){
    try {
        let respuesta = await categorias.findOneAndDelete({nombre:nombre})
        return respuesta;
    } catch (error) {
        return "el categoria no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

categoriaSchema.statics.agregarCriterioBase = async function(datos){
    try{
        let respuesta = await categorias.findOneAndUpdate({nombre:datos.categoria},{$addToSet:{"criteriosBase":{$each:[{_id:datos._id,nombre:datos.nombre, descripcion:datos.descripcion, monto_cubrir:datos.monto_cubrir, deducible:datos.deducible}]}}})
    } catch(error){
        return "El criterio no se ha podido agregar a la categoria por el error: \n" + error
    }
}

categoriaSchema.statics.criteriosCategoria = async function(nombre){
    try{
        let respuesta = await categorias.findOne({nombre:nombre})
        let criteriosDeCategoria = respuesta.criteriosBase
        return criteriosDeCategoria
    }catch(error){
        return 
    }
}

const categorias = mongoose.model('categorias',categoriaSchema);

module.exports = categorias;