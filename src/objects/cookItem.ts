import Item from './item';
import { MenuType, ItemType } from "../types/itemType";

export const CookingTime = {
    [ItemType.bread]: 10,
    [ItemType.gohan]: 20,
}

export enum CookingStatus {
    cooking =  'cooking',
    order =  'order',
}

class CookItem extends Item {
    createdAt: Date;
    status: CookingStatus = CookingStatus.order;

    constructor(type: MenuType, createdAt: Date = new Date()) {
        super(type);
        this.createdAt = createdAt;
    }

    elapsedSeconds() {
        return (Date.now() - this.createdAt.getTime()) / 1000;
    }

    secondsRemaining() {
        const time = CookingTime[this.type as MenuType];
        const elapsedSeconds = this.elapsedSeconds();
        return time - elapsedSeconds;
    }
    
    secondsRemainingRound() {
        return Math.floor(this.secondsRemaining());
    }

    setCooking() {
        this.status = CookingStatus.cooking;
    }
}

export default CookItem;