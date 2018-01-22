"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const OrcaSprite_1 = require("../sprite/OrcaSprite");
const Play_1 = require("../game_state/Play");
const AttackReload_1 = require("../state/AttackReload");
const Helipad_1 = require("../building/Helipad");
const Cell_1 = require("../computing/Cell");
const Reload_1 = require("../state/Reload");
const SHOOT_COUNTER = 5;
exports.UNLAND_TIME = 0.5;
class Orca extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.counter = SHOOT_COUNTER;
    }
    create(game, groups) {
        this.effectsGroup = groups[Play_1.GROUP.EFFECTS];
        this.timerEvents = game.time.events;
        this.unitSprite = new OrcaSprite_1.OrcaSprite(game, groups, this.cellPosition, this.counter);
    }
    isOnGround() {
        return false;
    }
    shoot(enemy) {
        this.counter--;
        this.unitSprite.updateCounter(this.counter);
        super.shoot(enemy);
    }
    canShoot() {
        return this.counter > 0;
    }
    isOnHelipad() {
        return this.getCurrentHelipad() !== null;
    }
    getCurrentHelipad() {
        const helipads = this.worldKnowledge.getPlayerArmies(this.getPlayer(), 'Helipad');
        for (let i = 0; i < helipads.length; i++) {
            for (let j = 0; j < helipads[i].getCellPositions().length; j++) {
                if (helipads[i].getCellPositions()[j].x === this.cellPosition.x &&
                    helipads[i].getCellPositions()[j].y === this.cellPosition.y) {
                    return helipads[i];
                }
            }
        }
        return null;
    }
    isFullyReloaded() {
        return this.counter === SHOOT_COUNTER;
    }
    reload() {
        this.counter++;
        this.unitSprite.updateCounter(this.counter);
        this.unitSprite.landIfNeeded(this.getHelipadCenter());
        this.freeze(2 * Phaser.Timer.SECOND);
        this.getCurrentHelipad().runLoadAnimation();
        this.getCurrentHelipad().setLoading(true);
        if (this.counter >= SHOOT_COUNTER) {
            this.timerEvents.add((2 - exports.UNLAND_TIME) * Phaser.Timer.SECOND, () => {
                this.unlandIfNeeded();
                this.getCurrentHelipad().setLoading(false);
            }, this);
        }
    }
    unlandIfNeeded() {
        this.unitSprite.unlandIfNeeded(this.cellPosition);
    }
    updateStateAfterClick(cell) {
        const army = this.worldKnowledge.getArmyAt(cell);
        if (null !== army &&
            army instanceof Helipad_1.Helipad &&
            army.getPlayer() === this.player &&
            (!army.isLoading())) {
            this.state = new Reload_1.Reload(this, army);
            return;
        }
        super.updateStateAfterClick(cell);
    }
    setVisible(value) {
        super.setVisible(value);
        this.unitSprite.setShadowVisible(value);
    }
    getAttackState(army) {
        return new AttackReload_1.AttackReload(this.worldKnowledge, this, army);
    }
    getHelipadCenter() {
        const cellPosition = this.getCurrentHelipad().getCellPositions()[0];
        return new PIXI.Point(Cell_1.Cell.cellToReal(cellPosition.x + 0.5), Cell_1.Cell.cellToReal(cellPosition.y - 0.7));
    }
}
exports.Orca = Orca;
//# sourceMappingURL=Orca.js.map