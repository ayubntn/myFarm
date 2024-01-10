import Item from './item';
import Strage from './strage';

export enum CropStatus {
    sowing = 'sowing',
    germination = 'germination',
    growing = 'growing',
    harvestable = 'harvestable',
    harvested = 'harvested',
}

export enum CropType {
    wheat = 'wheat',
    rice = 'rice',
}

export const CropName = {
    [CropType.wheat]: 'こむぎ',
    [CropType.rice]: 'おこめ',
}

export const CropGrowthTime = {
    [CropType.wheat]: 3,
    [CropType.rice]: 6,
}

class Crop extends Item {
    type: CropType;
    status: CropStatus;
    createdAt: Date = new Date();

    constructor(type: CropType, status: CropStatus = CropStatus.sowing, createdAt: Date = new Date()) {
        super(CropName[type]);
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
    }

    harvest() {
        console.log(this.type + ' ' + this.status);
        if (this.status === CropStatus.harvestable) {
            this.status = CropStatus.harvested;
            Strage.add(this);
        }
    }

    elapsedSeconds() {
        return (Date.now() - this.createdAt.getTime()) / 1000;
    }

    secondsRemaining() {
        const time = CropGrowthTime[this.type];
        const elapsedSeconds = this.elapsedSeconds();
        return Math.floor(time * 3 - elapsedSeconds);
    }

    updateStatus() {
        const nowTime = this.elapsedSeconds();
        const time = CropGrowthTime[this.type];
        if (this.status === CropStatus.sowing && nowTime > time) {
            this.status = CropStatus.germination;
        } else if (this.status === CropStatus.germination && nowTime > time * 2) {
            this.status = CropStatus.growing;
        } else if (this.status === CropStatus.growing && nowTime > time * 3) {
            this.status = CropStatus.harvestable;
        }
    }
}

export default Crop;
