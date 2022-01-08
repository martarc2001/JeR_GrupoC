import { anchoJuego, altoJuego } from "../init.js";
import TutorialOnline from "./TutorialOnline.js";
import FlechasOnline from "./FlechasOnline.js";
import Menu from "./Menu.js";
import Desconexion from "./Desconexion.js"

var Lexi, Mat;
var LexiActivarIdle = false;
var MatActivarIdle = false;
var flag = null;
var juegosConectados = false;
var error = false;
var entraEnBucleConexion = true;
var entraEnBucleDesconexion = true;
var connection;
var tiempo;
var textoCuentaAtras;
var displayTutorial = false;

export { connection }

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
		this.load.image('filtroColor', '/src/images/Menu/Filtro Color.png');
		this.load.image('botonVolver', './src/images/Menu/BOTÓN VOLVER.png')
		this.load.image('miTutorialOnline', './src/images/Menu/TutorialOnline.png')
		
		this.load.image("flecha", "/src/images/Flecha.png");
		this.load.image("flecha3", "/src/images/flecha3.png");

		this.load.image("good", "/src/images/good1.png");
		this.load.image("great", "/src/images/great1.png");
		this.load.image("perfect", "/src/images/perfect1.png");
		this.load.image("miss", "/src/images/miss.png");
		//this.load.html('miCajaTexto', '/src/scenes/cajaTexto.html');

		this.load.path = './sounds/';
		this.load.audio('musicmenu', 'harmonica.mp3');
		this.load.audio('djsound', 'DJscratch.mp3');
		this.load.audio('musicota', 'musicota.mp3');

		this.load.path = './assets/';
		//Para crear animaciones de Lexi (J1)
		this.load.json('animLexi', 'lexi_atlas_anim.json');
		this.load.atlas('lexi_atlas', 'lexi_atlas.png', 'lexi_atlas_atlas.json');

		//Para crear animaciones de Mat (J2)
		this.load.json('animMat', 'mat_atlas_anim.json');
		this.load.atlas('mat_atlas', 'mat_atlas.png', 'mat_atlas_atlas.json');


	}

	create() {
		entraEnBucleConexion = true;
		entraEnBucleDesconexion = true;
		displayTutorial = false;
		tiempo = 3000;
		flag=null;

		crearFondo(this);
		crearWS(this);

		crearTextoLobby(this);
		crearTutorial(this);

	}

	update(time, delta) {

		if (entraEnBucleConexion == true) {
			if (juegosConectados == true) {
				//this.textoEspera.visible = false;
				entraEnBucleConexion = false;
				cambioLobbyATutorial(this, flag);
				crearControles(this);
				displayTutorial = true;
				//EscenaPartida(this);
			}
		}


		if (displayTutorial == true) {
			tiempo -= delta; textoCuentaAtras.setText("La partida comenzará en: " + parseInt(tiempo / 1000))
			controlMiPersonaje(this, flag);
			
			if (tiempo < 0) {
				this.djsound.play()			
				displayTutorial = false;
				console.log(flag);
				EscenaPartida(this,flag);

				
			}
		}



		if (entraEnBucleDesconexion == true) {
			if ((error == true)||(connection.readyState == WebSocket.CLOSED)) {
				entraEnBucleDesconexion = false;
				EscenaDesconexion(this);

			}
		}


	}
}

function crearWS(miEscena) {
	connection = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

	connection.onerror = function(e) {
		console.log("WS error: " + e);
		//error = true;
		EscenaDesconexion(miEscena);
	}

	connection.onmessage = function(msg) { //Lo que recibe del servidor
		console.log("WS message: " + msg.data);

		if (msg.data == "Lexi") { flag = true; }
		else if (msg.data == "Mat") { flag = false; juegosConectados = true; }
		else if (msg.data == "Conexion") { juegosConectados = true; }
		else if (msg.data == "Desconexion") { error = true; }
		else{}
	}
}

function EscenaDesconexion(miEscena) {
	error = false;
	juegosConectados = false;
	flag = null;
	miEscena.cameras.main.fade(1000, 57, 47, 236);
	miEscena.scene.add('Desconexion', new Desconexion);
	miEscena.scene.launch('Desconexion');
	miEscena.scene.remove();
	//connection.close();
}

function EscenaPartida(miEscena, flag) {
	juegosConectados = false;	

	miEscena.scene.remove();
	console.log(flag);
	miEscena.game.scene.add("miFlechasOnline", new FlechasOnline, true, { flag });
	miEscena.scene.start("miFlechasOnline");
		
	//connection.close();

}


function crearFondo(miEscena) {
	miEscena.djsound = miEscena.sound.add('djsound', { volume: 0.2 });
	miEscena.cameras.main.fadeFrom(1000, 57, 47, 236);
	miEscena.fondo1 = miEscena.add.image(0, 0, 'Fondo1');
	miEscena.fondo1.setOrigin(0, 0);
	miEscena.fondo1.setScale(anchoJuego / miEscena.fondo1.width, altoJuego / miEscena.fondo1.height); //Imagen se escalará con el resto del juego 

	miEscena.filtro = miEscena.add.image(0, 0, 'filtroColor');
	miEscena.filtro.setOrigin(0, 0);
	miEscena.filtro.setScale(anchoJuego / miEscena.filtro.width, altoJuego / miEscena.filtro.height); //Imagen se escalará con el resto del juego 
	miEscena.filtro.alpha = 0.8;

}

