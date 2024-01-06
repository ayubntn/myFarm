export enum CropStatus {
    sowing = 'sowing',
    germination = 'germination',
    growing = 'growing',
    harvestable = 'harvestable',
}

export enum CropType {
    wheat = 'wheat',
    rice = 'rice',
}

export const CropGrowthTime = {
    [CropType.wheat]: 3,
    [CropType.rice]: 6,
}

class Crop {
    type: CropType;
    status: CropStatus;
    createdAt: Date = new Date();

    constructor(type: CropType, status: CropStatus = CropStatus.sowing, createdAt: Date = new Date()) {
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
    }

    onClick() {
        console.log(this.type + ' ' + this.status);
    }
}

export default Crop;
