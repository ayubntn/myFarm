import config from '../GameConfig';
import myGlobal from '../myGlobal';

class SceneNav {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const basePoint = { x: config.canvasWidth - 60, y: 60 };

        const kitchenIcon = this.scene.add.image(basePoint.x, basePoint.y, 'kitchenIcon');
        kitchenIcon.setScale(config.textureScale);
        kitchenIcon.setInteractive({ cursor: 'pointer' });

        kitchenIcon.on('pointerdown', () => {
            myGlobal.setCurrentScene('kitchen');
        });

        const storeIcon = this.scene.add.image(
            basePoint.x, 
            (kitchenIcon.getBottomLeft().y || 0) + 50, 
            'storeIcon'
            );
        storeIcon.setScale(config.textureScale);
        storeIcon.setInteractive({ cursor: 'pointer'});
        storeIcon.on('pointerdown', () => {
            myGlobal.setCurrentScene('store');
        });
    }
}

export default SceneNav;