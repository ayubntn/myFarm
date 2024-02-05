import { CropType, ItemType, LivestockType } from './types/itemType';

export enum OperationType {
    plow = 1,
    planting = 2,
    changeLandType = 3,
    livestock = 4,
}

type myGlobalType = {
    setCurrentScene: (currentScene: 'farm' | 'store' | 'kitchen') => void;
    operation: OperationType | null;
    cropType: CropType | null;
    livestockType: LivestockType | null;
    clickOutside: boolean;
    doReset: () => void;
    showStrage: boolean;
    addStrage: boolean;
    subStrage: boolean;
    menuTarget: ItemType | null;
    tradeTarget: ItemType | null;
    stored: boolean;
    taked: boolean;
}

const myGlobal = {
    setCurrentScene: (currentScene) => {console.log(currentScene)},
    operation: null,
    cropType: null,
    livestockType: null,
    clickOutside: false,
    doReset: () => {
        myGlobal.operation = null;
        myGlobal.cropType = null;
        myGlobal.clickOutside = false;
        myGlobal.addStrage = false;
        myGlobal.subStrage = false;
        myGlobal.menuTarget = null;
        myGlobal.tradeTarget = null;
        myGlobal.stored = false;
        myGlobal.taked = false;
    },
    showStrage: false,
    addStrage: false,
    subStrage: false,
    menuTarget: null,
    tradeTarget: null,
    stored: false,
    taked: false,
} as myGlobalType;

export default myGlobal;