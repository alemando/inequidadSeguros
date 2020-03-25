const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Clase criterio, especial para un subdocumento
const criterioSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    cobertura: {
        type: String,
        require: true,
        trim: true
    },
    deducible: {
        type: String,
        require: true,
        trim: true
    }
})

//Clase categoria
const categoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
        unique: true
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
categoriaSchema.statics.guardarCategoria = async (datos) => {

    let validacion = { id: "0", mensaje: "" }
    //Validar que datos no esta vacido
    if (Object.keys(datos).length == 0) {
        validacion.mensaje += "La categoría no ha sido guardada, JSON vacio."
    } else {
        // Validacion si nombre es no null o string vacio
        if (datos.nombre == null) {
            validacion.mensaje += "La categoría no ha sido guardada, no puedes dejar el nombre de categoría vacio."
        } else if (datos.nombre == "") {
            validacion.mensaje += "La categoría no ha sido guardada, asegurese de que la categoría tenga un nombre."
        }

        if(await categorias.findOne({nombre: datos.nombre}) != null){
            validacion.mensaje += "Ya existe una categoria con este nombre."
        }

        //Validacion que exista el atributo opcional criterios
        if (datos.criterios.length != 0) {
            //Validacion de los nombres de criterios no son repetidos
            if (verificarCriterios(datos.criterios)) {
                validacion.mensaje += "La categoría no ha sido guardada, asegúrese de que los criterios tengan nombres diferentes."
            }
        }else{
            validacion.mensaje += "No se puede crear una categoria sin criterios"
        }

    }

    validacion.mensaje += validacionesCriterios(datos.criterios)

    //Si no pasa alguna validacion retorna el mensaje correspondiente
    if (validacion.mensaje.length != 0) return validacion

    //Objeto categoria
    const categoriaNuevo = new categorias(
        {
            nombre: datos.nombre,
            criterios: datos.criterios
        });

    try {
        //Procedo a guardar en la BD
        await categoriaNuevo.save()
        return { id: "1", mensaje: "La categoría ha sido guardada correctamente." }
    } catch (error) {
        if (error.errors.nombre.kind === "unique") return {
            id: "2", mensaje: "Ya existe una categoría " + datos.nombre + " en la base de datos."
        };
        else return { id: "0", mensaje: "Error desconocido" };
    }
}

//Metodo para retornar todas las categorias de la BD
categoriaSchema.statics.obtenerCategorias = async () => {
    try {
        let listaCategorias = await categorias.find();
        return listaCategorias;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener las categorías: \n" + error;
    }
}

//Metodo para retornar todas las categoría habilitadas de la BD
categoriaSchema.statics.obtenerCategoriaHabilitadas = async () =>{
  try {
      let listaCategorias = await categorias.find({estado: true})
      return listaCategorias;
  } catch (error) {
    return "Ha ocurrido algo inesperado al intentar obtener las categorías: \n"+ error;
  }
}

//Metodo para retornar una categoria por su nombre
categoriaSchema.statics.obtenerCategoria = async (nombre) => {
    try {
        let categoria = await categorias.findOne({ nombre: nombre });
        return categoria;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el categoria " + error;
    }
}

//Metodo para cambiar estado a una categoria
categoriaSchema.statics.cambiarEstadoCat = async (id,admin) => {
  if(admin == true){
    try {
      if(id != null){
        let categoria = await categorias.findOne({_id: id});
        categoria.estado = !categoria.estado
        await categoria.save()
        return { id: "1", mensaje: "El estado a la categoría ha sido cambiado correctamente."}
      }
      return {id: "0", mensaje: "id es indefinida"}
    } catch (error) {
       return { id: "0", mensaje: "Error desconocido"};
    }
  }
  return { id: "0", mensaje: "No eres admin para habilitar/inhabilitar categorias"}
}

//Metodo para retornar el nombre de la categoria por su ID
categoriaSchema.statics.obtenerCategoriaById = async (id) => {
    try {
        let categoria = await categorias.findById(id);
        nombreCategoria = categoria.nombre
        return nombreCategoria;
    } catch (error) {
        return "Ha ocurrido algo inesperado al intentar obtener el categoria " + error;
    }
}

categoriaSchema.statics.actualizarCategoriaById = async (id, nuevoNombre, admin) => {
    if (admin) {
        try {
            let categoria = await categorias.findById(id);
            categoria.nombre = nuevoNombre
            await categoria.save()
            return { id: "1", mensaje: "La categoría ha sido actualizada correctamente." }
        } catch (error) {
            return { id: "0", mensaje: "Ha ocurrido algo inesperado al intentar actualizar la categoria " + error };
        }

    } else {
        return { id: "0", mensaje: "No tienes permisos para hacer esto" };
    }

}

