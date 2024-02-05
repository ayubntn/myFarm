import config from '../GameConfig';
import myGlobal, { OperationType } from '../myGlobal';
import OperationPanel from './operationPanel';

class PlowPanel {
    scene: Phaser.Scene;
    operationPanel: OperationPanel;
    group: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, operationPanel: OperationPanel) {
        this.scene = scene;
        this.operationPanel = operationPanel;
        const plowButton = scene.add.image(220, operationPanel.getCenter().y || 0, 'plowButton');
        plowButton.setScale(config.textureScale);
        plowButton.setInteractive({ cursor: 'pointer' });
        plowButton.on('pointerdown', () => {
            myGlobal.operation = OperationType.plow;
        });

        const livestockButton = scene.add.image(430, operationPanel.getCenter().y || 0, 'livestockButton');
        livestockButton.setScale(config.textureScale);
        livestockButton.setInteractive({ cursor: 'pointer' });
        livestockButton.on('pointerdown', () => {
            myGlobal.operation = OperationType.livestock;
        });

        const changeButton = scene.add.image(670, operationPanel.getCenter().y || 0, 'changeButton');
        changeButton.setScale(config.textureScale);
        changeButton.setInteractive({ cursor: 'pointer' });
        changeButton.on('pointerdown', () => {
            myGlobal.operation = OperationType.changeLandType;
        });
        this.group = scene.add.group([plowButton, livestockButton, changeButton]);
    }

    setVisible(visible: boolean) {
        this.group.setVisible(visible);
    }
}

export default PlowPanel;