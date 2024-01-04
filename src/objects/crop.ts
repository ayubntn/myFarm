export enum CropStatus {
    sowing,
    germination,
    growing,
    harvestable,
}

class Crop {
    status: CropStatus;
    createdAt: Date = new Date();

    constructor(status: CropStatus = CropStatus.sowing, createdAt: Date = new Date()) {
        this.status = status;
        this.createdAt = createdAt;
    }
}

export default Crop;
