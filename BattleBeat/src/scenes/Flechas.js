import { anchoJuego, altoJuego } from "../init.js";
import { Flecha } from "./flecha.js";
import PFin from './Pantalla Final.js'


export default class Flechas extends Phaser.Scene {
    constructor() {
        super({
            key: "Flechas",
            active: true
        });

        this.cualFlecha = 0;
        this.sacaFlecha = 0;


        //Vectores que almacenan las flechas
        this.vectorFlechasJ1 = [];
        this.vectorFlechasJ2 = [];

        this.tiempo = 0;

        this.escalaFlechas;


        this.justPressed = true;






        //Creamos las variables para la puntuacion y para el texto
        this.scoreJ1 = 0;
        this.scoreTextJ1;


        this.scoreJ2 = 0;
        this.scoreTextJ2;


    }

    preload() {
        this.load.image("flecha", "/src/images/Flecha.png");
        this.load.image("flecha3", "/src/images/flecha3.png");

    }



    create() {

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
        this.scoreTextJ1 = this.add.text(anchoJuego / 20, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact'});
        this.scoreTextJ1.setFontSize(altoJuego / 20);
        this.scoreTextJ2 = this.add.text(anchoJuego - anchoJuego / 6, 16, 'Score: 0', { fontSize: '60px', fill: '#FFFFFF', fontFamily: 'Impact' });
        this.scoreTextJ2.setFontSize(altoJuego / 20);


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


        this.timedEvent = this.time.delayedCall(180000, onEvent, [], this);






    }

    update(time, delta) {

        this.tiempo++;

        //Crea las flechas de manera aleatoria cada cierto tiempo

        if (this.tiempo%30==0) {
            this.cualFlecha = this.random(1, 5);
            this.vectorFlechasJ1.push(creaFlechaJ1(this));
            this.vectorFlechasJ2.push(creaFlechaJ2(this));


            this.tiempo = 0;

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

            eliminaFlechaArrayPantalla(this.vectorFlechasJ1);
        }

        if (this.vectorFlechasJ2.length != 0) {

            eliminaFlechaArrayPantalla(this.vectorFlechasJ2);
        }


        //Ganar puntuacion 
        for (var i = 0; i < this.vectorFlechasJ1.length; i++) {
            ganaPuntosJ1(i, this);
            


        }

        for (var i = 0; i < this.vectorFlechasJ2.length; i++) {
           
            ganaPuntosJ2(i, this);


        }

        

    }






    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }








}

function eliminaFlechaArrayPantalla(array) {


    if (array[0].y < 0) {
        array[0].destroy();
        array.splice(0, 1);
    }

}

function eliminaFlechaArrayPulsada(array,i){

   
  array[i].destroy();
 array.splice(i, 1);
   

}



function creaFlechaJ1(miEscena) {
    miEscena.cualFlecha = miEscena.random(1, 5);




    if (miEscena.cualFlecha == 1) {

        //Flechas j1
        var f1 = new Flecha({ scene: miEscena, x: anchoJuego / 15, y: altoJuego  });
        f1.angle = -90;
        f1.queFlecha = 1;









    } else if (miEscena.cualFlecha == 2) {

        //Flechas j1


        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 2 / 15, y: altoJuego });
        f1.angle = -180;
        f1.queFlecha = 2;



    } else if (miEscena.cualFlecha == 3) {




        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 3 / 15, y: altoJuego});
        f1.queFlecha = 3;


    } else if (miEscena.cualFlecha == 4) {



        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 4 / 15, y: altoJuego  });
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


        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 3 / 15), y: altoJuego  });
        f2.angle = -180;
        f2.queFlecha = 2;



    } else if (miEscena.cualFlecha == 3) {

        //Flechas j2


        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 2 / 15), y: altoJuego });
        f2.queFlecha = 3;

    } else if (miEscena.cualFlecha == 4) {

        //Flechas j2

        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego / 15), y: altoJuego  });
        f2.angle = 90;
        f2.queFlecha = 4;

    }

    f2.setScale(miEscena.escalaFlechas);

    return f2;



}

