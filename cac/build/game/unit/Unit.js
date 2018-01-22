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
const Rocket_1 = require("../shoot/Rocket");
const Cell_1 = require("../computing/Cell");
const Bullet_1 = require("../shoot/Bullet");
const MoveTo_1 = require("../state/MoveTo");
const Play_1 = require("../game_state/Play");
class Unit {
    constructor(worldKnowledge, cellPosition, player) {
        this.isFrozen = false;
        this.selected = false;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
        this.state = new Stand_1.Stand(this);
        this.key = UnitProperties_1.UnitProperties.getSprite(this.constructor.name, player.getId());
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(this.constructor.name);
    }
    create(game, groups) {
        this.effectsGroup = groups[Play_1.GROUP.EFFECTS];
        this.timerEvents = game.time.events;
        this.unitSprite = new UnitSprite_1.UnitSprite(game, groups, this.cellPosition, this.key, UnitProperties_1.UnitProperties.getImageFormat(this.constructor.name));
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
    shoot(enemy) {
        let closestEnemyPosition = Distance_1.Distance.getClosestPosition(this.getCellPositions()[0], enemy.getCellPositions());
        enemy.lostLife(UnitProperties_1.UnitProperties.getShootPower(this.constructor.name));
        this.freeze(UnitProperties_1.UnitProperties.getShootTime(this.constructor.name) * Phaser.Timer.SECOND);
        this.unitSprite.rotateTowards(closestEnemyPosition);
        switch (UnitProperties_1.UnitProperties.getShootType(this.constructor.name)) {
            case 'rocket':
                new Rocket_1.Rocket(this.effectsGroup, this.getShootSource(closestEnemyPosition), new PIXI.Point(Cell_1.Cell.cellToReal(closestEnemyPosition.x), Cell_1.Cell.cellToReal(closestEnemyPosition.y)));
                break;
            default:
                new Bullet_1.Bullet(this.effectsGroup, this.getShootSource(closestEnemyPosition), new PIXI.Point(Cell_1.Cell.cellToReal(closestEnemyPosition.x), Cell_1.Cell.cellToReal(closestEnemyPosition.y)));
        }
    }
    lostLife(life) {
        this.life -= life;
        if (!this.isAlive()) {
            this.unitSprite.doDestroy();
            this.worldKnowledge.removeArmy(this);
        }
        this.unitSprite.updateLife(this.life, this.maxLife);
    }
    getClosestShootable() {
        const enemies = this.worldKnowledge.getEnemyArmies(this.player);
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy !== this) {
                if (enemy.isOnGround() || UnitProperties_1.UnitProperties.getShootAirPower(this.constructor.name) > 0) {
                    const distance = Distance_1.Distance.to(this.cellPosition, enemy.getCellPositions());
                    if (distance <= this.getShootDistance()) {
                        if (null === closest || minDistance > distance) {
                            minDistance = distance;
                            closest = enemy;
                        }
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
            if (this.pathCache.isStillAvailable(this.isOnGround() ?
                this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
                this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge))) {
                nextStep = this.pathCache.splice();
            }
        }
        if (!nextStep) {
            const newPath = AStar_1.AStar.getPathOrClosest(this.cellPosition, goal, this.isOnGround() ?
                this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
                this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge));
            if (null !== newPath) {
                this.pathCache = newPath;
                this.goalCache = goal;
                nextStep = this.pathCache.splice();
            }
            else if (null !== this.pathCache &&
                this.pathCache.firstStep() &&
                (this.isOnGround() ?
                    this.worldKnowledge.isGroundCellAccessible(this.pathCache.firstStep()) :
                    this.worldKnowledge.isAerialCellAccessible(this.pathCache.firstStep()))) {
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
        const army = this.worldKnowledge.getArmyAt(cell);
        if (null !== army) {
            if (this.getPlayer() !== army.getPlayer()) {
                if (army.isOnGround() || UnitProperties_1.UnitProperties.getShootAirPower(this.constructor.name) > 0) {
                    this.state = this.getAttackState(army);
                }
                else {
                    this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, cell);
                }
            }
            else if (army instanceof Unit) {
                this.state = new Follow_1.Follow(this.worldKnowledge, this, army);
            }
            else {
                this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, cell);
            }
        }
        else {
            this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, cell);
        }
    }
    getAttackState(army) {
        return new Attack_1.Attack(this.worldKnowledge, this, army);
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
    isVisible() {
        return this.unitSprite.alpha > 0;
    }
    isOnGround() {
        return true;
    }
    canShoot() {
        return true;
    }
    getShootSource(cellDest) {
        return new PIXI.Point(Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y));
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