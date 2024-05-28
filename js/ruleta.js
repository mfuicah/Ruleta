
class Ruleta extends ElementoJuego {
    config      = null;

    diametro   = 0;
    radio      = 0;
    
    velocidad   = 0;
    aceleracion = -.1;

    ultimo_resultado    = null;
    ultima_pregunta     = null;
    callback_resultado  = null;
    resultado_entregado = true;

    intervalo_subdivision = null;

    listado_preguntas = null;

    click_giro   = null;
    click_cnt    = 0;
    click_cnt_ant = 0;
    constructor ( params ){
        super( params );
        this.config      = params.configuracionRuleta;

        this.listado_preguntas = this.config.listado_preguntas;
        this.intervalo_subdivision = 360/this.config.categorias.length;

        //Se asignan los valores de angulos a las categorias
        //Se usan angulos de 0 a 360 como seria lògico
        for (let c=0; c < this.config.categorias.length; c++){
            this.config.categorias[c].a_i =  c*this.intervalo_subdivision;
            this.config.categorias[c].a_f = (c+1)*this.intervalo_subdivision;
        }

    }

    getResultado(){
        //Se le suma 90º por que el selector esta arriba, no a la derecha de la ruleta
        let pos = anguloPhaserAComun( this.phaserSprite.angle + 90 );
        this.ultimo_resultado = null;

        for (let c=0; c < this.config.categorias.length; c++){
            if ( numeroEntre(pos, this.config.categorias[c].a_i, this.config.categorias[c].a_f) ){
                return this.config.categorias[c];
            }
        }
        return null;
    }

    cargarAudio(){
        this.juego.load.audio('click_ruleta', [ 'assets/audio/click1.ogg', 'assets/audio/click1.mp3' ]);
    }

    defAudio(){
        this.click_giro = this.juego.sound.add('click_ruleta');
    }

    update(){
        this.phaserSprite.angle += this.velocidad;

        this.velocidad += this.aceleracion; 

        if (this.velocidad < 0){
            this.velocidad = 0;
            if (!this.resultado_entregado){
                this.resultado_entregado = true;
                this.ultimo_resultado = this.getResultado();
                this.ultima_pregunta = this.listado_preguntas.getPregunta( this.ultimo_resultado );
                this.callback_resultado();
            }
        } else {
            //Se hace el sonido de la ruleta
            this.click_cnt = Math.round(this.phaserSprite.angle/this.intervalo_subdivision);
            if (this.click_cnt != this.click_cnt_ant){
                this.click_cnt_ant = this.click_cnt;
                this.juego.sound.play('click_ruleta');
            }
            
            
        }   

    }

    tirar(){
        this.resultado_entregado = false;
        this.aceleracion = - ((Math.random() * 3)+3)/30;
        this.velocidad   = Math.floor(Math.random() * 30)+15;
    }
}