function ganaPuntosJ1(i, miEscena) {
    if (miEscena.izquierda.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 1) {


            contadorJ1(miEscena.vectorFlechasJ1, miEscena, i);
        


    } else if (miEscena.abajo.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 2) {

        contadorJ1(miEscena.vectorFlechasJ1, miEscena, i);


    } else if (miEscena.arriba.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 3) {

        contadorJ1(miEscena.vectorFlechasJ1, miEscena, i);

    } else if (miEscena.derecha.isDown && miEscena.vectorFlechasJ1[i].queFlecha == 4) {

        contadorJ1(miEscena.vectorFlechasJ1, miEscena, i);

    }
}


function ganaPuntosJ2(i, miEscena) {
    if (miEscena.izquierdaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 1) {


        contadorJ2(miEscena.vectorFlechasJ2, miEscena, i);
        


    } else if (miEscena.abajoMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 2) {

        contadorJ2(miEscena.vectorFlechasJ2, miEscena, i);


    } else if (miEscena.arribaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 3) {

        contadorJ2(miEscena.vectorFlechasJ2, miEscena, i);

    } else if (miEscena.derechaMat.isDown && miEscena.vectorFlechasJ2[i].queFlecha == 4) {

        contadorJ2(miEscena.vectorFlechasJ2, miEscena, i);

    }
}

function contadorJ1(array, miEscena, i) {

    if ((array[i].y > altoJuego / 7 + 20 && array[i].y < altoJuego / 7 + 30) || (array[i].y < altoJuego / 7 - 20 && array[i].y > altoJuego / 7 - 30)) {

        miEscena.scoreJ1 += 25;
        miEscena.scoreTextJ1.setText('Score: ' + miEscena.scoreJ1);
        eliminaFlechaArrayPulsada(array,i);
        


    } else if ((array[i].y > altoJuego / 7 + 10 && array[i].y < altoJuego / 7 + 20) || (array[i].y < altoJuego / 7 - 10 && array[i].y > altoJuego / 7 - 20)) {


        miEscena.scoreJ1 += 50;
        miEscena.scoreTextJ1.setText('Score: ' + miEscena.scoreJ1);
        eliminaFlechaArrayPulsada(array,i);


    } else if (array[i].y > altoJuego / 7 - 10 && array[i].y < altoJuego / 7 + 10) {
        miEscena.scoreJ1 += 100;
        miEscena.scoreTextJ1.setText('Score: ' + miEscena.scoreJ1);
        eliminaFlechaArrayPulsada(array,i);

    }


}
function contadorJ2(array, miEscena, i) {

    if ((array[i].y > altoJuego / 7 + altoJuego/46 && array[i].y < altoJuego / 7 + altoJuego/70) || (array[i].y < altoJuego / 7 - altoJuego/46 && array[i].y > altoJuego / 7 - altoJuego/70)) {

        miEscena.scoreJ2 += 25;
        miEscena.scoreTextJ2.setText('Score: ' + miEscena.scoreJ2);
        eliminaFlechaArrayPulsada(array,i);
        


    } else if ((array[i].y > altoJuego / 7 + altoJuego/150 && array[i].y < altoJuego / 7 + altoJuego/46) || (array[i].y < altoJuego / 7 - altoJuego/150 && array[i].y > altoJuego / 7 - altoJuego/46)) {


        miEscena.scoreJ2 += 50;
        miEscena.scoreTextJ2.setText('Score: ' + miEscena.scoreJ2);
        eliminaFlechaArrayPulsada(array,i);


    } else if (array[i].y > altoJuego / 7 - altoJuego/150 && array[i].y < altoJuego / 7 + altoJuego/150) {
        miEscena.scoreJ2 += 100;
        miEscena.scoreTextJ2.setText('Score: ' + miEscena.scoreJ2);
        eliminaFlechaArrayPulsada(array,i);

    }


}



function onEvent() {

  
    if (this.scoreJ1 > this.scoreJ2) {
        console.log("hh");
        this.game.scene.add('PFinal1', PFin, true, "Lexi");
        this.scene.remove('miPartida');
        this.scene.remove();
        this.scene.launch('PFinal1');
       

    
    }else if(this.scoreJ2>this.scoreJ1){

     this.game.scene.add('PFinal1',PFin, true, "Mat");

     this.scene.remove('miPartida');
     this.scene.remove(); 
     this.scene.launch('PFinal1');

     }else if(this.scoreJ1==this.scoreJ2){
  
    this.game.scene.add('PFinal1',PFin, true, "Empate");
   
    this.scene.remove('miPartida');
    this.scene.remove(); //Borra la escena de menú
    this.scene.launch('PFinal1');
     }

}























