import { anchoJuego, altoJuego } from "../init.js";

var colorArcoiris = 0x000000;

class FiltroColor extends Phaser.Scene {
    constructor() {
        super({
            key: "FiltroColor",
            active: true
        });
    }
    preload() {
        
    }

    create() {
        var graficos = this.add.graphics();        
        this.color = graficos.fillStyle(0xFFC0CB, 0.5);
        this.fondoColor = graficos.fillRect(0, 0, anchoJuego, altoJuego);

    }

   /* update() {
        var graficos = this.add.graphics();
        this.color = graficos.fillStyle(colorArcoiris, 0.5);
        console.log(colorArcoiris);
        this.fondoColor = graficos.fillRect(0, 0, anchoJuego, altoJuego);

        colorArcoiris=(colorArcoiris+1).toString(16);
        if (colorArcoiris > 0xffffff) {
            colorArcoiris = 0x000000;
        } 
    }*/

}

export default FiltroColor;