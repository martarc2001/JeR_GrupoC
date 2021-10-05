import { anchoJuego, altoJuego } from "../init.js";


function Jugador (){
  this.puntos=0;
}

var J1= new Jugador();
var J2= new Jugador();

class Partida extends Phaser.Scene {
    constructor() {
        super({
            key: "Partida",
            active: true
        });
    }

  
    preload() {
        this.load.image("flecha", "/src/images/Flecha.png")
    }

    create() {

 //flechas jugador 1

 //las añade a la escena siendo invisibles
  
  this.flecha2= this.add.image(anchoJuego/10.5, altoJuego/3, "flecha").setScale(-1.4,1.4);
  this.flecha3= this.add.image(anchoJuego/7.1, altoJuego/3, "flecha").setScale(1.4,-1.4);
  this.flecha4= this.add.image(anchoJuego/5.35, altoJuego/3, "flecha").setScale(-1.4,-1.4);
  this.flecha1= this.add.image(anchoJuego/20, altoJuego/3, "flecha").setScale(1.4);

  this.flecha1.visible =false;
  this.flecha2.visible =false;
  this.flecha3.visible =false;
  this.flecha4.visible =false;

//flechas j2
  
  this.flecha5= this.add.image((anchoJuego/20) +995, altoJuego/3, "flecha").setScale(1.4);
  this.flecha6= this.add.image((anchoJuego/10.5)+995, altoJuego/3, "flecha").setScale(-1.4,1.4);
  this.flecha7= this.add.image((anchoJuego/7.1)+995, altoJuego/3, "flecha").setScale(1.4,-1.4);
  this.flecha8= this.add.image((anchoJuego/5.35)+995, altoJuego/3, "flecha").setScale(-1.4,-1.4);
  

  this.flecha5.visible =false;
  this.flecha6.visible =false;
  this.flecha7.visible =false;
  this.flecha8.visible =false;
  
}
 //funcion update (la velocidad se puede cambiar luego)

  update(time){
   
    var vel=1.2;
 
   
      this.apareceflecha(this.flecha1,this.flecha5,time,vel);
      this.apareceflecha(this.flecha2,this.flecha6,time,vel);
      this.apareceflecha(this.flecha3,this.flecha7,time,vel);
      this.apareceflecha(this.flecha4,this.flecha8,time,vel);

    }
    
    //aparece flecha llama a dos flechas con el mismo movimiento
    //aparecen de forma aleatoria con maximo 6 segundos de espera
    //despues de que aparezcan se llama a la funcion mueve flecha

    apareceflecha(f,f2,t,v){
      if (t % Math.floor(Math.random()*60)==0){
        f.visible =true;
        f2.visible=true;
      }
      if(f.visible==true){
      this.mueveFlecha(f,f2,v);
      }
    }

    //mueve flecha hace que se muevan hacia arriba las dos flechas con 
    //la velocidad. Cuando suben a un punto determinado se llama a reset

 mueveFlecha(f,f2, v){

    f.y -= v;
    f2.y -= v;
    if(f.y<80){
        this.resetFlecha(f,f2);
    }
}

//resetFlecha hace que vuelvan al lugar inicial y las hace invisibles.
//al hacerse invisibles se dejan de mover

resetFlecha(f,f2){
    f.y= altoJuego/3;
    f2.y= altoJuego/3;
   f.visible=false;
   f2.visible=false;
}

}


export default Partida;
