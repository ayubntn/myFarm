import CookItem from './cookItem';
import {MenuType} from '../types/itemType';

class Kitchen {
    cookItems: CookItem[] = [];

    constructor() {
    }

    add(menu: MenuType) {
        this.cookItems.push(new CookItem(menu));
        localStorage.setItem("kitchen", JSON.stringify(this));

    }

    resetListAndStorage() {
        localStorage.removeItem("kitchen");
        this.cookItems = [];
    }
}

export default Kitchen;