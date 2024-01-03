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
        
        for (let i = 0; i < config.landSize.width; i++) {
            for (let j = 0; j < config.landSize.height; j++) {
                if (!lands[i]) lands[i] = [];
                lands[i][j] = new Land(LandType.waste);
            }
        }
        localStorage.setItem('lands', JSON.stringify(lands));
    }

    create() {
        let count = 0;
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(config.blockWidth / 2 + config.blockWidth * i, config.blockHeight / 2 + config.blockHeight * j, land.type);
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    lands[i][j].onClick();
                });
                sprite.setDepth(count);
                count++;
                //land.setSprite(sprite);
            });
        });
    }

    update() {
        this.children.depthSort();
        const children = this.children.getChildren() as Phaser.Physics.Arcade.Sprite[];
        
        for (let i = 0; i < lands.length; i++) {
            if (!lands[i]) break;

            for (let j = 0; j < lands[i].length; j++) {
                if (!lands[i][j]) break;
                const type = lands[i][j].type;
                //console.log(lands.length * i + j);
                children[lands.length * i + j].setTexture(type);
                // lands[i][j].sprite?.setTexture(type);
            }
        }

    }
}

export default MyScene;
