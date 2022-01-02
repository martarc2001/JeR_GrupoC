import { anchoJuego, altoJuego } from "../init.js";
import { Flecha } from "./flecha.js";
import PFinal from './PantallaFinal.js'

var Lexi, Mat;
var LexiActivarIdle = false;
var MatActivarIdle = false;
var good1, great1, perfect1, miss1;
var good2, great2, perfect2, miss2;
var flagDespues;
var wspartida;

var J1_W = 0;
var J1_A = 0;
var J1_S = 0;
var J1_D = 0;

var J2_W;
var J2_A;
var J2_S;
var J2_D;


var semilla = 0;

var scoreJ1=0;
var scoreJ2=0;

export default class FlechasLexi extends Phaser.Scene {
    constructor() {
        super({
            key: "FlechasLexi",
            active: true
        });

        this.cualFlecha = 0;
        this.sacaFlecha = 0;

        //Vectores que almacenan las flechas
        this.vectorFlechasJ1 = [];
        this.vectorFlechasJ2 = [];

        this.borradorJ1 = 0;
        this.startJ1 = false;
        this.borradorJ2 = 0;
        this.startJ2 = false;
        this.tiempo = 0;

        this.escalaFlechas;


        this.justPressed = true;

        //Creamos las variables para la puntuacion y para el texto
      
        this.scoreTextJ1;
        this.scoreTextJ2;


        //Para parar las flechas antes de que acabe la partida
        this.paraFlechas = false;
        this.timer = 0;
    }

    preload() {
        this.load.image("flecha", "/src/images/Flecha.png");
        this.load.image("flecha3", "/src/images/flecha3.png");

        this.load.image("good", "/src/images/good1.png");
        this.load.image("great", "/src/images/great1.png");
        this.load.image("perfect", "/src/images/perfect1.png");
        this.load.image("miss", "/src/images/miss.png");

        //Precarga del audio
        this.load.path = './sounds/';
        this.load.audio('musicota', 'musicota.mp3');

    }


