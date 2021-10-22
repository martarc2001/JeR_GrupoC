import { anchoJuego, altoJuego } from "../init.js";
import Partida from './Partida.js';
import Flechas from './Flechas.js';

var Lexi, Mat;
var LexiActivarIdle = false;
var MatActivarIdle = false;

export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({
            key: "Tutorial1",
            active: true
        });

    }

    preload() {
        //No hay que hacer preload de elementos ya cargados en Menú, porque es la primera escena cargada
        this.load.image('miTutorial', './src/images/Menu/Tutorial.png')

        this.load.path = './assets/';
        //Para crear animaciones de Lexi (J1)
        this.load.json('animLexi', 'lexi_atlas_anim.json');
        this.load.atlas('lexi_atlas', 'lexi_atlas.png', 'lexi_atlas_atlas.json');

        //Para crear animaciones de Mat (J2)
        this.load.json('animMat', 'mat_atlas_anim.json');
        this.load.atlas('mat_atlas', 'mat_atlas.png', 'mat_atlas_atlas.json');

    }

    create() {
        this.cameras.main.fadeFrom(1000, 57, 47, 236);//Fade inicial de la escena

        crearFondo(this);
        creaPersonajes(this);
        //textoPantalla1(this, formatoTexto);

        //Texto de cambio de pantalla al juego
        this.textoCambioPantalla = this.add.text(anchoJuego / 2, altoJuego * 9 / 10, "Clica aquí para finalizar el tutorial", { font: "40px Impact", fill: "#ffffff", align: "center" });
        this.textoCambioPantalla.setOrigin(0.5, 1);
        this.textoCambioPantalla.setFontSize(altoJuego / 20);
        this.textoCambioPantalla.setInteractive();//Para que funcionen los eventos

        this.textoCambioPantalla.on('pointerover', function () {
            this.setTint(0x8C86F0);//Se refiere solo al texto, este this se refiere al evento on del botón, no a la escena
        });

        this.textoCambioPantalla.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.textoCambioPantalla.on('pointerdown', function (event) {
            this.cameras.main.fade(1000, 57, 47, 236);

            this.scene.add('miPartida', new Partida);//crea una nueva partida
            this.scene.launch('miPartida');
            this.scene.add('misFlechas', new Flechas);
            this.scene.launch('misFlechas');
            this.scene.remove();//Borra la escena de tutorial

        }, this);


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

        //Comandos juego Mat  (J2)
        if (MatActivarIdle) {
            Mat.play('inicioMat');
            MatActivarIdle = false;
        }

        if (this.arribaMat.isDown) {
            Mat.play('juegoArribaMat');
            MatActivarIdle = true;
        } else if (this.abajoMat.isDown) {
            Mat.play('juegoAbajoMat');
            MatActivarIdle = true;
        } else if (this.derechaMat.isDown) {
            Mat.play('juegoDchaMat');
            MatActivarIdle = true;
        } else if (this.izquierdaMat.isDown) {
            Mat.play('juegoIzqMat');
            MatActivarIdle = true;
        }



    }
}

function crearFondo(miEscena) {
    miEscena.fondo1 = miEscena.add.image(0, 0, 'Fondo1');
    miEscena.fondo1.setOrigin(0, 0);
    miEscena.fondo1.setScale(anchoJuego / miEscena.fondo1.width, altoJuego / miEscena.fondo1.height); //Imagen se escalará con el resto del juego 

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

    //Controles Mat (J2): Flechas
    miEscena.arribaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    miEscena.izquierdaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    miEscena.abajoMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    miEscena.derechaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //Animaciones personajes
    var escalaPersonajes = 0.25; //Usar esta variable para que sean del mismo tamaño

    //Animación Lexi (J1)
    crearAnimacionesLexi(miEscena.anims); //Crea todos los movimientos posibles del personaje
    Lexi = miEscena.add.sprite(anchoJuego * 2.75 / 4, altoJuego * 1.75 / 3, 'lexi_atlas');
    Lexi.setScale(altoJuego * escalaPersonajes / Lexi.height);
    Lexi.play('inicioLexi');

    //Animación Mat (J2)
    crearAnimacionesMat(miEscena.anims);
    Mat = miEscena.add.sprite(anchoJuego * 3.6 / 4, altoJuego * 1.75 / 3, 'mat_atlas');
    Mat.setScale(altoJuego * escalaPersonajes / Mat.height);
    Mat.play('inicioMat');

}

/*
function textoPantalla1(miEscena, formato) {
    //Texto     
    miEscena.cabecera = miEscena.add.text(anchoJuego / 2, altoJuego / 5, "¡Esto es BattleBeat! ¡Batallas de baile sin parar!", { font: "45px Impact", fill: "#ffffff" });
    miEscena.cabecera.setOrigin(0.5, 1);

    miEscena.subcabecera = miEscena.add.text(anchoJuego / 2, altoJuego * 1.5 / 5, "En este juego deberás competir en la pista contra un amigo hasta que finalice la música.\nSe recibirán puntos en base a cuán bien bailes, y ganará aquel que mejor se desenvuelva.", formato);
    miEscena.subcabecera.setOrigin(0.5, 1);

    miEscena.textoFlechas = miEscena.add.text(anchoJuego / 2, altoJuego * 2 / 5, "La mecánica principal de este juego se basa en pulsar la tecla correspondiente\ncuando llegue la flecha a su posición. Según como de cerca de la posición hayas quedado,\nrecibirás una nota: \"Miss\", \"Good\", \"Great\" o \"Perfect\".", formato);
    miEscena.textoFlechas.setOrigin(0.5, 1);
}
*/

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

function crearAnimacionesMat(handleAnimacion) {
    const inicioMat = {
        key: 'inicioMat',
        frames: handleAnimacion.generateFrameNames('mat_atlas', { prefix: 'frame', start: 1, end: 2 }),
        frameRate: 2,
        repeat: -1
    };
    handleAnimacion.create(inicioMat);

    const juegoArribaMat = {
        key: 'juegoArribaMat',
        frames: handleAnimacion.generateFrameNames('mat_atlas', { prefix: 'frame', frames: [4] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoArribaMat);

    const juegoAbajoMat = {
        key: 'juegoAbajoMat',
        frames: handleAnimacion.generateFrameNames('mat_atlas', { prefix: 'frame', frames: [2] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoAbajoMat);

    const juegoDchaMat = {
        key: 'juegoDchaMat',
        frames: handleAnimacion.generateFrameNames('mat_atlas', { prefix: 'frame', frames: [5] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoDchaMat);

    const juegoIzqMat = {
        key: 'juegoIzqMat',
        frames: handleAnimacion.generateFrameNames('mat_atlas', { prefix: 'frame', frames: [3] }),
        frameRate: 12,
        repeat: 0
    };
    handleAnimacion.create(juegoIzqMat);
}
