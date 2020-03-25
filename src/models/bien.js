const mongoose = require('mongoose')
const lodash = require('lodash');
const Schema = mongoose.Schema;

const categoriaModel = require('./categoria')

//Clase file, especial para un subdocumento
const fileSchema = Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  archivo: {
    type: Buffer,
    require: true
  }
})

//Clase bien
const bienSchema = Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'clientes',
    require: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'categorias',
    trim: true
  },
  caracteristicas: {
    type: String,
    require: false
  },
  documento: fileSchema
});

/*
    Metodo para guardar un bien
    recibe un arreglo json de parametros
    retorna un arreglo JSON {id: #, mensaje:...}
*/
bienSchema.statics.guardarBien = async function (datos) {

  const clienteModel = require('./cliente')
  let validacion = { id: "0", mensaje: "" }

  //Validacion del nombre
  if (datos.body.nombre == "") {
    validacion.mensaje += "El nombre es obligatorio"
  }

  //Validacion categoria
  if (datos.body.categoria == "") {
    validacion.mensaje += "Tienes que seleccionar una categoria"
  }

  //Validacion del cliente
  if (await clienteModel.obtenerClienteById(datos.body.cliente) == null) {
    validacion.mensaje += "El bien no ha sido guardado, cliente no existe en la base de datos."
  }

  //Validacion de la existencia de la categoria
  if (await categoriaModel.obtenerCategoriaById(datos.body.categoria) == null) {
    validacion.mensaje += "El bien no ha sido guardado, categoria no existe en la base de datos."
  }

  if (!datos.file) {
    validacion.mensaje += "El documento es obligatorio."
  }
  else {
    //Validacion archivo es pdf
    if (datos.file.mimetype != 'application/pdf') {
      validacion.mensaje += "El bien no ha sido guardado, el archivo no es un pdf."
    }

    //Validacion archivo no excede 16Mb
    if (datos.file.size >= 16000000) {
      validacion.mensaje += "El bien no ha sido guardado, el archivo excede el tamaño permitido: 16Mb."
    }
  }

  validacion.mensaje += await bienes.verificarBienesRepetidos(datos.body)

  //Si no pasa alguna validacion retorna el mensaje correspondiente
  if (validacion.mensaje.length != 0) return validacion

  //Objeto bien
  const bienNuevo = new bienes(
    {
      nombre: datos.body.nombre,
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
    return { id: "1", mensaje: "El bien ha sido guardado correctamente." };
  } catch (error) {
    return { id: "0", mensaje: "Error desconocido" };
  }
};

//Metodo para retornar todos los bienes
bienSchema.statics.obtenerBienes = async function () {
  try {
    let listaBienes = await bienes.find({}, { documento: 0 }).
      populate('cliente').
      populate('categoria').
      exec();
    return listaBienes
  } catch (error) {
    return "Ha ocurrido algo al intentar obetener bienes\n" + error;
  }
};

//Metodo para retornar todos los bienes asociados a un cliente
bienSchema.statics.obtenerBienesPorCliente = async function (cliente) {
  try {
    let listaBienes = await bienes.find({ cliente: cliente }, { documento: 0 }).
      populate('cliente').
      populate('categoria').
      exec();
    return listaBienes;
  } catch (error) {
    return "Ha ocurrido algo al intentar obtener bienes del cliente\n" + error
  }
};

//Metodo para retornar todos los bienes asociados a un cliente
bienSchema.statics.obtenerBienPorId = async function (IdBien) {
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

//Método para borrar bienes por su id

bienSchema.statics.borrarBienesDeCliente = async function (id, admin) {
  if (admin) {
    const Seguros = require('./seguro');
    try {
      const listaSeguros = await Seguros.obtenerSeguros();
      let bienreal = await bienes.obtenerBienPorId(id);
      for (let i = 0; i < listaSeguros.length; i++) {
        if (listaSeguros[i] != null) {
          let elBien = listaSeguros[i].bien;
          if (bienreal._id.toString() == elBien._id.toString()) {
            return "No se puede borrar el bien ya que cuenta con seguros registrados";
          }
        }
      }
      let bien = await bienes.findByIdAndRemove(id);
      return "Bien borrado correctamente";
    } catch (error) {
      return "Ha ocurrido algo inesperado al intentar borrar el bien\n" + error;
    }
  } else {
    return "No tienes permisos para hacer esto";
  }
}

//Verificación básica de los bienes para saber si se repite al momento de su creación
bienSchema.statics.verificarBienesRepetidos= async function (datos) {
  let listaBienes = await bienes.find({cliente:datos.cliente,nombre:datos.nombre,categoria:datos.categoria})
  if (listaBienes.length>0){
    return "Ya hay un bien con estas características para este cliente"
  }else{
    return ""
  }
}

bienSchema.statics.topCincoCategorias= async function (){
  try {
    let listaBienes = await bienes.find({}, { documento: 0 }).
      populate('cliente').
      populate('categoria').
      exec();
    if (listaBienes.length==0){
      return "No se han registrado bienes aún"
    }
    let agrupados= lodash.groupBy(listaBienes, 'categoria.nombre')
    let conteo = {}
    for (categoria in agrupados){
      conteo[categoria]=agrupados[categoria].length
    }
    var ordenada = Object.keys(conteo).map(function(categoria) {
      return [categoria, conteo[categoria]];
    });
    
    // Ordenar por el segundo elemento de la lista
    ordenada.sort(function(categoria, cantidad) {
      return cantidad[1] - categoria[1];
    });

    let resultado={}
    tamaño=0
    for (let i = 0; i < ordenada.length; i++){
      if (i>=5 && ordenada[i][1]<tamaño){
        break
      }
      tamaño=ordenada[i][1]
      resultado[ordenada[i][0]]=ordenada[i][1]
    }
    return resultado
  } catch (error) {
    return {id:0,mensaje:"Ha ocurrido algo al intentar obtener bienes\n" + error}
  }
};

const bienes = mongoose.model('bienes', bienSchema);

module.exports = bienes;
