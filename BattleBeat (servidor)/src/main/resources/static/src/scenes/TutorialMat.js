import { anchoJuego, altoJuego } from "../init.js";
import Partida from './Partida.js';
import FlechasMat from './FlechasMat.js';
import {connection} from './Lobby.js';

var Mat;
var MatActivarIdle = false;

export default class TutorialMat extends Phaser.Scene {
    constructor() {
        super({
            key: "TutorialMat",
            active: true
        });

    }

    preload() {
        //No hay que hacer preload de elementos ya cargados en Menú, porque es la primera escena cargada
        this.load.image('miTutorialOnlineMat', './src/images/Menu/TutorialOnline.png')

        this.load.path = './assets/';

        //Para crear animaciones de Mat (J2)
        this.load.json('animMat', 'mat_atlas_anim.json');
        this.load.atlas('mat_atlas', 'mat_atlas.png', 'mat_atlas_atlas.json');

    }

    create() {
        this.cameras.main.fadeFrom(1000, 57, 47, 236);//Fade inicial de la escena

        this.djsound = this.sound.add('djsound',{volume:0.2});

        crearFondo(this);
        creaPersonajes(this);
		//this.timedEvent = this.time.delayedCall(5000, onEvent, [], this);

    $(document).ready(function() {		
			
			//var connection = new WebSocket('ws://127.0.0.1:8080/conexion');
			//var connection = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

			connection.onerror = function(e) {
				console.log("WS error: " + e);
			}

			connection.onmessage = function(msg) { //Lo que recibe del servidor
				console.log("WS message: " + msg.data);				
				
				if (msg.data == "true") {					
					flag=true;

				}				
		}
					})
    
    
    }

    update(time) {

   
        //Comandos juego Mat  (J2)
        if (MatActivarIdle) {
            Mat.play('inicioMat');
            MatActivarIdle = false;
        }


        if (this.arriba.isDown) {
            Mat.play('juegoArribaMat');
            MatActivarIdle = true;
        } else if (this.abajo.isDown) {
            Mat.play('juegoAbajoMat');
            MatActivarIdle = true;
        } else if (this.derecha.isDown) {
            Mat.play('juegoDchaMat');
            MatActivarIdle = true;
        } else if (this.izquierda.isDown) {
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
    miEscena.miTutorial = miEscena.add.image(0, 0, 'miTutorialOnlineMat');
    miEscena.miTutorial.setOrigin(0, 0);
    miEscena.miTutorial.setScale(anchoJuego / miEscena.miTutorial.width, altoJuego / miEscena.miTutorial.height);
}



function creaPersonajes(miEscena) {
    //Controles jugadores
    miEscena.cursor = miEscena.input.keyboard.createCursorKeys();

    //Controles WASD
    miEscena.arriba = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    miEscena.izquierda = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    miEscena.abajo = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    miEscena.derecha = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    //Animaciones personajes
    var escalaPersonajes = 0.35; //Usar esta variable para que sean del mismo tamaño

    //Animación Mat (J2)
    crearAnimacionesMat(miEscena.anims);
    Mat = miEscena.add.sprite(anchoJuego * 3.5/ 4, altoJuego * 1.5 / 3, 'mat_atlas');
    Mat.setScale(altoJuego * escalaPersonajes / Mat.height);
    Mat.play('inicioMat');

}



//Funciones para crear las animaciones de los personajes
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

function onEvent(){
			this.djsound.play()
            this.cameras.main.fade(1000, 57, 47, 236);

            this.scene.add('misFlechasMat', new FlechasMat);
            this.scene.launch('misFlechasMat');
            this.scene.remove();//Borra la escena de tutorial
}



/*
        //Función para clic del botón y cambio de escena
        this.textoCambioPantalla.on('pointerdown', function (event) {
            this.djsound.play()
            this.cameras.main.fade(1000, 57, 47, 236);

            this.scene.add('misFlechas', new Flechas);
            this.scene.launch('misFlechas');
            this.scene.remove();//Borra la escena de tutorial

        }, this);
*/