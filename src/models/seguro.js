const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const clientes = require('../models/cliente');
const vendedores = require('../models/vendedor');
const bienes = require('../models/bien');
const aseguradoras = require('../models/aseguradora');
const criterios = require('../models/criterio');
const categorias = require('../models/categoria')

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
  valortotal: {
    type: Number,
    require: true,
    trim: true
  },
  fechaPago: {
    type: Date,
    require: true,
    trim: true
  },
  estado: {
    type: String,
    require: true,
    trim: true
  },
  observaciones:{
    type: String,
    require: true,
    trim: true
  },
  documentoCliente: {
    type: String,
    require: true,
    trim: true
  },
  idBien: {
    type: String,
    require: true,
    trim: true
  },
  documentoVendedor: {
    type: String,
    require: true,
    trim: true
  },
  nitAseguradora: {
    type: String,
    require: true,
    trim: true
  },
  arrayCriterios: [{_id:{type:Schema.Types.ObjectId,ref:"criterios"},nombre:String, descripcion:String, monto_cubrir:Number, deducible:String, observaciones:String}]
});
seguroSchema.plugin(uniqueValidator);

seguroSchema.statics.guardarSeguro = async function(datos) {
  let cliente = await clientes.findOne({documento:datos.documentoCliente});
  console.log(datos.documentoVendedor);

  //let vendedor = await vendedores.findOne({documentoVendedor: datos.documentoVendedor});
  let vendedor = await vendedores.findOne({documentoIdentidad:datos.documentoVendedor});
  let bien = await bienes.findById({_id:datos.idBien});
  let aseguradora = await aseguradoras.findOne({nit:datos.nitAseguradora});
  let aux = true;
  /*for (var i = 0; i < datos.arrayCriterios.length; i++) {
    let criterio = await criterios.findOne({numero:datos.arrayCriterios[i]});
    if(!criterio){
      aux = false
      console.log("Entre if")
    }
  }*/
  console.log(cliente,vendedor,bien,aseguradora,aux);
  if(cliente && vendedor && bien && aseguradora && aux){
    let criteriosBase = await categorias.criteriosCategoria(bien.categoria)
    console.log("Hola mundo")
    console.log(criteriosBase)
    const seguro = new seguros({
      fechaInicio: datos.fechaInicio,
      fechaFin: datos.fechaFin,
      valortotal: datos.valortotal,
      fechaPago: datos.fechaPago,
      estado: datos.estado,
      observaciones: datos.observaciones,
      documentoCliente: datos.documentoCliente,
      idBien: datos.idBien,
      documentoVendedor: datos.documentoVendedor,
      nitAseguradora: datos.nitAseguradora,
      arrayCriterios: criteriosBase
//      arrayCriterios: datos.arrayCriterios
    });
    try {
        await seguro.save();
        return "seguro guardado";
    } catch (error) {
         return "error desconocido\n" + error;
    }
  }else {
    return "Algun elemento no existe"
  }
};

seguroSchema.statics.obtenerSeguros = async function() {
    try {
        let segur = await seguros.find();
        return segur;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener los seguros\n"+ error;
    }
}
seguroSchema.statics.obtenerSeguro = async function(id) {
    try {
        let seguro = await seguros.findOne({id:id});
        return seguro;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el seguro\n"+ error;
    }
}
seguroSchema.statics.actualizarSeguro = async function(datos) {
    try {
        let seguroActualizado = await seguros.findOneAndUpdate({id:datos.id}, 
            {$set:{id:datos.id,
                documentoVendedor:datos.documentoVendedor,
                documentoCliente:datos.documentoCliente,
                idBien:datos.idBien,
                nitAseguradora:datos.nitAseguradora,
                fechaInicio:datos.fechaInicio,
                fechaFin:datos.fechaFin,
                valorTotal:datos.valorTotal,
                fechaPago:datos.fechaPago,
                estado:datos.estado,
                observaciones:datos.observaciones}},
                {new:true, runValidators:true, context:'query'})
        return "Seguro actualizado\n" + seguroActualizado;
    } catch (error) {
        return "el seguro no se pudo actualizar debido a un error inesperado\n" + error;
    }
}
seguroSchema.statics.borrarSeguro = async function(id){
    try {
        let respuesta = await seguros.findOneAndDelete({id:id})
        return respuesta;
    } catch (error) {
        return "el seguro no se ha podido eliminar, ha ocurrido algo inesperado\n" + error;
    }
}

//Importando el Schema de bien para armar el JSON que me piden
const bien=require('./bien');
seguroSchema.statics.obtenerDatosPrincipales= async function(){
    try{
        let respuesta= await seguros.find();
        let answer=[]
        //let answer1= await bien.findOne({id: respuesta[1].idBien});
        //let bien1= await bien.find();
        for(let i=0;i<respuesta.length;i++){
            //let seguro = await seguros.findOne({id:id});
            let myBien= await bien.findOne({id: respuesta[i].idBien});
            answer.push({
                documentoCliente: respuesta[i].documentoCliente,
                idBien: respuesta[i].idBien,
                categoria: myBien,//.categoria,
                nombre: myBien,//.caracteristicas,
                detalle: 'Falta'
            });
        }
        return answer;
    } catch (error){
        return "No se han podido mostrar los datos principales, ha ocurrido algo inesperado \n" +error;
    }
}

seguroSchema.statics.obtenerPrincipal= async function(){
  try{
      let respuesta= await seguros.find();
      let answer=[]
      for(let i=0;i<respuesta.length;i++){
          let det= await seguros.findById({_id: respuesta[i].id});
          answer.push({
              documentoCliente: respuesta[i].documentoCliente,
              idBien: respuesta[i].idBien,
              detalle: det
          });
      }
      return answer;
  } catch (error){
      return "No se han podido mostrar los datos principales, ha ocurrido algo inesperado \n" +error;
  }
}
const seguros = mongoose.model('seguros',seguroSchema);

module.exports = seguros;
