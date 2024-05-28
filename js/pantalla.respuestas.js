
class PantallaRespuesta {
    juegoConf = null;
    juego = null;

    ultimo_resultado = null;
    ultima_pregunta  = null;

    texto_result    = null;
    texto_respuesta = null;

    pantalla_ruleta = null;

    boton_sig     = null;

    ancho = 720;

    constructor( params ){
        this.juegoConf = params.configuracionJuego;
        this.juego     = params.juego;
    }

    preload(){
        this.boton_sig = new Boton( { configuracionJuego:this.juegoConf, juego:this.juego, imgURL:'./assets/imagen/btn_sig.svg', nombreImg:'btn_sig' } );
        this.boton_sig.cargarImg();
    }

    create(){
        this.boton_sig.defPhaserSprite();
        this.boton_sig.defAudio();
        this.boton_sig.ocultar();
        this.boton_sig.posicionar( this.juegoConf.width / 2, this.juegoConf.height * .75 );
        this.boton_sig.phaserSprite.setScale(1.5);
        this.boton_sig.setOnClick( ()=> {
            this.ocultarVista();
        });
    }

    ocultarVista(){
        this.boton_sig.ocultar();
        if (this.texto_respuesta != null) { this.texto_respuesta.destroy(); }
        if (this.texto_result != null) { this.texto_result.destroy(); }

        this.pantalla_ruleta.mostrarVista();
    }

    mostrarVista( resultado, ultima_pregunta ){
        this.ultimo_resultado = resultado;
        this.ultima_pregunta  = ultima_pregunta;

        if (this.texto_respuesta != null) { this.texto_respuesta.destroy(); }
        if (this.texto_result != null) { this.texto_result.destroy(); }

        this.texto_result = this.juego.add.text(this.juegoConf.width/2, this.juegoConf.height*.25, '', 
                        { fontFamily: 'Andale Mono, Liberation Mono, Cousine', fontSize: 50, fontWeight: 'bold', color: '#00ff45' });
        
        if (this.ultimo_resultado)
            this.texto_result.setText('¡Respuesta Correcta!');
        else 
            this.texto_result.setText('¡Respuesta Incorrecta!');
        
        this.texto_result.setX( this.texto_result.x - this.texto_result.width/2 );

        this.texto_respuesta = this.juego.add.text(this.juegoConf.width/20, this.juegoConf.height*.30, '', 
                        { fontFamily: 'Andale Mono, Liberation Mono, Cousine', fontSize: 36, fontWeight: 'bold', color: '#00ff45' });
        
        this.texto_respuesta.setWordWrapWidth( this.ancho*.8, true );
        if (this.ultima_pregunta.hasOwnProperty('rc')){
            this.texto_respuesta.setText(this.ultima_pregunta.rc);
        }

        this.boton_sig.mostrar();
    }
}