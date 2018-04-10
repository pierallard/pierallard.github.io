"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMAGE_COUNT = 3;
class TalkBubble {
    create(humanSprite, game, group) {
        this.game = game;
        this.parent = humanSprite;
        this.sprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble', 0, group);
        this.sprite.anchor.set(1, 37 / this.sprite.height);
        group.add(this.sprite);
        this.imageSprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble_images', 0, group);
        this.imageSprite.anchor.set(1.2, 76 / this.sprite.height);
        group.add(this.imageSprite);
        this.switchImage();
        this.hide();
    }
    show() {
        this.sprite.alpha = 1;
        this.imageSprite.alpha = 1;
    }
    hide() {
        this.sprite.alpha = 0;
        this.imageSprite.alpha = 0;
    }
    update() {
        this.sprite.position = this.parent.position;
        this.sprite.scale.x = this.parent.scale.x;
        this.imageSprite.position = this.parent.position;
        this.imageSprite.scale.x = this.parent.scale.x;
    }
    static getRandomFrame() {
        return Math.floor(Math.random() * IMAGE_COUNT);
    }
    switchImage() {
        this.imageSprite.loadTexture(this.imageSprite.key, TalkBubble.getRandomFrame());
        this.game.time.events.add(Phaser.Math.random(2, 4) * Phaser.Timer.SECOND, this.switchImage, this);
    }
}
exports.TalkBubble = TalkBubble;
//# sourceMappingURL=TalkBubble.js.map