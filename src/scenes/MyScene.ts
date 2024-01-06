import Phaser from "phaser";
import wastelandImage from "../assets/wasteland.png";
import cultivatedLandImage from "../assets/cultivatedLand.png";
import wheatSowingImage from "../assets/wheat/sowing.png";
import wheatGerminationImage from "../assets/wheat/germination.png";
import config from "../GameConfig";
import Land from "../objects/land";
import myGlobal from "../myGlobal";
import { CropStatus } from "../objects/crop";

let lands: Land[][] = [];
let cropSprites: Phaser.Physics.Arcade.Sprite[][] = [];
let isDestroy = false;
let sceneCount = 0;

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: `myscene${sceneCount}` });
        sceneCount++;
    }

    preload() {
        this.load.image("wasteland", wastelandImage);
        this.load.image("cultivatedLand", cultivatedLandImage);
        this.load.image("wheat_sowing", wheatSowingImage);
        this.load.image("wheat_germination", wheatGerminationImage);
    }

    create() {
        // なぜか発生するシーンの重複を削除
        if (!isDestroy) {
            this.scene.remove('myscene0');
            isDestroy = true;
            return;
        }

        lands = Land.createListFromStrage();
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(
                    config.blockWidth / 2 + config.blockWidth * i + config.gap * i,
                    config.blockHeight / 2 + config.blockHeight * j + config.gap * j,
                    land.type
                );
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    lands[i][j].onClick();
                });
                sprite.setDepth(lands.length * i + j);
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
            cropSprites = [];
            myGlobal.reset = false;
        }

        // 土地のspriteを無理やり取得（landSpritesとして保持すればよかった）
        this.children.depthSort();
        const children = this.children.getChildren() as Phaser.Physics.Arcade.Sprite[];

        // 土地と作目の状態更新
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) break;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land) break;
                const type = land.type;
                children[lands.length * i + j].setTexture(type);

                if (land.crop) {
                    const crop = land.crop;
                    if (!cropSprites[i]) cropSprites[i] = [];
                    if (!cropSprites[i][j]) {
                        const landSprite = children[lands.length * i + j];
                        const cropSprite = this.physics.add.sprite(landSprite.x, landSprite.y, "wheat_" + crop.status);
                        cropSprite.setScale(config.textureScale);
                        cropSprite.setInteractive();
                        cropSprite.setDepth(100 + lands.length * i + j);
                        cropSprites[i][j] = cropSprite;
                    } else {
                        cropSprites[i][j].setTexture("wheat_" + crop.status);
                    }

                }
            }
        }

        // タイマーと成長
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) break;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land || !land.crop) break;

                const nowTime = (Date.now() - land.crop.createdAt.getTime()) / 1000;
    console.log(nowTime);
                if (land.crop.status === CropStatus.sowing && nowTime > 3) {
                    land.crop.status = CropStatus.germination;
                    console.log('germination', i, j)
                }
            }
        }

        localStorage.setItem("lands", JSON.stringify(lands));
    }
}

export default MyScene;
