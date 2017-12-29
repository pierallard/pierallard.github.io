"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
class BuildingSprite extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.scale.setTo(Play_1.SCALE);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
    }
    doExplodeEffect() {
        // this.game.add.existing(new Explosion(this.game, this.x, this.y));
    }
}
exports.BuildingSprite = BuildingSprite;
//# sourceMappingURL=BuildingSprite.js.map