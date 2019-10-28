const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const criterioSchema = Schema({
  numero: {
    type: Number,
    require: true,
    trim: true
  }
});
criterioSchema.plugin(uniqueValidator);

criterioSchema.statics.guardarCriterio = async function(datos) {
  const criterio = new criterios({numero: datos.numero});
  try {
      await criterio.save();
      return "criterio guardado";
  } catch (error) {
      if (error.errors.id.kind==="unique") return "El documento ingresado ya existe en nuestra base de datos";
      else return "error desconocido";
  }
};

criterioSchema.statics.obtenerCriterio = async function() {
  try{
    let criterioall = await criterios.find();
    return criterioall
  } catch(error){
    return "Ha ocurrido algo al intentar obetener criterio\n" +error;
  }
};

const criterios = mongoose.model('criterios',criterioSchema);

module.exports = criterios;
