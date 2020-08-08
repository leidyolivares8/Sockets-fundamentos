//clase para controlar los usuarios del chat

//Objeto, aspecto que va a tener cada usuario
//:)persona {
//     id: 'aldjfdijdo',
//     nombre: 'Maria',
//     sala: 'Video Juegos'
// }ctrl c= comentar lineas


class Usuarios { // se va a encargar de todos los usuario conectados

    constructor() {
        this.personas = []; //:)persona
        //inicializar un arreglo con las personas que estan conectadas en el chat
    }

    // metodos para trabajar con las personas:
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        //filter>filtrar en un array 
        //y filter regresa un nuevo arreglo por eso coloco[0] necesito la primera posición
        //[0]sea un unico registro si encuentra

        return persona;
        //si encuentro una persona voy a tener un objeto, sino un undefine o null
    }

    getPersonasPorSala(sala) {

        let personasala = this.personas.filter(persona => persona.sala === sala);
        return personasala;
    }

    getPersonas() {
        return this.personas;
    }



    borrarPersona(id) {
        let personaborrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        // regresar todas las personas cuyo id sea diferente al que me envian

        //remplazar el arreglo actual de las personas q estan activas
        return personaborrada;
    }


}
//Las funciones se definen fuera de las clases, mientras que los Métodos se definen dentro y son parte de las clases.
module.exports = {
    Usuarios
}