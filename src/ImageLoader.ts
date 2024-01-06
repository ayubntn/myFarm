import wastelandImage from "./assets/wasteland.png";
import cultivatedLandImage from "./assets/cultivatedLand.png";

import wheatSowingImage from "./assets/wheat/sowing.png";
import wheatGerminationImage from "./assets/wheat/germination.png";
import wheatGrowingImage from "./assets/wheat/growing.png";

import riceSowingImage from "./assets/rice/sowing.png";
import riceGerminationImage from "./assets/rice/germination.png";
import riceGrowingImage from "./assets/rice/growing.png";

const loadImages = (scene: Phaser.Scene) => {
    scene.load.image("wasteland", wastelandImage);
    scene.load.image("cultivatedLand", cultivatedLandImage);

    scene.load.image("wheat_sowing", wheatSowingImage);
    scene.load.image("wheat_germination", wheatGerminationImage);
    scene.load.image("wheat_growing", wheatGrowingImage);

    scene.load.image("rice_sowing", riceSowingImage);
    scene.load.image("rice_germination", riceGerminationImage);
    scene.load.image("rice_growing", riceGrowingImage);
};

export default loadImages;