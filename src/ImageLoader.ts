import backgroundImage from "./assets/background.png";
import strageIcon from "./assets/strageIcon.png";
import strageBar from "./assets/strageBar.png";

import wastelandImage from "./assets/wasteland.png";
import cultivatedLandImage from "./assets/cultivatedLand.png";
import grasslandImage from "./assets/grassLand.png";

import wheatSowingImage from "./assets/wheat/sowing.png";
import wheatGerminationImage from "./assets/wheat/germination.png";
import wheatGrowingImage from "./assets/wheat/growing.png";
import wheatHarvestableImage from "./assets/wheat/harvestable.png";

import riceSowingImage from "./assets/rice/sowing.png";
import riceGerminationImage from "./assets/rice/germination.png";
import riceGrowingImage from "./assets/rice/growing.png";
import riceHarvestableImage from "./assets/rice/harvestable.png";

const loadImages = (scene: Phaser.Scene) => {
    scene.load.image("background", backgroundImage);
    scene.load.image("strageIcon", strageIcon);
    scene.load.image("strageBar", strageBar);

    scene.load.image("wasteland", wastelandImage);
    scene.load.image("cultivatedLand", cultivatedLandImage);
    scene.load.image("grassland", grasslandImage);

    scene.load.image("wheat_sowing", wheatSowingImage);
    scene.load.image("wheat_germination", wheatGerminationImage);
    scene.load.image("wheat_growing", wheatGrowingImage);
    scene.load.image("wheat_harvestable", wheatHarvestableImage);

    scene.load.image("rice_sowing", riceSowingImage);
    scene.load.image("rice_germination", riceGerminationImage);
    scene.load.image("rice_growing", riceGrowingImage);
    scene.load.image("rice_harvestable", riceHarvestableImage);
};

export default loadImages;