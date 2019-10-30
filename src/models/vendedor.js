const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const vendedorSchema = Schema({
  documentoVendedor: {
    type: String,
    require: true,
    trim: true
  }
});
vendedorSchema.plugin(uniqueValidator);

vendedorSchema.statics.guardarVendedor = async function(datos) {
  const vendedor = new vendedores({documentoVendedor: datos.documentoVendedor});
  try {
      await vendedor.save();
      return "vendedor guardado";
  } catch (error) {
      if (error.errors.id.kind==="unique") return "El documento ingresado ya existe en nuestra base de datos";
      else return "error desconocido";
  }
};

vendedorSchema.statics.obtenerVendedor = async function() {
  try{
    let vendedorall = await vendedores.find();
    return vendedorall
  } catch(error){
    return "Ha ocurrido algo al intentar obetener vendedor\n" +error;
  }
};

vendedorSchema.statics.obtenerVendedorPorDocumento = async  function(documentoVendedor){
  try {
    let vendedor = await vendedores.findOne({documentoVendedor: documentoVendedor});
    return vendedor;
  } catch (error) {
    return "Ha ocurrido algo al intentar obtener bienes por cliente\n" + error
  }
};

const vendedores = mongoose.model('vendedores',vendedorSchema);

module.exports = vendedores;
