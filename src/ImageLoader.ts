
const loadImages = (scene: Phaser.Scene) => {
    scene.load.baseURL = '/myFarm/src/assets/';
    scene.load.image("wasteland", 'wasteland.png');
    scene.load.image("cultivatedLand", 'cultivatedLand.png');

    scene.load.image("wheat_sowing", 'wheat/sowing.png');
    scene.load.image("wheat_germination", 'wheat/germination.png');
    scene.load.image("wheat_growing", 'wheat/growing.png');

    scene.load.image("rice_sowing", 'rice/sowing.png');
    scene.load.image("rice_germination", 'rice/germination.png');
    scene.load.image("rice_growing", 'rice/growing.png');
};

export default loadImages;