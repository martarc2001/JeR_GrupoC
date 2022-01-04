import { anchoJuego, altoJuego } from "../init.js";
import TutorialOnline from "./TutorialOnline.js";
import FlechasOnline from "./FlechasOnline.js";
import Menu from "./Menu.js";


var flag = null;
var juegosConectados=false;
var entraEnBucle=true;
var connection;
var tiempo = 5000;

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
		
		
		this.texto = this.add.text(anchoJuego / 2, altoJuego / 10, "Lobby", { font: "40px Impact", fill: "#ffffff", align: "center" });
		this.texto.setFontSize(altoJuego / 10);
		this.texto.setOrigin(0.5);


		this.textoTempo = this.add.text(anchoJuego / 2, altoJuego*9/10, "Esperando a JUGADOR 2...", { font: "40px Impact", fill: "#ffffff", align: "center" });
        this.textoTempo.setOrigin(0.5);
        this.textoTempo.setFontSize(altoJuego / 15);
        
        connection = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

			connection.onerror = function(e) {
				console.log("WS error: " + e);
			}

			connection.onmessage = function(msg) { //Lo que recibe del servidor
				console.log("WS message: " + msg.data);
				
				
				if (msg.data == "Lexi") {					
					flag=true;

				}
				else if (msg.data == "Mat") {
					flag=false;
					juegosConectados=true;
					//connection.send(juegosConectados);
				}
				else if(msg.data == "Conexion"){
					juegosConectados=true;
				}
				console.log(flag);


			}

		


	}

	update(time, delta) {
		
	if(entraEnBucle==true){
		
		if(juegosConectados==true){
			
			this.scene.remove();
			this.game.scene.add("miTutorialOnline", new TutorialOnline,true,{flag,connection});
			this.scene.start("miTutorialOnline"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
			entraEnBucle = false;
		
		}
		
		
	}
}
	}	
