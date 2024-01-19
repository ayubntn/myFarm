import config from '../GameConfig';
import myGlobal, { OperationType } from '../myGlobal';
import OperationPanel from './operationPanel';

class PlowPanel {
    scene: Phaser.Scene;
    operationPanel: OperationPanel;
    button: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, operationPanel: OperationPanel) {
        this.scene = scene;
        this.operationPanel = operationPanel;
        this.button = scene.add.text(
            20,
            config.canvasHeight - config.blockHeight / 2,
            'たがやす',
            { fontSize: '20px', color: '#000000' }
        );
        this.button.setY(this.button.y - this.button.height / 2);
        this.button.setInteractive({ cursor: 'pointer' });
        this.button.on('pointerdown', () => {
            myGlobal.operation = OperationType.plow;
        });
    }

    setVisible(visible: boolean) {
        this.button.setVisible(visible);
    }
}

export default PlowPanel;