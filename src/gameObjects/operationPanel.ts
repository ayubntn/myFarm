import config from '../GameConfig';

class OperationPanel {
    scene: Phaser.Scene;
    operationPanel: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.operationPanel = scene.add.rectangle(config.canvasWidth / 2, config.canvasHeight - config.blockHeight / 2, config.canvasWidth, config.blockHeight, 0xffffff);
        this.operationPanel.setInteractive();
    }
}

export default OperationPanel;