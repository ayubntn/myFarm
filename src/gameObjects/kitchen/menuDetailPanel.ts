import config from '../../GameConfig';

class MenuDetailPanel {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const bg = this.scene.add.rectangle(config.canvasWidth / 2, config.canvasHeight / 2, config.canvasWidth / 2, 300, 0xffffff);
        bg.isStroked = true;
        bg.setStrokeStyle(4, 0xFF7272);
        bg.setDepth(1000);
    }
}
export default MenuDetailPanel;