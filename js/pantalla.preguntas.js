class PantallaPreguntas{
    ruleta        = null;
    boton_tirar   = null;
    selector      = null;
    btns_opciones = [];
    display_preg  = null;
    puntuador     = null;
    pantalla_resp = null;
    pantalla_ruleta = null;

    juegoConf = null;

    ultima_pregunta = null;
    lista_respuesta = null;
    respuesta_selec = null;
    resultado_ultima_r = false;

    textos_respuestas = [];

    snd_correcto   = null;
    snd_incorrecto = null;

    constructor( params ){
        this.juegoConf = params.configuracionJuego;
        this.juego     = params.juego;
    }

    setRuleta( ruleta ){ this.ruleta = ruleta; }
    setBotonTirar ( boton_tirar ){ this.boton_tirar = boton_tirar; }
    setSelector( selector ){ this.selector = selector; }
    setPuntuador( puntuador ){ this.puntuador = puntuador; }
    
    preload(){
        this.cargarAudio();

        for (let c=1; c < 5; c++){
            this.btns_opciones[c] = new Boton( { configuracionJuego:this.juegoConf, juego:this.juego, imgURL:'./assets/imagen/b'+c+'.svg', nombreImg:'b'+c } );
            this.btns_opciones[c].cargarImg();
            this.btns_opciones[c].cargarAudio();
        }

        this.display_preg = new DisplayPreguntas({ configuracionJuego:this.juegoConf, juego:this.juego, imgURL:'./assets/imagen/areapreg.svg', nombreImg:'areapreg' });
        this.display_preg.cargarImg();
    }

    create(){
        this.defAudio();

        let i = 3;
        for (let c=1; c < 5; c++){
            this.btns_opciones[c].defPhaserSprite();
            this.btns_opciones[c].defAudio();
            this.btns_opciones[c].ocultar();

            this.btns_opciones[c].posicionar( this.juegoConf.width*0.2, this.juegoConf.height/1.2 -(i)*160);
            this.btns_opciones[c].phaserSprite.setScale(2);
            this.btns_opciones[c].setOnClick( () => { this.opcion_btn_click(c); } );
            i--;
        }

        this.display_preg.defPhaserSprite();
        this.display_preg.posicionar( this.juegoConf.width/2, this.juegoConf.height*.25 );
        this.display_preg.phaserSprite.setScale(1.75);
        this.display_preg.ocultar();
    }

    opcion_btn_click( numero ){
        this.respuesta_selec = null;
        for (let c=0; c < this.lista_respuesta.length; c++){
            if (this.lista_respuesta[c].n == numero){
                this.respuesta_selec = this.lista_respuesta[c];
                break;
            }
        }
        this.comprobar_respuesta();
    }

    comprobar_respuesta(){
        if (this.respuesta_selec == null){
            this.respuesta_incorrecta();
            return false;
        }

        if (this.respuesta_selec.r.c == 1){
            this.respuesta_correcta();
        } else {
            this.respuesta_incorrecta();
        }
    }

    cargarAudio(){
        this.juego.load.audio('correcto1',   [ 'assets/audio/bien1.mp3' ]);
        this.juego.load.audio('incorrecto1', [ 'assets/audio/mal1.mp3' ]);
    }

    defAudio(){
        this.snd_correcto   = this.juego.sound.add('correcto1');
        this.snd_incorrecto = this.juego.sound.add('incorrecto1');
    }

    respuesta_incorrecta(){
        this.resultado_ultima_r = false;
        this.juego.sound.play('incorrecto1');
        this.ocultarVista();
        this.pantalla_resp.mostrarVista(this.resultado_ultima_r, this.ultima_pregunta);
    }

    respuesta_correcta(){
        this.resultado_ultima_r = true;
        this.juego.sound.play('correcto1');
        this.ocultarVista();
        this.pantalla_resp.mostrarVista(this.resultado_ultima_r, this.ultima_pregunta);
    }

    ocultarVista(){
        for (let c = 1; c < 5; c++){
            this.btns_opciones[c].ocultar();
        }
        this.display_preg.ocultar();
        for (let c=0; c < this.textos_respuestas.length; c++){
            this.textos_respuestas[c].destroy();
        }
        this.textos_respuestas = [];
    }

    mostrarVista( pregunta_obtenida ){
        this.pantalla_ruleta.ocultarVista();
        this.display_preg.mostrar();

        for (let c=1; c < this.btns_opciones.length; c++){
            this.btns_opciones[c].mostrar();
        }

        this.ultima_pregunta = pregunta_obtenida;
        this.lista_respuesta = [];
        let diffY = 20;
        let i = 3;
        for (let c=0; c< this.ultima_pregunta.r.length; c++){
            this.lista_respuesta.push({ n:c+1, r:this.ultima_pregunta.r[c]  })
            if (this.textos_respuestas[c] != undefined){
                this.textos_respuestas[c].destroy();
            }
            this.textos_respuestas[c] = this.juego.add.text(this.juegoConf.width*0.1 +160, this.juegoConf.height/1.2 -(i)*160 -diffY, '', 
                            { fontFamily: 'Andale Mono, Liberation Mono, Cousine', fontSize: 40, color: '#00ff45' });
            this.textos_respuestas[c].setWordWrapWidth( this.juegoConf.width - (this.juegoConf.width*0.1 +160), true );
            this.textos_respuestas[c].setText( this.ultima_pregunta.r[c].t );
            i--;
        }

        this.display_preg.cargar_pregunta( this.ultima_pregunta );
    }
}