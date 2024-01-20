import Item from './item';
import Strage from './strage';
import {ItemType, CropType, seedMap} from '../types/itemType';

export enum CropStatus {
    sowing = 'sowing',
    germination = 'germination',
    growing = 'growing',
    harvestable = 'harvestable',
    harvested = 'harvested',
}

export const CropGrowthTime = {
    [ItemType.wheat]: 3,
    [ItemType.rice]: 6,
}

class Crop extends Item {
    status: CropStatus;
    createdAt: Date = new Date();

    constructor(type: CropType, status: CropStatus = CropStatus.sowing, createdAt: Date = new Date()) {
        super(type);
        this.status = status;
        this.createdAt = createdAt;
    }

    harvest() {
        console.log(this.type + ' ' + this.status);
        if (this.status === CropStatus.harvestable) {
            this.status = CropStatus.harvested;
            Strage.add(this);
            Strage.add(new Item(this.seedType()), 2);
        }
    }
    
    seedType() {
        return seedMap[this.type as CropType];
    }

    elapsedSeconds() {
        return (Date.now() - this.createdAt.getTime()) / 1000;
    }

    secondsRemaining() {
        const time = CropGrowthTime[this.type as CropType];
        const elapsedSeconds = this.elapsedSeconds();
        return Math.floor(time * 3 - elapsedSeconds);
    }

    updateStatus() {
        const nowTime = this.elapsedSeconds();
        const time = CropGrowthTime[this.type as CropType];
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
