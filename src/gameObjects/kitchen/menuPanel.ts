import config from '../../GameConfig';
import myGlobal from '../../myGlobal';
import { MenuCost, ItemType, MenuType } from '../../types/itemType';
import Strage from '../../objects/strage';

class MenuPanel {
    scene: Phaser.Scene;
    panel: Phaser.GameObjects.Rectangle;
    group: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.panel = scene.add.rectangle(
            config.canvasWidth / 2,
            config.canvasHeight - 60,
            config.canvasWidth,
            120,
            0xffffff
        );
        this.group = scene.add.group();
        this.update();
    }

    areIngredientsAvailable(cost: { [key in string]: number }) {
        return Object.keys(cost).every((ingredient) => Strage.has(ingredient as ItemType, cost[ingredient]));
    }

    update() {
        this.group.clear(true, true);
        Object.keys(MenuCost).forEach((menu, index) => {
            const available = this.areIngredientsAvailable(MenuCost[menu]);
            const image = this.scene.add.image(100 * (index + 1), this.panel.y, menu + 'Icon');
            image.setInteractive({ cursor: 'pointer' });
            if (!available && image.preFX) {
                image.setAlpha(0.5);
                const fx = image.preFX.addColorMatrix();
                fx.grayscale(1);
            }
            image.on('pointerdown', () => {
                myGlobal.menuTarget = menu as MenuType;
            });
            this.group.add(image);
        });
    }
}

export default MenuPanel;