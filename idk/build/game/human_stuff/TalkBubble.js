"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bubble_1 = require("./Bubble");
const IMAGE_COUNT = 6;
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
    static getRandomFrame() {
        return Math.floor(Math.random() * IMAGE_COUNT);
    }
    switchImage() {
        //this.imageSprite.loadTexture(this.imageSprite.key, TalkBubble.getRandomFrame());
        this.game.time.events.add(Phaser.Math.random(2, 4) * Phaser.Timer.SECOND, this.switchImage, this);
    }
}
exports.TalkBubble = TalkBubble;
//# sourceMappingURL=TalkBubble.js.map