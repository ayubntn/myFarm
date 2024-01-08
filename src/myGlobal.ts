import { CropType } from './objects/crop';
import Land from './objects/land';

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
    
    }
} as myGlobalType;

export default myGlobal;