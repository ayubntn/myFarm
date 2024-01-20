import config from '../GameConfig';
import Crop from '../objects/crop';

class MovingItem {
    static duration = 700;
    static delay = 200;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, crop: Crop, from: { x: number, y: number }, to: { x: number, y: number }) {
        this.scene = scene;
        const cropIcon = this.scene.add.image(from.x, from.y, crop.type + 'Icon');
        cropIcon.setScale(config.textureScale);
        cropIcon.setDepth(1010);
        const seedIcon = this.scene.add.image(from.x, from.y, crop.seedType() + 'Icon');
        seedIcon.setScale(config.textureScale);
        seedIcon.setDepth(1010);

            
        this.scene.add.tween({
            targets: [cropIcon],
            duration: MovingItem.duration,
            x: to.x,
            y: to.y,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            delay: MovingItem.delay
        });

        const seedTween = this.scene.add.tween({
            targets: [seedIcon],
            duration: MovingItem.duration,
            x: to.x,
            y: to.y,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            delay: MovingItem.delay * 2
        });

        seedTween.on('complete', () => {
            cropIcon.destroy();
            seedIcon.destroy();
        });
    }

    static totalTime() {
        return MovingItem.duration + MovingItem.delay;
    }
}

export default MovingItem;