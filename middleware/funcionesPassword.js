var crypto = require("crypto");
function encryptarPassword(password){
    var salt=crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    //console.log(hash);
    return {
        salt,hash
    }
}

function validarPassword(password,hash,salt) {
    const hashValidar = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashValidar==hash;
}

function usuarioAutorizado(params) {
    var autorizado = false;

    return autorizado;
}

function adminAutorizado(params) {
    var autorizado = false;

    return autorizado;
}

//encryptarPassword("holaaaa");

module.exports={
    encryptarPassword,
    validarPassword,
    usuarioAutorizado,
    adminAutorizado
}