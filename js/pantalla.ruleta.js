
class PantallaRuleta {
    juegoConf = null;
    juego = null;
    ruleta        = null;
    selector_r    = null;
    boton_tirar   = null;
    listado_preg  = null;
    pantalla_preg = null; 
    puntuador     = null;
    
    constructor( params ){
        this.juegoConf = params.configuracionJuego;
        this.juego     = params.juego;
    }

    preload(){
        
        this.listado_preg  = new ListadoPreguntas();

        let configRuleta = {
            colorBorde: '#888',
            colorRelleno: 'yellow',
            anchoBordeExterior: 4,
            //a_i y a_f son angulo de inicio y fin de la categoria correspondientes a angle del sprite de la ruleta y se asignan despues
            //el id se usa para obtener las respuestas del arreglo (servicio a futuro) de preguntas
            categorias:[
                { id:0, color: '#dfdd48', a_i:0, a_f:0, nombre: 'Mitología'   },
                { id:1, color: '#7d03ff', a_i:0, a_f:0, nombre: 'Deportes'    },
                { id:2, color: '#ff8203', a_i:0, a_f:0, nombre: 'Gastronomía' }, //-27
                { id:3, color: '#36dc22', a_i:0, a_f:0, nombre: 'Música'      },
                { id:4, color: '#FFFFFF', a_i:0, a_f:0, nombre: 'Ciencia'     },
                { id:5, color: '#0bace8', a_i:0, a_f:0, nombre: 'Política'    },
                { id:6, color: '#bf32b7', a_i:0, a_f:0, nombre: 'Cine'        },             
            ],

            listado_preguntas: this.listado_preg,
            pantalla_preguntas: this.pantalla_preg
        };
        this.ruleta = new Ruleta({ configuracionJuego:this.juegoConf, juego:this.juego,  imgURL:'./assets/imagen/ruleta.svg', nombreImg:'ruleta', configuracionRuleta:configRuleta } );
        this.ruleta.cargarImg();
        this.ruleta.cargarAudio();

        this.selector_r = new ElementoJuego( { configuracionJuego:this.juegoConf, juego:this.juego, imgURL:'./assets/imagen/select_ruleta.svg', nombreImg:'select_ruleta' } );
        this.selector_r.cargarImg();
        this.boton_tirar = new Boton( { configuracionJuego:this.juegoConf, juego:this.juego, imgURL:'./assets/imagen/btn_tirar.svg', nombreImg:'btn_tirar' } );
        this.boton_tirar.cargarImg();
        
        this.puntuador = new Puntuador({ configuracionJuego:this.juegoConf, juego:this.juego });

        this.pantalla_preg.setRuleta( this.ruleta );
        this.pantalla_preg.setPuntuador( this.puntuador );
        this.pantalla_preg.setBotonTirar( this.boton_tirar );
        this.pantalla_preg.setSelector( this.selector_r );
    }

    ocultarVista(){
        this.ruleta.ocultar();
        this.boton_tirar.ocultar();
        this.selector_r.ocultar();
    }

    mostrarVista(){
        this.ruleta.mostrar();
        this.boton_tirar.mostrar();
        this.selector_r.mostrar();
    }

    create(){
        this.ruleta.defPhaserSprite();
        this.ruleta.phaserSprite.setScale(1.5);
        this.ruleta.defAudio();
        this.ruleta.posicionar( this.juegoConf.width / 2, this.juegoConf.height / 2.5 );
        this.ruleta.callback_resultado = () => { this.pantalla_preg.mostrarVista( this.ruleta.ultima_pregunta ); }
        
        this.selector_r.defPhaserSprite();
        this.selector_r.posicionar( this.juegoConf.width / 2, this.juegoConf.height / 4.75 );
        this.selector_r.phaserSprite.setScale(1.5);

        this.boton_tirar.defPhaserSprite();
        this.boton_tirar.posicionar( this.juegoConf.width / 2, this.juegoConf.height * .75 );
        this.boton_tirar.phaserSprite.setScale(2);
        
        this.boton_tirar.setOnClick( ()=> {
            this.ruleta.tirar();
        });        
    }

    update(){
        this.ruleta.update();
    }

}