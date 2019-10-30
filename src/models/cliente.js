const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase cliente
const clienteSchema = Schema({
    documento: {
        type: String,
        require: true,
        trim:true,
        unique:true
    },
    nombre: {
        type: String,
        require: true,
        trim:true
    },
    apellido1: {
        type: String,
        require: true,
        trim:true
    },
    apellido2: {
      type: String,
      require: true,
      trim:true
    },
    direccion: {
        type: String,
        trim:true,
        require:true
    },
    telefono: {
        type: String,
        trim:true,
        require:true
    },
    correo: {
        type: String,
        trim:true,
        require:true
    },
    fechaNacimiento: {
        type: Date,
        trim:true,
        require:true
    },
    ingresos: {
        type: Number,
        trim:true,
        require:true
    },
    egresos: {
        type: Number,
        trim:true,
        require:true
    }

});

//Validacion en BD de valores unicos
clienteSchema.plugin(uniqueValidator);

const patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
    Metodo para guardar un cliente
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
clienteSchema.statics.guardarCliente = async (datos)=> {
    
    let validacion = { id: "0", mensaje: ""}

    //Validacion basada en regex de el formato de un correo
    if(!patronCorreo.test(datos.correo)){
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }
    
    //Validacion fechaNacimiento es una fecha valida
    if(isNaN(Date.parse(datos.fechaNacimiento))){
        validacion.mensaje += "La fecha de nacimiento tiene un formato erroneo\n"
    }
    
    //Validacion ingresos es un numero 
    if(isNaN(datos.ingresos)){
        validacion.mensaje += "Los ingresos no son numeros\n"
    }
    
    //Validacion egresos es un numero 
    if(isNaN(datos.egresos)){
		validacion.mensaje += "Los egresos no son numeros\n"
	}

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

    //Objeto cliente
    const clienteNuevo = new clientes(
        {documento: datos.documento,
            nombre: datos.nombre,
            apellido1: datos.apellido1,
            apellido2: datos.apellido2,
            direccion: datos.direccion,
            telefono: datos.telefono,
            correo: datos.correo,
            fechaNacimiento: datos.fechaNacimiento,
            ingresos: datos.ingresos,
            egresos: datos.egresos});
    try {
        //Procedo a guardar en la BD
        await clienteNuevo.save();
        return { id: "1", mensaje: "cliente guardado"};
    } catch (error) {
        if (error.errors.documento.kind==="unique") return { 
            id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "Error desconocido"};
    }
};

clienteSchema.statics.obtenerClientes = async ()=>{
    try {
        const listaClientes = await clientes.find();
        return listaClientes;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener los clientes\n"+ error;
    }
}

clienteSchema.statics.obtenerCliente = async (documento)=> {
    try {
        let cliente = await clientes.findOne({documento: documento});
        return cliente;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el cliente con documento " + documento + "\n"+ error;
    }
}
const clientes = mongoose.model('clientes', clienteSchema);


module.exports = clientes;
