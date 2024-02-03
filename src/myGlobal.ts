import { CropType, MenuType } from './types/itemType';

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
    menuTarget: MenuType | null;
    cookTarget: MenuType | null;
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
        myGlobal.cookTarget = null;
        myGlobal.stored = false;
        myGlobal.taked = false;
    },
    showStrage: false,
    addStrage: false,
    subStrage: false,
    menuTarget: null,
    cookTarget: null,
    stored: false,
    taked: false,
} as myGlobalType;

export default myGlobal;