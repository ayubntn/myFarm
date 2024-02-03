import config from '../../GameConfig';
import {ItemGroup} from '../../types/itemType';

class GoodsPanel {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const bg = this.scene.add.rectangle(
            config.canvasWidth / 2,
            config.canvasHeight / 2 + 30,
            config.canvasWidth * 0.9,
            config.canvasHeight * 0.8,
            0xffffff
        );
        
        const basePoint = { x: (bg.getTopLeft().x || 0) + 50, y: (bg.getTopLeft().y || 0) + 50};
        ItemGroup.goods.forEach((item, index) => {
           const image = this.scene.add.image(basePoint.x + index * 100, basePoint.y, item + 'Icon');
           image.setScale(config.textureScale);
           image.setInteractive({ cursor: 'pointer' });
        });
    }
}

export default GoodsPanel;