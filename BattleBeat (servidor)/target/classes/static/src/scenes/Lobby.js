import { anchoJuego, altoJuego } from "../init.js";
import TutorialLexi from "./TutorialLexi.js";
import TutorialMat from "./TutorialMat.js";
import FlechasLexi from "./FlechasLexi.js";
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
        
        var escalaBotones =10;
         //Botón para comenzar la partida (Versión online)        
        this.botonVolver = this.add.image(anchoJuego / 6, altoJuego*9 / 10, 'botonVolver');
        this.botonVolver.setScale(anchoJuego / (this.botonVolver.width * escalaBotones), altoJuego / (this.botonVolver.height * escalaBotones));
        this.botonVolver.setInteractive();//Para que funcionen los eventos


        //Funciones para crear efecto hover del botón de partida
        this.botonVolver.on('pointerover', function () {
            this.setTint(0x518DE3);//Se refiere solo al botón, este this se refiere al evento on del botón, no a la escena
        });

        this.botonVolver.on('pointerout', function () {
            this.clearTint();
        });
        
         this.botonVolver.on('pointerdown', function (event) {            
            this.djsound.play()
            connection.close();
            this.cameras.main.fade(1000, 57, 47, 236);
            this.scene.add('miMenu', new Menu);
            this.scene.launch('miMenu');
            this.scene.remove();
        }, this);
        
			//var connection = new WebSocket('ws://127.0.0.1:8080/conexion');
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
				else if (msg.data == "Pasoajuego") {
					
				}
				else{
					
					this.scene.add('miMenu', new Menu);
					this.scene.launch('miMenu');
					this.scene.remove();

				}
				console.log(flag);


			}

		


	}

	update(time, delta) {
		
	if(entraEnBucle==true){
		
		if(juegosConectados==true){
			
			this.scene.remove();
			this.game.scene.add("miTutorialLexi", new TutorialLexi,true,{flag,connection});
			this.scene.start("miTutorialLexi"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
			entraEnBucle = false;
		
		}
		
		
	}
}
	}	


//-------------------------------------------------------------------------------------------------------------------------
/*
function cargarEscena(flag, miEscena){
	
	if (flag==true){
			
					miEscena.djsound.play()
					miEscena.scene.add("miTutorialLexi", new TutorialLexi);
					miEscena.scene.start("miTutorialLexi"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
					miEscena.scene.remove();
			
			
		}else if (flag==false){
					miEscena.djsound.play()
					miEscena.scene.add("miTutorialMat", new TutorialMat);
					miEscena.scene.start("miTutorialMat"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
					miEscena.scene.remove();
		}
	
}
*/

/*
					//Comenzar contador
					var contador = 5;
					var temporizador = setInterval(function() { contador--; }, 1000); //Comprueba cada 3 segundos

					if (contador == 0) {
						clearInterval(temporizador);
						textito.setText(contador);
						
						
						if (flag == true) {
							//Escena Lexi
							this.djsound.play()
							this.scene.add("miTutorial", new Tutorial);
							this.scene.start("miTutorial"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
							this.scene.remove();
						}
						else {
							//Escena Mat
							this.djsound.play()
							this.scene.add("miTutorialMat", new TutorialMat);
							this.scene.start("miTutorialMat"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
							this.scene.remove();

						}
					}
					
					
			*/	

















/*//Esto en create():
				this.cuadroTexto = this.add.dom(anchoJuego/2,altoJuego*9/10).createFromCache("miCajaTexto");
				this.cuadroTexto.setOrigin(0.5, 0.5);
				this.cuadroTexto.setScale(anchoJuego/this.botonJugar.width, altoJuego / this.botonJugar.height )
				this.cuadroTexto.setPosition((anchoJuego/2.5),altoJuego*9/10);
		
		
				this.pantalla = this.add.text(640, 250, "Hello, --", {
					color: "#FFFFFF",
					fontSize: 60,
					fontStyle: "bold"
				}).setOrigin(0.5);
		    
				this.enviarMensaje = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		    
				this.enviarMensaje.on("down", event => {
					let textoAEnviar = this.cuadroTexto.getChildByName("texto");
					if(textoAEnviar.value != "") {
						this.pantalla.setText("Hello, " + textoAEnviar.value);
						textoAEnviar.value = "";
					}
				});
			    
				*/


/*
		var escalaBotones = 6.5;

		//Botón para comenzar la partida (Versión offline juego--fase 2)        
		this.botonJugar = this.add.image(anchoJuego * 9 / 10, altoJuego * 9 / 10, 'boton');
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
			this.scene.add("miTutorial", new Tutorial);
			this.scene.start("miTutorial"); //Inicializa tutorial de partida creada al hacer clic, elimina esta escena de menú
			this.scene.remove();
		}, this);

*/
