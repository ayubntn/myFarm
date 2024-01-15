import config from '../GameConfig';
import myGlobal from '../myGlobal';

class StragePanel {
    scene: Phaser.Scene;
    group: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const rect = this.scene.add.rectangle(
            config.canvasWidth / 2,
            config.canvasHeight / 2,
            config.canvasWidth * 0.8,
            config.canvasHeight * 0.6,
            0xffffff
        );
        rect.setInteractive();
        const title = this.scene.add.text(
            rect.x,
            (rect.getTopCenter().y || 0) + 20,
            'そうこ',
            { fontSize: '20px', color: '#000000' }
        );
        title.setX(title.x - title.width / 2);
        const closeIcon = this.scene.add.image(
            (rect.getBottomRight().x || 0) - 5,
            (rect.getTopLeft().y || 0) + 5,
            'closeIcon'
        );
        closeIcon.setScale(config.textureScale);
        closeIcon.setInteractive();
        closeIcon.on('pointerdown', () => {
            this.hide();
        });
        const group = this.scene.add.group([rect, title, closeIcon]);
        group.setDepth(1000);
        this.group = group;
        this.hide();
    }

    show() {
        myGlobal.showStrage = true;
        this.group.setVisible(true);
    }

    hide() {
        myGlobal.showStrage = false;
        this.group.setVisible(false);
    }
}

export default StragePanel;