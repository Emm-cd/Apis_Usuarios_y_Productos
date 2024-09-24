class Producto{
    constructor(data){
        this.id = data.id,
        this.nombre = data.nombre,
        this.precio = data.precio,
        this.stock = data.stock
    }
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        const nombreRegex=/^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(nombreRegex.test(nombre)){
            this._nombre=nombre;
        }
    }
    set precio(precio){
        const precioRegex = /^[0-9]+(\.[0-9]+)?$/;
        if(precioRegex.test(precio)){
            this._precio=precio;    
        }
    }
    set stock(stock){
        const stockRegex = /^[0-9]+$/;
        if(stockRegex.test(stock)){
            this._stock=stock;
        }
    }

    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get precio(){
        return this._precio;
    }
    get stock(){
        return this._stock;
    }
    get getProducto(){
        const conid={
            id:this.id,
            nombre:this.nombre,
            precio:this.precio,
            stock:this.stock
        }
        const sinid={
            nombre:this.nombre,
            precio:this.precio,
            stock:this.stock
        }
        if (this.id==undefined){
            return sinid;
        } else {
            return conid;
        }
    }
}

module.exports = Producto;