import { anchoJuego, altoJuego } from "../init.js";
import Tutorial from "./Tutorial.js";


export default class Lobby extends Phaser.Scene {
    constructor() {
        super({
            key: "Lobby",
            active: true
        });

    }

    preload() {
        this.load.image('Fondo1', '/src/images/Fondo1.png');
        this.load.image('boton', '/src/images/Menu/BOTON_Jugar.png');
        this.load.image('filtroColor', '/src/images/Menu/Filtro Color.png')
    }

    create(){

        this.fondo1 = this.add.image(0, 0, 'Fondo1');
        this.fondo1.setOrigin(0, 0);
        this.fondo1.setScale(anchoJuego / this.fondo1.width, altoJuego / this.fondo1.height); //Imagen se escalará con el resto del juego 

        //Creamos el filtro que estará bajo los botones y la animación:        
        this.filtro = this.add.image(0, 0, 'filtroColor');
        this.filtro.setOrigin(0, 0);
        this.filtro.setScale(anchoJuego / this.filtro.width, altoJuego / this.filtro.height); //Imagen se escalará con el resto del juego 
        this.filtro.alpha = 0.8;
        
        var escalaBotones=6.5;

        //Botón para comenzar la partida (Versión offline juego--fase 2)        
        this.botonJugar = this.add.image(anchoJuego / 2, altoJuego / 10, 'boton');
        this.botonJugar.setScale(anchoJuego / (this.botonJugar.width * escalaBotones), altoJuego / (this.botonJugar.height * escalaBotones));
        this.botonJugar.setInteractive();//Para que funcionen los eventos

         //Funciones para crear efecto hover del botón de partida
         this.botonJugar.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonJugar.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.botonJugar.on('pointerdown', function (event) {
        
            this.scene.add("miTutorial", new Tutorial);
            this.scene.start("miTutorial"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
            this.scene.remove();
        }, this);
    }

    update(){
        
    }
}