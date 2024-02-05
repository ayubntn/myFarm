import Item from './item';
import Strage from './strage';
import {ItemType, LivestockType, livestockMap} from '../types/itemType';

export enum LivestockStatus {
    hunger = 'hunger',
    normal = 'normal',
    moderately = 'moderately',
    full = 'full',
    harvestable = 'harvestable',
    harvested = 'harvested',
}

export const LivestockGrowthTime = {
    [ItemType.chicken]: 3,
    [ItemType.cow]: 6,
}

class Livestock extends Item {
    status: LivestockStatus;
    startAt: Date = new Date();

    constructor(type: LivestockType, status: LivestockStatus = LivestockStatus.hunger, startAt: Date = new Date()) {
        super(type);
        this.status = status;
        this.startAt = startAt;
    }

    harvest() {
        console.log(this.type + ' ' + this.status);
        if (this.status === LivestockStatus.harvestable) {
            this.status = LivestockStatus.harvested;
            Strage.add(this);
            Strage.add(new Item(this.harvestType()), 2);
        }
    }
    
    harvestType() {
        return livestockMap[this.type as LivestockType];
    }

    elapsedSeconds() {
        return (Date.now() - this.startAt.getTime()) / 1000;
    }

    secondsRemaining() {
        const time = LivestockGrowthTime[this.type as LivestockType];
        const elapsedSeconds = this.elapsedSeconds();
        return Math.floor(time * 3 - elapsedSeconds);
    }

    updateStatus() {
        const nowTime = this.elapsedSeconds();
        const time = LivestockGrowthTime[this.type as LivestockType];
        if (this.status === LivestockStatus.hunger && nowTime > time) {
            this.status = LivestockStatus.normal;
        } else if (this.status === LivestockStatus.normal && nowTime > time * 2) {
            this.status = LivestockStatus.moderately;
        } else if (this.status === LivestockStatus.moderately && nowTime > time * 3) {
            this.status = LivestockStatus.full;
        } else if (this.status === LivestockStatus.full && nowTime > time * 4) {
            this.status = LivestockStatus.harvestable;  
        }
    }
}

export default Livestock;
