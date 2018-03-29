"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ClosestPathFinder_1 = require("../ClosestPathFinder");
const Direction_1 = require("../Direction");
const HumanAnimationManager_1 = require("./HumanAnimationManager");
const HumanStateManager_1 = require("./HumanStateManager");
exports.WALK_CELL_DURATION = 1200;
const GAP_FROM_BOTTOM = -8;
class Human {
    constructor(cell) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.stateManager = new HumanStateManager_1.HumanStateManager(this);
        this.anchorPixels = new PIXI.Point(0, GAP_FROM_BOTTOM);
        this.animationManager = new HumanAnimationManager_1.HumanAnimationManager();
    }
    create(game, group, world) {
        this.game = game;
        this.world = world;
        this.tile = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y, 24, 25, 'human');
        this.animationManager.create(this.tile);
        this.tile.anchor.set(0.5, 1.0);
        this.tile.inputEnabled = true;
        this.tile.events.onInputDown.add(this.select, this);
        group.add(this.tile);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(world.getGround().getGrid(), world.getGround().getAcceptables());
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, true, false);
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, world);
        this.stateManager.create(game, world, this.animationManager);
    }
    update() {
        this.stateManager.updateState(this.game);
    }
    select() {
        this.tile.loadTexture(this.isSelected() ? 'human' : 'human_selected', this.tile.frame, false);
    }
    moveTo(cell) {
        const path = this.closestPathFinder.getPath(this.cell, cell);
        if (path !== null) {
            this.path = path;
            if (!this.moving) {
                this.popPath(null, null);
            }
        }
    }
    moveToClosest(cell, entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        const path = this.closestPathFinder.getNeighborPath(this.cell, cell, entries);
        if (path !== null) {
            this.path = path;
            if (!this.moving) {
                this.popPath(null, null);
            }
        }
    }
    animateMove(direction) {
        const isLeft = Human.isHumanLeft(direction);
        const isTop = Human.isHumanTop(direction);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.WALK, isLeft, isTop);
        this.moving = true;
        this.game.add.tween(this.tile.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y
        }, exports.WALK_CELL_DURATION, 'Linear', true)
            .onComplete.add((_tweenValues, _game, isLeft, isTop) => {
            this.popPath(isLeft, isTop);
        }, this, 0, isLeft, isTop);
    }
    popPath(isLeft, isTop) {
        this.moving = false;
        let humanPositions = [this.cell];
        if (this.path.length == 0) {
            this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, isLeft, isTop);
        }
        else {
            const next = this.path.shift();
            const direction = Direction_1.Direction.getNeighborDirection(this.cell, next);
            if (!this.moving) {
                this.cell = next;
                this.anchorPixels.x = 0;
                this.anchorPixels.y = GAP_FROM_BOTTOM;
                this.animateMove(direction);
            }
            humanPositions.push(this.cell);
        }
        this.world.humanMoved(humanPositions);
    }
    getPosition() {
        return this.cell;
    }
    isMoving() {
        return this.moving;
    }
    goToSittable(sittable, isLeft = null) {
        const direction = Direction_1.Direction.getNeighborDirection(this.cell, sittable.getPosition());
        const side = (isLeft !== null) ? isLeft : Human.isHumanLeft(direction);
        // Human has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
        this.anchorPixels.x = sittable.getPositionGap().x + (side ? -5 : 5);
        this.anchorPixels.y = sittable.getPositionGap().y - 1;
        this.cell = sittable.getPosition();
        this.animateMove(direction);
    }
    static isHumanLeft(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.BOTTOM].indexOf(direction) > -1;
    }
    static isHumanTop(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP].indexOf(direction) > -1;
    }
    goToFreeCell(entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        const cells = [];
        entries.forEach((direction) => {
            const tryCell = Direction_1.Direction.getGap(this.cell, direction);
            if (this.world.getGround().isFree(tryCell)) {
                cells.push(tryCell);
            }
        });
        const freeCell = cells[Math.floor(Math.random() * cells.length)];
        this.path = [freeCell];
        if (!this.moving) {
            this.popPath(null, null);
        }
    }
    loadAnimation(animation, isLeft = null) {
        this.animationManager.loadAnimation(animation, isLeft);
    }
    isSelected() {
        return this.tile.key === 'human_selected';
    }
    getSprite() {
        return this.tile;
    }
}
exports.Human = Human;
//# sourceMappingURL=Human.js.map