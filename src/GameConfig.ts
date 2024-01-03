const config = {
    canvasWidth: 0,
    canvasHeight: 0,
    textureScale: 0.5,
    blockWidth: 80,
    blockHeight: 82,
    landSize: { width: 5, height: 5 }
};

config.canvasWidth = config.blockWidth * config.landSize.width;
config.canvasHeight = config.blockHeight * config.landSize.height;
export default config;
