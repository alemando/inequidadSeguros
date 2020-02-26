const express = require('express');
const router = express.Router();

//Vendedor Model
const Vendedor = require('../models/vendedor');

//Construcción de funciones de inicio, muestra y cerrado de sesión

//Cierra la sesión poniendo los datos de la sesión en null
router.get('/closeSession', async (req,res)=>{
    if(req.session._id  || req.session.esAdmin ){
        req.session._id = null
        req.session.esAdmin = null
        req.session.nombre = null
        res.json("Sesión cerrada")
    }
    else{
        res.json("No hay una sesión por cerrar")
    }
    
})

/*Inicio de sesión llamando a la función de vendedor que verifica las credenciales y retorna
el id y el booleano de esAdmin en caso de éxito, la función no se activa si ya hay una sesión
activa o las credenciales no son retornadas*/
router.post('/startSession', async(req, res)=>{
    if(req.session._id || req.session.esAdmin){
        res.json(res.json({ id: "0", mensaje: "Ya hay una sesión iniciada"}))
    }else{
        let info = await Vendedor.iniciarSesionVendedor(req.body)
        if (info.id == null){
            req.session._id = info._id
            req.session.esAdmin = info.esAdmin
            req.session.nombre = info.nombre
            res.json({ id: "1", mensaje: "Sesion iniciada"})
        }else{
            res.json(info)
        }
    }
})

/*Muestra los datos de la sesión actual, o manda un mensaje en caso de no haber sesión
*/
router.get('/showSession', async (req,res) =>{
    if (req.session._id || req.session.esAdmin){
        res.json({_id: req.session._id, esAdmin: req.session.esAdmin, nombre: req.session.nombre})
    }else{
        res.json(null)
    }
})

module.exports = router