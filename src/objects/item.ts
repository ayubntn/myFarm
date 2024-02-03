import {ItemType, ItemName, ItemGroup} from "../types/itemType";

class Item {
    id: number = new Date().getTime();
    type: ItemType;
    name: string;

    constructor(type: ItemType, id: number = new Date().getTime()) {
        this.type = type;
        this.id = id;
        this.name = ItemName[type];
    }

    static isSeed(type: ItemType) {
        return ItemGroup.seed.includes(type);
    }
}

export default Item;