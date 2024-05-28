
class Puntuador {
    respuestas = [];
    puntaje = [];

    juegoConf = null;
    juego = null;
    
    constructor( params ){
        this.juegoConf = params.configuracionJuego;
        this.juego     = params.juego;
    }
}