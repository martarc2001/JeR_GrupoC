import { anchoJuego, altoJuego } from "../init.js";

export class Flecha extends Phaser.GameObjects.Sprite {
    
    
    constructor(config) {
        super(config.scene, config.x, config.y, "flecha3");
        config.scene.add.existing(this);
        this.queFlecha=0;//(para indicar si 1-izquierda, 2-abajo, 3-arriba, 4-derecha)
        
    }

    mueveFlecha(){
        this.y-=altoJuego/200;
    }

    
}




