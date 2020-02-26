const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase vendedor
const vendedorSchema = Schema({
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
    telefono: {
        type: Number,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        trim: true
    },
    contrasena: {
        type: String,
        require: true,
        trim: true
    },
    esAdmin: {
        type: Boolean,
        require: true,
        default: false
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
vendedorSchema.statics.guardarVendedor = async (datos, admin) => {

    let validacion = { id: "0", mensaje: "" }

    //Validacion basada en regex de el formato de un correo
    if (!patronCorreo.test(datos.correo)) {
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }

    //Validaciones documento negativo o nulo
    if (datos.documento == "" || datos.documento == null || parseInt(datos.documento) < 0) {
        validacion.mensaje += "El documento de identificacion no es valido\n";
    }

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if (validacion.mensaje.length != 0) return validacion

    //Encripto la contraseña mandada desde la petición
    let password = bcrypt.hashSync(datos.password, 10).toString();
    //admin valida si la sesión ha sido abierta por un admin, por defecto está en true
    //datos.admin valida si se desea crear un admin o no

    if(datos.admin == "false"){
        datos.admin = false
    }else{
        datos.admin = true
    }

    if (admin && datos.admin) {
        //Objeto vendedor
        const vendedorNuevo = new vendedores({
            documento: datos.documento,
            nombre: datos.nombre,
            apellido1: datos.apellido1,
            apellido2: datos.apellido2,
            telefono: datos.telefono,
            correo: datos.correo,
            contrasena: password,
            esAdmin: true
        });
        try {
            await vendedorNuevo.save();
            return { id: "1", mensaje: "Vendedor guardado" };
        } catch (error) {
            if (error.errors.documento.kind === "unique") return {
                id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"
            };
            else return { id: "0", mensaje: "Error desconocido" };
        }
    }
    else {
        //Objeto vendedor
        const vendedorNuevo = new vendedores({
            documento: datos.documento,
            nombre: datos.nombre,
            apellido1: datos.apellido1,
            apellido2: datos.apellido2,
            telefono: datos.telefono,
            correo: datos.correo,
            contrasena: password,
            esAdmin: false
        });
        try {
            await vendedorNuevo.save();
            return { id: "1", mensaje: "Vendedor guardado" };
        } catch (error) {
            if (error.errors.documento.kind === "unique") return {
                id: "2", mensaje: "El documento ingresado ya existe en nuestra base de datos"
            };
            else return { id: "0", mensaje: "Error desconocido" };
        }
    }
    
}

//Obtener todos los vendedores
vendedorSchema.statics.obtenerVendedores = async () => {
    try {
        let listaVendedores = await vendedores.find();
        return listaVendedores;
    } catch (error) {
        return "Error obteniendo los vendedores\n" + error;
    }
}

//Obtiene vendedor por el documento
vendedorSchema.statics.obtenerVendedor = async (id) => {
    try {
        let vendedor = await vendedores.findOne({ documento: id });
        return vendedor;
    } catch (error) {
        return "Error obteniendo vendedor por documento identidad\n" + error;
    }
}

//Obtiene vendedor por el id
vendedorSchema.statics.obtenerVendedorById = async (id) => {
    try {
        let vendedor = await vendedores.findById(id);
        return vendedor;
    } catch (error) {
        return "Error obteniendo vendedor por documento identidad\n" + error;
    }
}

//Verificación de datos para inicio de sesión
//Ingresa usuario y contraseña, y en caso de ser correcto, retorna el _id y el esAdmin
vendedorSchema.statics.iniciarSesionVendedor = async (datos)=>{
    try{
        let vendedor = await vendedores.findOne({documento:datos.documento})
        if(!bcrypt.compareSync(datos.contrasena, vendedor.contrasena)){
            return { id: "0", mensaje: "Usuario o contraseña incorrectos"}
        }else{
            return {_id: vendedor._id, esAdmin:vendedor.esAdmin, nombre:vendedor.nombre}
        }
        
    }catch(error){
        return { id: "0", mensaje: "Usuario o contraseña incorrectos"}
    }
}

//Se retorna clase vendedores para exportar
const vendedores = mongoose.model('vendedores', vendedorSchema);

module.exports = vendedores;