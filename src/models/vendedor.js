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

//

//Se retorna clase vendedores para exportar
const vendedores = mongoose.model('vendedoresbienes',vendedorSchema);

module.exports = vendedores;