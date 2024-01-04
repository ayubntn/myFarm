export enum OperationType {
    plow = 1,
    planting = 2,
}

const myGlobal = {
    operation: OperationType.plow,
    setOperation: (operation: OperationType) => {},
    reset: false,
};

export default myGlobal;