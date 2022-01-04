import { anchoJuego, altoJuego } from "../init.js";
import Menu from "./Menu.js";


export default class Desconexion extends Phaser.Scene {
	constructor() {
		super({
			key: "Desconexion",
			active: true
		});

	}

	preload() {
		this.load.image('Fondo1', '/src/images/Fondo1.png');
		this.load.image('boton', '/src/images/Menu/BOTON_Jugar.png');
		this.load.image('filtroColor', '/src/images/Menu/Filtro Color.png');
		this.load.image('botonVolver', './src/images/Menu/BOTÓN VOLVER.png')

		//this.load.html('miCajaTexto', '/src/scenes/cajaTexto.html');

		this.load.path = './sounds/';
		this.load.audio('musicmenu', 'harmonica.mp3');
		this.load.audio('djsound', 'DJscratch.mp3');


	}

	create() {
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


		this.texto = this.add.text(anchoJuego / 2, altoJuego / 10, "Ha habido una desconexión", { font: "40px Impact", fill: "#ffffff", align: "center" });
		this.texto.setFontSize(altoJuego / 10);
		this.texto.setOrigin(0.5);


		this.textoCambioPantalla = this.add.text(anchoJuego / 2, altoJuego * 9 / 10, "Volver al menú", { font: "40px Impact", fill: "#ffffff", align: "center" });
		this.textoCambioPantalla.setOrigin(0.5, 1);
		this.textoCambioPantalla.setInteractive();//Para que funcionen los eventos
		this.textoCambioPantalla.setFontSize(altoJuego / 15);

		this.textoCambioPantalla.on('pointerover', function() {
			this.setTint(0x8C86F0);//Se refiere solo al texto, este this se refiere al evento on del botón, no a la escena
		});

		this.textoCambioPantalla.on('pointerout', function() {
			this.clearTint();
		});

		//Función para clic del botón y cambio de escena
		this.textoCambioPantalla.on('pointerdown', function(event) {
			this.djsound.play()
			this.cameras.main.fade(1000, 57, 47, 236);

			this.scene.add('miMenu', new Menu);
			this.scene.launch('miMenu');
			this.scene.remove();

		}, this);

	}
}
