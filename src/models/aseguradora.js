const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase Aseguradora
const aseguradoraSchema = Schema({
    nit: {
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
    telefono: {
        type: Number,
        require: true,
        trim:true
    },
    correo: {
        type: String,
        require: true,
        trim:true
    },
    estado:{
        type: Boolean,
        requiere: true,
        default: false
    }
});

//Validacion en BD de valores unicos
aseguradoraSchema.plugin(uniqueValidator);

const patronCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
    Metodo para guardar una aseguradora
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
aseguradoraSchema.statics.guardarAseguradora = async (datos)=> {
    
    let validacion = { id: "0", mensaje: ""}
    //Validaciones para cada uno de los campos a la hora de crear aseguradoras
    //Por cada atributo, primero se verifica si es null y después si es un string vacío

    //Para nit
    if(datos.nit == null){
        validacion.mensaje += "No puedes dejar como nulo el atributo nit\n";
    }
    else if(datos.nit.length==0){
        validacion.mensaje += "No puedes dejar el campo del nit vacío\n";
    }

    //Para nombre
    if(datos.nombre == null){
        validacion.mensaje += "No puedes dejar como nulo el atributo nombre\n";
    }
    else if(datos.nombre.length==0){
        validacion.mensaje += "No puedes dejar el campo del nombre vacío\n";
    }

    //Para teléfono
    if(datos.telefono == null){
        validacion.mensaje += "No puedes dejar como nulo el atributo telefono\n";
    }
    else if(datos.telefono.length==0){
        validacion.mensaje += "No puedes dejar el campo del teléfono vacío\n";
    }

    //Para correo
    if(datos.correo == null){
        validacion.mensaje += "No puedes dejar como nulo el atributo correo\n";
    }
    else if(datos.correo.length==0){
        validacion.mensaje += "No puedes dejar el campo del correo vacío\n";
    }
    //Validacion basada en regex de el formato de un correo
    else if(!patronCorreo.test(datos.correo)){
        validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n"
    }

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

    //Objeto aseguradora
    const aseguradoraNueva = new aseguradoras(
        {nit: datos.nit,
        nombre: datos.nombre,
        telefono: datos.telefono,
        correo: datos.correo,
        estado: true});
    try {
        //Procedo a guardar en la BD
        await aseguradoraNueva.save();
        return { id: "1", mensaje: "La aseguradora se guardo correctamente."};
    } catch (error) {
        if (error.errors.nit.kind==="unique") return { 
            id: "2", mensaje: "El nit ingresado ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "Error desconocido"};
    }
};

//Metodo para retornar todas las aseguradoras de la BD
aseguradoraSchema.statics.obtenerAseguradoras = async ()=> {
    try {
        let listaAseguradoras = await aseguradoras.find();
        return listaAseguradoras;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener las aseguradoras\n"+ error;
    }
}

//Metodo para retornar una aseguradora por su nit
aseguradoraSchema.statics.obtenerAseguradora = async (nit)=> {
    try {
        let aseguradora = await aseguradoras.findOne({nit: nit});
        return aseguradora;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el aseguradora\n"+ error;
    }
}

//Metodo para retornar una aseguradora por su id
aseguradoraSchema.statics.obtenerAseguradoraById = async (id)=> {
    try {
        let aseguradora = await aseguradoras.findById(id);
        return aseguradora;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el aseguradora\n"+ error;
    }
}
//Metodo para cambiar el estado de aseguradora
aseguradoraSchema.statics.CambiarEstadoAseguradora = async (id, admin)=> {
    
    if(admin == true){
        try {
            let aseguradora = await aseguradoras.findById(id);
            aseguradora.estado = !aseguradora.estado;
            await aseguradora.save();
            return { id: "1", mensaje: "Has cambiado el estado de la aseguradora"};
        } catch (error) {
            return { id: "0", mensaje: "ha ocurrido algo inesperado al intentar inhabilitar la aseguradora"+ error};
        }
    }
    else{
        return { id: "0", mensaje: "No tienes permisos para inhabilitar aseguradoras"};
    }
       
}

//Metodo para retornar todas las aseguradoras habilitadas 
aseguradoraSchema.statics.obtenerAseguradorasHabilitadas = async () =>{
        try {
        let listAseguradoras = await aseguradoras.find({estado: true})
        return listAseguradoras;
    } catch (error) {
      return "Ha ocurrido algo inesperado al intentar obtener las aseguradoras: \n"+ error;
    }
  }

//Editar aseguradora
aseguradoraSchema.statics.actualizarAseguradora = async (datos, admin) => {
  
    let validacion = { id: "0", mensaje: "" }
    try {
      let aseguradora = await aseguradoras.findOne({ nit: datos.nit });
      if (aseguradora == null) {
        throw 'La aseguradora no existe';
      }
      else {
        if (admin) {
            if (!patronCorreo.test(datos.correo)) {
                validacion.mensaje += "El correo no sigue el formato example@dominio.ext\n";
              }  
            else if (validacion.mensaje.length != 0) return validacion

            aseguradora.nombre = datos.nombre;
            aseguradora.telefono = datos.telefono;
            aseguradora.correo = datos.correo;
         
            await aseguradora.save();
  
            validacion.id = '1';
            print(validacion.id)
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
        mensaje: `Error obteniendo de aseguradora por nit: ${error}`
      };
    }
  
  }


const aseguradoras = mongoose.model('aseguradoras',aseguradoraSchema);

module.exports = aseguradoras;
