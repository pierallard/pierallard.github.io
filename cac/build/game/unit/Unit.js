"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AStar_1 = require("../computing/AStar");
const Stand_1 = require("../state/Stand");
const Attack_1 = require("../state/Attack");
const Follow_1 = require("../state/Follow");
const MoveAttack_1 = require("../state/MoveAttack");
const UnitSprite_1 = require("../sprite/UnitSprite");
const Distance_1 = require("../computing/Distance");
const UnitProperties_1 = require("./UnitProperties");
class Unit {
    constructor(worldKnowledge, cellPosition, player, key) {
        this.isFrozen = false;
        this.selected = false;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
        this.state = new Stand_1.Stand(this);
        this.key = key;
    }
    create(game, group) {
        this.unitSprite = new UnitSprite_1.UnitSprite(game, group, this.cellPosition, this.key);
        this.timerEvents = game.time.events;
    }
    update() {
        if (!this.isFrozen) {
            this.state = this.state.getNextStep();
            this.state.run();
        }
    }
    getCellPositions() {
        return [this.cellPosition];
    }
    getPlayer() {
        return this.player;
    }
    getShootDistance() {
        return UnitProperties_1.UnitProperties.getShootDistance(this.constructor.name);
    }
    isAlive() {
        return this.life > 0;
    }
    isSelected() {
        return this.selected;
    }
    shoot(ennemy) {
        this.unitSprite.doShoot(ennemy.getCellPositions()[0]);
        ennemy.lostLife(10);
        this.freeze(UnitProperties_1.UnitProperties.getShootTime(this.constructor.name) * Phaser.Timer.SECOND);
    }
    lostLife(life) {
        this.life -= life;
        if (!this.isAlive()) {
            this.unitSprite.doDestroy();
            this.worldKnowledge.removeUnit(this);
        }
        this.unitSprite.updateLife(this.life, this.maxLife);
    }
    getClosestShootable() {
        const enemies = this.worldKnowledge.getEnemies(this.player);
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy !== this) {
                const distance = Distance_1.Distance.to(this.cellPosition, enemy.getCellPositions());
                if (distance <= this.getShootDistance()) {
                    if (null === closest || minDistance > distance) {
                        minDistance = distance;
                        closest = enemy;
                    }
                }
            }
        }
        return closest;
    }
    moveTowards(goal) {
        if (goal !== this.goalCache) {
            this.goalCache = null;
            this.pathCache = null;
        }
        let nextStep = null;
        if (this.pathCache) {
            if (this.pathCache.isStillAvailable(this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge))) {
                nextStep = this.pathCache.splice();
            }
        }
        if (!nextStep) {
            const newPath = AStar_1.AStar.getPathOrClosest(this.cellPosition, goal, this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
            if (null !== newPath) {
                this.pathCache = newPath;
                this.goalCache = goal;
                nextStep = this.pathCache.splice();
            }
            else if (null !== this.pathCache && this.worldKnowledge.isCellAccessible(this.pathCache.firstStep())) {
                nextStep = this.pathCache.splice();
            }
        }
        if (nextStep) {
            this.cellPosition = nextStep;
            this.unitSprite.doMove(nextStep, UnitProperties_1.UnitProperties.getSlownessTime(this.constructor.name) * Phaser.Timer.SECOND);
            this.freeze(UnitProperties_1.UnitProperties.getSlownessTime(this.constructor.name) * Phaser.Timer.SECOND);
        }
    }
    setSelected(value = true) {
        this.selected = value;
        this.unitSprite.setSelected(value);
    }
    updateStateAfterClick(cell) {
        const unit = this.worldKnowledge.getUnitAt(cell);
        if (null !== unit) {
            if (this.getPlayer() !== unit.getPlayer()) {
                this.state = new Attack_1.Attack(this.worldKnowledge, this, unit);
            }
            else {
                this.state = new Follow_1.Follow(this.worldKnowledge, this, unit);
            }
        }
        else {
            this.state = new MoveAttack_1.MoveAttack(this.worldKnowledge, this, cell);
        }
    }
    isInside(left, right, top, bottom) {
        return this.unitSprite.isInside(left, right, top, bottom);
    }
    destroy() {
        this.unitSprite.destroy(true);
    }
    orderMoveAttack(goal) {
        this.state = new MoveAttack_1.MoveAttack(this.worldKnowledge, this, goal);
    }
    setVisible(value) {
        this.unitSprite.alpha = value ? 1 : 0;
    }
    freeze(time) {
        this.isFrozen = true;
        this.timerEvents.add(time, () => {
            this.isFrozen = false;
        }, this);
    }
}
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map