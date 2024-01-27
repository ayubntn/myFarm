import { CropType } from './types/itemType';

export enum OperationType {
    plow = 1,
    planting = 2,
    changeLandType = 3,
}

type myGlobalType = {
    setCurrentScene: (currentScene: 'farm' | 'store' | 'kitchen') => void;
    operation: OperationType | null;
    cropType: CropType | null;
    reset: boolean;
    clickOutside: boolean;
    doReset: () => void;
    showStrage: boolean;
    addStrage: boolean;
    subStrage: boolean;
}

const myGlobal = {
    setCurrentScene: (currentScene) => {console.log(currentScene)},
    operation: null,
    cropType: null,
    reset: false,
    clickOutside: false,
    doReset: () => {
        myGlobal.operation = null;
        myGlobal.cropType = null;
        myGlobal.reset = false;
        myGlobal.clickOutside = false;

    },
    showStrage: false,
    addStrage: false,
    subStrage: false,
} as myGlobalType;

export default myGlobal;