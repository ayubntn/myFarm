import config from '../GameConfig';
import myGlobal from '../myGlobal';
import loadImages from "../ImageLoader";
import StrageBar from "../gameObjects/strageBar";
import StragePanel from "../gameObjects/stragePanel";

let stragePanel: StragePanel | null = null;

class KitchenScene extends Phaser.Scene {

    constructor() {
        super({ key: 'store' });
    }

    preload() {
        stragePanel = null;
        
        loadImages(this);
    }

    create() {
        const basePoint = { x: config.canvasWidth - 130, y: 40 };
        const backButton = this.add.image(basePoint.x, basePoint.y, 'goToFarmButton');
        backButton.setInteractive({ cursor: 'pointer' });
        backButton.setScale(config.textureScale);
        backButton.on('pointerdown', () => {
            myGlobal.setCurrentScene('farm');
        });
        new StrageBar(this);
    }

    update() {

    }
}

export default KitchenScene;