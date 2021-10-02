import { anchoJuego, altoJuego } from "../init.js";


class Partida extends Phaser.Scene {
    constructor() {
        super({
            key: "Partida",
            active: true
        });
    }
    preload() {
        //this.load.image("miIcono", "/src/images/Icono pruebas.png")
    }

    create() {
        //this.add.image(anchoJuego/2, 400, "miIcono");
    }

}

export default Partida;