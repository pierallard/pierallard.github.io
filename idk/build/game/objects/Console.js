"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = require("./AbstractObject");
const Direction_1 = require("../Direction");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
class Console extends AbstractObject_1.AbstractObject {
    constructor(point, worldKnowledge, orientation) {
        super(point, worldKnowledge, orientation);
        this.playersCount = 0;
    }
    create(game, groups) {
        super.create(game, groups);
        this.tvSprite = this.sprites[Direction_1.Direction.isTop(this.orientation) ? 0 : 2];
        if (Direction_1.Direction.isTop(this.orientation)) {
            this.tvSprite.animations.add('play', [1, 2, 3]);
        }
    }
    addPlayer() {
        this.playersCount++;
        if (this.playersCount === 1) {
            this.runAnimation();
        }
    }
    removePlayer() {
        this.playersCount--;
        if (this.playersCount === 0) {
            this.stopAnimation();
        }
    }
    runAnimation() {
        if (Direction_1.Direction.isTop(this.orientation)) {
            this.tvSprite.animations.play('play', HumanAnimationManager_1.FRAME_RATE, true);
        }
        else {
            this.tvSprite.loadTexture('tv', 1);
        }
    }
    stopAnimation() {
        if (Direction_1.Direction.isTop(this.orientation)) {
            this.tvSprite.animations.stop('play');
            this.tvSprite.loadTexture('tv_reverse', 0);
        }
        else {
            this.tvSprite.loadTexture('tv', 0);
        }
    }
}
exports.Console = Console;
//# sourceMappingURL=Console.js.map