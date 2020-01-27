const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const clienteModel = require('./cliente')
const categoriaModel = require('./categoria')

//Clase file, especial para un subdocumento
const fileSchema = Schema({
  nombre:{
      type:String,
      require:true,
      trim: true},
  archivo:{
      type: Buffer,
      require:true
  }
})

//Clase bien
const bienSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim:true
    },
    cliente: {
        type: Schema.Types.ObjectId, 
        ref: 'clientes',
      	require: true
    },
    categoria: {
        type: Schema.Types.ObjectId, 
		    ref: 'categorias',
        trim:true
    },
    caracteristicas: {
        type: String,
        require:false
    },
    documento: fileSchema
});

/*
    Metodo para guardar un bien
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
bienSchema.statics.guardarBien = async function(datos) {
    let validacion = { id: "0", mensaje: ""}  
    
    //Validacion del nombre
    if(datos.body.nombre == ""){
      validacion.mensaje += "El nombre es obligatorio"
    }
    
    //Validacion categoria
    if(datos.body.categoria == ""){
      validacion.mensaje += "Tienes que seleccionar una categoria"
    }

    //Validacion del cliente
    if(await clienteModel.obtenerClienteById(datos.body.cliente) == null){
        validacion.mensaje += "El bien no ha sido guardado, cliente no existe en la base de datos."
    }

    //Validacion de la existencia de la categoria
    if(await categoriaModel.obtenerCategoriaById(datos.body.categoria) == null){
        validacion.mensaje += "El bien no ha sido guardado, categoria no existe en la base de datos."
    }

    if(!datos.file){
      validacion.mensaje += "El documento es obligatorio."  
    }
    else{
      //Validacion archivo es pdf
      if(datos.file.mimetype != 'application/pdf'){
        validacion.mensaje += "El bien no ha sido guardado, el archivo no es un pdf."
      }

    //Validacion archivo no excede 16Mb
      if(datos.file.size >= 16000000){
        validacion.mensaje += "El bien no ha sido guardado, el archivo excede el tamaño permitido: 16Mb."
      }
    }
    
    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if(validacion.mensaje.length!=0) return validacion

  	//Objeto bien
    const bienNuevo = new bienes(
		{nombre: datos.body.nombre,
		cliente: datos.body.cliente,
		categoria: datos.body.categoria,
		caracteristicas: datos.body.caracteristicas,
		documento: { 
			nombre: datos.file.originalname,
			archivo: datos.file.buffer
		}
		});
    try {
        await bienNuevo.save();
        return { id: "1", mensaje: "El bien ha sido guardado correctamente."};
    } catch (error) {
		return { id: "0", mensaje: "Error desconocido"};
    }
};

//Metodo para retornar todos los bienes
bienSchema.statics.obtenerBienes = async function() {
  try{
    let listaBienes = await bienes.find({},{documento: 0}).
	populate('cliente').
	populate('categoria').
	exec();
    return listaBienes
  } catch(error){
    return "Ha ocurrido algo al intentar obetener bienes\n" +error;
  }
};

//Metodo para retornar todos los bienes asociados a un cliente
bienSchema.statics.obtenerBienesPorCliente = async function(cliente){
  try {
    let listaBienes = await bienes.find({cliente: cliente},{documento: 0}).
	populate('cliente').
	populate('categoria').
	exec();
    return listaBienes;
  } catch (error) {
    return "Ha ocurrido algo al intentar obtener bienes del cliente\n" + error
  }
};

//Metodo para retornar todos los bienes asociados a un cliente
bienSchema.statics.obtenerBienPorId = async function(IdBien){
	try {
	  let bien = await bienes.findById(IdBien).
	  populate('cliente').
	  populate('categoria').
	  exec();
	  return bien;
	} catch (error) {
	  return "Ha ocurrido algo al intentar obtener el bien\n" + error
	}
};

const bienes = mongoose.model('bienes',bienSchema);

module.exports = bienes;
