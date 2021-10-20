

export class Flecha extends Phaser.GameObjects.Sprite {
    
    
    constructor(config) {
        super(config.scene, config.x, config.y, "flecha");
        config.scene.add.existing(this);
    }

    mueveFlecha(){
        this.y--;
    }

    
}




