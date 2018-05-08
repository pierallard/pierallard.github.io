"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
const FreezeState_1 = require("./human_states/FreezeState");
const MoveRandomState_1 = require("./human_states/MoveRandomState");
const FRAME_RATE = 12;
class Human {
    constructor(cell) {
        this.cell = cell;
        this.isMoving = false;
        this.path = [];
        this.state = new FreezeState_1.FreezeState(this);
    }
    create(game, group, world) {
        this.state.start(game);
        this.game = game;
        this.world = world;
        this.tile = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y, 24, 25, 'human');
        this.tile.animations.add('walk', [0, 1, 2, 3, 4, 5]);
        this.tile.animations.add('walk_reverse', [6, 7, 8, 9, 10, 11]);
        this.tile.animations.add('default', [12, 13, 14]);
        this.tile.animations.add('default_reverse', [18, 19, 20]);
        this.tile.anchor.set(0.5, 1.0 + 8 / 25);
        this.tile.animations.play('default', FRAME_RATE, true);
        this.tile.inputEnabled = true;
        this.tile.events.onInputDown.add(this.select, this);
        group.add(this.tile);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(world.getGround().getGrid(), world.getGround().getAcceptables());
    }
    update() {
        if (!this.state.isActive()) {
            this.state = Math.random() > 0.5 ? new MoveRandomState_1.MoveRandomState(this) : new FreezeState_1.FreezeState(this);
            this.state.start(this.game);
        }
    }
    select() {
        this.tile.loadTexture('human_selected', this.tile.frame, false);
    }
    moveTo(cell) {
        if (this.cell.x === cell.x && this.cell.y === cell.y) {
            return;
        }
        this.pathfinder.setCallbackFunction((path) => {
            if (path) {
                this.goal = cell;
                this.path = [];
                for (let i = 1, ilen = path.length; i < ilen; i++) {
                    this.path.push(new PIXI.Point(path[i].x, path[i].y));
                }
                if (!this.isMoving) {
                    this.continueMoving(null, null);
                }
            }
        });
        try {
            this.pathfinder.preparePathCalculation([this.cell.x, this.cell.y], [cell.x, cell.y]);
            this.pathfinder.calculatePath();
        }
        catch (error) {
            console.log(error);
        }
    }
    moveLeft() {
        if (!this.isMoving) {
            this.cell.x += 1;
            this.runTween(true, true);
        }
    }
    moveRight() {
        if (!this.isMoving) {
            this.cell.x -= 1;
            this.runTween(false, false);
        }
    }
    moveUp() {
        if (!this.isMoving) {
            this.cell.y += 1;
            this.runTween(false, true);
        }
    }
    moveDown() {
        if (!this.isMoving) {
            this.cell.y -= 1;
            this.runTween(true, false);
        }
    }
    runTween(isLeft, isTop) {
        this.loadMoveTexture(isLeft, isTop);
        this.isMoving = true;
        this.game.add.tween(this.tile.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y
        }, 1200, 'Linear', true).onComplete.add(this.moveFinished, this, 0, isLeft, isTop);
    }
    moveFinished(_tweenValues, _game, isLeft, isTop) {
        this.continueMoving(isLeft, isTop);
    }
    continueMoving(isLeft, isTop) {
        this.isMoving = false;
        let humanPositions = [this.cell];
        if (this.path.length == 0) {
            this.goal = null;
            this.loadStandTexture(isLeft, isTop);
        }
        else {
            const next = this.path.shift();
            if (next.x > this.cell.x) {
                this.moveLeft();
            }
            else if (next.x < this.cell.x) {
                this.moveRight();
            }
            else if (next.y > this.cell.y) {
                this.moveUp();
            }
            else if (next.y < this.cell.y) {
                this.moveDown();
            }
            humanPositions.push(this.cell);
        }
        this.world.humanMoved(humanPositions);
    }
    loadMoveTexture(isLeft, isTop) {
        if (isTop) {
            this.tile.animations.play('walk_reverse', FRAME_RATE, true);
        }
        else {
            this.tile.animations.play('walk', FRAME_RATE, true);
        }
        this.tile.scale.set(isLeft ? 1 : -1, 1);
    }
    loadStandTexture(isLeft, isTop) {
        if (isTop) {
            this.tile.animations.play('default_reverse', FRAME_RATE, true);
        }
        else {
            this.tile.animations.play('default', FRAME_RATE, true);
        }
        this.tile.scale.set(isLeft ? 1 : -1, 1);
    }
    getPosition() {
        return this.cell;
    }
}
exports.Human = Human;
//# sourceMappingURL=Human.js.map