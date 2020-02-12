const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const clienteModel = require('../models/cliente');
const vendedorModel = require('../models/vendedor');
const bienModel = require('../models/bien');
const aseguradoraModel = require('../models/aseguradora');

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
    cobertura:{
        type:String,
        require:true,
        trim: true},
    deducible:{
        type:String,
        require:true,
        trim: true}
})

//Clase Seguro
const seguroSchema = Schema({
  fechaInicio: {
    type: Date,
    require: true,
    trim: true,
  },
  tipoPago:{
    type: String,
    requiere: true,
    trim: true,
  },
  fechaFin: {
    type: Date,
    require: false,
    trim: true
  },
  valorTotal: {
    type: Number,
    require: true,
    trim: true
  },
  diaPago: {
    type: Number,
    require: true,
    trim: true
  },
  estado: {
    type: String,
    require: true,
    default: "En proceso",
    trim: true
  },
  observaciones:{
    type: String,
    default: "",
    trim: true
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'clientes',
    trim:true
  },
  bien: {
    type: Schema.Types.ObjectId,
    ref: 'bienes',
    trim:true
  },
  vendedor: {
    type: Schema.Types.ObjectId,
    ref: 'vendedores',
    trim:true
  },
  aseguradora: {
    type: Schema.Types.ObjectId,
    ref: 'aseguradoras',
    trim:true
  },
  criterios: [criterioSchema]
});

/*
    Metodo para guardar un seguro
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
seguroSchema.statics.guardarSeguro = async function(datos) {

    let validacion = { id: "0", mensaje: ""}
    //Validacion para tener al menos un criterio 
    if(datos.criterios.length == 0){
        validacion.mensaje += "El seguro no ha sido guardado, debe contener al menos un criterio."
    }

    //Validacion de los nombres de criterios no son repetidos
    if(verificarCriterios(datos.criterios)){
        validacion.mensaje += "Categoría no guardada, asegúrese de que los criterios tengan nombres diferentes."
    }

    validacion.mensaje+= validacionesCriterios(datos.criterios)

    //Validacion del cliente
    if(await clienteModel.obtenerClienteById(datos.cliente) == null){
        validacion.mensaje += "El seguro no ha sido guardado, cliente no existe en la base de datos."
    }
    if(datos.cliente == null || datos.cliente == ""){
        validacion.mensaje += "El seguro no ha sido guardado, cliente vacío."
    }

    //Validacion del bien
    if(datos.bien == null || datos.bien == ""){
        validacion.mensaje += "El seguro no ha sido guardado, el bien está vacío."
    }
    let bienVerificado = await bienModel.obtenerBienPorId(datos.bien)
    if(bienVerificado == null){
        validacion.mensaje += "El seguro no ha sido guardado, el bien no existe en la base de datos.\n"
    }else if(bienVerificado.cliente._id != datos.cliente){
        validacion.mensaje += "El seguro no ha sido guardado, el bien no pertenece al cliente.\n"
    }

    //Validacion del vendedor
    if(datos.vendedor == null || datos.vendedor == ""){
        validacion.mensaje += "El seguro no ha sido guardado, el vendedor esta vacío\n"
    }
    if(await vendedorModel.obtenerVendedorById(datos.vendedor) == null){
        validacion.mensaje += "El seguro no ha sido guardado, el vendedor no existe en la base de datos.\n"
    }

    //Validacion de la aseguradora
    if(await aseguradoraModel.obtenerAseguradoraById(datos.aseguradora) == null){
        validacion.mensaje += "El seguro no ha sido guardado, la aseguradora no existe en la base de datos."
    }
    if(datos.aseguradora == null || datos.aseguradora == ""){
        validacion.mensaje += "El seguro no ha sido guardado, la aseguradora está vacía.\n"
    }

    //Validacion fechaInicio es una fecha valida
    if(isNaN(Date.parse(datos.fechaInicio))){
        validacion.mensaje += "La fecha de incio tiene un formato erroneo\n"
    }
    if(datos.fechaInicio == null || datos.fechaInicio == ""){
        validacion.mensaje += "El seguro no ha sido guardado, la fecha de inicio esta vacía\n"
    }

    //Validacion tipoPago no es null o vacio
    if(datos.tipoPago == null || datos.tipoPago == ""){
      validacion.mensaje += "El seguro no ha sido guardado, el tipo de pago esta vacío.\n"
    }

    //Validacion fechaFin es una fecha valida
    /*if(isNaN(Date.parse(datos.fechaFin))){
        validacion.mensaje += "La fecha de fin tiene un formato erroneo\n"
    }*/
    if(datos.tipoPago == "Contado" && (datos.fechaFin == null || datos.fechaFin == "")){
        validacion.mensaje += "El seguro no ha sido guardado, fecha de finalizacion vacía\n"
    }

    if(datos.tipoPago == "Credito" &&  datos.fechaFin != "" ){
      validacion.mensaje += "El seguro no ha sido guardado, la fecha de fin debe ser vacia"
    }

    //Validación fecha inicio menor a fecha fin
    if(Date.parse(datos.fechaInicio) > Date.parse(datos.fechaFin)){
        validacion.mensaje += "La fecha inicio debe ser menor que la fecha fin "
    }

    //Validacion diaPago es un numero
    if(isNaN(datos.diaPago)){
        validacion.mensaje += "El dia de pago no es un numero\n"
    }
    if(datos.diaPago == null || datos.diaPago == ""){
        validacion.mensaje += "El seguro no ha sido guardado, dia de pago vacío\n"
    }
    if(datos.diaPago > 31 || datos.diaPago <=0){
        validacion.mensaje += "El día de pago debe estar entre 1 y 31\n"
    }

    //Validacion valorTotal es un numero
    if(datos.valorTotal == null || datos.valorTotal == ""){
        validacion.mensaje += "El valor total está vacío\n"
    }
    if(datos.valorTotal < 0){
        validacion.mensaje += "El valor total debe ser mayor a cero"
    }
    if(isNaN(datos.valorTotal)){
        validacion.mensaje += "El valor total no es un numero\n"
    }

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

    console.log(datos.criterios)
    
    for(let i = 0; i<datos.criterios.length;i++){
        delete datos.criterios[i]._id;
    }

    console.log(datos.criterios)
    
    //Objeto seguro
    const seguro = new seguros({
      fechaInicio: datos.fechaInicio,
      tipoPago: datos.tipoPago,
      fechaFin: datos.fechaFin,
      valorTotal: datos.valorTotal,
      diaPago: datos.diaPago,
      observaciones: datos.observaciones,
      cliente: datos.cliente,
      bien: datos.bien,
      vendedor: datos.vendedor,
      aseguradora: datos.aseguradora,
      criterios: datos.criterios
    });

    //Verificar si ya existe un seguro con los mismos atributos ingresados
    try{
        seguroAux = await seguros.findOne({fechaInicio: seguro.fechaInicio, 
                                            fechaFin: seguro.fechaFin,
                                            valorTotal: seguro.valorTotal,
                                            diaPago: seguro.diaPago,
                                            cliente: seguro.cliente,
                                            bien: seguro.bien,
                                            vendedor: seguro.vendedor,
                                            aseguradora: seguro.aseguradora});
        if(seguroAux != null){
            validacion.mensaje += "El seguro ya existe\n"
        }
    }catch(error){
        validacion.mensaje += "Ha ocurrido un error buscando seguros";
    };

    if(validacion.mensaje.length!=0) return validacion

    try {
        //Procedo a guardar en la BD
        await seguro.save();
        return {id:1, mensaje: "El seguro ha sido guardado satisfactoriamente."};
    } catch (error) {
        console.log(error)
        return {id:0, mensaje: "Ha ocurrido un error desconocido"};

    }
};

