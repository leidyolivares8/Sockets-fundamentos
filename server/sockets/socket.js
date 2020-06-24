const { lio } = require('../server');

//saber cuando un usuario se conecta al server:
lio.on('connection', (client) => {
    console.log('Usuario conectado');
    //saber cuando un usuario se desconecta al server:  
    client.on('disconnect', () => {
        console.log('Usuario se desconecto');
    });

    //&&Emitir un mensaje para que el cliente lo escuche
    client.emit('EnviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicacion'
    });


    //!!Escuchar al cliente
    //localhost:3000= socket.emit('EnviarMensaje',{usuario:'tavo',mensaje:'Saludos a todos tavo'})
    //localhost:3000= socket.emit('EnviarMensaje',{usuario:'diana',mensaje:'Saludos a todos diana'})
    //localhost:3000= socket.emit('EnviarMensaje',{usuario:'oscar',mensaje:'Saludos a todos oscar'})
    client.on('EnviarMensaje', (data, callback) => {

        //$$Broadcast para emitir a todos los usaurios q esten conectados al servidor
        console.log(data);
        client.broadcast.emit('EnviarMensaje', data);

        //if (mensaje.usuario) {
        //   callback({
        //      resp: 'TODO SALIO BIEN!'
        //    }); //realizar acciones cuando algo salio bien o salio mal
        //} else {
        //   callback({
        //       resp: 'TODO SALIO MAL '
        //  });
        // }
    });


});
//socket.io me permite especificar parametro que es el cliente,objeto client=(contiene toda la información de la computadora o conexion)
//ya tengo comunicacion activo activo en ambos lugares cliente y servidor
//por ahora la comunicacion en cliente servidor, despues cliente broadcast a todos los clientes, y despues cliente a cliente