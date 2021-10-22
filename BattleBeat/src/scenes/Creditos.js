import { anchoJuego, altoJuego } from "../init.js";
import Menu from "./Menu.js";

export default class Creditos extends Phaser.Scene {
    constructor() {
        super({
            key: "Creditos",
            active: true
        });

    }

    preload() {
        //No hay que hacer preload de elementos ya cargados en Menú, porque es la primera escena cargada
        this.load.image('CuadraCrewLogo', '/src/images/Menu/CuadraCrewLogo.png')
    }

    create() {
        this.cameras.main.fadeFrom(1000, 57, 47, 236); //Fade inicial de la escena

        //Fondo
        this.fondo1 = this.add.image(0, 0, 'Fondo1');
        this.fondo1.setOrigin(0, 0);
        this.fondo1.setScale(anchoJuego / this.fondo1.width, altoJuego / this.fondo1.height);

        //Filtro morado
        this.filtroCreditos = this.add.image(0, 0, 'filtroColor');
        this.filtroCreditos.setOrigin(0, 0);
        this.filtroCreditos.setScale(anchoJuego / this.filtroCreditos.width, altoJuego / this.filtroCreditos.height); //Imagen se escalará con el resto del juego 
        this.filtroCreditos.alpha = 0.8;

        //Texto créditos
        this.creditos = this.add.text(anchoJuego / 10, altoJuego / 10, 'Juego desarrollado por Cuadra Crew:\n-Isabel Escudero Orden\n-Laura Fouz García\n-Elena López-Negrete Burón\n-Marta Rodríguez Castillo\n\nJUEGOS EN RED 3º GDDV URJC', { font: "40px Impact", fill: "#FFFFFF" })
        this.creditos.setFontSize(altoJuego / 20);

        this.CuadraCrewLogo = this.add.image(anchoJuego * 8 / 10, altoJuego * 3 / 10, 'CuadraCrewLogo');
        this.CuadraCrewLogo.setScale(altoJuego / (this.CuadraCrewLogo.height * 2));

        //Botón de volver al menú principal
        this.textoVolver = this.add.text(anchoJuego / 2, altoJuego * 4.75 / 5, "Clica aquí para volver al menú principal", { font: "40px Impact", fill: "#FFFFFF", align: "center" });
        this.textoVolver.setOrigin(0.5, 1);
        this.textoVolver.setFontSize(altoJuego / 20);
        this.textoVolver.setInteractive();//Para que funcionen los eventos

        //Hover para el texto de volver al menú
        this.textoVolver.on('pointerover', function () {
            this.setTint(0x8C86F0);//Se refiere solo al texto, este this se refiere al evento on del botón, no a la escena
        });

        this.textoVolver.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.textoVolver.on('pointerdown', function (event) {
            this.scene.add('miMenu', new Menu);
            this.scene.launch('miMenu'); //lanza un nuevo menú
            this.scene.remove(); //Borra la escena de créditos
        }, this);
    }

}
