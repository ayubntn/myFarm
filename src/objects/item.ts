import {ItemType, ItemName, ItemGroup} from "../types/itemType";

class Item {
    type: ItemType;
    name: string;

    constructor(type: ItemType) {
        this.type = type;
        this.name = ItemName[type];
    }

    static isSeed(type: ItemType) {
        return ItemGroup.seed.includes(type);
    }
}

export default Item;