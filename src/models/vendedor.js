const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase vendedor
const vendedorSchema = Schema({
    documento:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    apellido1:{
        type: String,
        require: true,
        trim: true
    },
    apellido2:{
        type: String,
        trim: true
    },
    telefono:{
        type: Number,
        require: true,
        trim: true
    },
    correo:{
        type: String,
        require: true,
        trim: true
    },
    esAdmin:{
        type: Boolean,
        require: true,
        default: false
    },
    habilitado:{
        type: Boolean,
        require:true,
        default:true
    }
});

//Validacion en BD de valores unicos
vendedorSchema.plugin(uniqueValidator);

const patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
    Metodo para guardar un vendedor
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
vendedorSchema.statics.guardarVendedor = async (datos)=> {

    let validacion = { id: "0", mensaje: ""}
    
    //Validacion basada en regex de el formato de un correo
    if(!patronCorreo.test(datos.correo)){
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }
    
    //Validaciones documento negativo o nulo
    if(datos.documento == "" || datos.documento == null || parseInt(datos.documento) < 0){
        validacion.mensaje += "El documento de identificacion no es valido\n";
    }
    
    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

    //Objeto vendedor
    const vendedorNuevo = new vendedores({
        documento: datos.documento,
        nombre: datos.nombre,
        apellido1: datos.apellido1,
        apellido2: datos.apellido2,
        telefono: datos.telefono,
        correo: datos.correo
        });
    try {
        await vendedorNuevo.save();
        return { id: "1", mensaje: "Vendedor guardado"};
    } catch (error) {
        if (error.errors.documento.kind==="unique") return { 
            id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "Error desconocido"};
    }
}

//Obtener todos los vendedores
vendedorSchema.statics.obtenerVendedores = async ()=> {
    try{
        let listaVendedores = await vendedores.find();
        return listaVendedores;
    }catch(error){
        return "Error obteniendo los vendedores\n" + error;
    }
}

//Obtiene vendedor por el documento
vendedorSchema.statics.obtenerVendedor = async (id)=> {
    try{
        let vendedor = await vendedores.findOne({documento: id});
        return vendedor;
    }catch(error){
        return "Error obteniendo vendedor por documento identidad\n" + error;
    }
}

//Obtiene vendedor por el id
vendedorSchema.statics.obtenerVendedorById = async (id)=> {
    try{
        let vendedor = await vendedores.findById(id);
        return vendedor;
    }catch(error){
        return "Error obteniendo vendedor por documento identidad\n" + error;
    }
}

vendedorSchema.statics.inhabilitar = async (id, admin) =>{
    let validacion = { id: "0", mensaje: ""};
    if (admin) {
        try {
            let doc = await vendedores.findById(id,"habilitado");
            if (doc.habilitado == false){
                validacion.mensaje += "Este vendedor ya se encuentra inhabilitado"    
            }else{
                await vendedores.findByIdAndUpdate(id,{habilitado:false});
                return {id:"1",mensaje:"Vendedor inhabilitado exitosamente!"}
            }
        }
        catch(error){
            return {id:"0",mensaje:"Algo ha salido mal:\n"+error};
        }
    }
    else return {id:"0", mensaje:"No posees privilegios de administrador"};
}

//Se retorna clase vendedores para exportar
const vendedores = mongoose.model('vendedores',vendedorSchema);

module.exports = vendedores;