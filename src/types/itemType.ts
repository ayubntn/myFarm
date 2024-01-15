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
