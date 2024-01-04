const config = {
    canvasWidth: 0,
    canvasHeight: 0,
    textureScale: 0.5,
    blockWidth: 80,
    blockHeight: 82,
    landSize: { width: 5, height: 5 },
    gap: 1,
};

config.canvasWidth = config.blockWidth * config.landSize.width + config.gap * (config.landSize.width - 1);
config.canvasHeight = config.blockHeight * config.landSize.height + config.gap * (config.landSize.height - 1);
export default config;
