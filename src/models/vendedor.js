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
    },
    estado:{
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

//Editar vendedor
vendedorSchema.statics.editarVendedor = async (datos, admin) => {
  
  let validacion = { id: "0", mensaje: "" }

  try {
    let vendedor = await vendedores.findOne({ documento: datos.documento });
    if (vendedor == null) {
      throw 'El vendedor no existe';
    }
    else {
      //Verificamos que la sesión esté abierta por un admin, 
      if (admin) {

        //Validacion basada en regex de el formato de un correo
        if (!patronCorreo.test(datos.correo)) {
          validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n";
        }

        //Si no pasa alguna validacion retorna el mensaje correspondiente
        if (validacion.mensaje.length != 0) return validacion

        //Actualizamos los campos del vendedor
        vendedor.nombre = datos.nombre;
        vendedor.apellido1 = datos.apellido1;
        vendedor.apellido2 = datos.apellido2;
        vendedor.telefono = datos.telefono;
        vendedor.correo = datos.correo;

        //Guardamos el nuevo vendedor
        await vendedor.save();

        validacion.id = '1';
        validacion.mensaje = 'Vendedor editado con éxito';
        return validacion;
      }
      else {
        throw 'No posees permisos para ejecutar esta acción';
      }
    }
  } catch (error) {
    return {
      id: '2',
      mensaje: `Error obteniendo el vendedor por documento de indentidad: ${error}`
    };
  }

}

//Verificación de datos para inicio de sesión
//Ingresa usuario y contraseña, y en caso de ser correcto, retorna el _id y el esAdmin
vendedorSchema.statics.iniciarSesionVendedor = async (datos)=>{
    try{
        let vendedor = await vendedores.findOne({documento:datos.documento})
        if(!bcrypt.compareSync(datos.contrasena, vendedor.contrasena) || !vendedor.estado){
            return { id: "0", mensaje: "Usuario o contraseña incorrectos"}
        }else{
            return {_id: vendedor._id, esAdmin:vendedor.esAdmin, nombre:vendedor.nombre}
        }
        
    }catch(error){
        return { id: "0", mensaje: "Usuario o contraseña incorrectos"}
    }
}

//Cambiar contraseña del vendedor
vendedorSchema.statics.cambiarContrasenaVendedor = async (vendedorId, datos)=>{
    try{
        let vendedor = await vendedores.findById(vendedorId);
        if (vendedor == "" || vendedor == null) {
          return { id: "0", mensaje: "Usuario o contraseña incorrectos"}

        } else if(datos.contrasenaNueva == "" || datos.contrasenaNueva == null){
          return { id: "0", mensaje: "Contraseña Nueva vacia o null"}
        }else {
            if(bcrypt.compareSync(datos.contrasena, vendedor.contrasena)){
                vendedor.contrasena = bcrypt.hashSync(datos.contrasenaNueva, 10).toString();
                await vendedor.save();
                return { id: "1", mensaje: "Contraseña actualizada"}
            }else{
                return { id: "0", mensaje: "Los datos ingresados son incorrectos"}
            }
          
        }
    }catch(error){
        return { id: "0", mensaje: "Usuario o contraseña incorrectos"}
    }
}

//Metodo para cambiar estado vendedor 
vendedorSchema.statics.CambiarEstadoVendedor = async (id, admin)=> {
    
    if(admin.esAdmin){
        try {
            let vendedor = await vendedores.findById(id);
            if(vendedor._id == admin._id){
                return { id: "0", mensaje: "No puedes desahibilitar tu propia cuenta"};
            }
            vendedor.estado = !vendedor.estado;
            await vendedor.save();
            return { id: "1", mensaje: "Has cambiado el estado del vendedor"};
        } catch (error) {
            return { id: "0", mensaje: "ha ocurrido algo inesperado al intentar inhabilitar el vendedor"+ error};
        }
    }
    else{
        return { id: "0", mensaje: "No tienes permisos para inhabilitar vendedor"};
    }
       

}


vendedorSchema.statics.cambiarContrasenaVendedorDesdeAdmin = async (vendedorId, contrasenaNueva, admin)=>{
    try{
        if(admin){
            let vendedor = await vendedores.findById(vendedorId);
            if (vendedor == "" || vendedor == null) {
                return { id: "0", mensaje: "Usuario incorrecto: "+ vendedor}
            }
            if(contrasenaNueva == "" || contrasenaNueva == null){
                return { id: "0", mensaje: "Contraseña nueva vacia o null: "+ contrasenaNueva}
            }
            if(vendedor.esAdmin){
                return { id: "0", mensaje: "El usuario que intentas modificar es un administrador"}
            }
            vendedor.contrasena = bcrypt.hashSync(contrasenaNueva, 10).toString();
            await vendedor.save();
            return { id: "1", mensaje: "Contraseña actualizada"}
            
        }else{
            return { id: "0", mensaje: "No tienes permisos para esto"} 
        }
    }catch(error){
        return { id: "0", mensaje: "Error : "+ error}
    }
}
//Se retorna clase vendedores para exportar
const vendedores = mongoose.model('vendedores', vendedorSchema);

module.exports = vendedores;
