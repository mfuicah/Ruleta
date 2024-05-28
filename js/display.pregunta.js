
class DisplayPreguntas extends ElementoJuego{
    alto = 200;
    ancho = 720;

    pregunta_actual = null;
    texto = null;

    constructor ( params ){
        super( params );
    }

    cargar_pregunta( pregunta ){
        this.pregunta_actual = pregunta;
        if (this.texto != null){
            this.texto.destroy();
        }
        this.texto = this.juego.add.text(this.x-this.ancho*.4, this.y-this.alto/2+10, '', 
                        { fontFamily: 'Andale Mono, Liberation Mono, Cousine', fontSize: 40, color: '#00ff45' });
        this.texto.setWordWrapWidth( this.ancho*.8, true );
        this.texto.setText('¿'+this.pregunta_actual.t+'?');
    }

    ocultar(){
        super.ocultar();
        if ( this.texto != null)
            this.texto.destroy();
    }
}