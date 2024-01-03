import Phaser from "phaser";
import wastelandImage from "../assets/wasteland.png";
import cultivatedLandImage from "../assets/cultivatedLand.png";
import config from "../GameConfig";
import Land, { LandType } from "../objects/land";

const lands: Land[][] = [];

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: 'myscene' });
    }

    preload() {
        this.load.image("wasteland", wastelandImage);
        this.load.image("cultivatedLand", cultivatedLandImage);
        lands.push([new Land(LandType.waste), new Land(LandType.waste), new Land(LandType.waste)]);
        lands.push([new Land(LandType.waste), new Land(LandType.waste), new Land(LandType.waste)]);
        lands.push([new Land(LandType.waste), new Land(LandType.waste), new Land(LandType.waste)]);
    }

    create() {
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(config.blockWidth / 2 + config.blockWidth * i, config.blockHeight / 2 + config.blockHeight * j, land.type);
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    lands[i][j].onClick();
                });
                land.setSprite(sprite);
            });
        });
    }

    update() {
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) break;

            for (let j = 0; j < lands[i].length; j++) {
                if (!lands[i][j]) break;

                const type = lands[i][j].type;
                lands[i][j].sprite?.setTexture(type);
            }
        }

    }
}

export default MyScene;