    create({flagAhora}) {
	
	 flagDespues=flagAhora;
	 console.log("flagAhora Create: " + flagDespues)
        this.cameras.main.fadeFrom(1000, 57, 47, 236); //Fade inicial de la escena
        
        wspartida = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

			wspartida.onerror = function(e) {
				console.log("WS error: " + e);
			}

			wspartida.onmessage = function(msg) { //Lo que recibe del servidor
				console.log("WS message: " + msg.data);
				var message = JSON.parse(msg.data);
				J2_W = message.arriba;
				J2_A = message.izquierda;
        		J2_S = message.abajo;
        		J2_D = message.derecha;
        		scoreJ2=message.score;
    		}

        //Fondo de la escena
        this.fondo2 = this.add.image(0, 0, 'Fondo2');
        this.fondo2.setOrigin(0, 0);
        this.fondo2.setScale(anchoJuego / this.fondo2.width, altoJuego / this.fondo2.height);

        //DJ BoViiNo
        var djboviino;
        djboviino = this.add.sprite(anchoJuego / 2, altoJuego / 2, 'boviino');
        djboviino.setScale(altoJuego * 0.45 / djboviino.height);
        djboviino.play('djplay');

        //Animaciones personajes
        var escalaPersonajes = 0.5; //Usar esta variable para que sean del mismo tamaño

        //Animación Lexi (J1)
        Lexi = this.add.sprite(anchoJuego / 4, altoJuego * 2 / 3, 'lexi_atlas');
        Lexi.setScale(altoJuego * escalaPersonajes / Lexi.height);
        Lexi.play('inicioLexi');

        //Animación Mat (J2)
        Mat = this.add.sprite(anchoJuego * 3 / 4, altoJuego * 2 / 3, 'mat_atlas');
        Mat.setScale(altoJuego * escalaPersonajes / Mat.height);
        Mat.play('inicioMat');


        //mensajes de feedback J1
        good1 = this.add.image(anchoJuego * 2.5 / 15, altoJuego / 2.8, "good");
        good1.setScale(altoJuego * 0.1 / good1.height);
        good1.visible = false;

        great1 = this.add.image(anchoJuego * 2.5 / 15, altoJuego / 2.8, "great");
        great1.setScale(altoJuego * 0.1 / great1.height);
        great1.visible = false;

        perfect1 = this.add.image(anchoJuego * 2.5 / 15, altoJuego / 2.8, "perfect");
        perfect1.setScale(altoJuego * 0.1 / perfect1.height);
        perfect1.visible = false;

        miss1 = this.add.image(anchoJuego * 2.5 / 15, altoJuego / 3.5, "miss");
        miss1.setScale(altoJuego * 0.06 / miss1.height);
        miss1.visible = false;

        //mensajes de feedback J2
        good2 = this.add.image(anchoJuego - (anchoJuego * 2.5 / 15), altoJuego / 2.8, "good");
        good2.setScale(altoJuego * 0.1 / good2.height);
        good2.visible = false;

        great2 = this.add.image(anchoJuego - (anchoJuego * 2.5 / 15), altoJuego / 2.8, "great");
        great2.setScale(altoJuego * 0.1 / great2.height);
        great2.visible = false;

        perfect2 = this.add.image(anchoJuego - (anchoJuego * 2.5 / 15), altoJuego / 2.8, "perfect");
        perfect2.setScale(altoJuego * 0.1 / perfect2.height);
        perfect2.visible = false;

        miss2 = this.add.image(anchoJuego - (anchoJuego * 2.5 / 15), altoJuego / 3.5, "miss");
        miss2.setScale(altoJuego * 0.06 / miss2.height);
        miss2.visible = false;


        //flechas jugador 1
        //objetivo flechas
        this.flecha1_f = this.add.image(anchoJuego / 15, altoJuego / 7, "flecha");
        this.flecha1_f.angle = -90;
        this.flecha2_f = this.add.image(anchoJuego * 2 / 15, altoJuego / 7, "flecha");
        this.flecha2_f.angle = -180;
        this.flecha3_f = this.add.image(anchoJuego * 3 / 15, altoJuego / 7, "flecha");
        this.flecha4_f = this.add.image(anchoJuego * 4 / 15, altoJuego / 7, "flecha");
        this.flecha4_f.angle = 90;

        //flechas j2
        //objetivo flechas
        this.flecha5_f = this.add.image(anchoJuego - (anchoJuego * 4 / 15), altoJuego / 7, "flecha");
        this.flecha5_f.angle = -90;
        this.flecha6_f = this.add.image(anchoJuego - (anchoJuego * 3 / 15), altoJuego / 7, "flecha");
        this.flecha6_f.angle = -180;
        this.flecha7_f = this.add.image(anchoJuego - (anchoJuego * 2 / 15), altoJuego / 7, "flecha");
        this.flecha8_f = this.add.image(anchoJuego - (anchoJuego / 15), altoJuego / 7, "flecha");
        this.flecha8_f.angle = 90;

        this.escalaFlechas = altoJuego / 1000;


        this.flecha1_f.setScale(this.escalaFlechas);
        this.flecha2_f.setScale(this.escalaFlechas);
        this.flecha3_f.setScale(this.escalaFlechas);
        this.flecha4_f.setScale(this.escalaFlechas);

        this.flecha5_f.setScale(this.escalaFlechas);
        this.flecha6_f.setScale(this.escalaFlechas);
        this.flecha7_f.setScale(this.escalaFlechas);
        this.flecha8_f.setScale(this.escalaFlechas);

        //Scores de los jugadores
        if(flagDespues==true){
        this.scoreTextJ1 = this.add.text(anchoJuego / 20, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact' });
        this.scoreTextJ1.setFontSize(altoJuego / 20);
        
        this.scoreTextJ2 = this.add.text(anchoJuego - anchoJuego / 6, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact' });
        this.scoreTextJ2.setFontSize(altoJuego / 20);
        }else if(flagDespues==false){
        this.scoreTextJ2 = this.add.text(anchoJuego / 20, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact' });
        this.scoreTextJ2.setFontSize(altoJuego / 20);
        
        this.scoreTextJ1 = this.add.text(anchoJuego - anchoJuego / 6, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact' });
        this.scoreTextJ1.setFontSize(altoJuego / 20);
        }
        //Controles jugadores
        this.cursor = this.input.keyboard.createCursorKeys();
		if(flagDespues==true){
        //Controles Lexi (J1): WASD
        this.arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		}else if(flagDespues==false){
		//Controles Mat (J2): Flechas
        this.arribaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.izquierdaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.abajoMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.derechaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		}
        

        //musica partida
        this.musicota = this.sound.add('musicota');
        this.musicota.play();
        this.sound.pauseOnBlur=false;


        this.timedEvent = this.time.delayedCall(84000, onEvent, [], this);


			
    }

    update(time, delta) {
       
        this.timer++;
        if (this.timer > 4850) {
            this.paraFlechas = true;
        }
        if(this.timer > 200){
			sendData();
		}
		
		
		
			
	this.scoreTextJ2.setText('Score: ' + scoreJ2);
		

if(flagDespues==true){
        //Comandos juego Lexi (J1)
        if (LexiActivarIdle) { //Si hemos dejado de pulsar, activaremos la animación en bucle que se vio al inicio de la partida
            Lexi.play('inicioLexi');
            J1_W = 0;
			J1_A = 0;
			J1_S = 0;
			J1_D = 0;
            LexiActivarIdle = false;
        }

        if (this.arriba.isDown) {
            Lexi.play('juegoArribaLexi');
            J1_W = 1;
            LexiActivarIdle = true; //Activamos el booleano que nos pondrá la animación en bucle al terminar este paso de baile
        
        } else if (this.abajo.isDown) {
            Lexi.play('juegoAbajoLexi');
            J1_S = 1;
            LexiActivarIdle = true;
 			
        } else if (this.derecha.isDown) {
            Lexi.play('juegoDchaLexi');
            J1_D = 1;
            LexiActivarIdle = true;
            
        } else if (this.izquierda.isDown) {
            Lexi.play('juegoIzqLexi');
             J1_A = 1;
            LexiActivarIdle = true;
          
        }
         if (MatActivarIdle) {
            Mat.play('inicioMat');
            
            MatActivarIdle = false;
    
        }

        if (J2_W == 1) {
            Mat.play('juegoArribaMat');
            MatActivarIdle = true;
        } else if (J2_S == 1) {
            Mat.play('juegoAbajoMat');
            MatActivarIdle = true;
        } else if (J2_D == 1) {
            Mat.play('juegoDchaMat');
            MatActivarIdle = true;
        } else if (J2_A == 1) {
            Mat.play('juegoIzqMat');
            MatActivarIdle = true;
        }
        
        }else if(flagDespues==false){
        
         if (LexiActivarIdle) { 
            Lexi.play('inicioLexi');
            LexiActivarIdle = false;
        }

        if (J2_W == 1) {
            Lexi.play('juegoArribaLexi');
            LexiActivarIdle = true; 
       } else if (J2_S == 1) {
            Lexi.play('juegoAbajoLexi');
            LexiActivarIdle = true;
        } else if (J2_D == 1) {
            Lexi.play('juegoDchaLexi');
            LexiActivarIdle = true;
        } else if (J2_A == 1) {
            Lexi.play('juegoIzqLexi');
            LexiActivarIdle = true;
        }
        

        if (MatActivarIdle) {
            Mat.play('inicioMat');
            J1_W = 0;
			J1_A = 0;
			J1_S = 0;
			J1_D = 0;
            MatActivarIdle = false;
        }

        if (this.arribaMat.isDown) {
            Mat.play('juegoArribaMat');
            J1_W = 1;
            MatActivarIdle = true;
        } else if (this.abajoMat.isDown) {
            Mat.play('juegoAbajoMat');
            J1_S = 1;
            MatActivarIdle = true;
        } else if (this.derechaMat.isDown) {
            Mat.play('juegoDchaMat');
            J1_D = 1;
            MatActivarIdle = true;
        } else if (this.izquierdaMat.isDown) {
            Mat.play('juegoIzqMat');
            J1_A = 1;
            MatActivarIdle = true;
        }
        }

        this.tiempo++;

        if (this.startJ1 == true) {
            this.borradorJ1 += delta;
        }
        if (this.borradorJ1 > 300) {
            good1.visible = false;
            great1.visible = false;
            perfect1.visible = false;
            miss1.visible = false;

            this.startJ1 = false;
            this.borradorJ1 = 0;
        }

        if (this.startJ2 == true) {
            this.borradorJ2 += delta;
        }
        if (this.borradorJ2 > 300) {
            good2.visible = false;
            great2.visible = false;
            perfect2.visible = false;
            miss2.visible = false;
            this.startJ2 = false;
            this.borradorJ2 = 0;
        }



        //Crea las flechas de manera aleatoria cada cierto tiempo

        if (this.tiempo % 30 == 0) {
            if (this.paraFlechas == false) {
                this.cualFlecha = this.random(1, 5);
                this.vectorFlechasJ1.push(creaFlechaJ1(this));
                this.vectorFlechasJ2.push(creaFlechaJ2(this));

                this.tiempo = 0;
            }
        }
        
        if (this.tiempo % 3 == 0) {
         	semilla++;
        }

        //Las pone en movimiento
        for (var i = 0; i < this.vectorFlechasJ1.length; i++) {

            this.vectorFlechasJ1[i].mueveFlecha();

        }

        for (var i = 0; i < this.vectorFlechasJ2.length; i++) {


            this.vectorFlechasJ2[i].mueveFlecha();

        }

        //Elimina las flechas que se salen de la pantalla
        if (this.vectorFlechasJ1.length != 0) {

            eliminaFlechaArrayPantallaJ1(this.vectorFlechasJ1, this);
        }

        if (this.vectorFlechasJ2.length != 0) {

            eliminaFlechaArrayPantallaJ2(this.vectorFlechasJ2, this);
        }

        //Ganar puntuacion 
        if(flagDespues==true){
        for (var i = 0; i < this.vectorFlechasJ1.length; i++) {
            ganaPuntosOnline(i, this);

        }
}else if(flagDespues==false)
        for (var i = 0; i < this.vectorFlechasJ2.length; i++) {

            ganaPuntosOnline(i, this);

        }

    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}

function eliminaFlechaArrayPantallaJ1(array, miEscena) {


    if (array[0].y < 0) {
        miss1.visible = true;
        miEscena.startJ1 = true;

        array[0].destroy();
        array.splice(0, 1);
    }
}

function eliminaFlechaArrayPantallaJ2(array, miEscena) {


    if (array[0].y < 0) {
        miss2.visible = true;
        miEscena.startJ2 = true;

        array[0].destroy();
        array.splice(0, 1);
    }

}

function eliminaFlechaArrayPulsada(array, i) {


    array[i].destroy();
    array.splice(i, 1);


}


function creaFlechaJ1(miEscena) {
	var x= semilla;
	miEscena.cualFlecha = parseInt(Math.sin((Math.pow(((x+1)/Math.pow(x,2)),-1))) * 2 + 2) + 1;
	
    //miEscena.cualFlecha = miEscena.random(1, 5);

    if (miEscena.cualFlecha == 1) {

        //Flechas j1
        var f1 = new Flecha({ scene: miEscena, x: anchoJuego / 15, y: altoJuego });
        f1.angle = -90;
        f1.queFlecha = 1;


    } else if (miEscena.cualFlecha == 2) {

        //Flechas j1
        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 2 / 15, y: altoJuego });
        f1.angle = -180;
        f1.queFlecha = 2;

    } else if (miEscena.cualFlecha == 3) {

        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 3 / 15, y: altoJuego });
        f1.queFlecha = 3;


    } else if (miEscena.cualFlecha == 4) {

        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 4 / 15, y: altoJuego });
        f1.angle = 90;
        f1.queFlecha = 4;

    }

    f1.setScale(miEscena.escalaFlechas);
    return f1;
}

