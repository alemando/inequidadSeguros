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
        res.json("Ya hay una sesión iniciada")
    }else{
        info = await Vendedor.iniciarSesionVendedor(req.body)
        if (info!="Usuario o contraseña incorrectos"){
            req.session._id = info._id
            req.session.esAdmin = info.esAdmin
            res.json("Sesion iniciada")
        }else{
            res.json(info)
        }
    }
})

/*Muestra los datos de la sesión actual, o manda un mensaje en caso de no haber sesión
*/
router.get('/showSession', async (req,res) =>{
    if (req.session._id || req.session.esAdmin){
        res.json({_id: req.session._id, esAdmin: req.session.esAdmin})
    }else{
        res.json("No hay sesión para mostrar")
    }
})

module.exports = router