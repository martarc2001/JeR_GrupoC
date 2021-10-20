import { anchoJuego, altoJuego } from "../init.js";
import { Flecha } from "./flecha.js";



export default class Flechas extends Phaser.Scene {
    constructor() {
        super({
            key: "Flechas",
            active: true
        });

        this.cualFlecha = 0;
        this.sacaFlecha = 0;

        this.vectorFlechasJ1 = [];
        this.vectorFlechasJ2 = [];

        this.tiempo = 0;

        this.escalaFlechas;






    }

    preload() {
        this.load.image("flecha", "/src/images/Flecha.png");

    }



    create() {

        //flechas jugador 1
        //objetivo flechas
        this.flecha1_f = this.add.image(anchoJuego / 15, 130, "flecha");
        this.flecha1_f.angle = -90;
        this.flecha2_f = this.add.image(anchoJuego * 2 / 15, 130, "flecha");
        this.flecha2_f.angle = -180;
        this.flecha3_f = this.add.image(anchoJuego * 3 / 15, 130, "flecha");
        this.flecha4_f = this.add.image(anchoJuego * 4 / 15, 130, "flecha");
        this.flecha4_f.angle = 90;

        //flechas j2
        //objetivo flechas
        this.flecha5_f = this.add.image(anchoJuego - (anchoJuego * 4 / 15), 130, "flecha");
        this.flecha5_f.angle = -90;
        this.flecha6_f = this.add.image(anchoJuego - (anchoJuego * 3 / 15), 130, "flecha");
        this.flecha6_f.angle = -180;
        this.flecha7_f = this.add.image(anchoJuego - (anchoJuego * 2 / 15), 130, "flecha");
        this.flecha8_f = this.add.image(anchoJuego - (anchoJuego / 15), 130, "flecha");
        this.flecha8_f.angle = 90;

        this.escalaFlechas=altoJuego/1000;

 
        this.flecha1_f.setScale(this.escalaFlechas);
        this.flecha2_f.setScale(this.escalaFlechas);
        this.flecha3_f.setScale(this.escalaFlechas);
        this.flecha4_f.setScale(this.escalaFlechas);

        this.flecha5_f.setScale(this.escalaFlechas);
        this.flecha6_f.setScale(this.escalaFlechas);
        this.flecha7_f.setScale(this.escalaFlechas);
        this.flecha8_f.setScale(this.escalaFlechas);

      











    }

    update(time,delta) {

        this.tiempo+=delta;
      


        if (this.tiempo > 2000) {
            this.cualFlecha=this.random(1,5);
            this.vectorFlechasJ1.push(creaFlechaJ1(this));
            this.vectorFlechasJ2.push(creaFlechaJ2(this));


            this.tiempo = 0;

        }


        


        for (var i = 0; i < this.vectorFlechasJ1.length; i++) {


            this.vectorFlechasJ1[i].mueveFlecha();

        }

        for (var i = 0; i < this.vectorFlechasJ2.length; i++) {


            this.vectorFlechasJ2[i].mueveFlecha();

        }


        if (this.vectorFlechasJ1.length != 0) {

            eliminaFlechaArray(this.vectorFlechasJ1);
        }

        if (this.vectorFlechasJ2.length != 0) {

            eliminaFlechaArray(this.vectorFlechasJ2);
        }













    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }








}

function eliminaFlechaArray(array) {


    if (array[0].y < 0) {
        array[0].destroy();
        array.splice(0, 1);
    }

}



function creaFlechaJ1(miEscena) {
    miEscena.cualFlecha = miEscena.random(1, 5);




    if (miEscena.cualFlecha == 1) {

        //Flechas j1
        var f1 = new Flecha({ scene: miEscena, x: anchoJuego / 15, y:  altoJuego / 3 });
        f1.angle = -90;









    } else if (miEscena.cualFlecha == 2) {

        //Flechas j1
    

        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 2 / 15, y: altoJuego / 3});
        f1.angle = -180;



    } else if (miEscena.cualFlecha == 3) {




        var f1 = new Flecha({ scene: miEscena, x: anchoJuego * 3 / 15, y: altoJuego / 3});


    } else if (miEscena.cualFlecha == 4) {

     

        var f1 = new Flecha({ scene: miEscena, x:anchoJuego * 4 / 15, y: altoJuego / 3 });
        f1.angle = 90;




    }
    
    f1.setScale(miEscena.escalaFlechas);

    return f1;



}


function creaFlechaJ2(miEscena) {

    if (miEscena.cualFlecha == 1) {

        //Flechas j2
        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 4 / 15), y:  altoJuego / 3 });
        f2.angle = -90;


    } else if (miEscena.cualFlecha == 2) {

        //Flechas j2
        

        var f2 = new Flecha({ scene: miEscena, x:anchoJuego - (anchoJuego * 3 / 15), y: altoJuego / 3});
        f2.angle = -180;



    } else if (miEscena.cualFlecha == 3) {

        //Flechas j2


        var f2 = new Flecha({ scene: miEscena, x: anchoJuego - (anchoJuego * 2 / 15), y: altoJuego / 3});

    } else if (miEscena.cualFlecha == 4) {

        //Flechas j2
      
        var f2 = new Flecha({ scene: miEscena, x:anchoJuego - (anchoJuego / 15), y: altoJuego / 3 });
        f2.angle = 90;

    }
    
    f2.setScale(miEscena.escalaFlechas);

    return f2;



}