function crearTextoLobby(miEscena) {
	miEscena.textoLobby = miEscena.add.text(anchoJuego / 2, altoJuego / 10, "Lobby", { font: "40px Impact", fill: "#ffffff", align: "center" });
	miEscena.textoLobby.setFontSize(altoJuego / 10);
	miEscena.textoLobby.setOrigin(0.5);

	miEscena.textoEspera = miEscena.add.text(anchoJuego / 2, altoJuego / 2, "Esperando a JUGADOR 2...", { font: "40px Impact", fill: "#ffffff", align: "center" });
	miEscena.textoEspera.setOrigin(0.5);
	miEscena.textoEspera.setFontSize(altoJuego / 15);

}

function crearTutorial(miEscena) {
	//miEscena.djsound = miEscena.sound.add('djsound', { volume: 0.2 });
	
	miEscena.miTutorial = miEscena.add.image(0, 0, 'miTutorialOnline');
	miEscena.miTutorial.setOrigin(0, 0);
	miEscena.miTutorial.setScale(anchoJuego / miEscena.miTutorial.width, altoJuego / miEscena.miTutorial.height);
	miEscena.miTutorial.visible=false;
	
	textoCuentaAtras = miEscena.add.text(anchoJuego / 2, altoJuego * 9 / 10, "", { font: "40px Impact", fill: "#ffffff", align: "center" });
	textoCuentaAtras.setOrigin(0.5);
	textoCuentaAtras.setFontSize(altoJuego / 15);
	textoCuentaAtras.visible = false;
}

function cambioLobbyATutorial(miEscena,flag) {		
	miEscena.textoLobby.visible = false;
	miEscena.textoEspera.visible = false;
	miEscena.filtro.visible=false;
	
	miEscena.djsound.play();
	textoCuentaAtras.visible = true;
	miEscena.miTutorial.visible=true;
	
	crearControles(miEscena);
	crearPersonajes(miEscena,flag);
}


function crearPersonajes(miEscena, flag) {
	var escalaPersonajes = 0.35; //Usar esta variable para que sean del mismo tamaño
	crearAnimacionesLexi(miEscena.anims); //Crea todos los movimientos posibles del personaje
	crearAnimacionesMat(miEscena.anims);

	if (flag == true) {
		Lexi = miEscena.add.sprite(anchoJuego * 3.5 / 4, altoJuego * 1.5 / 3, 'lexi_atlas');
		Lexi.setScale(altoJuego * escalaPersonajes / Lexi.height);
		Lexi.play('inicioLexi');
	}

	if (flag == false) {
		Mat = miEscena.add.sprite(anchoJuego * 3.5 / 4, altoJuego * 1.5 / 3, 'mat_atlas');
		Mat.setScale(altoJuego * escalaPersonajes / Mat.height);
		Mat.play('inicioMat');

	}

}

function crearControles(miEscena) {
	//miEscena.cursor = miEscena.input.keyboard.createCursorKeys();
	miEscena.arriba = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	miEscena.izquierda = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	miEscena.abajo = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	miEscena.derecha = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

function controlMiPersonaje(miEscena, flag){
	
	if (flag == true) {
			//Comandos juego Lexi (J1)
			if (LexiActivarIdle) { //Si hemos dejado de pulsar, activaremos la animación en bucle que se vio al inicio de la partida
				Lexi.play('inicioLexi');
				LexiActivarIdle = false;
			}

			if (miEscena.arriba.isDown) {
				Lexi.play('juegoArribaLexi');
				LexiActivarIdle = true; //Activamos el booleano que nos pondrá la animación en bucle al terminar este paso de baile
			} else if (miEscena.abajo.isDown) {
				Lexi.play('juegoAbajoLexi');
				LexiActivarIdle = true;
			} else if (miEscena.derecha.isDown) {
				Lexi.play('juegoDchaLexi');
				LexiActivarIdle = true;
			} else if (miEscena.izquierda.isDown) {
				Lexi.play('juegoIzqLexi');
				LexiActivarIdle = true;
			}
		} else {

			//Comandos juego Mat  (J2)
			if (MatActivarIdle) {
				Mat.play('inicioMat');
				MatActivarIdle = false;
			}

			if (miEscena.arriba.isDown) {
				Mat.play('juegoArribaMat');
				MatActivarIdle = true;
			} else if (miEscena.abajo.isDown) {
				Mat.play('juegoAbajoMat');
				MatActivarIdle = true;
			} else if (miEscena.derecha.isDown) {
				Mat.play('juegoDchaMat');
				MatActivarIdle = true;
			} else if (miEscena.izquierda.isDown) {
				Mat.play('juegoIzqMat');
				MatActivarIdle = true;
			}
		}
	
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

