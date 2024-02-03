import config from '../GameConfig';
import myGlobal from '../myGlobal';
import loadImages from "../ImageLoader";
import Text from '../gameObjects/text';
import StrageBar from '../gameObjects/strageBar';
import StragePanel from '../gameObjects/stragePanel';
import GoodsPanel from '../gameObjects/store/goodsPanel';

let strageBar: StrageBar | null = null;
let stragePanel: StragePanel | null = null;

class StoreScene extends Phaser.Scene {

    constructor() {
        super({ key: 'store' });
    }

    preload() {
        strageBar = null;
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
        new Text(this, config.canvasWidth / 2, 25, 'おみせ', { fontSize: '24px' });


        strageBar = new StrageBar(this);
        stragePanel = new StragePanel(this);
        new GoodsPanel(this);
    }

    update() {
        if (stragePanel) {
            if (myGlobal.showStrage) {
                stragePanel.show();
            } else {
                stragePanel.hide();
            }
        }
    }

    reset() {
        
    }
}

export default StoreScene;