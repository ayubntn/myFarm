import Item from './item';
import { ItemType } from '../types/itemType';
import myGlobal from '../myGlobal';

const items: { [key: string]: number } = {};

const Strage = {
    items: items,
    initFromLocalStorage: () => {
        const strage = localStorage.getItem('strage');
        if (strage) {
            Strage.items = JSON.parse(strage);
        }
    },
    add: (item: Item, num = 1) => {
        if (!Strage.items[item.type]) {
            Strage.items[item.type] = 0;
        }
        Strage.items[item.type] += num;
        console.log(Strage.items);
        localStorage.setItem('strage', JSON.stringify(Strage.items));
        myGlobal.addStrage = true;
    },
    remove: (itemType: ItemType, num = 1) => {
        if (!Strage.items[itemType]) {
            return;
        }
        if (Strage.items[itemType] <= num) {
            delete Strage.items[itemType];
        } else {
            Strage.items[itemType] -= num;
        }
        localStorage.setItem('strage', JSON.stringify(Strage.items));
        myGlobal.subStrage = true;
    },
    count: () => {
        return Object.values(Strage.items).reduce((a, b) => a + b, 0);
    },
    has: (itemType: ItemType, num = 1) => {
        return Strage.items[itemType] >= num;
    },
    reset() {
        localStorage.removeItem('strage');
        Strage.items = {};
        this.add(new Item(ItemType.wheatSeed));
        this.add(new Item(ItemType.riceSeed));
    }
}

export default Strage;