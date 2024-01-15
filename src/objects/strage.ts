import Item from './item';

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
    },
    reset() {
        localStorage.removeItem('strage');
        Strage.items = {};
    }
}

export default Strage;