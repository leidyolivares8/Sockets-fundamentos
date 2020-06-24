//index.html
//<script src="js/socket-custom.js">
// javascript lo pasamos a este js
//</script></script>

var socket = io('http://localhost:3000');
//comunicacion entre el frond-end-la maquina del cliente hacia el servidor

//saber cuando un usuario se conecta al servidor
//on=para escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//saber cuando un usuario se desconecto del servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Emitir mensaje del cliente y que el servidor lo escuche, envio un objeto
//emit=para enviar información
socket.emit('EnviarMensaje', {
    usuario: 'Leidy',
    mensaje: 'Hola'
}, function(resp) {
    console.log('Respuesta server', resp);
});
//function para tener una confirmacion del servidor(que grabo en la bd, que le llego la info, que le llego al usuario que debe)
//argumentos al emit:1:Nombre del evento EnviarMensaje ,2:Objeto, 3:la funcion que se va a ejecutar cuando salga bien
//!!servidor lo va a recibir ir al server a escuchar la informacion recibirla

//&&listener escuchar informacion , recibo una funcion
socket.on('EnviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});