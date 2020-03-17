const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const vendedorModel = require('../models/vendedor');
const moment = require('moment');
const Schema = mongoose.Schema;
const seguroModel = require('../models/seguro');

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
        trim: true
    },
    direccion: {
        type: String,
        trim: true,
        require: true
    },
    telefono: {
        type: Number,
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
    },
    //true si es habilitado
    estado: {
        type: Boolean,
        require: true
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'vendedores',
        trim: true
    },
    fechaCreacion: {
        type: Date,
        require: true,
        trim: true,
        default: moment().format("YYYY-MM-DD")
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
clienteSchema.statics.guardarCliente = async (datos, idVendedor) => {

    let validacion = { id: "0", mensaje: "" }
    //Validacion del documento si  es un numero
    if (isNaN(datos.documento)) {
        validacion.mensaje += "El documento no es un numero.\n"
    }

    //Validacion de nularidad documento o string vacio(obligatorio)
    if (datos.documento == null) {
        validacion.mensaje += "Documento no guardado, no puedes dejar el documento vacio."
    } else if (datos.documento == "") {
        validacion.mensaje += "Documento no guardado, asegúrese de que el documento se ingreso correctamente."
    }

    //Validacion de nularidad nombre o string vacio(obligatorio)
    if (datos.nombre == null) {
        validacion.mensaje += "Nombre no guardado, no puedes dejar el nombre vacio."
    } else if (datos.nombre == "") {
        validacion.mensaje += "Nombre no guardado, asegúrese de que el nombre se ingreso correctamente."
    }

    //Validacion de nularidad apellido1 o string vacio(obligatorio)
    if (datos.apellido1 == null) {
        validacion.mensaje += "Apellido1 no guardado, no puedes dejar el Apellido1 vacio."
    } else if (datos.apellido1 == "") {
        validacion.mensaje += "Apellido1 no guardado, asegúrese de que el Apellido1 se ingreso correctamente."
    }

    //Validacion de nularidad apellido2
    if (datos.apellido2 == null) {
        validacion.mensaje += "Apellido2 no guardado, no puedes dejar el Apellido2 vacio."
    }

    //Validacion de nularidad direccion o string vacio(obligatorio)
    if (datos.direccion == null) {
        validacion.mensaje += "Direccion no guardada no puedes dejar la direccion vacia."
    } else if (datos.direccion == "") {
        validacion.mensaje += "Direccion no guardada, asegúrese de que la direccion se ingreso correctamente."
    }

    //Validacion del telefono si  es un numero
    if (isNaN(datos.telefono)) {
        validacion.mensaje += "El telefono no es un numero\n"
    }

    //Validacion de nularidad telefono o string vacio(obligatorio)
    if (datos.telefono == null) {
        validacion.mensaje += "Telefono no guardado, no puedes dejar el telefono vacio."
    } else if (datos.telefono == "") {
        validacion.mensaje += "Telefono no guardado, asegúrese de que el telefono si se ingreso correctamente."
    }

    //Validacion de nularidad direccion o string vacio(obligatorio)
    if (datos.direccion == null) {
        validacion.mensaje += "Direccion no guardada, no puedes dejar la direccion vacia."
    } else if (datos.direccion == "") {
        validacion.mensaje += "Direccion no guardada, asegúrese de que la direccion si se ingreso correctamente."
    }

    //Validacion de nularidad fechaNacimiento string vacio(obligatorio)
    if (datos.fechaNacimiento == null) {
        validacion.mensaje += "Fecha de nacimiento no guardada, no puedes dejarla vacia."
    } else if (datos.fechaNacimiento == "") {
        validacion.mensaje += "Fecha de nacimiento no guardada, asegúrese de que si se ingreso correctamente."
    }

    //Validacion de nularidad ingresos o string vacio(obligatorio)
    if (datos.ingresos == null) {
        validacion.mensaje += "Ingresos no guardados, no puedes dejar los ingresos vacio."
    } else if (datos.ingresos == "") {
        validacion.mensaje += "Ingresos no guardados, asegúrese de que los ingresos se ingresaron correctamente."
    }

    //Validacion de nularidad egresos o string vacio(obligatorio)
    if (datos.egresos == null) {
        validacion.mensaje += "Egresos no guardados, no puedes dejar los egresos vacios."
    } else if (datos.egresos == "") {
        validacion.mensaje += "Egresos no guardado, asegúrese de que los egresos se ingresaron correctamente."
    }

    if (await vendedorModel.obtenerVendedorById(idVendedor) == null) {
        validacion.mensaje += "El seguro no ha sido guardado, el vendedor no existe en la base de datos.\n"
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
            egresos: datos.egresos,
            estado: true,
            vendedor: idVendedor
        });
    try {
        //Procedo a guardar en la BD
        await clienteNuevo.save();
        return { id: "1", mensaje: "El cliente ha sido guardado correctamente." };
    } catch (error) {
        if (error.errors.documento.kind === "unique") return {
            id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"
        };
        else return { id: "0", mensaje: "Error desconocido" };
    }
};

