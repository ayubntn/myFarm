import config from '../GameConfig';

class TargetRect {
    scene: Phaser.Scene;
    rect: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, targetSprite: Phaser.GameObjects.Sprite) {
        this.scene = scene;
        this.rect = scene.add.rectangle(targetSprite.x, targetSprite.y, config.blockWidth, config.blockHeight);
        this.rect.setStrokeStyle(4, 0xff6347);
        this.rect.setDepth(50);
    }

    destroy() {
        this.rect.destroy();
    }
}

export default TargetRect