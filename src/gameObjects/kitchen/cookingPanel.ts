import config from '../../GameConfig';
import Text from '../text';
import Kitchen from '../../objects/kitchen';
import CookItem from '../../objects/cookItem';

class CookingPanel {
    scene: Phaser.Scene;
    bg: Phaser.GameObjects.Rectangle;
    kitchen: Kitchen;
    item: CookItem | null;
    group: Phaser.GameObjects.Group;
    text: Phaser.GameObjects.Text | null;

    constructor(scene: Phaser.Scene, kitchen: Kitchen) {
        this.scene = scene;
        this.kitchen = kitchen;
        this.item = null;
        this.text = null;
        this.bg = this.scene.add.rectangle(config.canvasWidth * 0.2, 420, config.canvasWidth * 0.3, 300, 0xffffff);
        const title = new Text(this.scene, this.bg.x, (this.bg.getTopCenter().y || 0) + 10, '料理中', { fontSize: '16px' });
        title.setDepth(10);
        this.group = this.scene.add.group();
    }

    update() {
        console.log('cookingPanel update')
        this.item = null;
        this.group.clear(true, true);
        if (!this.kitchen.cookItems || this.kitchen.cookItems.length <= 0) return;
        const item = this.kitchen.cookItems[0];
        this.item = item;
        const image = this.scene.add.image(
            this.bg.x,
            this.bg.y,
            item.type + 'Icon'
        );
        this.group.add(image);
        this.updateText();
    }

    updateText() {
        //console.log(this.item)
        this.text?.destroy();
        if (!this.item) return;
        this.text = new Text(
            this.scene,
            this.bg.x,
            this.bg.y + 50,
            this.item.secondsRemainingRound() + '秒',
            { fontSize: '16px' }
        );
       this.text.setDepth(10);
    }
}

export default CookingPanel;