function creaFlechaJ2(miEscena) {

    if (miEscena.cualFlecha == 1) {

        //Flechas j2
        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 4 / 15), y: altoJuego });
        f2.angle = -90;
        f2.queFlecha = 1;


    } else if (miEscena.cualFlecha == 2) {

        //Flechas j2
        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 3 / 15), y: altoJuego });
        f2.angle = -180;
        f2.queFlecha = 2;

    } else if (miEscena.cualFlecha == 3) {

        //Flechas j2
        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 2 / 15), y: altoJuego });
        f2.queFlecha = 3;

    } else if (miEscena.cualFlecha == 4) {

        //Flechas j2
        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego / 15), y: altoJuego });
        f2.angle = 90;
        f2.queFlecha = 4;

    }

    f2.setScale(miEscena.escalaFlechas);

    return f2;

}

function ganaPuntosOnline(i, miEscena) {
	if(flagDespues==true){
    if (miEscena.izquierda.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 1) {

        contadorOnline(miEscena.vectorFlechasJ1, miEscena, i);

    } else if (miEscena.abajo.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 2) {

        contadorOnline(miEscena.vectorFlechasJ1, miEscena, i);

    } else if (miEscena.arriba.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 3) {

        contadorOnline(miEscena.vectorFlechasJ1, miEscena, i);

    } else if (miEscena.derecha.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 4) {

        contadorOnline(miEscena.vectorFlechasJ1, miEscena, i);

    }
    }else if(flagDespues==false){
	
	if (miEscena.izquierdaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 1) {

        contadorOnline(miEscena.vectorFlechasJ2, miEscena, i);

    } else if (miEscena.abajoMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 2) {

        contadorOnline(miEscena.vectorFlechasJ2, miEscena, i);

    } else if (miEscena.arribaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 3) {

        contadorOnline(miEscena.vectorFlechasJ2, miEscena, i);

    } else if (miEscena.derechaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 4) {

        contadorOnline(miEscena.vectorFlechasJ2, miEscena, i);

    }
  }
}




