import Item from './item';
import CookItem from './cookItem';
import { MenuType } from '../types/itemType';

class Kitchen {
    cookItems: CookItem[] = [];
    stockItems: Item[] = [];

    constructor() {
        this.createListFromStrage();
    }

    addCookItem(menu: MenuType) {
        const item = new CookItem(menu);
        if (this.cookItems.length <= 0) {
            item.setCooking();
        }
        this.cookItems.push(item);
    }

    update() {
        if (!this.cookItems || this.cookItems.length <= 0) return;
        let shifted = false;
        if (this.cookItems[0].secondsRemaining() < 0) {
            this.stockItems.push(this.cookItems[0]);
            this.cookItems.shift();
            shifted = true;
        }
        if (this.cookItems.length > 0) {
            this.cookItems[0].setCooking();
        }
        localStorage.setItem("kitchen", JSON.stringify(this));
        return shifted;
    }

    resetListAndStorage() {
        localStorage.removeItem("kitchen");
        this.cookItems = [];
    }

    createListFromStrage() {
        const kitchenStr = localStorage.getItem("kitchen");
        if (kitchenStr) {
            const kitchenObj = JSON.parse(kitchenStr);
            Object.keys(kitchenObj).forEach(key => {
                if (key === 'cookItems') {
                    kitchenObj[key].forEach((item: CookItem) => {
                        this.cookItems.push(new CookItem(item.type as MenuType, new Date(item.createdAt)));
                    });
                } else if (key === 'stockItems') {
                    kitchenObj[key].forEach((item: Item) => {
                        this.stockItems.push(new Item(item.type as MenuType));
                    });
                }
            });
        }
    }

    orderItems() {
        return this.cookItems.filter(item => item.status === 'order');
    }
}

export default Kitchen;