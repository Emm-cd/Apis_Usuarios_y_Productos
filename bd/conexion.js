// En este código se realiza la conexión a Firebase y que se pueda tener acceso a la base de datos
const admin = require ("firebase-admin"); // Se importa el SDK de firebase admin, que nos permitira interactuar con el desde la parte del servidor 
const keys = require ("../keys.json"); // contiene las credenciales de servicio para la autenticación de Firebase, 
// incluye información confidencial y permite al servidor que se autentique correctamente en Firebase.
admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const proyecto = admin.firestore(); // Obtiene una instancia de Firestore, que es la base de datos NoSQL de Firebase. 
// Firestore permite almacenar, sincronizar y consultar datos en tiempo real.
const usuarios = proyecto.collection("Ejemplo");
const productos = proyecto.collection("Productos");
const ventas = proyecto.collection("Ventas");
//Se accede a la colección llamada Ejemplo en Firestore. Las colecciones en Firestore son grupos de documentos
//Esta referencia permite realizar consultas, agregar, eliminar o modificar documentos dentro de la colección.


module.exports ={
    usuarios,
    productos,
    ventas
}
