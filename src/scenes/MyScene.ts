import Phaser from "phaser";
import wastelandImage from "../assets/wasteland.png";
import cultivatedLandImage from "../assets/cultivatedLand.png";
import wheatSowingImage from "../assets/wheat/sowing.png";
import config from "../GameConfig";
import Land from "../objects/land";
import myGlobal from "../myGlobal";
import {CropStatus} from "../objects/crop";

let lands: Land[][] = [];

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: 'myscene' });
    }

    preload() {
        this.load.image("wasteland", wastelandImage);
        this.load.image("cultivatedLand", cultivatedLandImage);
        this.load.image("wheat_sowing", wheatSowingImage);
    }

    create() {
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
            myGlobal.reset = false;
        }
        this.children.depthSort();
        const children = this.children.getChildren() as Phaser.Physics.Arcade.Sprite[];

        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) break;

            for (let j = 0; j < lands[i].length; j++) {
                const land = lands[i][j];
                if (!land) break;
                const type = land.type;
                children[lands.length * i + j].setTexture(type);

                if (land.crop) {
                    const crop = land.crop;
                    if (crop.status === CropStatus.sowing) {
                        children[lands.length * i + j].setTexture("wheat_sowing");
                    }
                }
            }
        }
        localStorage.setItem("lands", JSON.stringify(lands));
    }
}

export default MyScene;
