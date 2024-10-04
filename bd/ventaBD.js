const ventaBD = require ("./conexion").ventas;
const Venta = require ("../modelos/VentaModelo");
const productoBD = require("./productosBD");
const usuarioBD = require("./usuariosBD");


function validarDatos(venta) {
    var valido=false;
    if(venta.cantidad != undefined && venta.fecha != undefined && venta.hora != undefined && venta.status != undefined && venta.id_usuario != undefined && venta.id_producto){
        var valido=true;
    }
    return valido;
}

async function mostrarVenta(){

    const snapshot = await ventaBD.get(); 
    //console.log(snapshot);

    ventasValidas = [];

    const promesasVentas = snapshot.docs.map(async doc => {
        const venta = doc.data();
        const venta1 = new Venta({ id: doc.id, ...venta });

        // Promise.all para ejecutar las promesas de usuario y producto en paralelo
        const [usuarioValido, productoValido] = await Promise.all([
            usuarioBD.buscarPorID(venta1.getVenta.id_usuario),
            productoBD.buscarPorID(venta1.getVenta.id_producto)
        ]);

   /* const ventas = await ventaBD.get();
    console.log(ventas);
    
    //console.log(usuarioValido);
    
   // Se esta recuperando el usuario valido(todos los datos) por medio de la funcion buscarporID
  //  console.log(usuarioValido);
    //var productoValido = productoBD.buscarPorID(ventas.id);
    //var nombreUsu = usuarioValido.nombre; // Solo toma el nombre del usuario que recupero
    //var nombreProd = productoValido.nombre;

    ventasValidas=[];
    ventas.forEach(venta => {  

        const venta1=new Venta({id:venta.id, ... venta.data()}); 

        */
       /* const usuarioValido = usuarioBD.buscarPorID(venta1.getVenta.id_usuario);
        const productoValido = productoBD.buscarPorID(venta1.getVenta.id_producto);
*/
        if (usuarioValido) {
            var nombreUsu = usuarioValido.nombre;
            venta1.nombreUsuario = nombreUsu;
        } else {
            console.error("Usuario no encontrado");
        }
        
        if (productoValido) {
            var nombreProd = productoValido.nombre;
            venta1.nombreProducto = nombreProd;
        } else {
            console.error("Producto no encontrado");
        }
        //console.log(productoValido);
        
        //var nombreUsu = usuarioValido.nombre; // Solo toma el nombre del usuario que recupero
        //var nombreProd = productoValido.nombre;
        //venta1.nombreUsuario=nombreUsu;
        //venta1.nombreProducto=nombreProd;
        //console.log(venta1.getVenta.id_usuario);
        //console.log(venta1.getVenta.id_producto);
        //console.log(nombreUsu);
        //console.log(nombreProd);
        
        
        
        if(validarDatos(venta1.getVenta)){
            ventasValidas.push({
                ...venta1.getVenta,
                nombreUsuario: venta1.nombreUsuario, 
                nombreProducto: venta1.nombreProducto
            });     
        }
    }); 
    await Promise.all(promesasVentas);
    
    return ventasValidas;
}

async function buscarPorID(id){
    const venta = await ventaBD.doc(id).get();
    const venta1=new Venta({id:venta.id, ... venta.data()});
    var ventaValida;
    if(validarDatos(venta1.getVenta)){
        ventaValida=venta1.getVenta;
    }
    return ventaValida;
}

async function nuevaVenta(data){
    //console.log(data);
    
    const venta1 = new Venta(data);
    //console.log(venta1.data);
    
    var ventaValida=false;
    if(validarDatos(venta1.getVenta)){
        await ventaBD.doc().set(venta1.getVenta);
        ventaValida=true;
    }
    return ventaValida;   
}

async function cancelarVenta(id) {
    var ventaValida = await buscarPorID(id);
    var ventaCancelada = false;
    if(ventaValida){
        const venRef = ventaBD.doc(id);
        await venRef.update ({
            status: "cancelado"
        })
        console.log("Venta Actualizada");
        ventaCancelada = true;
    }
    return ventaCancelada;
}

module.exports ={
    mostrarVenta,
    nuevaVenta,
    buscarPorID,
    cancelarVenta
}