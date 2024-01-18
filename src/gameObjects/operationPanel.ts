import config from '../GameConfig';

class OperationPanel {
    scene: Phaser.Scene;
    panel: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.panel = scene.add.rectangle(
            config.canvasWidth / 2,
            config.canvasHeight - config.blockHeight / 2,
            config.canvasWidth,
            config.blockHeight,
            0xffffff
        );
        this.panel.setInteractive();
    }

    getTopLeft() {
        return this.panel.getTopLeft();
    }
}

export default OperationPanel;