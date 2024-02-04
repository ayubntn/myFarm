import { CropType, ItemType } from './types/itemType';

export enum OperationType {
    plow = 1,
    planting = 2,
    changeLandType = 3,
}

type myGlobalType = {
    setCurrentScene: (currentScene: 'farm' | 'store' | 'kitchen') => void;
    operation: OperationType | null;
    cropType: CropType | null;
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