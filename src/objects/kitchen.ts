import Item from './item';
import CookItem from './cookItem';
import { MenuType } from '../types/itemType';
import Strage from './strage';

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
        if (!this.cookItems || this.cookItems.length <= 0 || !this.cookingItem()) return;
        let shifted = false;
        if (this.cookingItem().secondsRemaining() < 0) {
            this.stockItems.push(this.cookItems[0]);
            this.cookItems.shift();
            shifted = true;
            if (this.cookItems.length > 0) {
                this.cookItems[0].setCooking();
            }
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
                        let startAt = null;
                        if (typeof item.startAt === 'string') {
                            startAt = new Date(item.startAt);
                        }
                        this.cookItems.push(new CookItem(item.type as MenuType, item.status, startAt));
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

    cookingItem() {
        return this.cookItems.filter(item => item.status === 'cooking')[0];
    }

    shiftStockItemToStrage(id: number) {
        const item = this.stockItems.find(item =>  item.id === id);
        if (!item) return;
        Strage.add(item);
        this.stockItems = this.stockItems.filter(item => item.id !== id);
    }
}

export default Kitchen;