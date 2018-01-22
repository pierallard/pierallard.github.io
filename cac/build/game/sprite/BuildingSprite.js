"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Explosion_1 = require("./Explosion");
const LifeRectangle_1 = require("./LifeRectangle");
const SelectRectangle_1 = require("./SelectRectangle");
class BuildingSprite extends Phaser.Sprite {
    constructor(game, groups, x, y, key) {
        super(game, x, y, key);
        this.group = groups[Play_1.GROUP.UNIT];
        this.effectsGroup = groups[Play_1.GROUP.EFFECTS];
        this.scale.setTo(Play_1.SCALE);
        this.group.add(this);
        this.timerEvents = game.time.events;
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.timerEvents.add(0.3 * Phaser.Timer.SECOND, () => {
            this.destroy(true);
        });
    }
    setSelected(value) {
        this.selectedRectangle.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    updateLife(life, maxLife) {
        this.lifeRectangle.updateLife(life / maxLife);
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, (this.right - this.left) / 2 + this.left, (this.bottom - this.top) / 2 + this.top, Math.max(this.right - this.left, this.bottom - this.top)));
    }
}
exports.BuildingSprite = BuildingSprite;
//# sourceMappingURL=BuildingSprite.js.map