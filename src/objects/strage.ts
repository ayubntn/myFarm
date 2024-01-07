import Item from './item';

const items: { [key: string]: number } = {};

const Strage = {
    items: items,
    add: (item: Item) => {
        if (!Strage.items[item.name]) {
            Strage.items[item.name] = 0;
        }
        Strage.items[item.name]++;
        console.log(Strage.items);
    }
}

export default Strage;