//Metodo para reotornar todos los clientes de la BD
clienteSchema.statics.obtenerClientes = async (admin) => {
    try {
        let listaClientes = null
        if (admin) {
            listaClientes = await clientes.find();
        } else {
            listaClientes = await clientes.find({ estado: true });
        }
        return listaClientes;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los clientes\n" + error;
    }
}

//Metodo para retornar un cliente por su documento
clienteSchema.statics.obtenerCliente = async (documento) => {
    try {
        let cliente = await clientes.findOne({ documento: documento });
        return cliente;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el cliente con documento " + documento + "\n" + error;
    }
}

//Metodo para retornar un cliente por su id
clienteSchema.statics.obtenerClienteById = async (id) => {
    try {
        let cliente = await clientes.findById(id)
        return cliente;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el cliente con id " + id + "\n" + error;
    }
}

//Método para obtener clientes que tienen bienes
clienteSchema.statics.obtenerClientesConBienes = async () => {
    //Requerido para hacer uso de sus métodos en el método
    const Bienes = require('./bien')
    try {
        const listaClientes = await clientes.obtenerClientes()
        let listaClientesBienes = []
        for (let i = 0; i < listaClientes.length; i++) {
            bienes = await Bienes.obtenerBienesPorCliente(listaClientes[i]._id)
            if (bienes.length != 0) {
                listaClientesBienes.push(listaClientes[i])
            }
        }
        return listaClientesBienes
    }
    catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los clientes con bienes: \n" + error;
    }
}

