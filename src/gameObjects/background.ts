import config from '../GameConfig';
import myGlobal from '../myGlobal';

class Background {
    scene: Phaser.Scene;
    background: Phaser.GameObjects.TileSprite;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.background = scene.add.tileSprite(config.canvasWidth / 2, config.canvasHeight / 2, config.canvasWidth * 2, config.canvasHeight * 2, 'background');
        this.background.setScale(config.textureScale);
        this.background.setInteractive();
        this.background.alpha = 0.5;
        this.background.on('pointerdown', () => {
            console.log('background')
            myGlobal.clickOutside = true;
        });
    }
}

export default Background;