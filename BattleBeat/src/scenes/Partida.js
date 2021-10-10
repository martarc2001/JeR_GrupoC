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

    //Para crear animaciones de Lexi (J1)
    this.load.json('animLexi', '/src/images/Sprites/lexi_atlas/lexi_atlas_anim.json');
    this.load.atlas('lexi_atlas', '/src/images/Sprites/lexi_atlas/lexi_atlas.png', '/src/images/Sprites/lexi_atlas/lexi_atlas_atlas.json');

    //Para crear animaciones de Mat (J2)
    this.load.json('animMat', '/src/images/Sprites/mat_atlas/mat_atlas_anim.json');
    this.load.atlas('mat_atlas', '/src/images/Sprites/mat_atlas/mat_atlas.png', '/src/images/Sprites/mat_atlas/mat_atlas_atlas.json');

  }

  create() {
    this.fondo2 = this.add.image(0, 0, 'Fondo2');
    this.fondo2.setOrigin(0, 0);
    this.fondo2.setScale(anchoJuego / this.fondo2.width, altoJuego / this.fondo2.height);

    //flechas jugador 1

    //las añade a la escena siendo invisibles

    this.flecha2 = this.add.image(anchoJuego / 10.5, altoJuego / 3, "flecha").setScale(-1.4, 1.4);
    this.flecha3 = this.add.image(anchoJuego / 7.1, altoJuego / 3, "flecha").setScale(1.4, -1.4);
    this.flecha4 = this.add.image(anchoJuego / 5.35, altoJuego / 3, "flecha").setScale(-1.4, -1.4);
    this.flecha1 = this.add.image(anchoJuego / 20, altoJuego / 3, "flecha").setScale(1.4);

    this.flecha1.visible = false;
    this.flecha2.visible = false;
    this.flecha3.visible = false;
    this.flecha4.visible = false;

    //flechas j2

    this.flecha5 = this.add.image((anchoJuego / 20) + 995, altoJuego / 3, "flecha").setScale(1.4);
    this.flecha6 = this.add.image((anchoJuego / 10.5) + 995, altoJuego / 3, "flecha").setScale(-1.4, 1.4);
    this.flecha7 = this.add.image((anchoJuego / 7.1) + 995, altoJuego / 3, "flecha").setScale(1.4, -1.4);
    this.flecha8 = this.add.image((anchoJuego / 5.35) + 995, altoJuego / 3, "flecha").setScale(-1.4, -1.4);


    this.flecha5.visible = false;
    this.flecha6.visible = false;
    this.flecha7.visible = false;
    this.flecha8.visible = false;

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
    crearAnimacionesLexi(this.anims); //Crea todos los movimientos posibles del personaje
    Lexi = this.add.sprite(anchoJuego / 4, altoJuego * 2 / 3, 'lexi_atlas');
    Lexi.setScale(altoJuego * escalaPersonajes / Lexi.height);
    Lexi.play('inicioLexi');

    //Animación Mat (J2)
    crearAnimacionesMat(this.anims);
    Mat = this.add.sprite(anchoJuego * 3 / 4, altoJuego * 2 / 3, 'mat_atlas');
    Mat.setScale(altoJuego * escalaPersonajes / Mat.height);
    Mat.play('inicioMat');




  }
  //funcion update (la velocidad se puede cambiar luego)

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






    var vel = 1.2;


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
    if (f.y < 80) {
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

