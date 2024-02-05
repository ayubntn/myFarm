import myGlobal, { OperationType } from '../myGlobal';
import { ItemType, ItemGroup, LivestockType } from '../types/itemType';
import ChoosePanel from './choosePanel';
import Strage from '../objects/strage';

class LivestockPanel extends ChoosePanel {

    getItems() {
        const items: { [key: string]: number } = {};
        for (const key in Strage.items) {
            const item = Strage.items[key];
            if (ItemGroup.livestocks.includes(key as ItemType)) {
                items[key] = item;
            }
        }
        return items;
    }

    clickItem(key: ItemType) {
        myGlobal.operation = OperationType.planting;
        myGlobal.livestockType = key as LivestockType;
        Strage.remove(key);
    }
}

export default LivestockPanel;