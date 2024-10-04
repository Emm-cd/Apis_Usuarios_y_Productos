class Venta{
    constructor(data){ 
        this.id = data.id,
        this.cantidad = data.cantidad,
        this.fecha = data.fecha,
        this.hora = data.hora,
        this.status = data.status,
        this.id_usuario = data.id_usuario,
        this.id_producto = data.id_producto
    }
    set id(id){
        this._id=id;
    }
    set cantidad(cantidad){
        const cantidadRegex = /^[0-9]+$/;
        if(cantidadRegex.test(cantidad)){
            this._cantidad=cantidad;
        }
    }
    set fecha(fecha){
        this._fecha=fecha;
    }
    set hora(hora){
        this._hora=hora;
    }
    set status(status){
        this._status=status;
    }
    set id_usuario(id_usuario){
        this._id_usuario=id_usuario;
    }
    set id_producto(id_producto){
        this._id_producto=id_producto;
    }

    get id(){
        return this._id;
    }
    get cantidad(){
        return this._cantidad;
    }
    get fecha(){
        return this._fecha;
    }
    get hora(){
        return this._hora;
    }
    get status(){
        return this._status;
    }
    get id_usuario(){
        return this._id_usuario;
    }
    get id_producto(){
        return this._id_producto;
    }
    get getVenta(){
        const conid={
            id:this.id,
            cantidad:this.cantidad,
            fecha:this.fecha,
            hora:this.hora,
            status:this.status,
            id_usuario:this.id_usuario,
            id_producto:this.id_producto

        }
        const sinid={
            cantidad:this.cantidad,
            fecha:this.fecha,
            hora:this.hora,
            status:this.status,
            id_usuario:this.id_usuario,
            id_producto:this.id_producto
        }
        if (this.id==undefined){
            return sinid;
        } else {
            return conid;
        }

    }

}

module.exports = Venta;