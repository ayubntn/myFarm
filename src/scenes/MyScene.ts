import Phaser from "phaser";
import config from "../GameConfig";
import Land from "../objects/land";
import myGlobal from "../myGlobal";
import { CropStatus } from "../objects/crop";
import loadImages from "../ImageLoader";

let lands: Land[][] = [];
let landSprites: Phaser.Physics.Arcade.Sprite[][] = [];
let cropSprites: Phaser.Physics.Arcade.Sprite[][] = [];
let isDestroy = false;
let sceneCount = 0;

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

        lands = Land.createListFromStrage();
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(
                    config.blockWidth / 2 + config.blockWidth * j + config.gap * j,
                    config.blockHeight / 2 + config.blockHeight * i + config.gap * i,
                    land.type
                );
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    lands[i][j].onClick();
                });
                sprite.setDepth(lands.length * i + j);
                if (!landSprites[i]) landSprites[i] = [];
                landSprites[i][j] = sprite;
            });
        });
    }

    update() {
        //myGlobal.setOperation(OperationType.planting);
        if (myGlobal.reset) {
            lands = Land.resetListAndStorage();
            cropSprites.forEach(row => {
                row.forEach(sprite => {
                    sprite.destroy();
                });
            });
            landSprites = [];
            cropSprites = [];
            myGlobal.reset = false;
        }

        // 土地と作物の状態更新
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) continue;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land) continue;
                const type = land.type;
                landSprites[i][j].setTexture(type);

                if (land.crop) {
                    const crop = land.crop;
                    if (!cropSprites[i]) cropSprites[i] = [];
                    if (!cropSprites[i][j]) {
                        const landSprite = landSprites[i][j];
                        const cropSprite = this.physics.add.sprite(landSprite.x, landSprite.y, crop.type + "_" + crop.status);
                        cropSprite.setScale(config.textureScale);
                        cropSprite.setInteractive();
                        cropSprite.setDepth(100 + lands.length * i + j);
                        cropSprites[i][j] = cropSprite;
                    } else {
                        cropSprites[i][j].setTexture(crop.type + "_" + crop.status);
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
                if (land.crop.status === CropStatus.sowing && nowTime > 3) {
                    land.crop.status = CropStatus.germination;
                } else if (land.crop.status === CropStatus.germination && nowTime > 6) {
                    land.crop.status = CropStatus.growing;
                }
            }
        }

        localStorage.setItem("lands", JSON.stringify(lands));
    }
}

export default MyScene;
