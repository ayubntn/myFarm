import myGlobal, { OperationType } from '../myGlobal';
import Item from '../objects/item';
import { CropType, ItemType, cropMap } from '../types/itemType';
import ChoosePanel from './choosePanel';
import Strage from '../objects/strage';

class PlantingPanel extends ChoosePanel {

    getItems() {
        const items: { [key: string]: number } = {};
        for (const key in Strage.items) {
            const item = Strage.items[key];
            if (Item.isSeed(key as ItemType)) {
                items[key] = item;
            }
        }
        return items;
    }

    clickItem(key: ItemType) {
        myGlobal.operation = OperationType.planting;
        myGlobal.cropType = cropMap[key] as CropType;
        Strage.remove(key);
    }
}

export default PlantingPanel;