import config from '../../GameConfig';
import myGlobal from '../../myGlobal';
import { ItemName, MenuCost, MenuType, ItemType } from '../../types/itemType';
import Text from '../text';
import Strage from '../../objects/strage';

class MenuDetailPanel {
    scene: Phaser.Scene;
    modalGroup: Phaser.GameObjects.Group;
    contents: Phaser.GameObjects.Group | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const bg = this.scene.add.rectangle(config.canvasWidth / 2, config.canvasHeight / 2, config.canvasWidth / 2, 300, 0xffffff);
        bg.isStroked = true;
        bg.setStrokeStyle(4, 0xFF7272);
        bg.setDepth(1000);
        const close = this.scene.add.image(bg.getRightCenter().x || 0 - 20, bg.getTopCenter().y || 0 + 20, 'closeIcon');
        close.setScale(config.textureScale);
        close.setDepth(1001);
        close.setInteractive({ cursor: 'pointer' });
        close.on('pointerdown', () => {
            myGlobal.menuTarget = null;
        });
        this.modalGroup = this.scene.add.group([bg, close]);
        this.modalGroup.setVisible(false);
        this.modalGroup.setActive(false);
    }

    show() {
        if (this.modalGroup.active || !myGlobal.menuTarget) return;
        const name = new Text(this.scene, config.canvasWidth / 2, config.canvasHeight / 2 - 130, ItemName[myGlobal.menuTarget], { fontSize: '24px' });
        const image = this.scene.add.image(config.canvasWidth / 2, config.canvasHeight / 2 - 50, myGlobal.menuTarget + 'Icon');
        this.contents = this.scene.add.group([name, image]);

        const cost = MenuCost[myGlobal.menuTarget];
        let available = true;
        Object.keys(cost).forEach((ingredient) => {
            console.log(ingredient, cost[ingredient]);
            const ingredientImage = this.scene.add.image(config.canvasWidth / 2, config.canvasHeight / 2 + 20, ingredient + 'Icon');
            ingredientImage.setScale(config.textureScale);
            const ingredientName = new Text(this.scene, config.canvasWidth / 2, config.canvasHeight / 2 + 50, ItemName[ingredient as MenuType], { fontSize: '10px' });
            const ingredientCost = new Text(this.scene, config.canvasWidth / 2 + 30, config.canvasHeight / 2 + 20, 'x' + cost[ingredient].toString(), { fontSize: '10px' });
            this.contents?.addMultiple([ingredientImage, ingredientName, ingredientCost]);
            available = available && this.areIngredientsAvailable(cost);
        });

        if (available) {
            const cookButton = this.scene.add.image(config.canvasWidth / 2, config.canvasHeight / 2 + 100, 'cookButton');
            cookButton.setScale(config.textureScale);
            cookButton.setInteractive({ cursor: 'pointer' });
            cookButton.on('pointerdown', () => {
                myGlobal.cookTarget = myGlobal.menuTarget;
                myGlobal.menuTarget = null;
                Object.keys(cost).forEach((ingredient) => {
                    Strage.remove(ingredient as ItemType, cost[ingredient]);
                });
                myGlobal.taked = true;
            });
            this.contents?.add(cookButton);
        } else {
            const notEnoughMessage = new Text(this.scene, config.canvasWidth / 2, config.canvasHeight / 2 + 100, 'ざいりょうが たりないよ！');
            this.contents?.add(notEnoughMessage);
        }

        this.contents.setDepth(1001);
        this.modalGroup.setVisible(true);
        this.modalGroup.setActive(true);
    }

    hide() {
        if (!this.modalGroup.active || !this.contents) return;
        this.contents.destroy(true);
        this.modalGroup.setVisible(false);
        this.modalGroup.setActive(false);
    }

    areIngredientsAvailable(cost: { [key in string]: number }) {
        return Object.keys(cost).every((ingredient) => Strage.has(ingredient as ItemType, cost[ingredient]));
    }
}
export default MenuDetailPanel;