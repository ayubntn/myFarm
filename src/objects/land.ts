import Crop from "./crop";
import config from "../GameConfig";
import myGlobal, { OperationType } from "../myGlobal";

export enum LandType {
    waste = 'wasteland',
    cultivated = 'cultivatedLand',
    grass = 'grassland',
}

class Land {
    type: LandType;
    crop?: Crop;

    constructor(type: LandType) {
        this.type = type;
    }

    setCrop(crop: Crop) {
        this.crop = crop;
    }

    onClick() {
        if (myGlobal.operation === OperationType.plow) {
            if (this.type === LandType.waste) {
                this.type = LandType.cultivated;
            }
            console.log('plow ' + this.type);
        } else if (myGlobal.operation === OperationType.planting && this.type === LandType.cultivated) {
            console.log(myGlobal.cropType)
            this.crop = new Crop(myGlobal.cropType);
        }
    }

    static createListFromStrage() {
        let lands: Land[][] = [];
        const landsStr = localStorage.getItem("lands");
        if (landsStr) {
            const array = JSON.parse(landsStr);
            for (let i = 0; i < array.length; i++) {
                const row = array[i];
                if (!lands[i]) lands[i] = [];
                for (let j = 0; j < row.length; j++) {
                    lands[i][j] = new Land(row[j].type);
                    const crop = row[j].crop;
                    if (crop) {
                        lands[i][j].setCrop(new Crop(crop.type, crop.status, new Date(crop.createdAt)));
                    }
                }
            }
        } else {
            lands = Land.createDefaultList();
        }
        return lands;
    }

    static createDefaultList() {
        const lands: Land[][] = [];
        for (let i = 0; i < config.landSize.width; i++) {
            for (let j = 0; j < config.landSize.height; j++) {
                if (!lands[i]) lands[i] = [];
                lands[i][j] = new Land(LandType.waste);
            }
        }
        return lands;
    }

    static resetListAndStorage() {
        localStorage.removeItem("lands");
        return Land.createDefaultList();
    }
}

export default Land;
