import Text from '../gameObjects/text';
import myGlobal from '../myGlobal';

class StoreScene extends Phaser.Scene {

    constructor() {
        super({ key: 'store' });
    }

    preload() {
        const text = new Text(this, 100, 100, '農園に戻る');
        text.setInteractive();
        text.on('pointerdown', () => {
            myGlobal.setCurrentScene('farm');
        });
    }

    create() {
        
    }

    update() {

    }
}

export default StoreScene;