export enum CropStatus {
    sowing = 'sowing',
    germination = 'germination',
    growing = 'growing',
    harvestable = 'harvestable',
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
