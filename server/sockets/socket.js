const { lio } = require('../server');
const { Usuarios } = require('../clases/usuario');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

//saber cuando un usuario se conecta al server: Conectar un usuario al servidor backed escucha los datos y envia 
//callback con los usuarios q estan conectados utilizando de la clase los metodos agregar personas
lio.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala); //Join unir a una sala

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('ListaPersona', usuarios.getPersonasPorSala(data.sala)); //Lista de personas alguien se conecte---...

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    //El servidor este escuchando cuando alguien llame el metodo crearMensaje desde el front
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });



    client.on('disconnect', () => {

        let personaborrada = usuarios.borrarPersona(client.id);
        //resolvemos la duplicidad de personas

        //enviar mensaje a todos (sala)cuando el usuario se desconecte
        client.broadcast.to(personaborrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaborrada} salio`));

        client.broadcast.to(personaborrada.sala).emit('ListaPersona', usuarios.getPersonasPorSala(personaborrada.sala));
        //---...Lista de personas , necesito disparar nuevamente abandone el chat cuales quedaron
    });

    //¨¨Mensajes privado escuchar
    //Lo que va  a hacer el servidor cuando alguien quiere enviar un mensaje privado
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersonasPorSala(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});