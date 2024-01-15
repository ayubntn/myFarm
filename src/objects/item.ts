import {ItemType, ItemName} from "../types/itemType";

class Item {
    type: ItemType;
    name: string;

    constructor(type: ItemType) {
        this.type = type;
        this.name = ItemName[type];
    }
}

export default Item;