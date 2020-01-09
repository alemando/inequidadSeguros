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
    montoCubrir:{
        type:Number,
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

    //Validacion de los nombres de criterios no son repetidos
    if(verificarCriterios(datos.criterios)){
        validacion.mensaje += "Categoría no guardada, asegúrese de que los criterios tengan nombres diferentes"
    }

    //Validacion del cliente
    if(await clienteModel.obtenerClienteById(datos.cliente) == null){
        validacion.mensaje += "seguro no guardado, cliente no existe en la BD"
    }
    if(datos.cliente == null || datos.cliente == ""){
        validacion.mensaje += "Seguro no guardado, cliente vacío"
    }

    //Validacion del bien
    if(datos.bien == null || datos.bien == ""){
        validacion.mensaje += "Seguro no guardado, bien vacío"
    }
    let bienVerificado = await bienModel.obtenerBienPorId(datos.bien)
    if(bienVerificado == null){
        validacion.mensaje += "seguro no guardado, bien no existe en la BD\n"
    }else if(bienVerificado.cliente._id != datos.cliente){
        validacion.mensaje += "seguro no guardado, el bien no es del cliente\n"
    }

    //Validacion del vendedor
    if(datos.vendedor == null || datos.vendedor == ""){
        validacion.mensaje += "Seguro no guardado, vendedor vacío\n"
    }
    if(await vendedorModel.obtenerVendedorById(datos.vendedor) == null){
        validacion.mensaje += "seguro no guardado, vendedor no existe en la BD\n"
    }

    //Validacion de la aseguradora
    if(await aseguradoraModel.obtenerAseguradoraById(datos.aseguradora) == null){
        validacion.mensaje += "seguro no guardado, aseguradora no existe en la BD"
    }
    if(datos.aseguradora == null || datos.aseguradora == ""){
        validacion.mensaje += "Seguro no guardado, aseguradora vacía\n"
    }

    //Validacion fechaInicio es una fecha valida
    if(isNaN(Date.parse(datos.fechaInicio))){
        validacion.mensaje += "La fecha de incio tiene un formato erroneo\n"
    }
    if(datos.fechaInicio == null || datos.fechaInicio == ""){
        validacion.mensaje += "Seguro no guadado, fecha de inicio vacía\n"
    }

    //Validacion fechaFin es una fecha valida
    if(isNaN(Date.parse(datos.fechaFin))){
        validacion.mensaje += "La fecha de fin tiene un formato erroneo\n"
    }
    if(datos.fechaFin == null || datos.fechaFin == ""){
        validacion.mensaje += "Seguro no guadado, fecha de fin vacía\n"
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
        validacion.mensaje += "Seguro no guardado, dia de pago vacío\n"
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

    //Objeto seguro
    const seguro = new seguros({
      fechaInicio: datos.fechaInicio,
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

    try {
        //Procedo a guardar en la BD
        await seguro.save();
        return {id:1, mensaje: "seguro guardado"};
    } catch (error) {
        console.log(error)
        return {id:0, mensaje: "error desconocido"};
         
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
        return "ha ocurrido algo inesperado al intentar obtener los seguros\n"+ error;
    }
}

//Metodo para retornar un seguro por su id
seguroSchema.statics.obtenerSeguro = async function(id) {
    try {
        let seguro = await seguros.findById(id);
        return seguro;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el seguro\n"+ error;
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

const seguros = mongoose.model('seguros',seguroSchema);

module.exports = seguros;
