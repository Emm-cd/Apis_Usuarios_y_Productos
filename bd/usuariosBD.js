const usuariosBD = require("./conexion").usuarios;
const Usuario=require("../modelos/UsuarioModelo");
const {encryptarPassword, validarPassword, usuarioAutorizado, adminAutorizado} = require("../middleware/funcionesPassword");

function validarDatos(usuario) {
    var valido=false;
    if(usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined){
        var valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    //console.log(usuarios);
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        //console.log(usuario.data());
        
        const usuario1=new Usuario({id:usuario.id, ... usuario.data()});
        //console.log(usuario1.gatUsuario);
        
        if(validarDatos(usuario1.gatUsuario)){
            usuariosValidos.push(usuario1.gatUsuario);
        }
    });
    //console.log(usuariosValidos);
    
    return usuariosValidos;
    //console.log(usuariosValidos);

}

async function buscarPorID(id){
    const usuario = await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id, ... usuario.data()});
    var usuarioValido;
    if(validarDatos(usuario1.gatUsuario)){
        usuarioValido=usuario1.gatUsuario;
    }
    //console.log(usuarioValido.nombre);
    return usuarioValido;
}

async function nuevoUsuario(data){
    const {salt,hash} = encryptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data);
    //console.log(usuario1.gatUsuario);
    var usuarioValido=false;
    if(validarDatos(usuario1.gatUsuario)){
        await usuariosBD.doc().set(usuario1.gatUsuario);
        usuarioValido=true;
    }
    return usuarioValido;
    
}

async function editarUsuario(id, nombre, usuario, password) {
    const usuarios = await buscarPorID(id);
    
    if (usuarios) {
        await usuariosBD.doc(id).update({ nombre: nombre, usuario:usuario, password:password });
        return true;
    }
    return false;
}


async function borrarUsuario(id) {
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if(usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true;
    }
    return usuarioBorrado;
}

module.exports ={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID,
    editarUsuario
}

// Revisar cuando si existe el usuario, pero el usuario es incorrecto
//borrarUsuario("2000");

//data = {}

/*async function prueba(){
    console.log(await nuevoUsuario(data));

}

prueba();



//buscarPorID("100");
//mostrarUsuarios();
*/