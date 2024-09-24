function saludar(){
    console.log("Hola");
}

saludar();

function saludar2(nombre="anonimo"){
    console.log("Hola "+nombre);
}

saludar2("Emma Reséndiz");


function saludar3(nombre="anonimo"){
   var s="Hola "+nombre;
   return s;
}

console.log(saludar3("Carlos"));

var saludo=()=>{
    console.log("Hola");
}

saludo("Manguito");

var saludo2=nombre=>{
    console.log("Hola "+nombre);
}

saludo2("Mango");

var saludo3=nombre=>{
    var s="Hola "+nombre;
    return s;
}

console.log(saludo3("Tenganito"));

var saludo4=nombre=>"Hola "+nombre;
console.log(saludo4("Mamut"));

var saludo5=function () {
    console.log("hola");
}
saludo5();

var saludo6=()=>{
    console.log("Saludo6");
}

var saludo7=(nombre, s)=>{
    console.log("Hola"+nombre);
    return s;
}

saludo7("Wen", saludo6);