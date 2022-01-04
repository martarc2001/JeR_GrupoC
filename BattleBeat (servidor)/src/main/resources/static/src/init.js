import Menu from './scenes/Menu.js';

var configuracion = {
    type: Phaser.CANVAS,
    height: window.innerHeight - 20,
    width: ((window.innerHeight - 20) / 9) * 16, //Formato 16:9
    parent: "contenedor",
    scene: [Menu],//Escenas que cargará desde el principio
    dom: {
        createContainer: true
    }
};

var game = new Phaser.Game(configuracion);
////////////////////////////////////////////////////////////////
//Variables globales para todos los archivos:
var anchoJuego = game.scale.width; //window.innerHeight - 20
var altoJuego = game.scale.height; //((window.innerHeight - 20) / 9) * 16
export { anchoJuego, altoJuego };

//(Hay que exportar un default)
var flag = 0;
export default flag; 
