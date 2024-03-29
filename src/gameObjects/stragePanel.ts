import config from '../GameConfig';
import myGlobal from '../myGlobal';
import Strage from '../objects/strage';
import Text from './text';
import {ItemName, ItemType} from '../types/itemType';

class StragePanel {
    scene: Phaser.Scene;
    rect: Phaser.GameObjects.Rectangle;
    group: Phaser.GameObjects.Group;
    itemGroup: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const rect = this.scene.add.rectangle(
            config.canvasWidth / 2,
            config.canvasHeight / 2,
            config.canvasWidth * 0.8,
            config.canvasHeight * 0.6,
            0xffffff
        );
        rect.setInteractive();
        rect.setStrokeStyle(4, 0xFF7272);

        const title = new Text(this.scene,
            rect.x,
            (rect.getTopCenter().y || 0) + 20,
            'そうこ',
        )

        this.rect = rect;

        const closeIcon = this.scene.add.image(
            (rect.getBottomRight().x || 0) - 5,
            (rect.getTopLeft().y || 0) + 5,
            'closeIcon'
        );
        closeIcon.setScale(config.textureScale);
        closeIcon.setInteractive({ cursor: 'pointer'});
        closeIcon.on('pointerdown', () => {
            this.hide();
        });
        const group = this.scene.add.group([rect, title, closeIcon]);
        group.setDepth(1000);
        this.group = group;
        this.itemGroup = this.scene.add.group();
        this.hide();
    }

    show() {
        if (this.group.active) return;
        myGlobal.showStrage = true;
        this.group.setActive(true);
        this.group.setVisible(true);
        this.showItems();
    }

    hide() {
        if (!this.group.active) return;
        myGlobal.showStrage = false;
        this.group.setVisible(false);
        this.group.setActive(false);
        if (this.itemGroup) {
            this.itemGroup.destroy(true);
        }
    }

    showItems() {
        this.itemGroup = this.scene.add.group();
        const basePoint = { x: (this.rect.getTopLeft().x || 0) - 30, y: this.rect.getTopLeft().y || 0 };
        let num = 1;
        for (const key in Strage.items) {
            const item = Strage.items[key];
            const icon = this.scene.add.image(basePoint.x + num * 100, basePoint.y + 100, key + 'Icon');
            icon.setInteractive();
            icon.setScale(config.textureScale);
            icon.setDepth(1001);
            const numText = new Text(this.scene, icon.x + 30, icon.y, '×' + item.toString(), { fontSize: '12px' });
            numText.setDepth(1001);
            const name = new Text(this.scene, icon.x + 10, icon.y + 25, ItemName[key as ItemType], { fontSize: '10px' });
            name.setDepth(1001);
            this.itemGroup.add(icon);
            this.itemGroup.add(numText);
            this.itemGroup.add(name);
            num++;
        }
    }
}

export default StragePanel;