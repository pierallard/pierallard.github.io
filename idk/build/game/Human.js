"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
const FreezeState_1 = require("./human_states/FreezeState");
const MoveRandomState_1 = require("./human_states/MoveRandomState");
const SmokeState_1 = require("./human_states/SmokeState");
const SitState_1 = require("./human_states/SitState");
const ClosestPathFinder_1 = require("./ClosestPathFinder");
const Direction_1 = require("./Direction");
const Sofa_1 = require("./objects/Sofa");
const FRAME_RATE = 12;
var ANIMATION;
(function (ANIMATION) {
    ANIMATION[ANIMATION["FREEZE"] = 0] = "FREEZE";
    ANIMATION[ANIMATION["WALK"] = 1] = "WALK";
    ANIMATION[ANIMATION["SMOKE"] = 2] = "SMOKE";
    ANIMATION[ANIMATION["SIT_DOWN"] = 3] = "SIT_DOWN";
    ANIMATION[ANIMATION["STAND_UP"] = 4] = "STAND_UP";
})(ANIMATION = exports.ANIMATION || (exports.ANIMATION = {}));
const TOP_ORIENTED_ANIMATION = '_reverse';
exports.WALK_CELL_DURATION = 1200;
const GAP_FROM_BOTTOM = 8;
class Human {
    constructor(cell) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.state = new FreezeState_1.FreezeState(this);
        this.anchorPixels = new PIXI.Point(0, 0);
    }
    create(game, group, world) {
        this.game = game;
        this.world = world;
        this.tile = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y, 24, 25, 'human');
        this.addAnimations();
        this.tile.anchor.set(0.5, 1.0 + GAP_FROM_BOTTOM / this.tile.height);
        this.loadAnimation(ANIMATION.FREEZE, true, false);
        this.tile.inputEnabled = true;
        this.tile.events.onInputDown.add(this.select, this);
        group.add(this.tile);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(world.getGround().getGrid(), world.getGround().getAcceptables());
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, world);
        this.state.start(game);
    }
    update() {
        if (!this.state.isActive()) {
            const states = [
                new SmokeState_1.SmokeState(this, this.tile.animations.getAnimation(ANIMATION.SMOKE + '').frameTotal * Phaser.Timer.SECOND / FRAME_RATE),
                new FreezeState_1.FreezeState(this),
                new MoveRandomState_1.MoveRandomState(this, this.world),
                new SitState_1.SitState(this, this.tile.animations.getAnimation(ANIMATION.SIT_DOWN + '').frameTotal * Phaser.Timer.SECOND / FRAME_RATE, this.world),
            ];
            this.state = states[Math.floor(Math.random() * states.length)];
            this.state.start(this.game);
            console.log('New state: ' + this.state.constructor.name);
        }
    }
    select() {
        this.tile.loadTexture('human_selected', this.tile.frame, false);
    }
    hasPath(cell) {
        return this.closestPathFinder.getPath(this.cell, cell) !== null;
    }
    moveTo(cell) {
        const path = this.closestPathFinder.getPath(this.cell, cell);
        if (path !== null) {
            this.goal = cell;
            this.path = path;
            if (!this.moving) {
                this.popPath(null, null);
            }
        }
    }
    moveToClosest(cell) {
        const path = this.closestPathFinder.getNeighborPath(this.cell, cell);
        if (path !== null) {
            this.goal = cell;
            this.path = path;
            if (!this.moving) {
                this.popPath(null, null);
            }
        }
    }
    animateMove(direction) {
        const isLeft = Human.isHumanLeft(direction);
        const isTop = Human.isHumanTop(direction);
        this.loadAnimation(ANIMATION.WALK, isLeft, isTop);
        this.moving = true;
        this.game.add.tween(this.tile.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y
        }, exports.WALK_CELL_DURATION, 'Linear', true)
            .onComplete.add((_tweenValues, _game, isLeft, isTop) => {
            this.popPath(isLeft, isTop);
        }, this, 0, isLeft, isTop);
        this.game.add.tween(this.tile.anchor).to({
            x: 0.5 + this.anchorPixels.x / this.tile.width,
            y: 1.0 + (GAP_FROM_BOTTOM + this.anchorPixels.y) / this.tile.width
        }, exports.WALK_CELL_DURATION, 'Linear', true);
    }
    popPath(isLeft, isTop) {
        this.moving = false;
        let humanPositions = [this.cell];
        if (this.path.length == 0) {
            this.goal = null;
            this.loadAnimation(ANIMATION.FREEZE, isLeft, isTop);
        }
        else {
            const next = this.path.shift();
            const direction = Direction_1.Direction.getNeighborDirection(this.cell, next);
            if (!this.moving) {
                this.cell = next;
                this.anchorPixels.x = 0;
                this.anchorPixels.y = 0;
                this.animateMove(direction);
            }
            humanPositions.push(this.cell);
        }
        this.world.humanMoved(humanPositions);
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        switch (animation) {
            case ANIMATION.FREEZE:
            case ANIMATION.WALK:
                const animationName = this.getAnimationName(animation, isTop);
                if (this.tile.animations.name !== animationName) {
                    this.tile.animations.play(animationName, FRAME_RATE, true);
                }
                if (isLeft != null) {
                    this.tile.scale.set(isLeft ? 1 : -1, 1);
                }
                break;
            case ANIMATION.SMOKE:
                const animationSmokeName = animation + '';
                if (this.tile.animations.name !== animationSmokeName) {
                    this.tile.animations.play(animationSmokeName, FRAME_RATE, true);
                }
                break;
            case ANIMATION.SIT_DOWN:
            case ANIMATION.STAND_UP:
                const animationSitDownName = animation + '';
                if (this.tile.animations.name !== animationSitDownName) {
                    this.tile.animations.play(animationSitDownName, FRAME_RATE, false);
                }
                break;
            default:
                console.log('UNKNOWN ANIMATION ' + animation);
        }
    }
    getPosition() {
        return this.cell;
    }
    getAnimationName(animation, isTop = null) {
        if (isTop === null) {
            return this.getAnimationName(animation, this.tile.animations.name.endsWith(TOP_ORIENTED_ANIMATION));
        }
        return animation + (isTop ? TOP_ORIENTED_ANIMATION : '');
    }
    isMoving() {
        return this.moving;
    }
    addAnimations() {
        this.tile.animations.add(ANIMATION.WALK + '', [0, 1, 2, 3, 4, 5]);
        this.tile.animations.add(ANIMATION.WALK + TOP_ORIENTED_ANIMATION, [6, 7, 8, 9, 10, 11]);
        this.tile.animations.add(ANIMATION.FREEZE + '', [12, 13, 14]);
        this.tile.animations.add(ANIMATION.FREEZE + TOP_ORIENTED_ANIMATION, [18, 19, 20]);
        let smoke_frames = [24, 25, 26, 27, 30, 31, 32, 33];
        for (let i = 0; i < 6; i++) {
            // Take smoke length
            smoke_frames.push(33);
        }
        smoke_frames = smoke_frames.concat([32, 31, 30, 27, 26, 25, 24]);
        for (let i = 0; i < 20; i++) {
            // Do nothing length
            smoke_frames.push(24);
        }
        this.tile.animations.add(ANIMATION.SMOKE + '', smoke_frames);
        this.tile.animations.add(ANIMATION.SIT_DOWN + '', [36, 37, 38, 39]);
        this.tile.animations.add(ANIMATION.STAND_UP + '', [39, 38, 37, 36]);
    }
    goToSofa(position) {
        this.anchorPixels.x = 4 + Sofa_1.SOFA_GAP_FROM_LEFT;
        this.anchorPixels.y = -8 + Sofa_1.SOFA_GAP_FROM_BOTTOM;
        const direction = Direction_1.Direction.getNeighborDirection(this.cell, position);
        this.cell = position;
        this.animateMove(direction);
    }
    static isHumanLeft(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.BOTTOM].indexOf(direction) > -1;
    }
    static isHumanTop(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP].indexOf(direction) > -1;
    }
    goToFreeCell() {
        const cells = [];
        Direction_1.Direction.neighborDirections().forEach((direction) => {
            const tryCell = Direction_1.Direction.getGap(this.cell, direction);
            if (this.world.getGround().isFree(tryCell)) {
                cells.push(tryCell);
            }
        });
        const freeCell = cells[Math.floor(Math.random() * cells.length)];
        this.goal = freeCell;
        this.path = [freeCell];
        if (!this.moving) {
            this.popPath(null, null);
        }
    }
}
exports.Human = Human;
//# sourceMappingURL=Human.js.map