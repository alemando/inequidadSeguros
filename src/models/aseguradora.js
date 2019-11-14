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
        type: String,
        require: true,
        trim:true
    },
    correo: {
        type: String,
        require: true,
        trim:true
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
    if(datos.nit.length==0){
        validacion.mensaje = "No puedes dejar el campo del nit vacío \n";
    }
    else if(datos.nombre.length==0){
        validacion.mensaje = "No puedes dejar el campo del nombre vacío \n";
    } else if(datos.telefono.length==0){
        validacion.mensaje = "No puedes dejar el campo del teléfono vacío \n";
    }
    else if(datos.correo.length==0){
        validacion.mensaje = "No puedes dejar el campo del correo vacío \n";
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
        correo: datos.correo});
    try {
        //Procedo a guardar en la BD
        await aseguradoraNueva.save();
        return { id: "1", mensaje: "aseguradora guardada"};
    } catch (error) {
        if (error.errors.nit.kind==="unique") return { 
            id: "2", mensaje: "El nit ingresado ya existe en nuestra base de datos"};
        else return { id: "0", mensaje: "Error desconocido"};
    }
};

//Metodo para reotornar todas las aseguradoras de la BD
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

//Método para actualizar la aseguradora
aseguradoraSchema.statics.actualizarAseguradora = async (datos) =>{
    try{
        //Restricciones para el Json de entrada
        //Restricciones para campos obligatorios que no pueden ser nulos
        if(datos.nit.length==0){
            throw "vacionit";          
        }
        else if(datos.nombre.length==0){
            throw "vacionombre";
        } else if(datos.telefono.length==0){
            throw "vaciotel";
        }
        else if(datos.correo.length==0){
            throw "vaciocor";
        }
        // Tenemos el objeto consulta para hacer comprobaciones de atributos no modificables
        //Las búsquedas por ahora las estamos haciendo por el nit del objeto de entrada
        let consulta = await aseguradoras.findById(datos._id);
        if(consulta.nit != datos.nit){
            throw "nit";
        }
        //Proceso de actualización de los datos
        let nuevo = await aseguradoras.findByIdAndUpdate(datos._id,
            {
                "nit" : consulta.nit,
                "nombre" : datos.nombre,
                "telefono" : datos.telefono,
                "correo" : datos.correo
            });
            //Mensaje de confirmación
            return "Aseguradora actulizada";

    } catch(error){
        //Manejo de errores
        if(error === "vacionit"){
            return  "No se puede dejar el campo de nit en blanco para el nuevo objeto";
        }
        else if(error === "vacionombre"){
            return  "No se puede dejar el campo de nombre en blanco para el nuevo objeto";
        }
        else if(error === "vaciotel"){
            return  "No se puede dejar el campo de telefono en blanco para el nuevo objeto";
        }
        else if(error === "vaciocor"){
            return  "No se puede dejar el campo de correo en blanco para el nuevo objeto";
        }                   
        else if(error === "nit"){
            return  "El nit no se puede modificar";
        }
        else{
            return `Se ha producido un error inesperado:  
            ${error} `;
        }                
    }
}
const aseguradoras = mongoose.model('aseguradoras',aseguradoraSchema);

module.exports = aseguradoras;
