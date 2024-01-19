const config = {
    canvasWidth: 0,
    canvasHeight: 0,
    textureScale: 0.5,
    blockWidth: 80,
    blockHeight: 82,
    landSize: { width: 5, height: 5 },
    landAreaX: 81 * 2,
    landAreaY: 83,
    gap: 1,
    strageLimit: 50,
};

config.canvasWidth = config.blockWidth * 9 + config.gap * (9 - 1);
config.canvasHeight = config.blockHeight * 9 + config.gap * (9 - 1);

export default config;
