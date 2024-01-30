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
import Kitchen from "../objects/kitchen";

let kitchen: Kitchen;
let stragePanel: StragePanel | null = null;
let menuDetailPanel: MenuDetailPanel | null = null;
let cookingPanel: CookingPanel | null = null;
let orderPanel: OrderPanel | null = null;

class KitchenScene extends Phaser.Scene {

    constructor() {
        super({ key: 'store' });
    }

    preload() {
        kitchen = new Kitchen();
        stragePanel = null;
        menuDetailPanel = null;
        cookingPanel = null;
        orderPanel = null;

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
        cookingPanel = new CookingPanel(this, kitchen);
        orderPanel = new OrderPanel(this, kitchen);
        new MenuPanel(this);
        menuDetailPanel = new MenuDetailPanel(this);
        
        cookingPanel.update();
    }

    update() {
        if (stragePanel) {
            if (myGlobal.showStrage) {
                stragePanel.show();
            } else {
                stragePanel.hide();
            }
        }

        if (menuDetailPanel) {
            if (myGlobal.menuTarget) {
                menuDetailPanel.show();
            } else {
                menuDetailPanel.hide();
            }
        }

        if (myGlobal.cookTarget) {
            kitchen.addCookItem(myGlobal.cookTarget);
            cookingPanel?.update();
            orderPanel?.update();
            myGlobal.cookTarget = null;
            myGlobal.menuTarget = null;
        }

        if (kitchen.update()) {
            cookingPanel?.update();
            orderPanel?.update();
        }

        cookingPanel?.updateText();
    }

    reset() {
        kitchen?.resetListAndStorage();
    }
}

export default KitchenScene;