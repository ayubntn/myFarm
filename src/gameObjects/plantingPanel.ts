import config from '../GameConfig';
import myGlobal, { OperationType } from '../myGlobal';
import Item from '../objects/item';
import { CropType, ItemType, cropMap } from '../types/itemType';
import OperationPanel from './operationPanel';
import Strage from '../objects/strage';

class PlantingPanel {
    scene: Phaser.Scene;
    operationPanel: OperationPanel;
    group: Phaser.GameObjects.Group;
    itemGroup: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, operationPanel: OperationPanel) {
        this.scene = scene;
        this.operationPanel = operationPanel;
        const plantingText = scene.add.text(
            20,
            config.canvasHeight - config.blockHeight / 2,
            'えらんでね',
            { fontSize: '20px', color: '#000000' }
        );
        plantingText.setY(plantingText.y - plantingText.height / 2);
        this.group = scene.add.group([plantingText]);
        this.hide();
        this.itemGroup = scene.add.group();
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
        const basePoint = { x: (this.operationPanel.getTopLeft().x || 0) + 100, y: this.operationPanel.getTopLeft().y || 0 };
        let num = 1;
        for (const key in Strage.items) {
            const item = Strage.items[key];
            if (!Item.isSeed(key as ItemType)) continue;
            const icon = this.scene.add.image(basePoint.x + num * 100, basePoint.y + 40, key + 'Icon');
            icon.setInteractive({cursor: 'pointer'});
            icon.setScale(config.textureScale);
            icon.setDepth(1001);
            icon.on('pointerdown', () => this.clickItem(key as ItemType));
            const numText = this.scene.add.text(icon.x + 20, icon.y, '×' + item.toString(), { fontSize: '15px', color: '#000000' });
            numText.setInteractive({cursor: 'pointer'});
            numText.setDepth(1001);
            numText.on('pointerdown', () => this.clickItem(key as ItemType));
            this.itemGroup.add(icon);
            this.itemGroup.add(numText);
            num++;
        }
    }

    clickItem(key: ItemType) {
        myGlobal.operation = OperationType.planting;
        myGlobal.cropType = cropMap[key] as CropType;
        Strage.remove(new Item(key));
    }
}

export default PlantingPanel;