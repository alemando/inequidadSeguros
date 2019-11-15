const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase criterio, especial para un subdocumento
const criterioSchema = Schema({
    nombre:{
        type:String,
        require:true,
        trim: true},
    descripcion:{
        type:String,
        require:true,
        trim: true},
    montoCubrir:{
        type:Number,
        require:true,
        trim: true},
    deducible:{
        type:String,
        require:true,
        trim: true}
})

//Clase categoria
const categoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim:true,
        unique:true
    },
    criterios: [criterioSchema],
    estado: {
      type: Boolean,
      require: true,
      default: false
    }
})

//Validador de valores unicos
categoriaSchema.plugin(uniqueValidator);

/*
    Metodo para guardar una categoria
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
categoriaSchema.statics.guardarCategoria = async (datos)=> {

    let validacion = { id: "0", mensaje: ""}

    //Validacion de los nombres de criterios no son repetidos
    if(verificarCriterios(datos.criterios)){
        validacion.mensaje += "Categoría no guardada, asegúrese de que los criterios tengan nombres diferentes"
    }

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

    //Objeto categoria
    const categoriaNuevo = new categorias(
        {nombre: datos.nombre,
            criterios: datos.criterios});

    try {
        //Procedo a guardar en la BD
        await categoriaNuevo.save()
        return { id: "1", mensaje: "Categoría guardada."}
    } catch (error) {
        if (error.errors.nombre.kind==="unique") return {
            id: "2", mensaje: "Ya existe una categoría "+datos.nombre+" en la base de datos."};
        else return { id: "0", mensaje: "Error desconocido"};
    }
}

//Metodo para retornar todas las categorias de la BD
categoriaSchema.statics.obtenerCategorias = async () => {
    try {
        let listaCategorias = await categorias.find();
        return listaCategorias;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener las categorías: \n"+ error;
    }
}

//Metodo para retornar una categoria por su nombre
categoriaSchema.statics.obtenerCategoria = async (nombre) => {
    try {
        let categoria = await categorias.findOne({nombre: nombre});
        return categoria;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el categoria "+ error;
    }
}

//Metodo para retornar el nombre de la categoria por su ID
categoriaSchema.statics.obtenerCategoriaById = async (id) => {
    try {
        let categoria = await categorias.findById(id);
        nombreCategoria = categoria.nombre
        return nombreCategoria;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el categoria "+ error;
    }
}

//Metodo para actualizar los campos de categorias
categoriaSchema.statics.actualizarCategoria = async(datos) =>{
  try{
    //Verificacion del atributo nombre no sea ni null ni vacio
    if(datos.nombre == null){
      throw "nullNombre";
    }else if (datos.nombre == "") {
      throw "vacioNombre";
    }

    //Verificacion del atributo criterios no sea null
    if(datos.criterios == null){
      throw "nullCriterios"
    }

    //Actualizacion de categoria
    let update = await categorias.findByIdAndUpdate(datos._id,
    {
      "nombre": datos.nombre,
      "criterios": datos.criterios
    });

    return {id: "1", mensaje: "Categoria Actualizada"};
  }catch(error){
      let validacion = { id: "0", mensaje: ""}
    //errores
    if(error == "nullNombre"){
      validacion.mensaje += "No se puede dejar el campo de nombre en null";
      return validacion;
    }else if (error == "vacioNombre") {
      validacion.mensaje += "No se puede dejar el campo de nombre vacio";
      return validacion;
    }else if(error == "nullCriterios"){
      validacion.mensaje += "No se puede dejar el campo de criterios en null";
      return validacion;
    }else{
      validacion.mensaje += "Error desconocido";
      return validacion;
    }
  }
}

ategoriaSchema.statics.actualizarCategoriaEstado= async(datos) =>{
  
}

const verificarCriterios = (arreglo) => {
    for(let i = 0; i<arreglo.length;i++){
        for(let j = i; j<arreglo.length;j++){
            if(arreglo[i].nombre==arreglo[j].nombre && j!=i){
                return true
            }
        }
    }

    return false
};


const categorias = mongoose.model('categorias', categoriaSchema);

module.exports = categorias;
