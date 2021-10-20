import { anchoJuego, altoJuego } from "../init.js";


function Jugador() {
  this.puntos = 0;
}

var J1 = new Jugador();
var J2 = new Jugador();
var Lexi, Mat;
var LexiActivarIdle = false;
var MatActivarIdle = false;

export default class Partida extends Phaser.Scene {
  constructor() {
    super({
      key: "Partida",
      active: true
    });
  }


  preload() {
    this.load.image("flecha", "/src/images/Flecha.png")
    this.load.image('Fondo2', '/src/images/Fondo2.png');

    this.load.path = './assets/';
    this.load.atlas('boviino', 'boviino.png', 'boviino_atlas.json');

  }

  create() {
    this.cameras.main.fadeFrom(1000, 57, 47, 236); //Fade inicial de la escena

    //Fondo de la escena
    this.fondo2 = this.add.image(0, 0, 'Fondo2');
    this.fondo2.setOrigin(0, 0);
    this.fondo2.setScale(anchoJuego / this.fondo2.width, altoJuego / this.fondo2.height);

    //DJ BoViiNo
    var djboviino;
    djboviino = this.add.sprite(anchoJuego / 2, altoJuego / 2, 'boviino');
    djboviino.setScale(altoJuego * 0.45 / djboviino.height);
    djboviino.play('djplay');


    var escalaFlechas = altoJuego / 1000;
    


    
    

    

    //Controles jugadores
    this.cursor = this.input.keyboard.createCursorKeys();

    //Controles Lexi (J1): WASD
    this.arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //Controles Mat (J2): Flechas
    this.arribaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.izquierdaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.abajoMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.derechaMat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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

