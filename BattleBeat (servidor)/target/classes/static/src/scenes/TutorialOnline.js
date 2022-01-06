import { anchoJuego, altoJuego } from "../init.js";
import FlechasOnline from './FlechasOnline.js';
import Desconexion from './Desconexion.js'

var Lexi, Mat;
var LexiActivarIdle = false;
var MatActivarIdle = false;
var tiempo = 10000;
var flagAhora, connectionAhora;
var block = true;
var textito;
var entraEnBucle = true;
var entraEnBucleDesconexion = true;
var error = false;

export default class TutorialOnline extends Phaser.Scene {
	constructor() {
		super({
			key: "TutorialOnline",
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

		//Para crear animaciones de Mat (J2)
		this.load.json('animMat', 'mat_atlas_anim.json');
		this.load.atlas('mat_atlas', 'mat_atlas.png', 'mat_atlas_atlas.json');
	}

	create({ flag, connection }) {
		flagAhora = flag;
		connectionAhora = connection;
		this.botonPulsado = false;
		
		this.cameras.main.fadeFrom(1000, 57, 47, 236);//Fade inicial de la escena		
		crearFondo(this);
		creaPersonajes(this, flag);
		this.djsound = this.sound.add('djsound', { volume: 0.2 });

		textito = this.add.text(anchoJuego / 2, altoJuego * 9 / 10, "", { font: "40px Impact", fill: "#ffffff", align: "center" });
		textito.setOrigin(0.5);
		textito.setFontSize(altoJuego / 15);

		
		connectionAhora.onerror = function(e) {
			connectionAhora.close();
			connection.close();
			console.log("WS error: " + e);
			that.cameras.main.fade(1000, 57, 47, 236);
			that.scene.add('Desconexion', new Desconexion);
			that.scene.launch('Desconexion');
			that.scene.remove();//Borra la escena de tutorial
			flagAhora=null;
		}

		connectionAhora.onmessage = function(msg) { //Lo que recibe del servidor
			console.log("WS message: " + msg.data);
			if (msg.data == "Desconexion") {
				error = true;
			}
			

		}

	}

	update(time, delta) {
		if (entraEnBucleDesconexion == true) {
			if (error == true) {
				connectionAhora.close();
				connection.close();
				this.cameras.main.fade(1000, 57, 47, 236);
				this.scene.add('Desconexion', new Desconexion);
				this.scene.launch('Desconexion');
				this.scene.remove();//Borra la escena de tutorial
				entraEnBucleDesconexion = false;
				flagAhora=null;
			}
		}


		if (entraEnBucle == true) {
			tiempo -= delta;
			textito.setText("La partida comenzará en: " + parseInt(tiempo / 1000))

			if (tiempo < 0) {
				this.djsound.play()

				if (flagAhora == true) {
					entraEnBucle = null;
					this.scene.remove();
					this.game.scene.add("miFlechasOnline", new FlechasOnline, true, { flagAhora });
					this.scene.start("miFlechasOnline"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
					//connectionAhora.close();

				} else if (flagAhora == false) {
					entraEnBucle = null; 
					this.scene.remove();
					this.game.scene.add("miFlechasOnline", new FlechasOnline, true, { flagAhora });
					this.scene.start("miFlechasOnline"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
					//connectionAhora.close();

				}
			}
		}


		if (flagAhora == true) {
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
		} else {

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

function creaPersonajes(miEscena, flag) {
	//Controles jugadores
	miEscena.cursor = miEscena.input.keyboard.createCursorKeys();

	//Controles Lexi (J1): WASD
	if (flag == true) {
		miEscena.arriba = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		miEscena.izquierda = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		miEscena.abajo = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		miEscena.derecha = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}
	//Controles Mat (J2): Flechas
	if (flag == false) {
		miEscena.arribaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		miEscena.izquierdaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		miEscena.abajoMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		miEscena.derechaMat = miEscena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	//Animaciones personajes
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
