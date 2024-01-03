import Crop from "./crop";

export enum LandType {
    waste = 'wasteland',
    cultivated = 'cultivatedLand',
    grass = 'grassland',
}

class Land {
    type: LandType;
    crop?: Crop;
    //sprite?: Phaser.Physics.Arcade.Sprite;

    constructor(type: LandType) {
        this.type = type;
    }

    setCrop(crop: Crop) {
        this.crop = crop;
    }

    // setSprite(sprite: Phaser.Physics.Arcade.Sprite) {
    //     this.sprite = sprite;
    // }

    onClick() {
        if (this.type === LandType.waste) {
            this.type = LandType.cultivated;
        }
        console.log ('click' + this.type);
    }
}

export default Land;
