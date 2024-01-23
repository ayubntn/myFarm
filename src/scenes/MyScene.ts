import Phaser from "phaser";
import config from "../GameConfig";
import Land, { LandType } from "../objects/land";
import Crop from "../objects/crop";
import myGlobal, { OperationType } from "../myGlobal";
import { CropStatus } from "../objects/crop";
import { ItemType } from "../types/itemType";
import loadImages from "../ImageLoader";
import PlowPanel from "../gameObjects/plowPanel";
import Background from "../gameObjects/background";
import OperationPanel from "../gameObjects/operationPanel";
import PlantingPanel from "../gameObjects/plantingPanel";
import CropDetailPanel from "../gameObjects/cropDetailPanel";
import StragePanel from "../gameObjects/stragePanel";
import TargetRect from "../gameObjects/targetRect";
import Strage from "../objects/strage";
import StrageBar from "../gameObjects/strageBar";
import BoxingCropAnim from "../animObjects/BoxingCropAnim";

let lands: Land[][] = [];
let landSprites: Phaser.Physics.Arcade.Sprite[][] = [];
let cropSprites: (Phaser.Physics.Arcade.Sprite | null)[][] = [];
let isDestroy = false;
let sceneCount = 0;
let targetLand: Land | null = null;
let targetCrop: Crop | null = null;
let harvestTargetCrop: Crop | null = null;
let targetRect: TargetRect | null = null;
let strageBar: StrageBar | null = null;
let stragePanel: StragePanel | null = null;
let plowPanel: PlowPanel | null = null;
let plantingPanel: PlantingPanel | null = null;
let cropDetailPanel: CropDetailPanel | null = null;

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: `myscene${sceneCount}` });
        sceneCount++;
    }

    preload() {
        loadImages(this);
        Strage.initFromLocalStorage();
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

        strageBar = new StrageBar(this);
        stragePanel = new StragePanel(this);
        const operationPanel = new OperationPanel(this);
        plowPanel = new PlowPanel(this, operationPanel);
        plantingPanel = new PlantingPanel(this, operationPanel);
        cropDetailPanel = new CropDetailPanel(this);


        [ItemType.wheat, ItemType.rice].forEach(type => {
            this.anims.create({
                key: type + '_harvestable_anim',
                frames: this.anims.generateFrameNumbers(type + '_harvestable'),
                frameRate: 3,
                repeat: -1
            });
        });

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
                if (!crop) continue;

                if (crop.status === CropStatus.harvested) {
                    const sprite = cropSprites[i][j];
                    if (sprite) {
                        new BoxingCropAnim(this, crop, { x: sprite.x, y: sprite.y }, { x: StrageBar.iconPosition.x, y: StrageBar.iconPosition.y });
                        sprite.destroy();
                    }
                    land.crop = undefined;
                    cropSprites[i][j] = null;
                    continue;
                }

                if (!cropSprites[i]) cropSprites[i] = [];
                if (cropSprites[i][j]) {
                    if (crop.status === CropStatus.harvestable) {
                        cropSprites[i][j]?.anims.play(crop.type + '_harvestable_anim', true);
                    } else {
                        cropSprites[i][j]?.setTexture(crop.type + "_" + crop.status);
                    }
                } else {
                    const landSprite = landSprites[i][j];
                    const cropSprite = this.physics.add.sprite(landSprite.x, landSprite.y - 10, crop.type + "_" + crop.status);
                    cropSprite.setScale(config.textureScale);
                    cropSprite.setInteractive({ cursor: 'pointer' });
                    cropSprite.on('pointerdown', () => {
                        console.log('click crop');
                        this.resetState();
                        if (crop.status === CropStatus.harvestable) {
                            harvestTargetCrop = crop;
                            targetLand = land;
                        } else {
                            targetCrop = crop;
                            targetRect = new TargetRect(this, landSprites[i][j]);
                        }
                    });
                    cropSprite.setDepth(100 + lands.length * i + j);
                    cropSprites[i][j] = cropSprite;
                }

            }
        }

        // タイマーと成長
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) continue;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land || !land.crop) continue;
                land.crop.updateStatus();
            }
        }

        // 操作パネルの表示
        if (!harvestTargetCrop) {
            if (targetLand) {
                plowPanel?.setVisible(targetLand.plowable());
                if (targetLand.type === LandType.cultivated) {
                    plantingPanel?.show();
                } else {
                    plantingPanel?.hide();
                }
                targetCrop = null;
            } else {
                plowPanel?.setVisible(false);
                plantingPanel?.hide();
            }
        }
        if (targetCrop) {
            if (targetCrop.status === CropStatus.harvestable) {
                targetCrop = null;
            } else {
                cropDetailPanel?.setCrop(targetCrop);
                cropDetailPanel?.setVisible(true);
            }
        } else {
            cropDetailPanel?.setVisible(false);
        }

        // 操作
        if (myGlobal.operation === OperationType.plow) {
            targetLand?.plow();
            myGlobal.operation = null;
        }
        if (myGlobal.operation === OperationType.planting) {
            targetLand?.planting();
            myGlobal.operation = null;
            myGlobal.clickOutside = true;
        }
        if (myGlobal.operation === OperationType.changeLandType) {
            targetLand?.changeType();
            myGlobal.operation = null;
        }
        if (harvestTargetCrop) {
            harvestTargetCrop.harvest();
            targetLand?.changeTypeToWaste();
            this.resetState();
        }
        if (myGlobal.clickOutside) {
            this.resetState();
        }
        if (stragePanel) {
            if (myGlobal.showStrage) {
                stragePanel.show();
            } else {
                stragePanel.hide();
            }
        }

        if (strageBar && (myGlobal.addStrage || myGlobal.subStrage)) {
            strageBar.update();
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
                    console.log('click land');
                    this.resetState();
                    targetLand = land;
                    const targetSprite = landSprites[i][j];
                    targetRect = new TargetRect(this, targetSprite);
                });
                sprite.setDepth(lands.length * i + j);
                if (!landSprites[i]) landSprites[i] = [];
                landSprites[i][j] = sprite;
            });
        });
    }

    reset() {
        if (!myGlobal.reset) return;
        Strage.reset();
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
        this.resetState();
        myGlobal.doReset();
        this.initLands();
    }

    resetState() {
        targetRect?.destroy();
        targetLand = null;
        targetCrop = null;
        harvestTargetCrop = null;
        myGlobal.clickOutside = false;
        myGlobal.operation = null;
        myGlobal.showStrage = false;
    }
}

export default MyScene;
