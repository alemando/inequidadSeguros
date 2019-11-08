const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const clientes = require('../models/cliente');
const vendedores = require('../models/vendedor');
const bienes = require('../models/bien');
const aseguradoras = require('../models/aseguradora');

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
  criterios: [{
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
        trim: true},
    observaciones:{
        type:String,
        require:true,
        trim: true
    }
}]
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
  console.log(cliente,vendedor,bien,aseguradora,aux);
  if(cliente && vendedor && bien && aseguradora && aux){
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
      criterios: datos.criterios
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
        let seguro = await seguros.findById(id);
        return seguro;
    } catch (error) {
        return "ha ocurrido algo inesperado al intentar obtener el seguro\n"+ error;
    }
}
seguroSchema.statics.actualizarSeguro = async function(datos) {
    try {
        let seguroActualizado = await seguros.findByIdAndUpdate(datos._id, 
            {$set:{_id:datos._id,
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
        let respuesta = await seguros.findByIdAndDelete(id)
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

seguroSchema.statics.agregarCriterios = async function(datos){
  try{
      let seguroActual = await seguros.findById(datos._id)
      let repetido = false
      for (i=0; i<seguroActual.criterios.length; i++){
          for (j=0; j<datos.criterios.length; j++){
              if(seguroActual.criterios[i].nombre==datos.criterios[j].nombre){
                  repetido = true
                  break
              }
          }
      }
      for (i=0; i<datos.criterios.length; i++){
          for (j=0; j<datos.criterios.length; j++){
              if(datos.criterios[i].nombre==datos.criterios[j].nombre && i!=j){
                  repetido = true
                  break
              }
          }
      }
      if(!repetido){
          let respuesta = await seguros.findByIdAndUpdate(datos._id,{$addToSet:{"criterios":{$each:datos.criterios}}},{new:true, runValidators:true, context:'query'})
          return respuesta
      } else{
          return "Asegúrese de que los nombres de los criterios nuevos sean diferentes a los actuales y diferentes entre ellos."
      }
  } catch(error){
      return "El criterio no se ha podido agregar al seguro por el error: \n" + error
  }
}

seguroSchema.statics.criteriosSeguro = async function(id){
  try{
      let respuesta = await seguros.findById(id)
      let criteriosDeSeguro = respuesta.criterios
      return criteriosDeSeguro
  }catch(error){
      return error
  }
}

/*
Para borrar el criterio del seguro es necesario enviar en datos un json con la siguiente estructura:
{
  "_id":"(Se inserta aquí el id del seguro)"
  "criterio":"(Se inserta aquí el nombre del criterio)"
}
*/
seguroSchema.statics.borrarCriterioSeguro = async function(datos){
  try{
      let respuesta = await seguros.findByIdAndUpdate(datos._id,{$pull:{criterios:{nombre:datos.criterio}}},{new:true, runValidators:true, context:'query'})
      return "El criterio " + datos.criterio + " del seguro  " + datos._id + " fue borrado correctamente."
  }catch(error){
      return "Error desconocido: \n " + error
  }
}

seguroSchema.statics.actualizarCriterioSeguro = async function(datos){
  try{
      let borrado = await seguros.borrarCriterioSeguro({_id:datos._id,criterio:datos.criterio.nombre})
      let actualizado = await seguros.findByIdAndUpdate(datos._id,{$addToSet:{"criterios":datos.criterio}},)
      return "El criterio " + datos.criterio.nombre + " del seguro " + datos._id + " ha sido actualizado."
  }catch(error){
      return "Error al actualizar: \n" + error
  }
}

const seguros = mongoose.model('seguros',seguroSchema);

module.exports = seguros;
