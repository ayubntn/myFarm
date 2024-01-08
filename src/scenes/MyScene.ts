import Phaser from "phaser";
import config from "../GameConfig";
import Land, {LandType} from "../objects/land";
import myGlobal, {OperationType} from "../myGlobal";
import { CropStatus, CropGrowthTime, CropType } from "../objects/crop";
import loadImages from "../ImageLoader";
import PlowButton from "../gameObjects/plowButton";
import Background from "../gameObjects/background";
import OperationPanel from "../gameObjects/operationPanel";
import PlantingButton from "../gameObjects/plantingButton";

let lands: Land[][] = [];
let landSprites: Phaser.Physics.Arcade.Sprite[][] = [];
let cropSprites: (Phaser.Physics.Arcade.Sprite | null)[][] = [];
let isDestroy = false;
let sceneCount = 0;
let targetLand: Land | null = null;
let targetRect: Phaser.GameObjects.Rectangle | null = null;
let plowButton: PlowButton | null = null;
let plantingButton: PlantingButton | null = null;

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: `myscene${sceneCount}` });
        sceneCount++;
    }

    preload() {
        loadImages(this);
    }

    create() {
        // なぜか発生するシーンの重複を削除
        if (import.meta.env.MODE === 'development' && !isDestroy) {
            this.scene.remove('myscene0');
            isDestroy = true;
            return;
        }

        new Background(this);

        lands = Land.createListFromStrage();
        this.initLands();

        this.add.image(104, 40, 'strageBar').setScale(config.textureScale);
        const strageIcon = this.physics.add.sprite(40, 40, 'strageIcon');
        strageIcon.setScale(config.textureScale);

        new OperationPanel(this);
        plowButton = new PlowButton(this);
        plantingButton = new PlantingButton(this);
    }

    update() {

        this.reset();

        // 土地と作物の状態更新
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) continue;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land) continue;
                const type = land.type;
                landSprites[i][j].setTexture(type);
                const crop = land.crop;

                if (crop) {
                    if (crop.status === CropStatus.harvested) {
                        land.crop = undefined;
                        cropSprites[i][j]?.destroy();
                        cropSprites[i][j] = null;
                        continue;
                    }
                    
                    if (!cropSprites[i]) cropSprites[i] = [];
                    if (!cropSprites[i][j]) {
                        const landSprite = landSprites[i][j];
                        const cropSprite = this.physics.add.sprite(landSprite.x, landSprite.y - 10, crop.type + "_" + crop.status);
                        cropSprite.setScale(config.textureScale);
                        cropSprite.setInteractive();
                        cropSprite.on('pointerdown', () => {
                            crop.onClick();
                        });
                        cropSprite.setDepth(100 + lands.length * i + j);
                        cropSprites[i][j] = cropSprite;
                    } else {
                        cropSprites[i][j]?.setTexture(crop.type + "_" + crop.status);
                    }

                }
            }
        }

        // タイマーと成長
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) continue;
            
            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land || !land.crop) continue;
                const nowTime = (Date.now() - land.crop.createdAt.getTime()) / 1000;
                const time = CropGrowthTime[land.crop.type];
                if (land.crop.status === CropStatus.sowing && nowTime > time) {
                    land.crop.status = CropStatus.germination;
                } else if (land.crop.status === CropStatus.germination && nowTime > time * 2) {
                    land.crop.status = CropStatus.growing;
                } else if (land.crop.status === CropStatus.growing && nowTime > time * 3) {
                    land.crop.status = CropStatus.harvestable;
                }
            }
        }

        // 操作パネルの表示
        if (targetLand) {
            plowButton?.setVisible(targetLand.type === LandType.waste);
            plantingButton?.setVisible(targetLand.type === LandType.cultivated);
        } else {
            plowButton?.setVisible(false);
            plantingButton?.setVisible(false);
        }

        // 操作
        if (myGlobal.operation === OperationType.plow)  {
            targetLand?.plow();
            myGlobal.operation = null;
        }
        if (myGlobal.operation === OperationType.planting) {
            targetLand?.planting();
            myGlobal.operation = null;
            myGlobal.clickOutside = true;
        }
        if (myGlobal.clickOutside) {
            targetRect?.destroy();
            targetLand = null;
            myGlobal.clickOutside = false;
            myGlobal.operation = null;
        }

        localStorage.setItem("lands", JSON.stringify(lands));
    }

    initLands() {
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(
                    config.landAreaX + config.blockWidth / 2 + config.blockWidth * j + config.gap * j,
                    config.landAreaY + config.blockHeight / 2 + config.blockHeight * i + config.gap * i,
                    land.type
                );
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    targetLand = land;
                    const targetSprite = landSprites[i][j];
                    targetRect?.destroy();
                    targetRect = this.add.rectangle(targetSprite.x, targetSprite.y, config.blockWidth, config.blockHeight);
                    targetRect.setStrokeStyle(4, 0xff6347);
                    targetRect.setDepth(200);
                });
                sprite.setDepth(lands.length * i + j);
                if (!landSprites[i]) landSprites[i] = [];
                landSprites[i][j] = sprite;
            });
        });
    }

    reset() {
        if (myGlobal.reset) {
            lands = Land.resetListAndStorage();
            landSprites.forEach(row => {
                row.forEach(sprite => {
                    sprite.destroy();
                });
            });
            cropSprites.forEach(row => {
                row.forEach(sprite => {
                    sprite?.destroy();
                });
            });
            landSprites = [];
            cropSprites = [];
            targetLand = null;
            targetRect?.destroy();
            myGlobal.doReset();
            this.initLands();
        }
    }
}

export default MyScene;
