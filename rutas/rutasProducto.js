var rutas = require("express").Router();
var {mostrarProductos, buscarPorID, nuevoProducto, borrarProducto, editarProducto} = require("../bd/productosBD");

rutas.get("/",async (req,res)=>{
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

rutas.get("/buscarPorId/:id", async (req,res)=>{
    var productoValido = await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrarProducto/:id", async (req,res)=>{
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoProducto", async (req,res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

rutas.patch("/editarProducto/:id", async (req,res)=>{
    const {nombre, precio, stock} = req.body;
    const productoActualizado = await editarProducto(req.params.id, nombre, precio, stock);
    res.json(productoActualizado); 
});

module.exports = rutas;