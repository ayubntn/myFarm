import { CropType } from './objects/crop';

export enum OperationType {
    plow = 1,
    planting = 2,
}

const myGlobal = {
    operation: OperationType.plow,
    setOperation: (operation: OperationType) => { console.log(operation) },
    cropType: CropType.wheat,
    reset: false,
};

export default myGlobal;