export enum CropStatus {
    sowing,
    germination,
    growing,
    harvestable,
}

class Crop {
    status: CropStatus;

    constructor() {
        this.status = CropStatus.sowing;
    }
}

export default Crop;
