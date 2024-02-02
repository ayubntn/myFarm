import Item from './item';
import { MenuType, ItemType } from "../types/itemType";

export const CookingTime = {
    [ItemType.bread]: 10,
    [ItemType.gohan]: 20,
}

export enum CookingStatus {
    cooking = 'cooking',
    order = 'order',
}

class CookItem extends Item {
    startAt: Date | null = null;
    status: CookingStatus = CookingStatus.order;

    constructor(type: MenuType, status: CookingStatus = CookingStatus.order, startAt: Date | null = null) {
        super(type);
        this.status = status;
        this.startAt = startAt;
    }

    elapsedSeconds() {
        if (this.startAt === null) return 0;
        return (Date.now() - this.startAt.getTime()) / 1000;
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
        this.startAt = new Date();
    }
}

export default CookItem;