const verificarCriterios = (arreglo) => {
    for (let i = 0; i < arreglo.length; i++) {
        for (let j = i; j < arreglo.length; j++) {
            if (arreglo[i].nombre == arreglo[j].nombre && j != i) {
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

    let mensaje = ""

    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i].nombre == "" || arreglo[i].nombre == null) {
            mensaje += "El nombre del criterio " + (i + 1) + " no es válido\n"
            if (arreglo[i].descripcion == "" || arreglo[i].descripcion == null) {
                mensaje += "La descripción del criterio " + (i + 1) + " no es válido\n"
            }
            if (arreglo[i].cobertura == "" || arreglo[i].cobertura == null) {
                mensaje += "El monto a cubrir del criterio " + (i + 1) + " no es válido\n"
            }
            if (arreglo[i].deducible == "" || arreglo[i].deducible == null) {
                mensaje += "El deducible del criterio " + (i + 1) + " no es válido\n"
            }
        }
        else {
            if (arreglo[i].descripcion == "" || arreglo[i].descripcion == null) {
                mensaje += "La descripción del criterio " + arreglo[i].nombre + " no es válido\n"
            }
            if (arreglo[i].cobertura == "" || arreglo[i].cobertura == null) {
                mensaje += "El monto a cubrir del criterio " + arreglo[i].nombre + " no es válido\n"
            }
            if (arreglo[i].deducible == "" || arreglo[i].deducible == null) {
                mensaje += "El deducible del criterio " + arreglo[i].nombre + " no es válido\n"
            }
        }
    }
    return mensaje
};
//Añadir un criterio
categoriaSchema.statics.addCriterio = async(datos,admin)=>{
    let criterio = datos.criterio;
    admin = true
    if (admin) {
        if(criterio.nombre==null||criterio.nombre=="")return{id:"0",mensaje:"El criterio debe tener un nombre"};
        else if (criterio.descripcion==null||criterio.descripcion=="")return{id:"0",mensaje:"El criterio debe tener una descripción"};
        else if (criterio.deducible==null||criterio.deducible=="")return{id:"0",mensaje:"El criterio debe especificar un deducible"};
        else if (criterio.cobertura==null)return{id:"0",mensaje:"El criterio debe especificar un monto a cubrir"};
        else if (criterio.cobertura<0)return{id:"0",mensaje:"El monto a cubrir debe ser mayor o igual a 0"};
        try {
            let categoria = await categorias.findById(datos.idCategoria,"criterios");          
            for(cri of categoria.criterios){
                if(criterio.nombre == cri.nombre) return {id: "0", mensaje: "Ya existe un criterio con este nombre para esta categoría"};
            };
            let criterioNuevo = new criterios({
                nombre:criterio.nombre,
                descripcion:criterio.descripcion,
                cobertura:criterio.cobertura,
                deducible:criterio.deducible
            });
            await categorias.findByIdAndUpdate(datos.idCategoria,{$push:{criterios:criterioNuevo}});
            return { id: "1", mensaje: "Criterio añadido con exito"};
        } 
        catch (error) {
            return { id: "0", mensaje: "Algo ha salido mal:\n" + error}
        };
    } 
    else return { id: "0", mensaje: "No posees privilegios de administrador" };
}
//Eliminar un criterio
categoriaSchema.statics.removeCriterio = async(datos,admin) =>{
    admin = true;
    if (admin) {
        try {
            let categoria = await categorias.findById(datos.idCategoria,"criterios");
            if(categoria.criterios.length == 1) return { id: "0", mensaje: "No se puede dejar una categoria sin criterios base" };
            await categorias.findByIdAndUpdate(datos.idCategoria,{$pull:{criterios:{nombre:datos.nombreCriterio}}});
            return { id: "1", mensaje: "El criterio ha sido eliminado con exito!"};
        } catch (error) {
            return { id: "0", mensaje: "Algo ha salido mal:\n" + error}
        };
    }
    else return { id: "0", mensaje: "No posees privilegios de administrador" };
}
// Editar criterio
categoriaSchema.statics.editarCriterio = async(datos)=> {
    
    let validacion = { id:"0", mensaje: "" };
    let criterio = null;

    try{
        let categoria = await categorias.findById(datos.idCategoria);
        for(let i = 0; i<categoria.criterios.length;i++){
            if(categoria.criterios[i]._id == datos.idCriterio){
                criterio = categoria.criterios[i];
                break;
            }
        }

        if(criterio != null){
            criterio.nombre = datos.nombre;
            criterio.descripcion = datos.descripcion;
            criterio.cobertura = datos.cobertura;
            criterio.deducible = datos.deducible;

            if(verificarCriterios(categoria.criterios) == true){
                validacion.mensaje += "Ya existe un criterio con este nombre";
            }

            validacion.mensaje += validacionesCriterios([criterio]);

            if(validacion.mensaje.length>0){
                validacion.id='2';
                return validacion;
            }

            await categoria.save();

            validacion.mensaje = "Criterio editado con éxito";
            validacion.id = "1";
            return validacion;
    
        } else {
            validacion.mensaje += "No se encontró el criterio \n";
            return validacion;
        }

    }catch (error) {
        return {
            id: '2',
            mensaje: `Error obteniendo el criterio: ${error}`
        };
    }
};

const categorias = mongoose.model('categorias', categoriaSchema);
const criterios = mongoose.model('criterios', criterioSchema);

module.exports = categorias;