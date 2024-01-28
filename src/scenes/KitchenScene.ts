import config from '../GameConfig';
import myGlobal from '../myGlobal';
import Strage from '../objects/strage';
import loadImages from "../ImageLoader";
import StrageBar from "../gameObjects/strageBar";
import StragePanel from "../gameObjects/stragePanel";
import StockPanel from "../gameObjects/kitchen/stockPanel";
import CookingPanel from "../gameObjects/kitchen/cookingPanel";
import OrderPanel from "../gameObjects/kitchen/orderPanel";
import MenuPanel from "../gameObjects/kitchen/menuPanel";
import MenuDetailPanel from "../gameObjects/kitchen/menuDetailPanel";
import Text from '../gameObjects/text';

let stragePanel: StragePanel | null = null;

class KitchenScene extends Phaser.Scene {

    constructor() {
        super({ key: 'store' });
    }

    preload() {
        stragePanel = null;

        loadImages(this);
        Strage.initFromLocalStorage();
    }

    create() {
        const basePoint = { x: config.canvasWidth - 130, y: 40 };
        const backButton = this.add.image(basePoint.x, basePoint.y, 'goToFarmButton');
        backButton.setInteractive({ cursor: 'pointer' });
        backButton.setScale(config.textureScale);
        backButton.on('pointerdown', () => {
            myGlobal.setCurrentScene('farm');
        });
        new Text(this, config.canvasWidth / 2, 25, 'キッチン', { fontSize: '24px' });
        new StrageBar(this);
        stragePanel = new StragePanel(this);
        new StockPanel(this);
        new CookingPanel(this);
        new OrderPanel(this);
        const menuPanel = new MenuPanel(this);
        new MenuDetailPanel(this);
    }

    update() {
        this.reset();

        if (stragePanel) {
            if (myGlobal.showStrage) {
                stragePanel.show();
            } else {
                stragePanel.hide();
            }
        }
    }

    reset() {
        if (!myGlobal.reset) return;
        Strage.reset();
    }
}

export default KitchenScene;