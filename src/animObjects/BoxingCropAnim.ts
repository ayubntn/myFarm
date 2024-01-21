import MovingItem from "./MovingItem";
import Crop from '../objects/crop';
import Item from '../objects/item';

class BoxingCropAnim {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, crop: Crop, from: { x: number, y: number }, to: { x: number, y: number }) {
        this.scene = scene;

        new MovingItem(scene, crop, from, to);
        new MovingItem(scene, new Item(crop.seedType()), from, to, MovingItem.delay);
            
    }

    static totalTime() {
        return MovingItem.duration + MovingItem.delay;
    }
}

export default BoxingCropAnim;