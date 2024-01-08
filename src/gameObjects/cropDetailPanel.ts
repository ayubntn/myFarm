import config from '../GameConfig';
import Crop from '../objects/crop';

class CropDetailPanel {
    scene: Phaser.Scene;
    text: Phaser.GameObjects.Text;
    crop: Crop | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.text = scene.add.text(0, config.canvasHeight - config.blockHeight / 2, 'detail', { fontSize: '20px', color: '#000000' });
        this.setVisible(false);
    }

    setCrop(crop: Crop) {
        this.crop = crop;
        this.text.setText(`${crop.name} あと${crop.secondsRemaining()}秒`);
    }

    setVisible(visible: boolean) {
        this.text.setVisible(visible);
    }
}

export default CropDetailPanel;