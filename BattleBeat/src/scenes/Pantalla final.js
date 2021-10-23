import { anchoJuego, altoJuego } from "../init.js";
import Menu from "./Menu.js";

export default class PFinal extends Phaser.Scene {
    constructor() {
        super({
            key: 'PFinal',
            active: true
        });
    }

    preload() {
        this.load.image('LGana', './src/images/PantallaFinal/LexiGana.png');
        this.load.image('MPierde', './src/images/PantallaFinal/MatPierde.png');

        this.load.image('MGana', './src/images/PantallaFinal/MatGana.png');
        this.load.image('LPierde', './src/images/PantallaFinal/LexiPierde.png');
    }
    create(opcion) {
        this.cameras.main.fadeFrom(1000, 57, 47, 236);
        this.fondo = this.add.image(0, 0, 'Fondo2');
        this.fondo.setOrigin(0, 0);
        this.fondo.setScale(anchoJuego / this.fondo.width, altoJuego / this.fondo.height); //Imagen se escalará con el resto del juego 

        //Creamos el filtro que estará bajo los botones y la animación:        
        this.filtro = this.add.image(0, 0, 'filtroColor');
        this.filtro.setOrigin(0, 0);
        this.filtro.setScale(anchoJuego / this.filtro.width, altoJuego / this.filtro.height); //Imagen se escalará con el resto del juego 
        this.filtro.alpha = 0.8;

        if (opcion == "Lexi") {
            this.gana = this.add.image(anchoJuego / 4, altoJuego / 2, 'LGana');
            this.pierde = this.add.image(anchoJuego * 3 / 4, altoJuego * 2 / 3, 'MPierde');

            this.texto = this.add.text(anchoJuego * 2.75 / 4, altoJuego / 5, "Ganador: Jugador 1", { font: "40px Impact", fill: "#ffffff", align: "center" });
            
        } else if (opcion == "Mat") {
            this.gana = this.add.image(anchoJuego * 3 / 4, altoJuego / 2, 'MGana');
            this.pierde = this.add.image(anchoJuego / 4, altoJuego * 2 / 3, 'LPierde');

            this.texto = this.add.text(anchoJuego * 1.25 / 4, altoJuego / 5, "Ganador: Jugador 2", { font: "40px Impact", fill: "#ffffff", align: "center" });
            
        }else if (opcion == "Empate") {
            this.gana = this.add.image(anchoJuego * 3 / 4, altoJuego / 2, 'MGana');
            this.pierde = this.add.image(anchoJuego / 4, altoJuego * 2 / 3, 'LGana');

            this.texto = this.add.text(anchoJuego/ 2, altoJuego / 5, "Empate", { font: "40px Impact", fill: "#ffffff", align: "center" });
            
        }

        var escalaPersonajes = altoJuego / 1200;
        this.gana.setScale(escalaPersonajes);
        this.pierde.setScale(escalaPersonajes);
        this.texto.setFontSize(altoJuego / 10);
        this.texto.setOrigin(0.5);

        
        //Texto de cambio de pantalla al menú
        this.textoCambioPantalla = this.add.text(anchoJuego / 2, altoJuego * 9 / 10, "Volver al menú", { font: "40px Impact", fill: "#ffffff", align: "center" });
        this.textoCambioPantalla.setOrigin(0.5, 1);
        this.textoCambioPantalla.setInteractive();//Para que funcionen los eventos
        this.textoCambioPantalla.setFontSize(altoJuego / 15);

        this.textoCambioPantalla.on('pointerover', function () {
            this.setTint(0x8C86F0);//Se refiere solo al texto, este this se refiere al evento on del botón, no a la escena
        });

        this.textoCambioPantalla.on('pointerout', function () {
            this.clearTint();
        });

        //Función para clic del botón y cambio de escena
        this.textoCambioPantalla.on('pointerdown', function (event) {
            this.cameras.main.fade(1000, 57, 47, 236);

            this.scene.add('miMenu', new Menu);
            this.scene.launch('miMenu');
            this.scene.remove();

        }, this);

        this.flag = true;
        this.limiteContador = 15;
        this.contador = -this.limiteContador;
        this.angulo=-5;
    }


    update() {

        if (this.flag) {
            this.contador++;
            if (this.contador == this.limiteContador) {
                this.flag = false;
                this.gana.angle=this.angulo;
                this.pierde.angle=this.angulo;
                this.texto.angle=this.angulo;

            }
        }
        else {
            this.contador--;
            if (this.contador == -this.limiteContador) {
                this.flag = true;
                this.gana.angle=-this.angulo;
                this.pierde.angle=-this.angulo;
                this.texto.angle=-this.angulo;
            }
        }




    }
}

