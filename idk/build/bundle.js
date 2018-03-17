/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(2);
exports.CELL_WIDTH = 40;
exports.CELL_HEIGHT = 20;
class PositionTransformer {
    static getRealPosition(point) {
        return new PIXI.Point(app_1.GAME_WIDTH / 2 - (point.x - point.y) * exports.CELL_WIDTH / 2, app_1.GAME_HEIGHT - (point.x + point.y) * exports.CELL_HEIGHT / 2);
    }
    static getCellPosition(point) {
        const x2 = point.x;
        const y2 = point.y;
        const a = -exports.CELL_WIDTH / 2;
        const c = -exports.CELL_HEIGHT / 2;
        const b = app_1.GAME_WIDTH / 2;
        const d = app_1.GAME_HEIGHT;
        return new PIXI.Point(Math.floor((y2 - d) / (2 * c) + (x2 - b) / (2 * a)), Math.floor((y2 - d) / (2 * c) - (x2 - b) / (2 * a)));
    }
}
exports.PositionTransformer = PositionTransformer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const FreezeState_1 = __webpack_require__(13);
const MoveRandomState_1 = __webpack_require__(14);
const SmokeState_1 = __webpack_require__(16);
const SitState_1 = __webpack_require__(15);
const ClosestPathFinder_1 = __webpack_require__(6);
const Direction_1 = __webpack_require__(3);
const Sofa_1 = __webpack_require__(4);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(10);
const Preload_1 = __webpack_require__(12);
const Play_1 = __webpack_require__(11);
exports.SCALE = 3;
exports.GAME_WIDTH = 1600 * 0.8 / exports.SCALE;
exports.GAME_HEIGHT = 900 * 0.8 / exports.SCALE;
class SimpleGame extends Phaser.Game {
    constructor() {
        super(exports.GAME_WIDTH, exports.GAME_HEIGHT, Phaser.CANVAS, // Open GL for effect / shader ?
        'content', null, false, false, false);
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["CURRENT"] = 0] = "CURRENT";
    DIRECTION[DIRECTION["TOP"] = 1] = "TOP";
    DIRECTION[DIRECTION["BOTTOM"] = 2] = "BOTTOM";
    DIRECTION[DIRECTION["LEFT"] = 3] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 4] = "RIGHT";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
class Direction {
    static neighborDirections() {
        return [
            DIRECTION.TOP,
            DIRECTION.BOTTOM,
            DIRECTION.LEFT,
            DIRECTION.RIGHT
        ];
    }
    static getGap(point, direction) {
        switch (direction) {
            case DIRECTION.TOP: return new PIXI.Point(point.x, point.y + 1);
            case DIRECTION.BOTTOM: return new PIXI.Point(point.x, point.y - 1);
            case DIRECTION.LEFT: return new PIXI.Point(point.x + 1, point.y);
            case DIRECTION.RIGHT: return new PIXI.Point(point.x - 1, point.y);
            case DIRECTION.CURRENT: return point;
        }
    }
    static getNeighborDirection(originPoint, goalPoint) {
        if (goalPoint.x > originPoint.x) {
            return DIRECTION.LEFT;
        }
        else if (goalPoint.x < originPoint.x) {
            return DIRECTION.RIGHT;
        }
        else if (goalPoint.y > originPoint.y) {
            return DIRECTION.TOP;
        }
        else if (goalPoint.y < originPoint.y) {
            return DIRECTION.BOTTOM;
        }
        else {
            debugger;
        }
    }
}
exports.Direction = Direction;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
exports.SOFA_GAP_FROM_BOTTOM = 8;
exports.SOFA_GAP_FROM_LEFT = 0;
class Sofa {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'sofa');
        this.sprite.anchor.set(0.5 + exports.SOFA_GAP_FROM_LEFT / this.sprite.width, 1.0 + exports.SOFA_GAP_FROM_BOTTOM / this.sprite.height);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Sofa = Sofa;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
class Cell {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'woodcell');
        this.sprite.anchor.setTo(0.5, 1);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Cell = Cell;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(3);
