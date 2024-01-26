class Text extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style?: Phaser.Types.GameObjects.Text.TextStyle) {
        if (style === undefined) style = {};
        style.fontFamily = 'Hiragino Kaku Gothic ProN';
        if (style.color === undefined) style.color = '#333333';
        if (style.fontStyle === undefined) style.fontStyle = 'bold';
        if (style.fontSize === undefined) style.fontSize = '20px';
        super(scene, x, y, text, style);
        scene.add.existing(this);
        this.setX(this.x - this.width / 2);
    }
}

export default Text;