//Metodo para retornar todos los seguros
seguroSchema.statics.obtenerSeguros = async function() {
    try {
        let listaSeguros = await seguros.find().
        populate('cliente', ['nombre', "apellido1","apellido2"]).
        populate('vendedor', ['nombre', "apellido1","apellido2"]).
        populate('bien', 'nombre').
        populate('aseguradora', 'nombre').
        exec();;
        return listaSeguros;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener los seguros\n"+ error;
    }
}

//Metodo para retornar un seguro por su id
seguroSchema.statics.obtenerSeguro = async function(id) {
    try {
        let seguro = await seguros.findById(id);
        return seguro;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el seguro\n"+ error;
    }
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

/*
La función validacionesCriterios recibe un arreglo de criterios y verifica uno por uno que cumplan con las validaciones respectivas
de no datos vacios o nulos.
Se retorna un string con todos los errores de validación encontrados señalando el error y el nombre del criterio al que corresponde,
o en caso de no tener nombre, el número del criterio.
En caso de no encontrar un error, retorna un string vacio ""
*/
const validacionesCriterios = (arreglo) => {

    mensaje=""
    for(let i = 0; i<arreglo.length;i++){
        
        if(arreglo[i].nombre=="" || arreglo[i].nombre==null){
            mensaje+= "El nombre del criterio "+ (i+1) +" no es válido\n"
            if(arreglo[i].descripcion=="" || arreglo[i].descripcion==null){
                mensaje+= "La descripción del criterio "+ (i+1) +" no es válido\n"
            }
            if(arreglo[i].cobertura=="" || arreglo[i].cobertura==null){
                mensaje+="El monto a cubrir del criterio "+ (i+1) +" no es válido\n"
            }
            if(arreglo[i].deducible=="" || arreglo[i].deducible==null){
                mensaje+="El deducible del criterio "+ (i+1) +" no es válido\n"
            }
        }
        else{
            if(arreglo[i].descripcion=="" || arreglo[i].descripcion==null){
                mensaje+= "La descripción del criterio "+arreglo[i].nombre +" no es válido\n"
            }
            if(arreglo[i].cobertura=="" || arreglo[i].cobertura==null){
                mensaje+= "El monto a cubrir del criterio "+arreglo[i].nombre +" no es válido\n"
            }
            if(arreglo[i].deducible=="" || arreglo[i].deducible==null){
                mensaje+= "El deducible del criterio "+arreglo[i].nombre +" no es válido\n"
            }
        }
    }
    return mensaje
}

const seguros = mongoose.model('seguros',seguroSchema);

module.exports = seguros;
