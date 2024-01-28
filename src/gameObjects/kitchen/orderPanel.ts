import config from '../../GameConfig';
import Text from '../text';

class OrderPanel {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const bg = this.scene.add.rectangle(config.canvasWidth * 0.67, 420, config.canvasWidth * 0.56, 300, 0xffffff);
        const title = new Text(this.scene, bg.x, (bg.getTopCenter().y || 0) + 10, '作る よてい', { fontSize: '16px' });
        title.setDepth(10);
    }
}

export default OrderPanel;