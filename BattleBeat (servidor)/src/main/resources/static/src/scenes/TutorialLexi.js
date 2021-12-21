import { anchoJuego, altoJuego } from "../init.js";
import Partida from './Partida.js';
import FlechasLexi from './FlechasLexi.js';
import { connection } from './Lobby.js';

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
		this.load.image('miTutorialOnlineLexi', './src/images/Menu/TutorialOnline.png')

		this.load.path = './assets/';
		//Para crear animaciones de Lexi (J1)
		this.load.json('animLexi', 'lexi_atlas_anim.json');
		this.load.atlas('lexi_atlas', 'lexi_atlas.png', 'lexi_atlas_atlas.json');

		this.load.image('boton', '/src/images/Menu/BOTON_Jugar.png');

	}

	create({ flag, connection }) {
		console.log("EL DEL TUTORIAL" + flag)
		console.log(connection);
		this.cameras.main.fadeFrom(1000, 57, 47, 236);//Fade inicial de la escena

		if (flag == true) {
			//Creamos los botones para el juego:
			var escalaBotones = 6.5;

			//Botón para comenzar la partida (Versión offline juego--fase 2)        
			this.botonJugar = this.add.image(anchoJuego / 4, altoJuego * 3 / 6, 'boton');
			this.botonJugar.setScale(anchoJuego / (this.botonJugar.width * escalaBotones), altoJuego / (this.botonJugar.height * escalaBotones));
			this.botonJugar.setInteractive();//Para que funcionen los eventos

			//Funciones para crear efecto hover del botón de partida
			this.botonJugar.on('pointerover', function() {
				this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
			});

			this.botonJugar.on('pointerout', function() {
				this.clearTint();
			});


			//Función para clic del botón y cambio de escena
			this.botonJugar.on('pointerdown', function(event) {

				this.djsound.play()
				this.scene.add("FlechasLexi", new FlechasLexi);
				this.scene.start("FlechasLexi"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
				this.scene.remove();
			}, this);


			this.timedEvent = this.time.delayedCall(5000, onEvent, [], this);

		}
		this.djsound = this.sound.add('djsound', { volume: 0.2 });

		crearFondo(this);
		creaPersonajes(this);






		$(document).ready(function() {

			//var connection = new WebSocket('ws://127.0.0.1:8080/conexion');
			//var connection = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

			connection.onerror = function(e) {
				console.log("WS error: " + e);
			}

			connection.onopen = function() {
				connection.send("EmpezarPartida");
			}

			connection.onmessage = function(msg) { //Lo que recibe del servidor
				console.log("WS message: " + msg.data);

				if (msg.data == "EmpezarPartida") {
					flag = true;
					console.log("AAAAAAAAAAAAAAAAA");

				}
			}




		})









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



function onEvent() {
	connection.send("EmpezarPartida");

	this.djsound.play()
	this.cameras.main.fade(1000, 57, 47, 236);

	this.scene.add('misFlechasLexi', new FlechasLexi);
	this.scene.launch('misFlechasLexi');
	this.scene.remove();//Borra la escena de tutorial
}




function crearFondo(miEscena) {

	miEscena.fondo1 = miEscena.add.image(0, 0, 'Fondo1');
	miEscena.fondo1.setOrigin(0, 0);
	miEscena.fondo1.setScale(anchoJuego / miEscena.fondo1.width, altoJuego / miEscena.fondo1.height); //Imagen se escalará con el resto del juego 

	//Texto
	miEscena.miTutorial = miEscena.add.image(0, 0, 'miTutorialOnlineLexi');
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
	Lexi = miEscena.add.sprite(anchoJuego * 3.5 / 4, altoJuego * 1.5 / 3, 'lexi_atlas');
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


