"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitSprite_1 = require("./UnitSprite");
const Rotation_1 = require("../computing/Rotation");
const SelectRectangle_1 = require("./SelectRectangle");
const LifeRectangle_1 = require("./LifeRectangle");
const Play_1 = require("../game_state/Play");
const ShotCounter_1 = require("./ShotCounter");
const Cell_1 = require("../computing/Cell");
const Orca_1 = require("../unit/Orca");
const ANIM_SPEED = 30;
const GAP_X = 20;
const GAP_Y = 50;
class OrcaSprite extends UnitSprite_1.UnitSprite {
    constructor(game, groups, cellPosition, counter) {
        super(game, groups, cellPosition, 'Copter', UnitSprite_1.IMAGE_FORMAT.ANIMATED);
        groups[Play_1.GROUP.AERIAL].add(this);
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, 20, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, 20, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
        this.shotCounter = new ShotCounter_1.ShotCounter(game, counter);
        this.addChild(this.shotCounter);
        this.anims = [];
        for (let i = 0; i < 8; i++) {
            this.anims.push(this.animations.add('toto', [i, 8 + i, 16 + i, 24 + i]));
        }
        this.shadow = new OrcaSpriteShadow(game, this.x + GAP_X, this.y + GAP_Y);
        groups[Play_1.GROUP.SHADOW].add(this.shadow);
        this.loadRotation(Rotation_1.ROTATION.RIGHT);
        this.isLanded = false;
    }
    update() {
        super.update();
        if (!this.isLanded) {
            this.shadow.x = this.x + GAP_X;
            this.shadow.y = this.y + GAP_Y;
        }
    }
    doDestroy() {
        super.doDestroy();
        this.shadow.destroy(true);
    }
    setSelected(value = true) {
        this.shotCounter.setVisible(value);
        super.setSelected(value);
    }
    updateCounter(value) {
        this.shotCounter.updateCounter(value);
    }
    landIfNeeded(position) {
        if (!this.isLanded) {
            this.land(position);
        }
    }
    unlandIfNeeded(cellPosition) {
        if (this.isLanded) {
            this.unland(cellPosition);
        }
    }
    setShadowVisible(value) {
        this.shadow.alpha = value ? 0.5 : 0;
    }
    loadRotation(rotation) {
        this.anims[rotation].play(ANIM_SPEED, true, false);
        this.shadow.loadRotation(rotation);
    }
    land(position) {
        this.isLanded = true;
        this.shadow.land(position);
        this.game.add.tween(this).to({
            x: position.x,
            y: position.y,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
    unland(cellPosition) {
        this.isLanded = false;
        this.shadow.unland(cellPosition);
        this.game.add.tween(this).to({
            x: Cell_1.Cell.cellToReal(cellPosition.x),
            y: Cell_1.Cell.cellToReal(cellPosition.y),
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
}
exports.OrcaSprite = OrcaSprite;
class OrcaSpriteShadow extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'CptrShd1');
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.anims = [];
        for (let i = 0; i < 8; i++) {
            this.anims.push(this.animations.add('toto', [i, 8 + i, 16 + i, 24 + i]));
        }
        this.alpha = 0.5;
        this.loadRotation(Rotation_1.ROTATION.RIGHT);
    }
    loadRotation(rotation) {
        this.anims[rotation].play(ANIM_SPEED, true, false);
    }
    land(position) {
        this.game.add.tween(this).to({
            x: position.x,
            y: position.y,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
    unland(cellPosition) {
        const goalX = Cell_1.Cell.cellToReal(cellPosition.x) + GAP_X;
        const goalY = Cell_1.Cell.cellToReal(cellPosition.y) + GAP_Y;
        this.game.add.tween(this).to({
            x: goalX,
            y: goalY,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
}
//# sourceMappingURL=OrcaSprite.js.map