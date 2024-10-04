function fecha(req, res, next) {
    const fecha = new fecha();
    const fechaOptions = {
        weekday: 'long',
        year: 'numeric',  
        month: 'long',
        day: 'numeric'
    };
   req.fecha=fecha.toLocaleDateString('en-US', fechaOptions);   
}

function hora(req, res, next){
    const hora = new hora();
    const horaOptions = {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    };
    req.tiempo=tiempo.toLocaleTimeString('en-US', horaOptions);
}

module.exports = {
    fecha,
    hora
}