//Editar cliente
clienteSchema.statics.actualizarCliente = async (datos, admin) => {

    let validacion = { id: "0", mensaje: "" }
    try {
        let cliente = await clientes.findOne({ documento: datos.documento });
        if (cliente == null) {
            throw 'El cliente no existe';
        }
        else {
            if (admin) {
                if (isNaN(datos.documento)) {
                    validacion.mensaje += "El documento no es un numero.\n"
                }

                //Validacion de nularidad documento o string vacio(obligatorio)
                if (datos.documento == null) {
                    validacion.mensaje += "Documento no guardado, no puedes dejar el documento vacio."
                } else if (datos.documento == "") {
                    validacion.mensaje += "Documento no guardado, asegúrese de que el documento se ingreso correctamente."
                }

                //Validacion de nularidad nombre o string vacio(obligatorio)
                if (datos.nombre == null) {
                    validacion.mensaje += "Nombre no guardado, no puedes dejar el nombre vacio."
                } else if (datos.nombre == "") {
                    validacion.mensaje += "Nombre no guardado, asegúrese de que el nombre se ingreso correctamente."
                }

                //Validacion de nularidad apellido1 o string vacio(obligatorio)
                if (datos.apellido1 == null) {
                    validacion.mensaje += "Apellido1 no guardado, no puedes dejar el Apellido1 vacio."
                } else if (datos.apellido1 == "") {
                    validacion.mensaje += "Apellido1 no guardado, asegúrese de que el Apellido1 se ingreso correctamente."
                }

                //Validacion de nularidad apellido2
                if (datos.apellido2 == null) {
                    validacion.mensaje += "Apellido2 no guardado, no puedes dejar el Apellido2 vacio."
                }

                //Validacion de nularidad direccion o string vacio(obligatorio)
                if (datos.direccion == null) {
                    validacion.mensaje += "Direccion no guardada no puedes dejar la direccion vacia."
                } else if (datos.direccion == "") {
                    validacion.mensaje += "Direccion no guardada, asegúrese de que la direccion se ingreso correctamente."
                }

                //Validacion del telefono si  es un numero
                if (isNaN(datos.telefono)) {
                    validacion.mensaje += "El telefono no es un numero\n"
                }

                //Validacion de nularidad telefono o string vacio(obligatorio)
                if (datos.telefono == null) {
                    validacion.mensaje += "Telefono no guardado, no puedes dejar el telefono vacio."
                } else if (datos.telefono == "") {
                    validacion.mensaje += "Telefono no guardado, asegúrese de que el telefono si se ingreso correctamente."
                }

                //Validacion de nularidad direccion o string vacio(obligatorio)
                if (datos.direccion == null) {
                    validacion.mensaje += "Direccion no guardada, no puedes dejar la direccion vacia."
                } else if (datos.direccion == "") {
                    validacion.mensaje += "Direccion no guardada, asegúrese de que la direccion si se ingreso correctamente."
                }

                //Validacion de nularidad fechaNacimiento string vacio(obligatorio)
                if (datos.fechaNacimiento == null) {
                    validacion.mensaje += "Fecha de nacimiento no guardada, no puedes dejarla vacia."
                } else if (datos.fechaNacimiento == "") {
                    validacion.mensaje += "Fecha de nacimiento no guardada, asegúrese de que si se ingreso correctamente."
                }

                //Validacion de nularidad ingresos o string vacio(obligatorio)
                if (datos.ingresos == null) {
                    validacion.mensaje += "Ingresos no guardados, no puedes dejar los ingresos vacio."
                } else if (datos.ingresos == "") {
                    validacion.mensaje += "Ingresos no guardados, asegúrese de que los ingresos se ingresaron correctamente."
                }

                //Validacion de nularidad egresos o string vacio(obligatorio)
                if (datos.egresos == null) {
                    validacion.mensaje += "Egresos no guardados, no puedes dejar los egresos vacios."
                } else if (datos.egresos == "") {
                    validacion.mensaje += "Egresos no guardado, asegúrese de que los egresos se ingresaron correctamente."
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

                if (validacion.mensaje.length != 0) return validacion

                cliente.nombre = datos.nombre;
                cliente.apellido1 = datos.apellido1;
                cliente.apellido2 = datos.apellido2;
                cliente.direccion = datos.direccion;
                cliente.telefono = datos.telefono;
                cliente.correo = datos.correo;
                cliente.fechaNacimiento = datos.fechaNacimiento;
                cliente.ingresos = datos.ingresos;
                cliente.egresos = datos.egresos;


                await cliente.save();

                validacion.id = '1';
                validacion.mensaje = 'Cliente editado con éxito';
                return validacion;
            }
            else {
                throw 'No posees permisos para ejecutar esta acción';
            }
        }
    } catch (error) {
        return {
            id: '2',
            mensaje: `Error obteniendo de cliente por documento: ${error}`
        };
    }

}
//Método para obtener clientes que tienen bienes
clienteSchema.statics.obtenerClientesConBienesHabilitados = async () => {
    //Requerido para hacer uso de sus métodos en el método
    const Bienes = require('./bien')
    try {
        const listaClientes = await clientes.find({ estado: true });
        let listaClientesBienes = []
        for (let i = 0; i < listaClientes.length; i++) {
            bienes = await Bienes.obtenerBienesPorCliente(listaClientes[i]._id)
            if (bienes.length != 0) {
                listaClientesBienes.push(listaClientes[i])
            }
        }
        return listaClientesBienes
    }
    catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los clientes con bienes: \n" + error;
    }
}

