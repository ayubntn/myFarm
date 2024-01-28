import config from '../../GameConfig';
import Text from '../text';

class StockPanel {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.add.rectangle(config.canvasWidth / 2, 160, config.canvasWidth - 80, 160, 0xffffff);
        const title = new Text(this.scene, config.canvasWidth / 2, 100, 'かんせいひん', { fontSize: '16px' });
        title.setDepth(10);
    }
}

export default StockPanel;