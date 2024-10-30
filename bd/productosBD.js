const productosBD = require ("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarDatos(producto) {
    var valido=false;
    if(producto.nombre != undefined && producto.precio != undefined && producto.stock != undefined){
        var valido=true;
    }
    return valido;
}

async function mostrarProductos(){
    const productos = await productosBD.get();
    productosValidos=[];
    productos.forEach(producto => {
        const producto1=new Producto({id:producto.id, ... producto.data()});      
        if(validarDatos(producto1.getProducto)){
            productosValidos.push(producto1.getProducto);
        }
    });   
    return productosValidos;
}

async function buscarPorID(id){
    const producto = await productosBD.doc(id).get();
    const producto1=new Producto({id:producto.id, ... producto.data()});
    var productoValido;
    if(validarDatos(producto1.getProducto)){
        productoValido=producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data){
    const producto1 = new Producto(data);
    var productoValido=false;
    if(validarDatos(producto1.getProducto)){
        await productosBD.doc().set(producto1.getProducto);
        productoValido=true;
    }
    return productoValido;
    
}

async function editarProducto(id, nombre, precio, stock) {
    const productos = await buscarPorID(id);
    
    if (productos) {
        await productosBD.doc(id).update({ nombre: nombre, precio:precio, stock:stock });
        return true;
    }
    return false;
}

async function borrarProducto(id) {
    var productoValido = await buscarPorID(id);
    var productoBorrado = false;
    if(productoValido){
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

module.exports ={
    mostrarProductos,
    buscarPorID,
    nuevoProducto,
    borrarProducto,
    editarProducto
}