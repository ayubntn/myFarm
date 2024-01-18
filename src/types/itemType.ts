import Crop from "../objects/crop";

export enum ItemType {
    wheat = 'wheat',
    rice = 'rice',
    wheatSeed = 'wheatSeed',
    riceSeed = 'riceSeed',
}

export const ItemName = {
    [ItemType.wheat]: 'こむぎ',
    [ItemType.rice]: 'おこめ',
    [ItemType.wheatSeed]: 'こむぎのたね',
    [ItemType.riceSeed]: 'おこめのたね',
}

export type CropType = ItemType.wheat | ItemType.rice;
export type SeedType = ItemType.wheatSeed | ItemType.riceSeed;

export const ItemGroup = {
    seed: [ItemType.wheatSeed, ItemType.riceSeed],
    crop: [ItemType.wheat, ItemType.rice],
}

export const seedMap = {
    [ItemType.wheat]: ItemType.wheatSeed,
    [ItemType.rice]: ItemType.riceSeed,
}


export const cropMap = Object.fromEntries(Object.entries(seedMap).map(([key, value]) => [value, key]))