function contadorOnline(array, miEscena, i) {
	if(flagDespues==true){

    if ((array[i].y > altoJuego / 7 + 20 && array[i].y < altoJuego / 7 + 30) || (array[i].y < altoJuego / 7 - 20 && array[i].y > altoJuego / 7 - 30)) {

        good1.visible = true;
        miEscena.startJ1 = true;

       scoreJ1 += 25;
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);

    } else if ((array[i].y > altoJuego / 7 + 10 && array[i].y < altoJuego / 7 + 20) || (array[i].y < altoJuego / 7 - 10 && array[i].y > altoJuego / 7 - 20)) {

        great1.visible = true;
        miEscena.startJ1 = true;

        scoreJ1 += 50;
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);

    } else if (array[i].y > altoJuego / 7 - 10 && array[i].y < altoJuego / 7 + 10) {

        perfect1.visible = true;
        miEscena.startJ1 = true;

        scoreJ1 += 100;
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);

    }
    }else if (flagDespues==false){
	
	 if ((array[i].y > altoJuego / 7 + altoJuego / 46 && array[i].y < altoJuego / 7 + altoJuego / 70) || (array[i].y < altoJuego / 7 - altoJuego / 46 && array[i].y > altoJuego / 7 - altoJuego / 70)) {

        good2.visible = true;
        miEscena.startJ2 = true;

        scoreJ1 += 25;
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);


    } else if ((array[i].y > altoJuego / 7 + altoJuego / 150 && array[i].y < altoJuego / 7 + altoJuego / 46) || (array[i].y < altoJuego / 7 - altoJuego / 150 && array[i].y > altoJuego / 7 - altoJuego / 46)) {

        great2.visible = true;
        miEscena.startJ2 = true;

        scoreJ1 += 50;
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);


    } else if (array[i].y > altoJuego / 7 - altoJuego / 150 && array[i].y < altoJuego / 7 + altoJuego / 150) {

        perfect2.visible = true;
        miEscena.startJ2 = true;

        scoreJ1 += 100;
        console.log(scoreJ1)
        miEscena.scoreTextJ1.setText('Score: ' + scoreJ1);
        eliminaFlechaArrayPulsada(array, i);
    }

}

}




function onEvent() {

	this.musicota.stop();
	
    if (this.scoreJ1 > this.scoreJ2) {
        console.log("hh");
        this.game.scene.add('PFinal1', PFinal, true, "Lexi");
        this.scene.remove('miPartida');
        this.scene.remove();
        this.scene.launch('PFinal1');



    } else if (this.scoreJ2 > this.scoreJ1) {

        this.game.scene.add('PFinal1', PFinal, true, "Mat");

        this.scene.remove('miPartida');
        this.scene.remove();
        this.scene.launch('PFinal1');

    } else if (this.scoreJ1 == this.scoreJ2) {

        this.game.scene.add('PFinal1', PFinal, true, "Empate");

        this.scene.remove('miPartida');
        this.scene.remove(); //Borra la escena de menú
        this.scene.launch('PFinal1');
    }

    

}
function sendData(){
	var msg = {
		arriba: J1_W,
		izquierda: J1_A,
		abajo: J1_S,
		derecha: J1_D,
		score: scoreJ1
	}
	wspartida.send(JSON.stringify(msg));
}

















