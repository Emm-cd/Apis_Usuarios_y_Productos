var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsuario,borrarUsuario,buscarPorID, editarUsuario} = require("../bd/usuariosBD");
//var{Router} = require("express");

rutas.get("/",async (req,res)=>{
    //res.send("Hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id", async (req,res)=>{
    var usuarioValido = await buscarPorID(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id", async (req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario", async (req,res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

rutas.patch("/editarUsuario/:id", async (req,res)=>{
    const {nombre, usuario, password} = req.body;
    const usuarioActualizado = await editarUsuario(req.params.id, nombre, usuario, password);
    res.json(usuarioActualizado); 
});


module.exports = rutas;