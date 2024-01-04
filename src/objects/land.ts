import Crop from "./crop";
import config from "../GameConfig";

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

    static createListFromStrage() {
        const lands: Land[][] = [];
        const landsStr = localStorage.getItem("lands");
        if (landsStr) {
            const array = JSON.parse(landsStr);
            for (let i = 0; i < array.length; i++) {
                const row = array[i];
                if (!lands[i]) lands[i] = [];
                for (let j = 0; j < row.length; j++) {
                    lands[i][j] = new Land(row[j].type);
                }
            }
        } else {
            for (let i = 0; i < config.landSize.width; i++) {
                for (let j = 0; j < config.landSize.height; j++) {
                    if (!lands[i]) lands[i] = [];
                    lands[i][j] = new Land(LandType.waste);
                }
            }
        }
        return lands;
    }
}

export default Land;
