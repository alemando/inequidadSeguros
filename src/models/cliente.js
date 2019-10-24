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
    const clienteNuevo = new clientes(
        {documento:datos.documento,
            nombre:datos.nombre,
            apellido1:datos.apellido1,
            apellido2:datos.apellido2,
            direccion:datos.direccion,
            telefono:datos.telefono,
            correo:datos.correo,
            fechaNacimiento:datos.fechaNacimiento,
            ingresos:datos.ingresos,
            egresos:datos.egresos});
    try {
        await clienteNuevo.save();
        return "cliente guardado";
    } catch (error) {
        if (error.errors.documento.kind==="unique") return "El documento ingresado ya existe en nuestra base de datos";
        else return "error desconocido";
    }
};
clienteSchema.statics.obtenerClientes = async function() {
    try {
        let clientela = await clientes.find();
        return clientela;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener los clientes\n"+ error;
    }
}
clienteSchema.statics.obtenerCliente = async function(documento) {
    try {
        let cliente = await clientes.findOne({documento:documento});
        return cliente;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el cliente\n"+ error;
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
        return "el cliente no se pudo actualizar debido a un error inesperado\n" + error;
    }
}
clienteSchema.statics.borrarCliente = async function(documento){
    try {
        let respuesta = await clientes.findOneAndDelete({documento:documento})
        return respuesta;
    } catch (error) {
        return "el cliente no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}
const clientes = mongoose.model('clientes', clienteSchema);


module.exports = clientes;
