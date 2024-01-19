import config from '../GameConfig';
import myGlobal from '../myGlobal';
import Strage from '../objects/strage';

const BAR_WIDTH = 110;

class StrageBar {
    scene: Phaser.Scene;
    bar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;

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
        const barBg = scene.add.rectangle(125, 40, BAR_WIDTH, 20, 0xcccccc);
        this.bar = scene.add.rectangle(barBg.getTopLeft().x, 40, 0, 20, 0x00bfff);

        this.text = scene.add.text(barBg.x, barBg.y, this.limitText(), { fontSize: '15px', color: '#000000' });
        this.text.setX(this.text.x - this.text.width / 2);
        this.text.setY(this.text.y - this.text.height / 2);

        this.update();
        this.scene.add.group([image, strageIcon]);
    }

    onClick() {
        myGlobal.showStrage = true;
    }

    update() {
        this.bar.width = BAR_WIDTH * Strage.count() / config.strageLimit;
        this.text.setText(this.limitText());
        myGlobal.addStrage = false;
        myGlobal.subStrage = false;
    }

    limitText() {
        return `${Strage.count()}/${config.strageLimit}`;
    }
}

export default StrageBar;