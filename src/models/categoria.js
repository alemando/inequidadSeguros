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

categoriaSchema.statics.guardarCategoria = async function(datos) {

    const categoriaNuevo = new categorias({nombre:datos.nombre});
    try {
        await categoriaNuevo.save();
        return { id: "1", mensaje: "categoria guardada"};
    } catch (error) {
        if (error.errors.nombre.kind==="unique") return { 
            id: "2", mensaje: "La categoria ingresada ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "error desconocido"};
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
// categoriaSchema.statics.actualizarCategoria = async function(datos) {
//     try {
//         let categoriaActualizado = await categorias.findOneAndUpdate({documento:datos.documento}, {$set:{nombre:datos.nombre, apellido1:datos.apellido1, apellido2:datos.apellido2, direccion:datos.direccion, telefono:datos.telefono, fechaNacimiento:datos.fechaNacimiento, ingresos:datos.ingresos, egresos:datos.egresos}}, {new:true, runValidators:true, context:'query'})
//         return "Categoria actualizado\n" + categoriaActualizado;
//     } catch (error) {
//         return "el categoria no se pudo actualizar debido a un error inesperado\n" + error;
//     }
// }
categoriaSchema.statics.borrarCategoria = async function(nombre){
    try {
        let respuesta = await categorias.findOneAndDelete({nombre:nombre})
        return respuesta;
    } catch (error) {
        return "el categoria no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

const categorias = mongoose.model('categorias',categoriaSchema);

module.exports = categorias;