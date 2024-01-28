import Item from './item';
import { MenuType } from "../types/itemType";

class CookItem extends Item {
    createdAt: Date;

    constructor(type: MenuType, createdAt: Date = new Date()) {
        super(type);
        this.createdAt = createdAt;
    }
}

export default CookItem;