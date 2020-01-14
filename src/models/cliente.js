const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase cliente
const clienteSchema = Schema({
    documento: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido1: {
        type: String,
        require: true,
        trim: true
    },
    apellido2: {
        type: String,
        require: true,
        trim: true
    },
    direccion: {
        type: String,
        trim: true,
        require: true
    },
    telefono: {
        type: String,
        trim: true,
        require: true
    },
    correo: {
        type: String,
        trim: true,
        require: true
    },
    fechaNacimiento: {
        type: Date,
        trim: true,
        require: true
    },
    ingresos: {
        type: Number,
        trim: true,
        require: true
    },
    egresos: {
        type: Number,
        trim: true,
        require: true
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
clienteSchema.statics.guardarCliente = async (datos) => {

    let validacion = { id: "0", mensaje: "" }
    //Validacion del documento si  es un numero
    if (isNaN(datos.documento)) {
        validacion.mensaje += "El documento no es un numero\n"
    }

    //Validacion de nularidad documento o string vacio(obligatorio)
    if (datos.documento == null) {
        validacion.mensaje += "Documento no guardado, no puedes dejar el documento null"
    } else if (datos.documento == "") {
        validacion.mensaje += "Documento no guardado, asegúrese de que el documento si este ingresado"
    }

    //Validacion de nularidad nombre o string vacio(obligatorio)
    if (datos.nombre == null) {
        validacion.mensaje += "Nombre no guardado, no puedes dejar el Nombre null"
    } else if (datos.nombre == "") {
        validacion.mensaje += "Nombre no guardado, asegúrese de que el Nombre si este ingresado"
    }

    //Validacion de nularidad apellido1 o string vacio(obligatorio)
    if (datos.apellido1 == null) {
        validacion.mensaje += "Apellido1 no guardado, no puedes dejar el Apellido1 null"
    } else if (datos.apellido1 == "") {
        validacion.mensaje += "Apellido1 no guardado, asegúrese de que el Apellido1 si este ingresado"
    }

    //Validacion de nularidad apellido2
    if (datos.apellido2 == null) {
        validacion.mensaje += "Apellido2 no guardado, no puedes dejar el Apellido2 null"
    }

    //Validacion de nularidad direccion o string vacio(obligatorio)
    if (datos.direcciom == null) {
        validacion.mensaje += "Direccion no guardada no puedes dejar la Direccion null"
    } else if (datos.direccion == "") {
        validacion.mensaje += "Direccion no guardada, asegúrese de que la Direccion si este ingresado"
    }

    //Validacion del telefono si  es un numero
    if (isNaN(datos.telefono)) {
        validacion.mensaje += "El telefono no es un numero\n"
    }

    //Validacion de nularidad telefono o string vacio(obligatorio)
    if (datos.telefono == null) {
        validacion.mensaje += "Telefono no guardado, no puedes dejar el Telefono null"
    } else if (datos.telefono == "") {
        validacion.mensaje += "Telefono no guardado, asegúrese de que el Telefono si este ingresado"
    }

    //Validacion de nularidad direccion o string vacio(obligatorio)
    if (datos.direccion == null) {
        validacion.mensaje += "Direccion no guardada, no puedes dejar la Direccion null"
    } else if (datos.direccion == "") {
        validacion.mensaje += "Direccion no guardada, asegúrese de que la Direccion si este ingresado"
    }

    //Validacion de nularidad fechaNacimiento string vacio(obligatorio)
    if (datos.fechaNacimiento == null) {
        validacion.mensaje += "FechaNacimiento no guardado, no puedes dejar la fechaNacimiento null"
    } else if (datos.fechaNacimiento == "") {
        validacion.mensaje += "FechaNacimiento no guardado, asegúrese de que la fechaNacimiento si este ingresado"
    }

    //Validacion de nularidad ingresos o string vacio(obligatorio)
    if (datos.ingresos == null) {
        validacion.mensaje += "Ingresos no guardados, no puedes dejar los Ingresos null"
    } else if (datos.ingresos == "") {
        validacion.mensaje += "Ingresos no guardados, asegúrese de que los Ingresos si estan ingresados"
    }

    //Validacion de nularidad egresos o string vacio(obligatorio)
    if (datos.egresos == null) {
        validacion.mensaje += "egresos no guardados, no puedes dejar los egresos null"
    } else if (datos.egresos == "") {
        validacion.mensaje += "egresos no guardado, asegúrese de que los egresos si estan ingresados"
    }


    //Validacion basada en regex de el formato de un correo
    if (!patronCorreo.test(datos.correo)) {
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }

    //Validacion fechaNacimiento es una fecha valida
    if (isNaN(Date.parse(datos.fechaNacimiento))) {
        validacion.mensaje += "La fecha de nacimiento tiene un formato erroneo\n"
    }

    //Validacion ingresos es un numero 
    if (isNaN(datos.ingresos)) {
        validacion.mensaje += "Los ingresos no son numeros\n"
    }

    //Validacion egresos es un numero 
    if (isNaN(datos.egresos)) {
        validacion.mensaje += "Los egresos no son numeros\n"
    }

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if (validacion.mensaje.length != 0) return validacion

    //Objeto cliente
    const clienteNuevo = new clientes(
        {
            documento: datos.documento,
            nombre: datos.nombre,
            apellido1: datos.apellido1,
            apellido2: datos.apellido2,
            direccion: datos.direccion,
            telefono: datos.telefono,
            correo: datos.correo,
            fechaNacimiento: datos.fechaNacimiento,
            ingresos: datos.ingresos,
            egresos: datos.egresos
        });
    try {
        //Procedo a guardar en la BD
        await clienteNuevo.save();
        return { id: "1", mensaje: "cliente guardado" };
    } catch (error) {
        if (error.errors.documento.kind === "unique") return {
            id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"
        };
        else return { id: "0", mensaje: "Error desconocido" };
    }
};

//Metodo para reotornar todos los clientes de la BD
clienteSchema.statics.obtenerClientes = async () => {
    try {
        const listaClientes = await clientes.find();
        return listaClientes;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener los clientes\n" + error;
    }
}

//Metodo para retornar un cliente por su documento
clienteSchema.statics.obtenerCliente = async (documento) => {
    try {
        let cliente = await clientes.findOne({ documento: documento });
        return cliente;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el cliente con documento " + documento + "\n" + error;
    }
}

//Metodo para retornar un cliente por su id
clienteSchema.statics.obtenerClienteById = async (id) => {
    try {
        let cliente = await clientes.findById(id)
        return cliente;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el cliente con id " + id + "\n" + error;
    }
}

const clientes = mongoose.model('clientes', clienteSchema);

module.exports = clientes;