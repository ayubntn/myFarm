import config from '../GameConfig';
import myGlobal from '../myGlobal';
import Strage from '../objects/strage';
import MovingItem from '../animObjects/MovingItem';

const BAR_WIDTH = 110;

class StrageBar {
    static iconPosition = { x: 40, y: 40 };
    scene: Phaser.Scene;
    strageIcon: Phaser.Physics.Arcade.Sprite;
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
        const strageIcon = scene.physics.add.sprite(StrageBar.iconPosition.x, StrageBar.iconPosition.y, 'strageIcon');
        strageIcon.setScale(config.textureScale);
        strageIcon.setInteractive();
        strageIcon.on('pointerdown', () => {
            this.onClick();
        });
        this.strageIcon = strageIcon;

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
        if (myGlobal.addStrage) {
            this.boxingAnimation();
        }
        myGlobal.addStrage = false;
        myGlobal.subStrage = false;
    }

    limitText() {
        return `${Strage.count()}/${config.strageLimit}`;
    }

    boxingAnimation() {
        this.scene.add.tween({
            targets: [this.strageIcon],
            duration: 200,
            scale: 0.7,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 0,
            delay: MovingItem.totalTime()
        });
    }
}

export default StrageBar;