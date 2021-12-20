import { anchoJuego, altoJuego } from "../init.js";
import Partida from './Partida.js';
import Flechas from './Flechas.js';

var Lexi;
var LexiActivarIdle = false;

export default class TutorialLexi extends Phaser.Scene {
    constructor() {
        super({
            key: "TutorialLexi",
            active: true
        });

    }

    preload() {
        //No hay que hacer preload de elementos ya cargados en Menú, porque es la primera escena cargada
        this.load.image('miTutorial', './src/images/Menu/TutorialOnline.png')

        this.load.path = './assets/';
        //Para crear animaciones de Lexi (J1)
        this.load.json('animLexi', 'lexi_atlas_anim.json');
        this.load.atlas('lexi_atlas', 'lexi_atlas.png', 'lexi_atlas_atlas.json');


    }

    create() {
        this.cameras.main.fadeFrom(1000, 57, 47, 236);//Fade inicial de la escena

        //this.djsound = this.sound.add('djsound',{volume:0.2});

        crearFondo(this);
        creaPersonajes(this);


    }

    update(time) {

        //Comandos juego Lexi (J1)
        if (LexiActivarIdle) { //Si hemos dejado de pulsar, activaremos la animación en bucle que se vio al inicio de la partida
            Lexi.play('inicioLexi');
            LexiActivarIdle = false;
        }

        if (this.arriba.isDown) {
            Lexi.play('juegoArribaLexi');
            LexiActivarIdle = true; //Activamos el booleano que nos pondrá la animación en bucle al terminar este paso de baile
        } else if (this.abajo.isDown) {
            Lexi.play('juegoAbajoLexi');
            LexiActivarIdle = true;
        } else if (this.derecha.isDown) {
            Lexi.play('juegoDchaLexi');
            LexiActivarIdle = true;
        } else if (this.izquierda.isDown) {
            Lexi.play('juegoIzqLexi');
            LexiActivarIdle = true;
        }




    }
}

function crearFondo(miEscena) {
    /*
    miEscena.fondo1 = miEscena.add.image(0, 0, 'Fondo1');
    miEscena.fondo1.setOrigin(0, 0);
    miEscena.fondo1.setScale(anchoJuego / miEscena.fondo1.width, altoJuego / miEscena.fondo1.height); //Imagen se escalará con el resto del juego 
*/
    //Texto
    miEscena.miTutorial = miEscena.add.image(0, 0, 'miTutorial');
    miEscena.miTutorial.setOrigin(0, 0);
    miEscena.miTutorial.setScale(anchoJuego / miEscena.miTutorial.width, altoJuego / miEscena.miTutorial.height);
}



function creaPersonajes(miEscena) {
    //Controles jugadores
    miEscena.cursor = miEscena.input.keyboard.createCursorKeys();

    //Controles Lexi (J1): WASD
    miEscena.arriba = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    miEscena.izquierda = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    miEscena.abajo = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    miEscena.derecha = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    //Animaciones personajes
    var escalaPersonajes = 0.35; //Usar esta variable para que sean del mismo tamaño

    //Animación Lexi (J1)
    crearAnimacionesLexi(miEscena.anims); //Crea todos los movimientos posibles del personaje
    Lexi = miEscena.add.sprite(anchoJuego * 3.5/ 4, altoJuego * 1.5 / 3, 'lexi_atlas');
    Lexi.setScale(altoJuego * escalaPersonajes / Lexi.height);
    Lexi.play('inicioLexi');

    

}



//Funciones para crear las animaciones de los personajes
function crearAnimacionesLexi(handleAnimacion) {
    const inicioLexi = {
        key: 'inicioLexi',
        frames: handleAnimacion.generateFrameNames('lexi_atlas', { prefix: 'frame', start: 1, end: 2 }),
        frameRate: 2,
        repeat: -1
    };
    handleAnimacion.create(inicioLexi);

    const juegoArribaLexi = {
        key: 'juegoArribaLexi',
        frames: handleAnimacion.generateFrameNames('lexi_atlas', { prefix: 'frame', frames: [4] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoArribaLexi);

    const juegoAbajoLexi = {
        key: 'juegoAbajoLexi',
        frames: handleAnimacion.generateFrameNames('lexi_atlas', { prefix: 'frame', frames: [2] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoAbajoLexi);

    const juegoDchaLexi = {
        key: 'juegoDchaLexi',
        frames: handleAnimacion.generateFrameNames('lexi_atlas', { prefix: 'frame', frames: [5] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoDchaLexi);

    const juegoIzqLexi = {
        key: 'juegoIzqLexi',
        frames: handleAnimacion.generateFrameNames('lexi_atlas', { prefix: 'frame', frames: [3] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoIzqLexi);
}


