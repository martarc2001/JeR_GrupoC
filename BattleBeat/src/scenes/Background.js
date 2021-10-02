import {anchoJuego, altoJuego} from "../init.js";


class Background extends Phaser.Scene {
    constructor() {
        super({
            key: "Background",
            active: true
        });
    }
    preload() {
        this.load.image('miBG', '/src/images/BG.jpg');
    }

    create() {
        this.miBG=this.add.image(0, 0, 'miBG');
        this.miBG.setOrigin(0,0);
        this.miBG.setScale(anchoJuego/this.miBG.width,altoJuego/this.miBG.height); //Imagen se escalará con el resto del juego

    }






}

export default Background;