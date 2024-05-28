window.addEventListener('load', function() {
    let config = {
        type:       Phaser.AUTO,
        width:      720,
        height:     1600,
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        pageAlignHorizontally : true,
    };

    let juego         = new Phaser.Game(config);

    let pantalla_ruleta = null;
    let pantalla_preg   = null;
    let pantalla_resp   = null;

    function preload (){
        pantalla_ruleta = new PantallaRuleta({ configuracionJuego:config, juego:this });
        pantalla_preg   = new PantallaPreguntas({ configuracionJuego:config, juego:this });
        pantalla_preg.pantalla_ruleta = pantalla_ruleta;
        pantalla_resp   = new PantallaRespuesta({ configuracionJuego:config, juego:this });
        pantalla_ruleta.pantalla_preg = pantalla_preg;
        pantalla_preg.pantalla_resp   = pantalla_resp;
        pantalla_resp.pantalla_ruleta = pantalla_ruleta;

        pantalla_ruleta.preload();
        pantalla_preg.preload();
        pantalla_resp.preload();
    }

    function create (){
        pantalla_ruleta.create();
        pantalla_preg.create();
        pantalla_resp.create();
    }

    function update (){
        pantalla_ruleta.update();
    }
});