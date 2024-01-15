import config from '../GameConfig';
import myGlobal from '../myGlobal';

class StrageBar {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const image = scene.add.image(104, 40, 'strageBar')
        image.setScale(config.textureScale);
        image.setInteractive();
        image.on('pointerdown', () => {
            this.onClick();
        });
        const strageIcon = scene.physics.add.sprite(40, 40, 'strageIcon');
        strageIcon.setScale(config.textureScale);
        strageIcon.setInteractive();
        strageIcon.on('pointerdown', () => {
            this.onClick();
        });
        this.scene.add.group([image, strageIcon]);
    }

    onClick() {
        myGlobal.showStrage = true;
    }

}

export default StrageBar;