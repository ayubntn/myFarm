import config from '../../GameConfig';
import Text from '../text';

class CookingPanel {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const bg = this.scene.add.rectangle(config.canvasWidth * 0.2, 420, config.canvasWidth * 0.3, 300, 0xffffff);
        const title = new Text(this.scene, bg.x, (bg.getTopCenter().y || 0) + 10, '料理中', { fontSize: '16px' });
        title.setDepth(10);
    }
}

export default CookingPanel;