"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bubble_1 = require("./Bubble");
class TalkBubble extends Bubble_1.Bubble {
    getImageSpriteKey() {
        return 'bubble_images';
    }
    getSpriteFrame() {
        return 0;
    }
    create(humanSprite, game, group) {
        super.create(humanSprite, game, group);
        this.switchImage();
    }
    getRandomFrame() {
        const imageCount = this.imageSprite.texture.baseTexture.width / 9;
        return Math.floor(Math.random() * imageCount);
    }
    switchImage() {
        this.imageSprite.loadTexture(this.imageSprite.key, this.getRandomFrame());
        this.event = this.game.time.events.add(Phaser.Math.random(2, 4) * Phaser.Timer.SECOND, this.switchImage, this);
    }
    hide() {
        this.game.time.events.remove(this.event);
        super.hide();
    }
    show() {
        this.switchImage();
        super.show();
    }
}
exports.TalkBubble = TalkBubble;
//# sourceMappingURL=TalkBubble.js.map