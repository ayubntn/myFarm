import { CropType } from './objects/crop';

export enum OperationType {
    plow = 1,
    planting = 2,
}

type myGlobalType = {
    operation: OperationType | null;
    cropType: CropType | null;
    reset: boolean;
    clickOutside: boolean;
    doReset: () => void;
    showStrage: boolean;
}

const myGlobal = {
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
} as myGlobalType;

export default myGlobal;