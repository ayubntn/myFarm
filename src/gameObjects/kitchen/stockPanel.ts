import config from '../../GameConfig';
import Text from '../text';
import Kitchen from '../../objects/kitchen';

class StockPanel {
    scene: Phaser.Scene;
    bg: Phaser.GameObjects.Rectangle;
    group: Phaser.GameObjects.Group;
    kitchen: Kitchen;

    constructor(scene: Phaser.Scene, kitchen: Kitchen) {
        this.scene = scene;
        this.kitchen = kitchen;
        this.bg = this.scene.add.rectangle(config.canvasWidth / 2, 160, config.canvasWidth - 80, 160, 0xffffff);
        const title = new Text(this.scene, config.canvasWidth / 2, 100, 'かんせいひん', { fontSize: '16px' });
        title.setDepth(10);
        this.group = this.scene.add.group();
    }

    update() {
        this.group.clear(true, true);
        if (!this.kitchen.stockItems || this.kitchen.stockItems.length <= 0) return;
        this.kitchen.stockItems.forEach((item, index) => {
            const x = (this.bg.getTopLeft().x || 0) + 60 + 80 * index;
            const y = 160;
            const image = this.scene.add.image(x, y, item.type + 'Icon');
            image.setInteractive({ cursor: 'pointer' });
            image.on('pointerdown', () => {
                this.kitchen.shiftStockItemToStrage(item.id);
                this.update();
            });
            this.group.add(image);
        });
    }
}

export default StockPanel;