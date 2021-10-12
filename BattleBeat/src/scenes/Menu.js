import { anchoJuego, altoJuego } from "../init.js";
//import FiltroColor from "./FiltroColor.js";
import Partida from "./Partida.js";


export default class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: "Menu",
            active: true
        });
        
    }

    preload() {
        this.load.image('boton', '/src/images/Menu/BOTÓN.png');
        this.load.image('Fondo2', '/src/images/Fondo2.png');
        this.load.image('Fondo1', '/src/images/Fondo1.png');
        
        this.load.path = './assets/';
        this.load.atlas('boviino', 'boviino.png', 'boviino_atlas.json');

    }

    create() {

        this.fondo1 = this.add.image(0, 0, 'Fondo1');
        this.fondo1.setOrigin(0, 0);
        this.fondo1.setScale(anchoJuego / this.fondo1.width, altoJuego / this.fondo1.height); //Imagen se escalará con el resto del juego 

        //Creamos el filtro que estará bajo los botones y la animación:        
        let graficos = this.add.graphics();
        this.color = graficos.fillStyle(0xFFC0CB, 0.5);
        this.fondoColor = graficos.fillRect(0, 0, anchoJuego, altoJuego);
        //this.scene.add("miFiltro", new FiltroColor);
        //this.scene.bringToTop("Menu");
        
        //Boviino
        const djplay ={
            key: 'djplay',
            frames: this.anims.generateFrameNames('boviino', {prefix: 'boviinofinal_', start: 1, end: 7}),
            frameRate: 9,
            repeat: -1
          };
          this.anims.create(djplay);
        
          var djboviino;
          djboviino= this.add.sprite(anchoJuego/2+200,altoJuego/2, 'boviino');
          djboviino.play('djplay');
        //Creamos los botones para el juego:
        var escalaBotones = 4.5;

        //Botón para comenzar la partida (Versión offline juego--fase 2)        
        var posBotonJugar = [(anchoJuego / 4), (altoJuego / 2)];
        this.botonJugar = this.add.image(posBotonJugar[0], posBotonJugar[1], 'boton');
        this.botonJugar.setScale(anchoJuego / (this.botonJugar.width * escalaBotones), altoJuego / (this.botonJugar.height * escalaBotones));
        this.botonJugar.setInteractive();//Para que funcionen los eventos

        //Funciones para crear efecto hover del botón
        this.botonJugar.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonJugar.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.botonJugar.on('pointerdown', function (event) {
            
            //Menu.scene.remove("miFiltro");
            this.scene.add("estaPartida", new Partida);
            this.scene.start("estaPartida"); //Inicializa partida creada al hacer clic, elimina esta escena de menú
         
        }, this);
    }




}

