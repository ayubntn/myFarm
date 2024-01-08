import config from '../GameConfig';
import myGlobal, {OperationType} from '../myGlobal';
import {CropType} from '../objects/crop';

class PlantingplantingText {
    scene: Phaser.Scene;
    plantingText: Phaser.GameObjects.Text;
    wheatButton: Phaser.GameObjects.Text;
    riceButton: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.plantingText = scene.add.text(0, config.canvasHeight - config.blockHeight / 2, 'えらんでね', { fontSize: '20px', color: '#000000' });

        this.wheatButton = scene.add.text(200, config.canvasHeight - config.blockHeight / 2, 'こむぎ', { fontSize: '20px', color: '#000000' });
        this.wheatButton.setInteractive();
        this.wheatButton.on('pointerdown', () => {
            console.log('こむぎ')
            myGlobal.operation = OperationType.planting;
            myGlobal.cropType = CropType.wheat;
        });

        this.riceButton = scene.add.text(400, config.canvasHeight - config.blockHeight / 2, 'おこめ', { fontSize: '20px', color: '#000000' });
        this.riceButton.setInteractive();
        this.riceButton.on('pointerdown', () => {
            console.log('おこめ')
            myGlobal.operation = OperationType.planting;
            myGlobal.cropType = CropType.rice;
        });
    }

    setVisible(visible: boolean) {
        this.plantingText.setVisible(visible);
        this.wheatButton.setVisible(visible);
        this.riceButton.setVisible(visible);
    }
}

export default PlantingplantingText;