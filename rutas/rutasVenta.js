var rutas = require("express").Router();
var {mostrarVenta ,buscarPorID, nuevaVenta, cancelarVenta} = require("../bd/ventaBD");

rutas.get("/",async (req,res)=>{
    var ventasValidas = await mostrarVenta();
    res.json(ventasValidas);
});

rutas.get("/buscarPorId/:id", async (req,res)=>{
    var ventaValida = await buscarPorID(req.params.id);
    res.json(ventaValida);
});

rutas.patch("/ventaCancelada/:id", async (req,res)=>{
    var ventaCancelada = await cancelarVenta(req.params.id);
    res.json(ventaCancelada);
});

rutas.post("/nuevaVenta", async (req,res) => {
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});

module.exports = rutas;