class Boton extends ElementoJuego {
    delay = 150;
    click_btn = null;
    click_tint = 0xd4c048ff;

    constructor ( params ){
        super( params );
    }

    onClick = ()=>{};
    setOnClick( funcion ){
        this.onClick = funcion;
    }

    cargarAudio(){
        this.juego.load.audio('click_btn', [ 'assets/audio/wclick.mp3' ]);
    }

    defAudio(){
        this.click_btn = this.juego.sound.add('click_btn');
    }

    defPhaserSprite(){
        super.defPhaserSprite();
        let obj = this;
        this.phaserSprite.setInteractive();

        this.phaserSprite.on('pointerdown', function (pointer) {
            this.setTint(obj.click_tint); 
            obj.juego.sound.play('click_btn');
            setTimeout( ()=>{
                obj.onClick();
            }, obj.delay);
        });

        this.phaserSprite.on('pointerup', function (pointer) {
            this.clearTint();
        });

        this.phaserSprite.on('pointerout', function (pointer) {
            this.clearTint();
        });
    }

    update(){
        
    }
}