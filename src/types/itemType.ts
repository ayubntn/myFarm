export enum ItemType {
    wheat = 'wheat',
    rice = 'rice',
    wheatSeed = 'wheatSeed',
    riceSeed = 'riceSeed',
    bread = 'bread',
    gohan = 'gohan',
}

export const ItemName = {
    [ItemType.wheat]: 'こむぎ',
    [ItemType.rice]: 'おこめ',
    [ItemType.wheatSeed]: 'こむぎのたね',
    [ItemType.riceSeed]: 'おこめのたね',
    [ItemType.bread]: 'パン',
    [ItemType.gohan]: 'ごはん',
}

export type CropType = ItemType.wheat | ItemType.rice;
export type SeedType = ItemType.wheatSeed | ItemType.riceSeed;
export type MenuType = ItemType.bread | ItemType.gohan;

export const ItemGroup = {
    seed: [ItemType.wheatSeed, ItemType.riceSeed],
    crop: [ItemType.wheat, ItemType.rice],
}

export const seedMap = {
    [ItemType.wheat]: ItemType.wheatSeed,
    [ItemType.rice]: ItemType.riceSeed,
}

export const cropMap = Object.fromEntries(Object.entries(seedMap).map(([key, value]) => [value, key]));

export const MenuCost: {[key in string]: {[key2 in string]: number}} = {
    [ItemType.bread as MenuType]: {[ItemType.wheat as string]: 3},
    [ItemType.gohan as MenuType]: {[ItemType.rice as string]: 3},
};