//Metodo para cambiar el estado del cliente

clienteSchema.statics.cambiarEstadoCliente = async (documento, admin) => {
    if (admin) {
        try {
            let cliente = await clientes.findOne({ documento: documento });
            if (cliente.estado) {
                await clientes.updateOne({ documento: documento }, { $set: { estado: false } })
                return { id: "1", mensaje: "Cliente inhabilitado correctamente" }
            } else {
                await clientes.updateOne({ documento: documento }, { $set: { estado: true } })
                return { id: "2", mensaje: "Cliente habilitado correctamente" }
            }
        } catch (error) {
            return { id: "0", mensaje: "Ha ocurrido un error desconocido" };
        }
    }
    return ("Sólo los administradores pueden habilitar o deshabilitar clientes.")
}
//metodo para calcular el top 5 de clientes que mas seguros tienen. Si se da un empate devuelve todos los clientes que quedaron empatados.
clienteSchema.statics.topCinco = async (admin) => {
    if(admin){
        let top = [];
        try {
            lista_clientes = await clientes.find({},["_id","documento","nombre","apellido1","apellido2"]);
            if(lista_clientes.length==0) return {id:0, mensaje:"No hay clientes registrados!"}
            for (cli of lista_clientes) {  
                numero_seguros = await seguroModel.countDocuments({cliente:cli._id,estado:"Aprobado"});
                if(numero_seguros!=0) top.push({id:cli._id,documento:cli.documento,nombres:cli.nombre,apellidos: cli.apellido1 + ' '+ cli.apellido2,seguros:numero_seguros});
            }
            if (top.length==0) return {id:0, mensaje:"No hay clientes con seguros aprobados, no se pudo generar el top"}
            else {
                top=top.sort((a,b)=>b.seguros-a.seguros)

                let mensaje = "top generado con exito!."
<<<<<<< HEAD
                //el siguiente if comprueba si se generan empate.
                if (top.length > 5) {
                    let empate = 5;
                    console.log(top);
                    while (top[empate]) {
                        if (top[empate-1].seguros == top[empate].seguros) empate = empate + 1;
                        else break;
                    }
                    top = top.slice(0,empate);
                    mensaje = mensaje + " se produjo un empate, se daran " + empate + " resultados"
                }
=======
>>>>>>> 7cea253cfe2b08ca7c47dd28d349efb65bca2f22
                return {id:1, mensaje:mensaje, top:top}    
            }
        } catch (error) {
            return {id:0, mensaje:"ha ocurrido algo inesperado\n" + error}
        }
    }else return {id:0, mensaje:"no eres administrador, no puedes generar este top." }
}
//Clientes creados entre fechas
clienteSchema.statics.clientesCreadosEntreFechas = async function(idVendedor,fechaInicio=fechaMesInicio(), fechaFin=fechaActual()) {
    try{
        let inicioRango = moment(fechaInicio,"YYYY-MM-DD")
        let finRango = moment(fechaFin,"YYYY-MM-DD")
        if (inicioRango<=finRango){
            let lista = await clientes.find()
            let listaFiltrada = lista.filter(cliente => moment(cliente.fechaCreacion, "YYYY-MM-DD")>=inicioRango && moment(cliente.fechaCreacion, "YYYY-MM-DD")<=finRango && idVendedor == cliente.vendedor)
            return { id: "1", mensaje: listaFiltrada.length}
        }else{
            return { id: "0", mensaje: "Las fechas no tienen logica"}
        }
    }catch(error){
        return { id: "0", mensaje: "Ha ocurrido un error al consultar entre fechas: \n"+error}
    }
}
//funciones para manejar la fecha
const fechaActual = () => {
    let ahora = moment().format("YYYY-MM-DD")
    return ahora
}

const fechaMesInicio = () => {
    let ahora = fechaActual().split("-").map(x => parseInt(x))
    primerDia = moment({year:ahora[0], month:ahora[1]-1, day:1}).format("YYYY-MM-DD")
    return primerDia
}

const clientes = mongoose.model('clientes', clienteSchema);
module.exports = clientes;
