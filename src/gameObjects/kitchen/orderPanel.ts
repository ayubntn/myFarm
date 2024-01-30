import config from '../../GameConfig';
import Text from '../text';
import Kitchen from '../../objects/kitchen';
import CookItem from '../../objects/cookItem';

class OrderPanel {
    scene: Phaser.Scene;
    kitchen: Kitchen;
    bg: Phaser.GameObjects.Rectangle;
    images: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, kitchen: Kitchen) {
        this.scene = scene;
        this.kitchen = kitchen;
        this.bg = this.scene.add.rectangle(config.canvasWidth * 0.67, 420, config.canvasWidth * 0.56, 300, 0xffffff);
        const title = new Text(this.scene, this.bg.x, (this.bg.getTopCenter().y || 0) + 10, '作る よてい', { fontSize: '16px' });
        title.setDepth(10);

        this.images = this.scene.add.group();
    }

    update() {
        this.images.clear(true, true);
        const col = 3;
        this.kitchen.orderItems().forEach((item: CookItem, index) => {
            const row = Math.floor(index / col);
            const image = this.scene.add.image(
                (this.bg.getTopLeft().x || 0) + 120 + 100 * (index % col),
                (this.bg.getTopLeft().y || 0) + 80 + 100 * row,
                item.type + 'Icon'
            );
            this.images.add(image);
        });
        this.images.setDepth(20);
    }
}

export default OrderPanel;