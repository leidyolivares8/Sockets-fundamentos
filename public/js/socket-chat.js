//index.html
//<script src="js/socket-custom.js">
// javascript lo pasamos a este js
//</script></script>
//front end
var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) { //verificar que tenga los dos parametros el nombre y la sala
    window.location = 'index.html'; //sino vienen los dos parametros me redirecciona al index 
    throw new console.error('El nombre y sala son necesario');
}

var usuario = {
        nombre: params.get('nombre'),
        sala: params.get('sala')
    } //comunicacion entre el frond-end-la maquina del cliente hacia el servidor

//saber cuando un usuario se conecta al servidor
//on=para escuchar
//Conectar un usuario 
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) { //conectar con su usuario emitir usuario, recibre respuesta de los q estan
        console.log('Usuarios conectados', resp);
    });
});

//saber cuando un usuario se desconecto del servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Emitir mensaje del cliente y que el servidor lo escuche, envio un objeto
//emit=para enviar información
//socket.emit('EnviarMensaje', {
//   usuario: 'Leidy',
//   mensaje: 'Hola'
//}, function(resp) {
//    console.log('Respuesta server', resp);
//});


//function para tener una confirmacion del servidor(que grabo en la bd, que le llego la info, que le llego al usuario que debe)
//argumentos al emit:1:Nombre del evento EnviarMensaje ,2:Objeto, 3:la funcion que se va a ejecutar cuando salga bien
//!!servidor lo va a recibir ir al server a escuchar la informacion recibirla

//&&listener escuchar informacion , recibo una funcion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});


//Escuchar cambio
//cuando un usuairo entra o sale del chat
socket.on('ListaPersona', function(personas) {
    console.log(personas);
});


//¨¨Mensajes privado escuchar cuando se dispare un mensaje privado
//Accion de escuchar del cliente de un mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);
})