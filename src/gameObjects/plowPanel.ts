import config from '../GameConfig';
import myGlobal, {OperationType} from '../myGlobal';

class PlowPanel {
    scene: Phaser.Scene;
    button: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.button = scene.add.text(0, config.canvasHeight - config.blockHeight / 2, 'たがやす', { fontSize: '20px', color: '#000000' });
        this.button.setInteractive();
        this.button.on('pointerdown', () => {
            console.log('たがやす')
            myGlobal.operation = OperationType.plow;
        });
    }

    setVisible(visible: boolean) {
        this.button.setVisible(visible);
    }
}

export default PlowPanel;