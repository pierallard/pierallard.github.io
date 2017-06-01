"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InteractiveObject_1 = require("./InteractiveObject");
const app_1 = require("../app");
const BABY_SPEED = 3;
class Baby extends InteractiveObject_1.InteractiveObject {
    constructor(play) {
        super(play);
        this.walking = false;
        this.walkingSprite = new Phaser.Sprite(play.game, 1200, 66 * app_1.SimpleGame.SCALE, 'babyanim');
        this.walkingSprite.scale.setTo(app_1.SimpleGame.SCALE);
        this.walkingSprite.anchor.x = 0.5;
        this.walkingSprite.anchor.y = 1;
        this.walkingSprite.animations.add('walk');
        this.walkingSprite.visible = false;
        this.setSprite(new Phaser.Sprite(play.game, 1200, 66 * app_1.SimpleGame.SCALE, 'baby'));
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
    }
    updatePosition(goalX) {
        let diff = goalX - this.sprite.position.x;
        if (Math.abs(diff) <= BABY_SPEED) {
            this.sprite.position.setTo(goalX, this.sprite.position.y);
            this.walkingSprite.position.setTo(goalX, this.sprite.position.y);
            this.walking = false;
            this.sprite.visible = true;
            this.sprite.scale.x = (diff > 0) ? app_1.SimpleGame.SCALE : -app_1.SimpleGame.SCALE;
            this.walkingSprite.visible = false;
            return true;
        }
        if (!this.walking) {
            this.walking = true;
            this.sprite.visible = false;
            this.walkingSprite.visible = true;
            this.walkingSprite.animations.play('walk', 15, true);
        }
        if (this.walking) {
            this.walkingSprite.scale.x = (diff > 0) ? -app_1.SimpleGame.SCALE : app_1.SimpleGame.SCALE;
        }
        else {
            this.sprite.scale.x = (diff > 0) ? app_1.SimpleGame.SCALE : -app_1.SimpleGame.SCALE;
        }
        let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
        let newPos = this.sprite.position.x + vector;
        this.sprite.position.setTo(newPos, this.sprite.position.y);
        this.walkingSprite.position.setTo(newPos, this.walkingSprite.position.y);
        return false;
    }
    static get BABY_SPEED() {
        return BABY_SPEED;
    }
    getStroke() {
        return '#ffffff';
    }
    getSprites() {
        return [this.sprite, this.walkingSprite];
    }
    getWorldPosition() {
        if (this.walking) {
            return this.walkingSprite.worldPosition;
        }
        else {
            return this.sprite.worldPosition;
        }
    }
}
exports.Baby = Baby;
//# sourceMappingURL=Baby.js.map