import { anchoJuego, altoJuego } from "../init.js";
import Tutorial from "./Tutorial.js";
import Creditos from "./Creditos.js";
import Lobby from "./Lobby.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: "Menu",
            active: true
        });

    }

    preload() {
        this.load.image('boton', '/src/images/Menu/BOTÓN.png');
        this.load.image('botonOnline', '/src/images/Menu/BOTON_online.png');
        this.load.image('botonCreditos', '/src/images/Menu/BOTÓN CRÉDITOS.png');
        this.load.image('Fondo2', '/src/images/Fondo2.png');
        this.load.image('Fondo1', '/src/images/Fondo1.png');
        this.load.image('BattleBeatLogo', '/src/images/Menu/BattleBeatLogo.png');
        this.load.image('eslogan', '/src/images/Menu/eslogan.png');
        this.load.image('filtroColor', '/src/images/Menu/Filtro Color.png')

        this.load.path = './assets/';
        this.load.atlas('boviino', 'boviino.png', 'boviino_atlas.json');

        this.load.path = './sounds/';
        this.load.audio('musicmenu', 'harmonica.mp3');
        this.load.audio('djsound', 'DJscratch.mp3');
    }

    create() {

        this.musicmenu = this.sound.add('musicmenu');
        this.musicmenu.play();
        this.musicmenu.setLoop(true);
        this.sound.pauseOnBlur = false;

        this.djsound = this.sound.add('djsound', { volume: 0.2 });

        this.cameras.main.fadeFrom(1000, 57, 47, 236);

        this.fondo1 = this.add.image(0, 0, 'Fondo1');
        this.fondo1.setOrigin(0, 0);
        this.fondo1.setScale(anchoJuego / this.fondo1.width, altoJuego / this.fondo1.height); //Imagen se escalará con el resto del juego 

        //Creamos el filtro que estará bajo los botones y la animación:        
        this.filtro = this.add.image(0, 0, 'filtroColor');
        this.filtro.setOrigin(0, 0);
        this.filtro.setScale(anchoJuego / this.filtro.width, altoJuego / this.filtro.height); //Imagen se escalará con el resto del juego 
        this.filtro.alpha = 0.8;

        //Logo Juego:
        this.BattleBeatLogo = this.add.image(anchoJuego / 4, altoJuego / 5, 'BattleBeatLogo');
        this.BattleBeatLogo.setScale(altoJuego / (this.BattleBeatLogo.height * 2));

        //Eslogan 
        this.eslogan = this.add.image(anchoJuego * 2 / 3, altoJuego / 5, 'eslogan');
        this.eslogan.setScale(altoJuego / (this.eslogan.height * 5));

        //Boviino
        const djplay = {
            key: 'djplay',
            frames: this.anims.generateFrameNames('boviino', { prefix: 'boviinofinal_', start: 1, end: 7 }),
            frameRate: 9,
            repeat: -1
        };
        this.anims.create(djplay);

        var djboviino;
        djboviino = this.add.sprite(anchoJuego * 2 / 3, altoJuego * 1.75 / 3, 'boviino');
        djboviino.play('djplay');
        djboviino.setScale(altoJuego / 750);
        //Creamos los botones para el juego:
        var escalaBotones = 6.5;

        //Botón para comenzar la partida (Versión offline juego--fase 2)        
        this.botonJugar = this.add.image(anchoJuego / 4, altoJuego  *3/ 6, 'boton');
        this.botonJugar.setScale(anchoJuego / (this.botonJugar.width * escalaBotones), altoJuego / (this.botonJugar.height * escalaBotones));
        this.botonJugar.setInteractive();//Para que funcionen los eventos


        //Botón para comenzar la partida (Versión online)        
        this.botonOnline = this.add.image(anchoJuego / 4, altoJuego*4 / 6, 'botonOnline');
        this.botonOnline.setScale(anchoJuego / (this.botonJugar.width * escalaBotones), altoJuego / (this.botonJugar.height * escalaBotones));
        this.botonOnline.setInteractive();//Para que funcionen los eventos


        //Funciones para crear efecto hover del botón de partida
        this.botonJugar.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonJugar.on('pointerout', function () {
            this.clearTint();
        });

        //Funciones para crear efecto hover del botón de partida
        this.botonOnline.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonOnline.on('pointerout', function () {
            this.clearTint();
        });


        //Función para clic del botón y cambio de escena
        this.botonJugar.on('pointerdown', function (event) {
            this.musicmenu.stop();
            this.djsound.play()
            this.scene.add("miTutorial", new Tutorial);
            this.scene.start("miTutorial"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
            this.scene.remove();
        }, this);

        //Función para clic del botón y cambio de escena
        this.botonOnline.on('pointerdown', function (event) {
            this.musicmenu.stop();
            this.djsound.play()
            this.scene.add("miLobby", new Lobby);
            this.scene.start("miLobby"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
            this.scene.remove();
        }, this);

        //Botón para mostrar los créditos del juego
        this.botonCreditos = this.add.image(anchoJuego / 4, altoJuego *5/6, 'botonCreditos');
        this.botonCreditos.setScale(anchoJuego / (this.botonCreditos.width * escalaBotones), altoJuego / (this.botonCreditos.height * escalaBotones));
        this.botonCreditos.setInteractive();//Para que funcionen los eventos

        //Funciones para crear efecto hover del botón de créditos
        this.botonCreditos.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonCreditos.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.botonCreditos.on('pointerdown', function (event) {
            this.musicmenu.stop();
            this.djsound.play()
            this.scene.add("misCreditos", new Creditos);
            this.scene.launch("misCreditos"); //Inicializa créditos
            this.scene.remove(); //Borra la escena de menú

        }, this);

    }




}

