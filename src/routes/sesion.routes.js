const express = require('express');
const router = express.Router();

//Vendedor Model
const Vendedor = require('../models/vendedor');

exports.cerrarSesion = async (req,res)=>{
    if(req.session._id  || req.session.esAdmin ){
        req.session._id = null
        req.session.esAdmin = null
        res.json("Sesión cerrada")
    }
    else{
        res.json("No hay una sesión por cerrar")
    }
    
}

exports.iniciarSesion = async(req, res)=>{
    info = await Vendedor.iniciarSesionVendedor(req.body)
    console.log(info)
    if (info!="Usuario o contraseña incorrectos"){
        req.session._id = info._id
        req.session.esAdmin = info.esAdmin
        res.json("Sesion iniciada")
    }else{
        res.json(info)
    }
}

exports.mostrarSesion = async (req,res) =>{
    if (req.session._id || req.session.esAdmin){
        res.json({_id: req.session._id, esAdmin: req.session.esAdmin})
    }else{
        res.json("Sesión no iniciada o con datos faltantes")
    }
}