class ClosestPathFinder {
    constructor(game, world) {
        this.finders = {};
        const grid = world.getGround().getGrid();
        const acceptables = world.getGround().getAcceptables();
        Direction_1.Direction.neighborDirections().concat([Direction_1.DIRECTION.CURRENT]).forEach((direction) => {
            this.finders[direction] = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
            this.finders[direction].setGrid(grid, acceptables);
        });
    }
    getNeighborPath(originCell, goalCell) {
        return this.getPathInner(originCell, goalCell, Direction_1.Direction.neighborDirections());
    }
    getPath(originCell, goalCell) {
        return this.getPathInner(originCell, goalCell, [Direction_1.DIRECTION.CURRENT]);
    }
    getPathInner(originCell, goalCell, directions) {
        let results = {};
        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];
            try {
                const gappedCell = Direction_1.Direction.getGap(goalCell, direction);
                if (originCell.x === gappedCell.x && originCell.y === gappedCell.y) {
                    results[direction] = [];
                    if (Object.keys(results).length >= directions.length) {
                        return ClosestPathFinder.getClosest(results);
                    }
                }
                this.finders[direction].setCallbackFunction((path) => {
                    if (path) {
                        results[direction] = [];
                        for (let i = 1, ilen = path.length; i < ilen; i++) {
                            results[direction].push(new PIXI.Point(path[i].x, path[i].y));
                        }
                    }
                    else {
                        results[direction] = null;
                    }
                });
                this.finders[direction].preparePathCalculation([originCell.x, originCell.y], [gappedCell.x, gappedCell.y]);
                this.finders[direction].calculatePath();
                let tries = 1000;
                while (tries > 0) {
                    if (direction in results) {
                        if (Object.keys(results).length >= directions.length) {
                            return ClosestPathFinder.getClosest(results);
                        }
                        tries = 0;
                    }
                    tries--;
                }
                if (!(direction in results)) {
                    results[direction] = null;
                    if (Object.keys(results).length >= directions.length) {
                        return ClosestPathFinder.getClosest(results);
                    }
                }
            }
            catch (e) {
                results[direction] = null;
                if (Object.keys(results).length >= directions.length) {
                    return ClosestPathFinder.getClosest(results);
                }
            }
        }
        return null;
    }
    static getClosest(results) {
        let bestPath = null;
        for (let i = 0; i < Object.keys(results).length; i++) {
            const path = results[Object.keys(results)[i]];
            if (bestPath === null || (path !== null && bestPath.length > path.length)) {
                bestPath = path;
            }
        }
        if (bestPath) {
            return bestPath;
        }
        else {
            return null;
        }
    }
}
exports.ClosestPathFinder = ClosestPathFinder;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(5);
const Desk_1 = __webpack_require__(17);
const WallRepository_1 = __webpack_require__(19);
const Sofa_1 = __webpack_require__(4);
const WIDTH = 10;
const HEIGHT = 10;
class Ground {
    constructor() {
        this.cells = [];
        this.desks = [];
        this.sofas = [];
        this.wallRepository = new WallRepository_1.WallRepository();
        [
            new PIXI.Point(3, 3),
            new PIXI.Point(3, 4),
            new PIXI.Point(2, 4),
            new PIXI.Point(2, 3),
        ].forEach((cell) => {
            this.wallRepository.addWall(cell);
        });
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        for (let i = 0; i < 3; i++) {
            this.desks.push(new Desk_1.Desk(this.getRandomCell()));
        }
        for (let i = 0; i < 3; i++) {
            this.sofas.push(new Sofa_1.Sofa(this.getRandomCell()));
        }
    }
    create(game, groups) {
        const floor = groups['floor'];
        const noname = groups['noname'];
        this.cells.forEach((cell) => {
            cell.create(game, floor);
        });
        this.desks.forEach((desk) => {
            desk.create(game, noname);
        });
        this.sofas.forEach((sofa) => {
            sofa.create(game, noname);
        });
        this.wallRepository.create(game, noname);
    }
    getRandomCell() {
        const acceptableIndexes = this.getAcceptables();
        const random = Math.floor(Math.random() * acceptableIndexes.length);
        return this.cells[acceptableIndexes[random]].getPosition();
    }
    getGrid() {
        let grid = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (undefined === grid[this.cells[i].getPosition().y]) {
                grid[this.cells[i].getPosition().y] = [];
            }
            grid[this.cells[i].getPosition().y][this.cells[i].getPosition().x] = {
                index: i
            };
        }
        return grid;
    }
    getAcceptables() {
        let acceptables = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (this.isFree(this.cells[i].getPosition())) {
                acceptables.push(i);
            }
        }
        return acceptables;
    }
    isFree(point) {
        if (point.x < 0 || point.y < 0 || point.x >= WIDTH || point.y >= HEIGHT) {
            return false;
        }
        for (let j = 0; j < this.desks.length; j++) {
            if (this.desks[j].getPosition().x === point.x && this.desks[j].getPosition().y === point.y) {
                return false;
            }
        }
        for (let j = 0; j < this.sofas.length; j++) {
            if (this.sofas[j].getPosition().x === point.x && this.sofas[j].getPosition().y === point.y) {
                return false;
            }
        }
        if (this.wallRepository.hasWall(point.x, point.y)) {
            return false;
        }
        return true;
    }
    getWallRepository() {
        return this.wallRepository;
    }
    getRandomSofa() {
        return this.sofas[Math.floor(Math.random() * this.sofas.length)];
    }
}
exports.Ground = Ground;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
class Wall {
    constructor(position) {
        this.cell = position;
    }
    create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        this.game = game;
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y, 'wall', Wall.getFrame(hasWallLeft, hasWallTop, hasWallRight, hasWallBottom));
        this.sprite.anchor.set(0.5, 1);
        group.add(this.sprite);
    }
    getPosition() {
        return this.cell;
    }
    static getFrame(hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        return (hasWallLeft ? 1 : 0)
            + (hasWallTop ? 1 : 0) * 2
            + (hasWallRight ? 1 : 0) * 4
            + (hasWallBottom ? 1 : 0) * 8;
    }
    setVisibility(visible) {
        this.game.add.tween(this.sprite).to({
            alpha: visible ? 1 : 0.2
        }, 400, 'Linear', true);
    }
}
exports.Wall = Wall;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = __webpack_require__(7);
const HumanRepository_1 = __webpack_require__(18);
class World {
    constructor() {
        this.ground = new Ground_1.Ground();
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
    }
    create(game, groups) {
        this.ground.create(game, groups);
        this.humanRepository.create(game, groups, this);
    }
    update() {
        this.humanRepository.update();
    }
    getGround() {
        return this.ground;
    }
    humanMoved(positions) {
        const walls = this.ground.getWallRepository().getWalls();
        walls.forEach((wall) => {
            let visible = true;
            positions.forEach((position) => {
                if (this.anyHumanIsAboveWall(wall)) {
                    visible = false;
                }
            });
            wall.setVisibility(visible);
        });
    }
    anyHumanIsAboveWall(wall) {
        const humans = this.humanRepository.humans;
        for (let i = 0; i < humans.length; i++) {
            if (World.humanIsAboveWall(humans[i].getPosition(), wall)) {
                return true;
            }
        }
        return false;
    }
    static humanIsAboveWall(humanPosition, wall) {
        const wallPosition = wall.getPosition();
        return (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y);
    }
    getRandomSofa() {
        return this.ground.getRandomSofa();
    }
}
exports.World = World;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(2);
class Boot extends Phaser.State {
    create() {
        // this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(app_1.SCALE, app_1.SCALE);
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.state.start('Preload');
    }
}
exports.default = Boot;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = __webpack_require__(9);
class Play extends Phaser.State {
    constructor() {
        super();
        this.worldKnowledge = new World_1.World();
    }
    create() {
        this.game.stage.backgroundColor = "#4488AA";
        this.groups = {
            'floor': this.game.add.group(),
            'noname': this.game.add.group()
        };
        this.worldKnowledge.create(this.game, this.groups);
    }
    update() {
        this.groups['noname'].customSort((obj1, obj2) => {
            const bottom1 = obj1.y + obj1.anchor.y * obj1.height;
            const bottom2 = obj2.y + obj2.anchor.y * obj2.height;
            return bottom1 - bottom2;
        });
        this.worldKnowledge.update();
    }
}
exports.default = Play;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preload extends Phaser.State {
    preload() {
        this.loadAudio();
        this.loadLevels();
        this.loadTileMaps();
        this.loadGameImages();
        this.loadFonts();
    }
    create() {
        this.game.state.start('Play');
    }
    loadAudio() {
    }
    loadLevels() {
    }
    loadTileMaps() {
    }
    loadGameImages() {
        this.game.load.spritesheet('human', 'assets/human.png', 24, 25);
        this.game.load.spritesheet('human_selected', 'assets/human_selected.png', 24, 25);
        this.game.load.spritesheet('casedefault', 'assets/casedefault.png', 40, 19);
        this.game.load.spritesheet('woodcell', 'assets/woodcell.png', 40, 19);
        this.game.load.spritesheet('chair', 'assets/chair.png', 40, 40);
        this.game.load.spritesheet('desk', 'assets/desk.png', 40, 40);
        this.game.load.spritesheet('wall', 'assets/wall.png', 40, 40, 16);
        this.game.load.spritesheet('sofa', 'assets/sofa.png', 8, 6);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(1);
class FreezeState {
    constructor(human) {
        this.human = human;
    }
    isActive() {
        return this.active;
    }
    start(game) {
        game.time.events.add(Phaser.Math.random(1, 3) * Phaser.Timer.SECOND, this.end, this);
        this.active = true;
        this.human.loadAnimation(Human_1.ANIMATION.FREEZE);
    }
    end() {
        this.active = false;
    }
}
exports.FreezeState = FreezeState;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MoveRandomState {
    constructor(human, world) {
        this.human = human;
        this.goal = world.getGround().getRandomCell();
        while (this.human.getPosition().x === this.goal.x && this.human.getPosition().y === this.goal.y) {
            this.goal = world.getGround().getRandomCell();
        }
    }
    isActive() {
        return this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving();
    }
    start(game) {
        this.human.moveTo(this.goal);
    }
}
exports.MoveRandomState = MoveRandomState;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(1);
class SitState {
    constructor(human, loopTime, world) {
        this.human = human;
        this.loopTime = loopTime;
        this.sofa = world.getRandomSofa();
        this.toto = false;
    }
    isActive() {
        if (!this.toto && this.isNeighborPosition()) {
            this.toto = true;
            console.log('Go to Sofa');
            this.human.goToSofa(this.sofa.getPosition());
            this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                console.log('Sit down');
                this.human.loadAnimation(Human_1.ANIMATION.SIT_DOWN);
                this.game.time.events.add(Phaser.Math.random(1, 3) * Phaser.Timer.SECOND + this.loopTime, () => {
                    console.log('Stand up');
                    this.human.loadAnimation(Human_1.ANIMATION.STAND_UP);
                    this.game.time.events.add(this.loopTime + 100, () => {
                        console.log('Go to free cell');
                        this.human.goToFreeCell();
                        this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                            console.log('Disable');
                            this.active = false;
                        }, this);
                    }, this);
                }, this);
            }, this);
        }
        return this.active;
    }
    start(game) {
        this.active = true;
        this.game = game;
        this.human.moveToClosest(this.sofa.getPosition());
    }
    isNeighborPosition() {
        return !this.human.isMoving() && (this.human.getPosition().x - this.sofa.getPosition().x) * (this.human.getPosition().x - this.sofa.getPosition().x) +
            (this.human.getPosition().y - this.sofa.getPosition().y) * (this.human.getPosition().y - this.sofa.getPosition().y) === 1;
    }
}
exports.SitState = SitState;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(1);
class SmokeState {
    constructor(human, timeLoop) {
        this.human = human;
        this.timeLoop = timeLoop;
    }
    isActive() {
        return this.active;
    }
    start(game) {
        game.time.events.add(Phaser.Math.random(1, 3) * this.timeLoop, this.end, this);
        this.active = true;
        this.human.loadAnimation(Human_1.ANIMATION.SMOKE);
    }
    end() {
        this.active = false;
    }
}
exports.SmokeState = SmokeState;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
class Desk {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.chairSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'chair');
        this.deskSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'desk');
        this.chairSprite.anchor.set(0.5, 1);
        this.deskSprite.anchor.set(0.5, 1);
        if (Math.random() >= 0.5) {
            this.deskSprite.scale.set(-1, 1);
            this.chairSprite.scale.set(-1, 1);
        }
        group.add(this.chairSprite);
        group.add(this.deskSprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Desk = Desk;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(1);
class HumanRepository {
    constructor(world) {
        this.humans = [
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell())
        ];
    }
    create(game, groups, world) {
        this.humans.forEach((human) => {
            human.create(game, groups['noname'], world);
        });
    }
    update() {
        this.humans.forEach((human) => {
            human.update();
        });
    }
}
exports.HumanRepository = HumanRepository;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = __webpack_require__(8);
class WallRepository {
    constructor() {
        this.walls = [];
    }
    addWall(cell) {
        this.walls.push(new Wall_1.Wall(cell));
    }
    create(game, group) {
        this.walls.forEach((wall) => {
            wall.create(game, group, this.hasWall(wall.getPosition().x + 1, wall.getPosition().y), this.hasWall(wall.getPosition().x, wall.getPosition().y + 1), this.hasWall(wall.getPosition().x - 1, wall.getPosition().y), this.hasWall(wall.getPosition().x, wall.getPosition().y - 1));
        });
    }
    hasWall(x, y) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].getPosition().x === x && this.walls[i].getPosition().y === y) {
                return true;
            }
        }
        return false;
    }
    getWalls() {
        return this.walls;
    }
}
exports.WallRepository = WallRepository;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);