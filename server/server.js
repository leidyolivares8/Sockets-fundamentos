const express = require('express');
const socketIO = require('socket.io');
//importamos el paquete
//socket.io no trabaja directamente con la aplicacion de express
//socket.io trabaja con un servidor http que ya trae node por defecto.
const http = require('http');

const path = require('path');

const app = express();

//Definir el servidor para correr nuestra aplicacion
//express esta basado en http, enviar como argumento app
//tenemos montado el servidor con toda la configuración que podemos hacer en express
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//inicializar el socket.io
//lio= esta es la comunicacion del backed
//lio nos va a decir usuarios conectados, disparar eventos , etc.

//let lio = socketIO(server);
module.exports.lio = socketIO(server);
require('./sockets/socket');

//app.listen cambiamos por server.listen
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);
});

//module.exports={
//lio   
//}Errr, debe ser una funcion lio no es una funcion