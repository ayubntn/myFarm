import config from '../GameConfig';
import Item from '../objects/item';

class MovingItem {
    static duration = 700;
    static delay = 200;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, item: Item, from: { x: number, y: number }, to: { x: number, y: number }, delay = 0) {
        this.scene = scene;
        const icon = this.scene.add.image(from.x, from.y, item.type + 'Icon');
        icon.setScale(config.textureScale);
        icon.setDepth(1010);
            
        const tween = this.scene.add.tween({
            targets: [icon],
            duration: MovingItem.duration,
            x: to.x,
            y: to.y,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            delay: MovingItem.delay + delay
        });

        tween.on('complete', () => {
            icon.destroy();
        });
    }

    static totalTime() {
        return MovingItem.duration + MovingItem.delay;
    }
}

export default MovingItem;