const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const seguroSchema = Schema({
    id: {
        type: String,
        require: true,
        trim:true,
        unique:true
    },
    documentoVendedor: {
        type: String,
        require: true,
        trim:true
    },
    documentoCliente: {
        type: String,
        require: true,
        trim:true
    },
    idBien: {
        type: String,
        require: true,
        trim:true
    },
    nitAseguradora: {
        type: String,
        require: true,
        trim:true
    },
    fechaInicio: {
        type: Date,
        trim:true,
        require:true
    },
    fechaFin: {
        type: Date,
        trim:true,
        require:true
    },
    valorTotal: {
        type: Number,
        trim:true,
        require:true
    },
    fechaPago: {
        type: Date,
        trim:true,
        require:true
    },
    estado: {
        type: Number,
        trim:true,
        require:true
    },
    observaciones: {
        type: String,
        trim:true,
        require:true
    }
});
seguroSchema.plugin(uniqueValidator);

seguroSchema.statics.guardarSeguro = async function(datos) {
    const seguroNuevo = new seguros(
        {id:datos.id,
            documentoVendedor:datos.documentoVendedor,
            documentoCliente:datos.documentoCliente,
            idBien:datos.idBien,
            nitAseguradora:datos.nitAseguradora,
            fechaInicio:datos.fechaInicio,
            fechaFin:datos.fechaFin,
            valorTotal:datos.valorTotal,
            fechaPago:datos.fechaPago,
            estado:datos.estado,
            observaciones:datos.observaciones});
    try {
        await seguroNuevo.save();
        return "seguro guardado";
    } catch (error) {
        if (error.errors.id.kind==="unique") return "El id ingresado ya existe en nuestra base de datos";
        else return "error desconocido";
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

const seguros = mongoose.model('seguros', seguroSchema);


module.exports = seguros;
