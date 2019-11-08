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
    criteriosBase: [{
        nombre:{
            type:String,
            require:true,
            trim: true},
        descripcion:{
            type:String,
            require:true,
            trim: true},
        montoCubrir:{
            type:Number,
            require:true,
            trim: true},
        deducible:{
            type:String,
            require:true,
            trim: true}
    }]
})
categoriaSchema.plugin(uniqueValidator);

categoriaSchema.statics.guardarCategoria = async (datos)=> {
    const categoriaNuevo = new categorias({nombre: datos.nombre, criteriosBase:datos.criteriosBase});
    try {
        let repetido = false
        for(var i = 0; i<categoriaNuevo.criteriosBase.length;i++){
            for(var j = i; j<categoriaNuevo.criteriosBase.length;j++){
                if(categoriaNuevo.criteriosBase[i].nombre==categoriaNuevo.criteriosBase[j].nombre && j!=i){
                    repetido = true
                    break
                }
            }
        }
        if(!repetido){
            await categoriaNuevo.save()
            return "Categoría guardada."
        }else{
            return "Categoría no guardada, asegúrese de que los criterios tengan nombres diferentes."
        }
    } catch (error) {
        if (error.errors.nombre.kind==="unique") return "Ya existe una categoría "+datos.nombre+" en la base de datos.";
        else return "Error desconocido: \n" + error;
    }
};
categoriaSchema.statics.obtenerCategorias = async function() {
    try {
        let categoriasLi = await categorias.find();
        return categoriasLi;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener las categorías: \n"+ error;
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
        return "Categoria actualizado: \n" + categoriaActualizado;
    } catch (error) {
        return "el categoria no se pudo actualizar debido a un error inesperado\n" + error;
    }
}

categoriaSchema.statics.borrarCategoria = async function(nombre){
    try {
        let respuesta = await categorias.findOneAndDelete({nombre:nombre})
        return respuesta;
    } catch (error) {
        return "La categoría no se ha podido eliminar, ha ocurrido algo inesperado: \n" + error;
    }
}

categoriaSchema.statics.agregarCriteriosBase = async function(datos){
    try{
        let categoriaActual = await categorias.findOne({nombre:datos.nombre})
        let repetido = false
        for (i=0; i<categoriaActual.criteriosBase.length; i++){
            for (j=0; j<datos.criteriosBase.length; j++){
                if(categoriaActual.criteriosBase[i].nombre==datos.criteriosBase[j].nombre){
                    repetido = true
                    break
                }
            }
        }
        for (i=0; i<datos.criteriosBase.length; i++){
            for (j=0; j<datos.criteriosBase.length; j++){
                if(datos.criteriosBase[i].nombre==datos.criteriosBase[j].nombre && i!=j){
                    repetido = true
                    break
                }
            }
        }
        if(!repetido){
            let respuesta = await categorias.findOneAndUpdate({nombre:datos.nombre},{$addToSet:{"criteriosBase":{$each:datos.criteriosBase}}},{new:true, runValidators:true, context:'query'})
            return respuesta
        } else{
            return "Asegúrese de que los nombres de los criterios nuevos sean diferentes a los actuales y diferentes entre ellos."
        }
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
        return error
    }
}

const categorias = mongoose.model('categorias', categoriaSchema);

module.exports = categorias;