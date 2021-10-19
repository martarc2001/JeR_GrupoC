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
    //flechas jugador 1
    //objetivo flechas
    this.flecha1_f = this.add.image(anchoJuego / 15, 130, "flecha");
    this.flecha1_f.angle = -90;
    this.flecha2_f = this.add.image(anchoJuego * 2 / 15, 130, "flecha");
    this.flecha2_f.angle = -180;
    this.flecha3_f = this.add.image(anchoJuego * 3 / 15, 130, "flecha");
    this.flecha4_f = this.add.image(anchoJuego * 4 / 15, 130, "flecha");
    this.flecha4_f.angle = 90;
    //las añade a la escena siendo invisibles

    this.flecha1 = this.add.image(anchoJuego / 15, altoJuego / 3, "flecha");
    this.flecha1.angle = -90;
    this.flecha2 = this.add.image(anchoJuego * 2 / 15, altoJuego / 3, "flecha");
    this.flecha2.angle = -180;
    this.flecha3 = this.add.image(anchoJuego * 3 / 15, altoJuego / 3, "flecha");
    this.flecha4 = this.add.image(anchoJuego * 4 / 15, altoJuego / 3, "flecha");
    this.flecha4.angle = 90;

    this.flecha1.visible = false;
    this.flecha2.visible = false;
    this.flecha3.visible = false;
    this.flecha4.visible = false;


    this.flecha1_f.setScale(escalaFlechas);
    this.flecha2_f.setScale(escalaFlechas);
    this.flecha3_f.setScale(escalaFlechas);
    this.flecha4_f.setScale(escalaFlechas);

    this.flecha1.setScale(escalaFlechas);
    this.flecha2.setScale(escalaFlechas);
    this.flecha3.setScale(escalaFlechas);
    this.flecha4.setScale(escalaFlechas);

    //flechas j2
    //objetivo flechas
    this.flecha5_f = this.add.image(anchoJuego - (anchoJuego * 4 / 15), 130, "flecha");
    this.flecha5_f.angle = -90;
    this.flecha6_f = this.add.image(anchoJuego - (anchoJuego * 3 / 15), 130, "flecha");
    this.flecha6_f.angle = -180;
    this.flecha7_f = this.add.image(anchoJuego - (anchoJuego * 2 / 15), 130, "flecha");
    this.flecha8_f = this.add.image(anchoJuego - (anchoJuego / 15), 130, "flecha");
    this.flecha8_f.angle = 90;


    this.flecha5 = this.add.image(anchoJuego - (anchoJuego * 4 / 15), altoJuego / 3, "flecha");
    this.flecha5.angle = -90;
    this.flecha6 = this.add.image(anchoJuego - (anchoJuego * 3 / 15), altoJuego / 3, "flecha");
    this.flecha6.angle = -180;
    this.flecha7 = this.add.image(anchoJuego - (anchoJuego * 2 / 15), altoJuego / 3, "flecha");
    this.flecha8 = this.add.image(anchoJuego - (anchoJuego / 15), altoJuego / 3, "flecha");
    this.flecha8.angle = 90;

    this.flecha5.visible = false;
    this.flecha6.visible = false;
    this.flecha7.visible = false;
    this.flecha8.visible = false;


    this.flecha5_f.setScale(escalaFlechas);
    this.flecha6_f.setScale(escalaFlechas);
    this.flecha7_f.setScale(escalaFlechas);
    this.flecha8_f.setScale(escalaFlechas);

    this.flecha5.setScale(escalaFlechas);
    this.flecha6.setScale(escalaFlechas);
    this.flecha7.setScale(escalaFlechas);
    this.flecha8.setScale(escalaFlechas);

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






    var vel = altoJuego / 1000;


    this.apareceflecha(this.flecha1, this.flecha5, time, vel);
    this.apareceflecha(this.flecha2, this.flecha6, time, vel);
    this.apareceflecha(this.flecha3, this.flecha7, time, vel);
    this.apareceflecha(this.flecha4, this.flecha8, time, vel);

  }

  //aparece flecha llama a dos flechas con el mismo movimiento
  //aparecen de forma aleatoria con maximo 6 segundos de espera
  //despues de que aparezcan se llama a la funcion mueve flecha

  apareceflecha(f, f2, t, v) {
    if (t % Math.floor(Math.random() * 60) == 0) {
      f.visible = true;
      f2.visible = true;
    }
    if (f.visible == true) {
      this.mueveFlecha(f, f2, v);
    }
  }

  //mueve flecha hace que se muevan hacia arriba las dos flechas con 
  //la velocidad. Cuando suben a un punto determinado se llama a reset

  mueveFlecha(f, f2, v) {

    f.y -= v;
    f2.y -= v;
    if (f.y < 5) {
      this.resetFlecha(f, f2);
    }
  }

  //resetFlecha hace que vuelvan al lugar inicial y las hace invisibles.
  //al hacerse invisibles se dejan de mover

  resetFlecha(f, f2) {
    f.y = altoJuego / 3;
    f2.y = altoJuego / 3;
    f.visible = false;
    f2.visible = false;
  }

}

