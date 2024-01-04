import Phaser from "phaser";
import wastelandImage from "../assets/wasteland.png";
import cultivatedLandImage from "../assets/cultivatedLand.png";
import config from "../GameConfig";
import Land from "../objects/land";
import myGlobal from "../myGlobal";

let lands: Land[][] = [];

class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: 'myscene' });
    }

    preload() {
        this.load.image("wasteland", wastelandImage);
        this.load.image("cultivatedLand", cultivatedLandImage);
    }

    create() {
        lands = Land.createListFromStrage();
        lands.forEach((row, i) => {
            row.forEach((land, j) => {
                const sprite = this.physics.add.sprite(config.blockWidth / 2 + config.blockWidth * i, config.blockHeight / 2 + config.blockHeight * j, land.type);
                sprite.setScale(config.textureScale);
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    lands[i][j].onClick();
                });
                sprite.setDepth(lands.length * i + j);
                //land.setSprite(sprite);
            });
        });
    }

    update() {
        if (myGlobal.reset) {
            lands = Land.resetListAndStorage();
            myGlobal.reset = false;
        }
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
        localStorage.setItem("lands", JSON.stringify(lands));
    }
}

export default MyScene;
