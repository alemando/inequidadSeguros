const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const vendedorSchema = Schema({
    documentoIdentidad:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String,
        requiere: true,
        trim: true
    },
    apellido1:{
        type: String,
        requiere: true,
        trim: true
    },
    apellido2:{
        type: String,
        requiere: true,
        trim: true
    },
    numContacto:{
        type: String,
        requiere: true,
        trim: true
    },
    esAdmin:{
        type: Boolean,
        requiere: false,
        default: false
    },
    //Pendiente modificar para que credencial sea en arcivo separado
    credencial:new Schema({
        documentoIdentidadVendedor:{
            type: String,
            require: true,
            trim: true
        },
        usuario: {
            type: String,
            require: true,
            trim: true
        },
        contrasena:{
            type: String,
            require: true,
            trim: true,
            default: "123456789"
        }
        
    }),
    seguros:{
        require: false 
    }
});
vendedorSchema.plugin(uniqueValidaor);

////////////Funciones estaticas de vendedor
//Obtener todos los vendedores, ¿no deberia comprobarse permisos de admin?
vendedorSchema.statics.obtenerVendedores = async function(){
    try{
        let vendedoresAll = await vendedores.find();
        return vendedoresAll;
    }catch(error){
        return "Error obteniendo los vendedores\n" + error;
    }
}

//Obtiene vendedor por el id
vendedorSchema.statics.obtenerVendedor = async function(id){
    try{
        let vendedor = await vendedores.findOne({documentoIdentidad:id});
        return vendedor;
    }catch(error){
        return "Error obteniendo vendedor por documento identidad\n" + error;
    }
}

//Crea un nuevo vendedor
vendedorSchema.statics.guardarVendedor(datos){
    const vendedorNuevo = new vendedores({
        documentoIdentidad:datos.documentoIdentidad,
        nombre:datos.nombre,
        apellido1:datos.apellido1,
        apellido2:datos.apellido2,
        numContacto:datos.numContacto,
        esAdmin:false
        });
    try {
        await vendedorNuevo.save();
        return "Vendedor guardado";
    } catch (error) {
        if (error.errors.documento.kind==="unique") return "El documento ingresado ya existe en nuestra base de datos";
        else return "Error desconocido";
    }
}

//Actualiza informacion de un vendedor
vendedorSchema.statics.actualizarVendedor = async function(datos) {
    try {
        let vendedorActualizado = await vendedores.findOneAndUpdate({documentoIdentidad:datos.documentoIdentidad}, 
            {$set:{documentoIdentidad:datos.documentoIdentidad,
                nombre:datos.nombre,
                apellido1:datos.apellido1,
                apellido2:datos.apellido2,
                numContacto:datos.numContacto,
                esAdmin:datos.esAdmin,
                }}, 
                {new:true, runValidators:true, context:'query'})
        return "Vendedor actualizado\n" + vendedorActualizado;
    } catch (error) {
        return "El vendedor no se pudo actualizar debido a un error inesperado\n" + error;
    }
}

//Se borra un vendedor por su documentoIdentidad
vendedorSchema.statics.borrarVendedor = async function(documento){
    try {
        let respuesta = await vendedores.findOneAndDelete({documentoIdentidad:documento})
        return respuesta;
    } catch (error) {
        return "El vendedor no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

//Se retorna clase vendedores para exportar
const vendedores = mongoose.model('vendedoresbienes',vendedorSchema);

module.exports = vendedores;