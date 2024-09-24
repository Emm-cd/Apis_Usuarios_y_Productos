const express = require ("express");
const usuariosRutas = require("./rutas/rutasUsuario");
const productosRutas = require("./rutas/rutasProducto")
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", usuariosRutas);
app.use("/productos", productosRutas);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});