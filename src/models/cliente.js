const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

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
clienteSchema.plugin(uniqueValidator);

clienteSchema.statics.guardarCliente = async function(datos) {
    
    var patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    let validacion = { id: "0", mensaje: ""}

    if(!patronCorreo.test(datos.correo)){
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }
    
    if(isNaN(Date.parse(datos.fechaNacimiento))){
        validacion.mensaje += "La fecha de nacimiento tiene un formato erroneo\n"
    }
    
    if(isNaN(datos.ingresos)){
        validacion.mensaje += "Los ingresos no son numeros\n"
    }
    
    if(isNaN(datos.egresos)){
		validacion.mensaje += "Los egresos no son numeros\n"
	}

    if(validacion.mensaje.length!=0) return validacion

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
        await clienteNuevo.save();
        return { id: "1", mensaje: "cliente guardado"};
    } catch (error) {
        if (error.errors.documento.kind==="unique") return { 
            id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "error desconocido"};
    }
};
clienteSchema.statics.obtenerClientes = async function() {
    try {
        let clientela = await clientes.find();
        return clientela;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener los clientes"+ error;
    }
}
clienteSchema.statics.obtenerCliente = async function(documento) {
    try {
        let cliente = await clientes.findOne({documento:documento});
        return cliente;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el cliente"+ error;
    }
}
clienteSchema.statics.actualizarCliente = async function(datos) {
    try {
        let clienteActualizado = await clientes.findOneAndUpdate({documento:datos.documento}, 
            {$set:{documento:datos.documento,
                nombre:datos.nombre,
                apellido1:datos.apellido1,
                apellido2:datos.apellido2,
                direccion:datos.direccion,
                telefono:datos.telefono,
                correo:datos.correo,
                fechaNacimiento:datos.fechaNacimiento,
                ingresos:datos.ingresos,
                egresos:datos.egresos}}, 
                {new:true, runValidators:true, context:'query'})
        return "Cliente actualizado\n" + clienteActualizado;
    } catch (error) {
        return "el cliente no se pudo actualizar debido a un error inesperado" + error;
    }
}
clienteSchema.statics.borrarCliente = async function(documento){
    try {
        let respuesta = await clientes.findOneAndDelete({documento:documento})
        return respuesta;
    } catch (error) {
        return "el cliente no se ha podido eliminar, ha ocurrido algo inesperado" + error;
    }
}
const clientes = mongoose.model('clientes', clienteSchema);


module.exports = clientes;
