import config from '../GameConfig';
import { ItemType, ItemName } from '../types/itemType';
import OperationPanel from './operationPanel';
import Text from './text';

abstract class ChoosePanel {
    scene: Phaser.Scene;
    operationPanel: OperationPanel;
    group: Phaser.GameObjects.Group;
    itemGroup: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, operationPanel: OperationPanel) {
        this.scene = scene;
        this.operationPanel = operationPanel;
        const plantingText = new Text(this.scene,
            100,
            config.canvasHeight - config.blockHeight / 2,
            'えらんでね',
        );
        plantingText.setY(plantingText.y - plantingText.height / 2);
        this.group = scene.add.group([plantingText]);
        this.hide();
        this.itemGroup = scene.add.group();
    }

    getCenter() {
        const center = this.operationPanel.getCenter();
        return {x: center.x || 0, y: center.y || 0};
    }

    show() {
        if (this.group.active) return;
        this.group.setActive(true);
        this.group.setVisible(true);
        this.showItems();
    }

    hide() {
        if (!this.group.active) return;
        this.group.setVisible(false);
        this.group.setActive(false);
        if (this.itemGroup) {
            this.itemGroup.destroy(true);
        }
    }

    showItems() {
        this.itemGroup = this.scene.add.group();
        const basePoint = { x: (this.operationPanel.getTopLeft().x || 0) + 100, y: (this.operationPanel.getTopLeft().y || 0) - 10 };
        let num = 1;
        const items = this.getItems();
        for (const key in items) {
            const item = items[key];
            const rect = this.scene.add.rectangle(basePoint.x + num * 105, basePoint.y + 50, 80, 50, 0xffffff);
            rect.setInteractive({ cursor: 'pointer' });
            rect.setDepth(1001);
            rect.on('pointerdown', () => this.clickItem(key as ItemType));
            const icon = this.scene.add.image(basePoint.x + num * 100, basePoint.y + 40, key + 'Icon');
            icon.setInteractive({ cursor: 'pointer' });
            icon.setDepth(1001);
            icon.setScale(config.textureScale);
            icon.on('pointerdown', () => this.clickItem(key as ItemType));
            const numText = new Text(this.scene, icon.x + 30, icon.y, '×' + item.toString(), { fontSize: '12px' });
            numText.setInteractive({ cursor: 'pointer' });
            numText.setDepth(1001);
            numText.on('pointerdown', () => this.clickItem(key as ItemType));
            const name = new Text(this.scene, icon.x + 10, icon.y + 20, ItemName[key as ItemType], { fontSize: '10px' });
            name.setInteractive({ cursor: 'pointer' });
            name.setDepth(1001);
            name.on('pointerdown', () => this.clickItem(key as ItemType));
            this.itemGroup.add(icon);
            this.itemGroup.add(numText);
            this.itemGroup.add(name);
            this.itemGroup.add(rect);
            num++;
        }
    }

    abstract getItems(): { [key: string]: number };

    abstract clickItem(key: ItemType) :void;
}

export default ChoosePanel;