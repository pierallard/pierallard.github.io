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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = __webpack_require__(10);
const app_1 = __webpack_require__(3);
const UserInterface_1 = __webpack_require__(7);
exports.GROUP_FLOOR = 'floor';
exports.GROUP_OBJECTS_AND_HUMANS = 'objects_and_humans';
exports.GROUP_INFOS = 'infos';
exports.GROUP_INTERFACE = 'interface';
exports.CAMERA_GAP = 1.5;
class Play extends Phaser.State {
    constructor() {
        super();
        this.worldKnowledge = new WorldKnowledge_1.WorldKnowledge();
        this.userInterface = new UserInterface_1.UserInterface(this.worldKnowledge);
    }
    create() {
        this.game.stage.backgroundColor = "#494947";
        this.groups = {};
        this.groups[exports.GROUP_FLOOR] = this.game.add.group();
        this.groups[exports.GROUP_OBJECTS_AND_HUMANS] = this.game.add.group();
        this.groups[exports.GROUP_INFOS] = this.game.add.group();
        this.groups[exports.GROUP_INTERFACE] = this.game.add.group();
        this.groups[exports.GROUP_INTERFACE].fixedToCamera = true;
        this.worldKnowledge.create(this.game, this.groups);
        this.userInterface.create(this.game, this.groups);
        this.game.world.setBounds(0, 0, app_1.WORLD_WIDTH + UserInterface_1.INTERFACE_WIDTH, app_1.WORLD_HEIGHT);
        this.game.camera.setPosition((app_1.WORLD_WIDTH - app_1.CAMERA_WIDTH_PIXELS) / 2, (app_1.WORLD_HEIGHT - app_1.CAMERA_HEIGHT_PIXELS) / 2);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }
    update(game) {
        this.groups[exports.GROUP_OBJECTS_AND_HUMANS].sort('y', Phaser.Group.SORT_ASCENDING);
        this.worldKnowledge.update();
        this.userInterface.update();
        if (this.upKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x, this.game.camera.position.y - exports.CAMERA_GAP);
        }
        else if (this.downKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x, this.game.camera.position.y + exports.CAMERA_GAP);
        }
        if (this.leftKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x - exports.CAMERA_GAP, this.game.camera.position.y);
        }
        else if (this.rightKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x + exports.CAMERA_GAP, this.game.camera.position.y);
        }
        const selected = this.worldKnowledge.getSelectedHumanSprite();
        if (null !== selected) {
            this.game.camera.follow(selected, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
    }
}
exports.default = Play;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = __webpack_require__(21);
const SmokeState_1 = __webpack_require__(25);
const SitState_1 = __webpack_require__(24);
const MoveRandomState_1 = __webpack_require__(23);
const TypeState_1 = __webpack_require__(27);
const TalkState_1 = __webpack_require__(26);
const CoffeeState_1 = __webpack_require__(20);
const HumanMoodManager_1 = __webpack_require__(15);
var STATE;
(function (STATE) {
    STATE[STATE["SMOKE"] = 0] = "SMOKE";
    STATE[STATE["FREEZE"] = 1] = "FREEZE";
    STATE[STATE["MOVE_RANDOM"] = 2] = "MOVE_RANDOM";
    STATE[STATE["SIT"] = 3] = "SIT";
    STATE[STATE["TYPE"] = 4] = "TYPE";
    STATE[STATE["TALK"] = 5] = "TALK";
    STATE[STATE["COFFEE"] = 6] = "COFFEE";
    STATE[STATE["RAGE"] = 7] = "RAGE";
})(STATE = exports.STATE || (exports.STATE = {}));
class HumanStateManager {
    constructor(human) {
        this.human = human;
        this.state = new FreezeState_1.FreezeState(human);
    }
    create(game, worldKnowledge, animationManager) {
        this.state.start(game);
        this.worldKnowledge = worldKnowledge;
        this.animationManager = animationManager;
    }
    updateState(game) {
        const nextState = this.state.getNextState();
        if (nextState === this.state) {
            // Do nothing, current state is not ended.
            return;
        }
        if (nextState !== null) {
            // Next state is forced.
            this.state = nextState;
            this.state.start(game);
            console.log('New forced state: ' + this.state.constructor.name);
            return;
        }
        // Generates new state
        switch (this.randomNextStepName()) {
            case STATE.SMOKE:
                this.state = new SmokeState_1.SmokeState(this.human);
                break;
            case STATE.MOVE_RANDOM:
                this.state = new MoveRandomState_1.MoveRandomState(this.human, this.worldKnowledge);
                break;
            case STATE.SIT:
                this.state = new SitState_1.SitState(this.human, this.worldKnowledge.getRandomFreeSittable(), this.worldKnowledge);
                break;
            case STATE.TYPE:
                this.state = new TypeState_1.TypeState(this.human, this.worldKnowledge.getClosestFreeDesk(this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.COFFEE:
                this.state = new CoffeeState_1.CoffeeState(this.human, this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.TALK:
                this.state = new TalkState_1.TalkState(this.human, this.worldKnowledge.getAnotherFreeHuman(this.human), game, this.worldKnowledge);
                break;
            case STATE.FREEZE:
            default:
                this.state = new FreezeState_1.FreezeState(this.human);
        }
        if (this.state.start(game)) {
            console.log('New random state: ' + this.state.constructor.name);
        }
        else {
            console.log('State ' + this.state.constructor.name + ' failed. Retry.');
            this.updateState(game);
        }
    }
    randomNextStepName() {
        const states = [];
        states.push({ state: STATE.SMOKE, probability: this.getProbability(STATE.SMOKE) });
        states.push({ state: STATE.FREEZE, probability: this.getProbability(STATE.FREEZE) });
        states.push({ state: STATE.MOVE_RANDOM, probability: this.getProbability(STATE.MOVE_RANDOM) });
        if (this.worldKnowledge.getAnotherFreeHuman(this.human) !== null) {
            states.push({ state: STATE.TALK, probability: this.getProbability(STATE.TALK) });
        }
        if (this.worldKnowledge.getRandomFreeSittable() !== null) {
            states.push({ state: STATE.SIT, probability: this.getProbability(STATE.SIT) });
        }
        if (this.worldKnowledge.getClosestFreeDesk(this.human.getPosition()) !== null) {
            states.push({ state: STATE.TYPE, probability: this.getProbability(STATE.TYPE) });
        }
        if (this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition()) !== null) {
            states.push({ state: STATE.COFFEE, probability: this.getProbability(STATE.COFFEE) });
        }
        let debug = '';
        debug += 'Rlx[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.RELAXATION) * 100) + '%], ';
        debug += 'Hng[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.HUNGER) * 100) + '%], ';
        debug += 'Soc[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.SOCIAL) * 100) + '%] ---> ';
        debug += 'Smk(' + Math.ceil(this.getProbability(STATE.SMOKE)) + '), ';
        debug += 'Frz(' + Math.ceil(this.getProbability(STATE.FREEZE)) + '), ';
        debug += 'MvR(' + Math.ceil(this.getProbability(STATE.MOVE_RANDOM)) + '), ';
        debug += 'Tak(' + Math.ceil(this.getProbability(STATE.TALK)) + '), ';
        debug += 'Sit(' + Math.ceil(this.getProbability(STATE.SIT)) + '), ';
        debug += 'Typ(' + Math.ceil(this.getProbability(STATE.TYPE)) + '), ';
        debug += 'Cof(' + Math.ceil(this.getProbability(STATE.COFFEE)) + '), ';
        console.log(debug);
        const sum = states.reduce((prev, state) => {
            return prev + state.probability;
        }, 0);
        const random = Phaser.Math.random(0, sum);
        let counter = 0;
        for (let i = 0; i < states.length; i++) {
            counter += states[i].probability;
            if (counter > random) {
                return states[i].state;
            }
        }
    }
    getProbability(state) {
        let result = 1;
        switch (state) {
            case STATE.SMOKE:
                result = 5;
                break;
            case STATE.FREEZE:
                result = 3;
                break;
            case STATE.MOVE_RANDOM:
                result = 2;
                break;
            case STATE.TALK:
                result = 8;
                break;
            case STATE.SIT:
                result = 4;
                break;
            case STATE.COFFEE:
                result = 6;
                break;
            case STATE.TYPE:
                result = (5 + 1 + 2 + 8 + 2 + 6) * 2;
                break;
        }
        if (state === this.state.getState()) {
            result = result / 2;
        }
        HumanMoodManager_1.HumanMoodManager.getMoods().forEach((mood) => {
            if (this.human.getMood(mood) < 0.5) {
                if (HumanStateManager.getMoodGains(state)[mood] > 0) {
                    result = result * HumanStateManager.getMoodGains(state)[mood] * 8;
                    result = result * (1 - this.human.getMood(mood)) * 3;
                }
            }
        });
        return result;
    }
    static getMoodGains(state) {
        let result = {};
        switch (state) {
            case STATE.SMOKE:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.4;
                break;
            case STATE.TALK:
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.5;
                break;
            case STATE.SIT:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.2;
                break;
            case STATE.COFFEE:
                result[HumanMoodManager_1.MOOD.HUNGER] = 0.5;
                break;
        }
        return result;
    }
    reset(game) {
        this.state.stop(game);
        this.updateState(game);
    }
    goMeeting(game, meeting) {
        this.state.stop(game);
        this.state = new TalkState_1.TalkState(this.human, null, game, this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    getState() {
        return this.state.getState();
    }
}
exports.HumanStateManager = HumanStateManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(3);
exports.CELL_WIDTH = 40;
exports.CELL_HEIGHT = 20;
class PositionTransformer {
    static getRealPosition(point) {
        return new PIXI.Point(app_1.WORLD_WIDTH / 2 - (point.x - point.y) * exports.CELL_WIDTH / 2, app_1.WORLD_HEIGHT - (point.x + point.y) * exports.CELL_HEIGHT / 2);
    }
    static getCellPosition(point) {
        return new PIXI.Point(Math.floor((point.y - app_1.WORLD_HEIGHT) / (2 * (-exports.CELL_HEIGHT / 2)) +
            (point.x - (app_1.WORLD_WIDTH / 2)) / (2 * (-exports.CELL_WIDTH / 2))), Math.floor((point.y - app_1.WORLD_HEIGHT) / (2 * (-exports.CELL_HEIGHT / 2)) -
            (point.x - (app_1.WORLD_WIDTH / 2)) / (2 * (-exports.CELL_WIDTH / 2))));
    }
    static dist(position1, position2) {
        return (position1.x - position2.x) * (position1.x - position2.x) +
            (position1.y - position2.y) * (position1.y - position2.y);
    }
    static isNeighbor(position1, position2) {
        return this.dist(position1, position2) === 1;
    }
}
exports.PositionTransformer = PositionTransformer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(18);
const Preload_1 = __webpack_require__(19);
const Play_1 = __webpack_require__(0);
const PositionTransformer_1 = __webpack_require__(2);
const WorldKnowledge_1 = __webpack_require__(10);
exports.SCALE = 2;
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 650;
exports.CAMERA_WIDTH_PIXELS = CANVAS_WIDTH / exports.SCALE;
exports.CAMERA_HEIGHT_PIXELS = CANVAS_HEIGHT / exports.SCALE;
exports.WORLD_WIDTH = WorldKnowledge_1.GRID_WIDTH * PositionTransformer_1.CELL_WIDTH / 2 + WorldKnowledge_1.GRID_HEIGHT * PositionTransformer_1.CELL_WIDTH / 2;
exports.WORLD_HEIGHT = WorldKnowledge_1.GRID_WIDTH * PositionTransformer_1.CELL_HEIGHT / 2 + WorldKnowledge_1.GRID_HEIGHT * PositionTransformer_1.CELL_HEIGHT / 2 + 15;
class SimpleGame extends Phaser.Game {
    constructor() {
        super(exports.CAMERA_WIDTH_PIXELS, exports.CAMERA_HEIGHT_PIXELS, Phaser.CANVAS, // Open GL for effect / shader ?
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TOP_ORIENTED_ANIMATION = '_reverse';
const FRAME_RATE = 12;
var ANIMATION;
(function (ANIMATION) {
    ANIMATION[ANIMATION["FREEZE"] = 0] = "FREEZE";
    ANIMATION[ANIMATION["WALK"] = 1] = "WALK";
    ANIMATION[ANIMATION["SMOKE"] = 2] = "SMOKE";
    ANIMATION[ANIMATION["SIT_DOWN"] = 3] = "SIT_DOWN";
    ANIMATION[ANIMATION["STAND_UP"] = 4] = "STAND_UP";
    ANIMATION[ANIMATION["TYPE"] = 5] = "TYPE";
    ANIMATION[ANIMATION["TALK"] = 6] = "TALK";
    ANIMATION[ANIMATION["DRINK"] = 7] = "DRINK";
    ANIMATION[ANIMATION["RAGE"] = 8] = "RAGE";
})(ANIMATION = exports.ANIMATION || (exports.ANIMATION = {}));
class HumanAnimationManager {
    create(humanTile) {
        this.humanTile = humanTile;
        HumanAnimationManager.getAnimations().forEach((animation) => {
            if (HumanAnimationManager.hasTopOrientedVariation(animation)) {
                this.humanTile.animations.add(animation + '', HumanAnimationManager.getAnimationFrames(animation, false));
                this.humanTile.animations.add(animation + TOP_ORIENTED_ANIMATION, HumanAnimationManager.getAnimationFrames(animation, true));
            }
            else {
                this.humanTile.animations.add(animation + '', HumanAnimationManager.getAnimationFrames(animation));
            }
        });
    }
    getAnimationName(animation, isTop = null) {
        if (isTop === null) {
            return this.getAnimationName(animation, this.humanTile.animations.name.endsWith(TOP_ORIENTED_ANIMATION));
        }
        return animation + (isTop ? TOP_ORIENTED_ANIMATION : '');
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        let animationName = animation + '';
        if (HumanAnimationManager.hasTopOrientedVariation(animation)) {
            animationName = this.getAnimationName(animation, isTop);
        }
        if (this.humanTile.animations.name !== animationName) {
            this.humanTile.animations.play(animationName, FRAME_RATE, HumanAnimationManager.isLooped(animation));
        }
        if (isLeft != null) {
            this.humanTile.scale.set(isLeft ? 1 : -1, 1);
        }
    }
    static getAnimationTime(animation) {
        return this.getAnimationFrames(animation).length * Phaser.Timer.SECOND / FRAME_RATE;
    }
    static getAnimationFrames(animation, topOriented = null) {
        switch (animation) {
            case ANIMATION.FREEZE: return topOriented ? [18, 19, 20] : [12, 13, 14];
            case ANIMATION.WALK: return topOriented ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
            case ANIMATION.SIT_DOWN: return [12, 36, 37, 38, 39];
            case ANIMATION.STAND_UP: return [39, 38, 37, 36, 12];
            case ANIMATION.TYPE: return [42, 43, 44, 45];
            case ANIMATION.TALK: return topOriented ? [54, 55, 56, 57, 58, 59] : [48, 49, 50, 51, 52, 53];
            case ANIMATION.RAGE:
                let rage_frames = [66, 67, 68, 69];
                for (let i = 0; i < 4; i++) {
                    rage_frames = rage_frames.concat([70, 71, 72, 73, 74, 73]);
                }
                return rage_frames.concat([74, 75, 76]);
            case ANIMATION.DRINK:
                return [60, 61, 60, 60, 60, 62, 63, 63, 64, 63, 63, 64, 63, 62, 60, 60, 60, 60, 60, 60, 60];
            case ANIMATION.SMOKE:
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
                return smoke_frames;
            default:
                throw 'UNKNOWN ANIMATION ' + animation;
        }
    }
    static getAnimations() {
        return [
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.SMOKE,
            ANIMATION.SIT_DOWN,
            ANIMATION.STAND_UP,
            ANIMATION.TYPE,
            ANIMATION.TALK,
            ANIMATION.DRINK,
            ANIMATION.RAGE,
        ];
    }
    static hasTopOrientedVariation(animation) {
        return [ANIMATION.WALK, ANIMATION.FREEZE, ANIMATION.TALK].indexOf(animation) > -1;
    }
    static isLooped(animation) {
        return [
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.TALK,
            ANIMATION.SMOKE,
            ANIMATION.TYPE,
            ANIMATION.DRINK,
        ].indexOf(animation) > -1;
    }
}
exports.HumanAnimationManager = HumanAnimationManager;


/***/ }),
/* 5 */
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
            return DIRECTION.CURRENT;
        }
    }
    static isLeft(direction) {
        return direction === DIRECTION.LEFT || direction === DIRECTION.BOTTOM;
    }
    static isTop(direction) {
        return direction === DIRECTION.TOP || direction === DIRECTION.LEFT;
    }
    static getHorizontalMirror(direction) {
        switch (direction) {
            case DIRECTION.TOP: return DIRECTION.LEFT;
            case DIRECTION.BOTTOM: return DIRECTION.RIGHT;
            case DIRECTION.LEFT: return DIRECTION.TOP;
            case DIRECTION.RIGHT: return DIRECTION.BOTTOM;
            case DIRECTION.CURRENT: return DIRECTION.CURRENT;
        }
    }
}
exports.Direction = Direction;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const POINTS = 20;
const RADIUS = 6;
const DELAY = 750;
class ObjectDeleter {
    static makeDeletable(object, game, group) {
        const circle = new PartialCircle(game, this.getPosition(object).x, this.getPosition(object).y, group);
        game.add.existing(circle);
        group.add(circle);
        object.getSprites().forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.select, this, 0, game, object, circle);
        });
    }
    static select(sprite, _pointer, game, object, circle) {
        circle.alpha = 1;
        circle.percentage = 1.0;
        const tween = game.add.tween(circle).to({
            percentage: 0
        }, DELAY, 'Linear', true, 0, 0, false);
        const event = game.time.events.add(DELAY, this.removeObject, this, object);
        sprite.events.onInputUp.add(this.cancelRemoval, this, 0, game, tween, event, circle);
    }
    static cancelRemoval(sprite, _pointer, _boolean, game, tween, event, circle) {
        tween.stop(false);
        game.time.events.remove(event);
        game.time.events.clearPendingEvents();
        sprite.events.onInputUp.removeAll();
        circle.alpha = 0;
    }
    static removeObject(object) {
        object.remove();
    }
    static getPosition(object) {
        return this.getCenterOfSprites(object.getSprites());
    }
    static getCenterOfSprites(sprites) {
        const xMin = sprites.map((sprite) => {
            return (sprite.position.x - sprite.width / 2);
        }).reduce((a, b) => {
            return Math.min(a, b);
        });
        const xMax = sprites.map((sprite) => {
            return (sprite.position.x + sprite.width / 2);
        }).reduce((a, b) => {
            return Math.max(a, b);
        });
        const yMin = sprites.map((sprite) => {
            return (sprite.position.y);
        }).reduce((a, b) => {
            return Math.min(a, b);
        });
        const yMax = sprites.map((sprite) => {
            return (sprite.position.y - sprite.height);
        }).reduce((a, b) => {
            return Math.max(a, b);
        });
        return new PIXI.Point(xMin + (xMax - xMin) / 2, yMin + (yMax - yMin) / 2);
    }
}
exports.ObjectDeleter = ObjectDeleter;
class PartialCircle extends Phaser.Graphics {
    constructor(game, x, y, group) {
        super(game, x, y);
        this.percentage = 1.0;
        game.add.existing(this);
        group.add(this);
        this.alpha = 0;
    }
    update() {
        if (this.alpha > 0) {
            this.redraw();
        }
    }
    redraw() {
        this.clear();
        this.lineStyle(3, 0xff004d);
        this.moveTo(0, -RADIUS);
        for (let i = 0; i < POINTS * this.percentage; i++) {
            const angle = Math.PI * 2 / POINTS * (i + 1) + Math.PI;
            this.lineTo(-Math.sin(angle) * RADIUS, Math.cos(angle) * RADIUS);
        }
    }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const app_1 = __webpack_require__(3);
const ObjectSeller_1 = __webpack_require__(16);
const TextStyle_1 = __webpack_require__(9);
const HumanEmployer_1 = __webpack_require__(45);
const InfoPanel_1 = __webpack_require__(46);
exports.INTERFACE_WIDTH = 150.5;
exports.TOP_GAP = 15.5;
var PANEL;
(function (PANEL) {
    PANEL[PANEL["INFO"] = 0] = "INFO";
    PANEL[PANEL["USR"] = 1] = "USR";
    PANEL[PANEL["OBJ"] = 2] = "OBJ";
})(PANEL || (PANEL = {}));
class UserInterface {
    constructor(worldKnowledge) {
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
        this.humanEmployer = new HumanEmployer_1.HumanEmployer(worldKnowledge);
        this.infoPanel = new InfoPanel_1.InfoPanel(worldKnowledge);
        this.buttons = [];
        this.selectedPanel = PANEL.OBJ;
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(0x272a60);
        this.backgroundGraphics.drawRect(-0.5, 0, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS);
        interfaceGroup.add(this.backgroundGraphics);
        this.objectSeller.create(game, groups);
        this.humanEmployer.create(game, groups);
        this.infoPanel.create(game, groups);
        const buttonWidth = exports.INTERFACE_WIDTH / 3;
        let i = 0;
        [['info', PANEL.INFO], ['usr', PANEL.USR], ['obj', PANEL.OBJ]].forEach((panelInfo) => {
            const button = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + i * buttonWidth, 0, panelInfo[0], TextStyle_1.TEXT_STYLE, interfaceGroup);
            button.inputEnabled = true;
            button.input.useHandCursor = true;
            button.events.onInputDown.add(() => {
                this.selectPanel(panelInfo[1]);
            });
            this.buttons.push(button);
            i++;
        });
        this.selectPanel(PANEL.INFO);
    }
    update() {
        this.objectSeller.update();
        this.infoPanel.update();
    }
    selectPanel(panel) {
        this.selectedPanel = panel;
        if (this.selectedPanel === PANEL.INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.show();
        }
        else if (this.selectedPanel === PANEL.USR) {
            this.objectSeller.hide();
            this.humanEmployer.show();
            this.infoPanel.hide();
        }
        else {
            this.objectSeller.show();
            this.humanEmployer.hide();
            this.infoPanel.hide();
        }
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const ObjectInfoRegistry_1 = __webpack_require__(13);
class AbstractObject {
    constructor(point, worldKnowledge, leftOriented) {
        this.position = point;
        this.leftOriented = leftOriented;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        this.sprites = [];
        infos.getSpriteInfos().forEach((spriteInfo) => {
            const sprite = game.add.sprite(spriteInfo.getRealPosition(this.position, this.leftOriented).x, spriteInfo.getRealPosition(this.position, this.leftOriented).y, spriteInfo.getSpriteName());
            sprite.anchor.set(spriteInfo.getAnchor(sprite).x, spriteInfo.getAnchor(sprite).y);
            if (this.leftOriented) {
                sprite.scale.set(-1, 1);
            }
            this.sprites.push(sprite);
            groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(sprite);
        });
    }
    getPositionGap() {
        const sittableObjectInfos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getSpriteInfos()[0];
        return sittableObjectInfos.getSittablePosition(this.leftOriented);
    }
    getEntries() {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getEntryPoints(this.leftOriented);
    }
    getPosition() {
        return this.position;
    }
    getSprites() {
        return this.sprites;
    }
    remove() {
        this.worldKnowledge.moveToDepot(this);
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });
    }
    forceOrientation() {
        return this.leftOriented;
    }
}
exports.AbstractObject = AbstractObject;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_STYLE = {
    align: 'center',
    fill: "#ffffff",
    font: '16px 000webfont'
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanRepository_1 = __webpack_require__(43);
const Sofa_1 = __webpack_require__(39);
const Employee_1 = __webpack_require__(14);
const Desk_1 = __webpack_require__(34);
const Dispenser_1 = __webpack_require__(35);
const WallRepository_1 = __webpack_require__(44);
const Cell_1 = __webpack_require__(17);
const PositionTransformer_1 = __webpack_require__(2);
const Play_1 = __webpack_require__(0);
const Depot_1 = __webpack_require__(33);
const Direction_1 = __webpack_require__(5);
const MoodRegister_1 = __webpack_require__(30);
const Table_1 = __webpack_require__(41);
exports.GRID_WIDTH = 16;
exports.GRID_HEIGHT = 16;
exports.DEBUG_WORLD = false;
class WorldKnowledge {
    constructor() {
        this.cells = [];
        this.objects = [];
        for (let y = 0; y < exports.GRID_HEIGHT; y++) {
            for (let x = 0; x < exports.GRID_WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        this.wallRepository = new WallRepository_1.WallRepository();
        this.depot = new Depot_1.Depot();
        if (exports.DEBUG_WORLD) {
            this.wallRepository.addWall(new PIXI.Point(5, 5));
            this.wallRepository.addWall(new PIXI.Point(6, 5));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 5), this, false));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 6), this, false));
            this.objects.push(new Dispenser_1.Dispenser(new PIXI.Point(5, 4), this, false));
        }
        else {
            for (let x = 0; x < exports.GRID_WIDTH; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, 0));
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_HEIGHT - 1));
            }
            for (let y = 1; y < (exports.GRID_HEIGHT - 1); y++) {
                this.wallRepository.addWall(new PIXI.Point(0, y));
                this.wallRepository.addWall(new PIXI.Point(exports.GRID_WIDTH - 1, y));
            }
            for (let x = 1; x < 3 - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_WIDTH / 2 + 1));
            }
            for (let x = 5; x < exports.GRID_WIDTH - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_WIDTH / 2 + 1));
            }
            [
                new PIXI.Point(4, 3),
                new PIXI.Point(4, 4),
                new PIXI.Point(3, 4),
                new PIXI.Point(3, 3),
            ].forEach((cell) => {
                this.wallRepository.addWall(cell);
            });
        }
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
        this.moodRegister = new MoodRegister_1.MoodRegister(this.humanRepository);
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        const floor = groups[Play_1.GROUP_FLOOR];
        const noname = groups[Play_1.GROUP_OBJECTS_AND_HUMANS];
        this.cells.forEach((cell) => {
            cell.create(game, floor);
        });
        this.objects.forEach((object) => {
            object.create(game, groups);
        });
        this.wallRepository.create(game, noname);
        this.humanRepository.create(game, groups, this);
        this.moodRegister.create(game);
    }
    update() {
        this.humanRepository.update();
    }
    humanMoved(positions) {
        const walls = this.wallRepository.getWalls();
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
            if (WorldKnowledge.humanIsAboveWall(humans[i].getPosition(), wall)) {
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
    getSelectedHumanSprite() {
        return this.humanRepository.getSelectedHumanSprite();
    }
    resetAStar(position) {
        this.humanRepository.humans.forEach((human) => {
            human.resetAStar(position);
        });
    }
    resetStates(position) {
        this.humanRepository.humans.forEach((human) => {
            human.resetStateIfCellEmpty(position);
        });
    }
    getAnotherFreeHuman(human) {
        const availableHumans = this.humanRepository.humans.filter((anotherHuman) => {
            return anotherHuman !== human && anotherHuman.isFree();
        });
        if (availableHumans.length === 0) {
            return null;
        }
        return availableHumans[Math.floor(Math.random() * availableHumans.length)];
    }
    getRandomCell() {
        const acceptableIndexes = this.getAcceptables();
        const random = Math.floor(Math.random() * acceptableIndexes.length);
        return this.cells[acceptableIndexes[random]].getPosition();
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
    getMeetingCells(cells) {
        const acceptableIndexes = this.getAcceptables();
        let result = null;
        let dist = null;
        for (let i = 0; i < acceptableIndexes.length; i++) {
            const position1 = this.cells[acceptableIndexes[i]].getPosition();
            for (let j = i + 1; j < acceptableIndexes.length; j++) {
                const position2 = this.cells[acceptableIndexes[j]].getPosition();
                if (PositionTransformer_1.PositionTransformer.isNeighbor(position1, position2)) {
                    const newDist = WorldKnowledge.getDist(cells, position1);
                    if (result === null || newDist < dist) {
                        dist = newDist;
                        result = [position1, position2];
                    }
                }
            }
        }
        return result;
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
    isFree(point, object = null) {
        if (point.x < 0 || point.y < 0 || point.x >= exports.GRID_WIDTH || point.y >= exports.GRID_HEIGHT) {
            return false;
        }
        for (let j = 0; j < this.objects.length; j++) {
            if (this.objects[j].getPosition().x === point.x && this.objects[j].getPosition().y === point.y && this.objects[j] !== object) {
                return false;
            }
        }
        if (this.wallRepository.hasWall(point.x, point.y)) {
            return false;
        }
        return true;
    }
    getRandomFreeSittable() {
        const freeSittable = this.objects.filter((object) => {
            return (object.constructor.name === 'Sofa' || object.constructor.name === 'Table') && !this.isObjectUsed(object);
        });
        if (freeSittable.length === 0) {
            return null;
        }
        return freeSittable[Math.floor(Math.random() * freeSittable.length)];
    }
    isObjectUsed(interactiveObject) {
        for (let i = 0; i < this.humanRepository.humans.length; i++) {
            const human = this.humanRepository.humans[i];
            if (interactiveObject.getPosition().x === human.getPosition().x && interactiveObject.getPosition().y === human.getPosition().y) {
                return true;
            }
        }
        return false;
    }
    getClosestFreeDesk(position) {
        const freeDesks = this.objects.filter((object) => {
            return object.constructor.name === 'Desk' && !this.isObjectUsed(object);
        });
        if (freeDesks.length === 0) {
            return null;
        }
        return freeDesks.sort((desk1, desk2) => {
            return PositionTransformer_1.PositionTransformer.dist(position, desk1.getPosition()) - PositionTransformer_1.PositionTransformer.dist(position, desk2.getPosition());
        })[0];
    }
    getClosestFreeDispenser(position) {
        const freeDispensers = this.objects.filter((object) => {
            return object.constructor.name === 'Dispenser' && !this.isObjectUsed(object);
        });
        if (freeDispensers.length === 0) {
            return null;
        }
        return freeDispensers.sort((dispenser1, dispenser2) => {
            return PositionTransformer_1.PositionTransformer.dist(position, dispenser1.getPosition()) - PositionTransformer_1.PositionTransformer.dist(position, dispenser2.getPosition());
        })[0];
    }
    static getDist(sources, point) {
        let dist = 0;
        sources.forEach((source) => {
            dist += PositionTransformer_1.PositionTransformer.dist(source, point);
        });
        return dist;
    }
    moveToDepot(object) {
        this.resetStates(object.getPosition());
        const index = this.objects.indexOf(object, 0);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
        else {
            throw "Impossible to delete the object!";
        }
        this.depot.add(object.constructor.name);
    }
    getDepot() {
        return this.depot;
    }
    canPutHere(phantom) {
        // Check if there is nothing in the cell
        if (!this.isFree(phantom.getPosition())) {
            return false;
        }
        // Check if the human can enter the interactive object by at least one of the entries
        let isEntryPossible = false;
        phantom.getEntries().forEach((entry) => {
            isEntryPossible = isEntryPossible || this.isEntryAccessibleForObject(phantom, entry);
        });
        if (isEntryPossible === false) {
            return false;
        }
        // Check that if we put an object here, every other objects have at least one possible entry.
        let doNotBlockOthers = true;
        this.objects.forEach((object) => {
            let isEntryPossible = false;
            object.getEntries().forEach((entry) => {
                const out = Direction_1.Direction.getGap(object.getPosition(), entry);
                if (this.isFree(out) && !(out.x === phantom.getPosition().x && out.y === phantom.getPosition().y)) {
                    isEntryPossible = true;
                }
            });
            if (!isEntryPossible) {
                doNotBlockOthers = false;
            }
        });
        if (!doNotBlockOthers) {
            return false;
        }
        return true;
    }
    isEntryAccessibleForObject(phantom, entry) {
        return this.isFree(Direction_1.Direction.getGap(phantom.getPosition(), entry));
    }
    add(name, position, leftOriented) {
        let object = null;
        switch (name) {
            case 'Desk':
                object = new Desk_1.Desk(position, this, leftOriented);
                break;
            case 'Sofa':
                object = new Sofa_1.Sofa(position, this, leftOriented);
                break;
            case 'Dispenser':
                object = new Dispenser_1.Dispenser(position, this, leftOriented);
                break;
            case 'Table':
                object = new Table_1.Table(position, this, leftOriented);
                break;
            default: throw 'Unknown object ' + name;
        }
        this.objects.push(object);
        object.create(this.game, this.groups);
        this.resetAStar(position);
    }
    addEmployee(humanProperties) {
        const employee = new Employee_1.Employee(this.getRandomCell(), humanProperties);
        employee.create(this.game, this.groups, this);
        this.humanRepository.humans.push(employee);
    }
    getLastMoods() {
        return this.moodRegister.getLastMoods();
    }
    hasObject(interactiveObject) {
        return this.objects.indexOf(interactiveObject) > -1;
    }
}
exports.WorldKnowledge = WorldKnowledge;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const HumanAnimationManager_1 = __webpack_require__(4);
class RageState {
    constructor(human) {
        this.human = human;
        this.events = [];
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        this.game = game;
        this.active = true;
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
            this.active = false;
        }, this));
        return true;
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
}
exports.RageState = RageState;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanProperties_1 = __webpack_require__(29);
const NAMES = [
    'Michel',
    'Jean-Paul',
    'Jean-Louis',
    'Patrick',
    'Albert'
];
var EMPLOYEE_TYPE;
(function (EMPLOYEE_TYPE) {
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["DEVELOPER"] = 0] = "DEVELOPER";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["MARKETING"] = 1] = "MARKETING";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["SALE"] = 2] = "SALE";
})(EMPLOYEE_TYPE = exports.EMPLOYEE_TYPE || (exports.EMPLOYEE_TYPE = {}));
const USE_API = false;
class HumanPropertiesFactory {
    static create() {
        return new HumanProperties_1.HumanProperties([EMPLOYEE_TYPE.DEVELOPER, EMPLOYEE_TYPE.MARKETING, EMPLOYEE_TYPE.SALE][Math.floor(Math.random() * 3)], USE_API ? this.generateName() : NAMES[Math.floor(Math.random() * NAMES.length)], Math.random(), Math.random(), Math.random(), Math.random());
    }
    static generateName() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?nat=fr,en,de&inc=gender,name,nat', false);
        xhr.send();
        const result = JSON.parse(xhr.response).results[0];
        return (result.name.first + ' ' + result.name.last).substr(0, 15);
    }
}
exports.HumanPropertiesFactory = HumanPropertiesFactory;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfo_1 = __webpack_require__(36);
const SpriteInfo_1 = __webpack_require__(40);
const Direction_1 = __webpack_require__(5);
class ObjectInfoRegistry {
    static getObjectInfo(name) {
        if (this.objectInfos === null) {
            this.generateObjectInfos();
        }
        for (let i = 0; i < this.objectInfos.length; i++) {
            if (this.objectInfos[i].getName() === name) {
                return this.objectInfos[i];
            }
        }
        throw "Impossible to find info for " + name;
    }
    static generateObjectInfos() {
        this.objectInfos = [];
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Dispenser', [
            new SpriteInfo_1.SpriteInfo('dispenser', 4, -4, 3, -13)
        ], [Direction_1.DIRECTION.BOTTOM]));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Sofa', [
            new SpriteInfo_1.SpriteInfo('sofa', 0, -8, 3, 0)
        ], [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM]));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Desk', [
            new SpriteInfo_1.SpriteInfo('chair', -10, -8, 5, 0),
            new SpriteInfo_1.SpriteInfo('desk', 0, 0, 4, 0)
        ], [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Table', [
            new SpriteInfo_1.SpriteInfo('chair2', -8, -9, 5, 0),
            new SpriteInfo_1.SpriteInfo('table', 0, 0, 4, 0)
        ], [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]));
    }
    static getSellableObjects() {
        if (this.objectInfos === null) {
            this.generateObjectInfos();
        }
        return this.objectInfos;
    }
}
ObjectInfoRegistry.objectInfos = null;
exports.ObjectInfoRegistry = ObjectInfoRegistry;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(2);
const ClosestPathFinder_1 = __webpack_require__(28);
const Direction_1 = __webpack_require__(5);
const HumanAnimationManager_1 = __webpack_require__(4);
const HumanStateManager_1 = __webpack_require__(1);
const ObjectSelector_1 = __webpack_require__(38);
const TalkBubble_1 = __webpack_require__(32);
const HumanMoodManager_1 = __webpack_require__(15);
const MoodSprite_1 = __webpack_require__(31);
const Play_1 = __webpack_require__(0);
const MAX_WALK_CELL_DURATION = 1500;
const MIN_WALK_CELL_DURATION = 800;
const MAX_RETRIES = 3;
const MIN_RETRIES = 0;
const GAP_FROM_BOTTOM = -8;
const PATH_DEBUG = false;
class Employee {
    constructor(cell, humanProperties) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.stateManager = new HumanStateManager_1.HumanStateManager(this);
        this.anchorPixels = new PIXI.Point(0, GAP_FROM_BOTTOM);
        this.animationManager = new HumanAnimationManager_1.HumanAnimationManager();
        this.talkBubble = new TalkBubble_1.TalkBubble();
        this.moodManager = new HumanMoodManager_1.HumanMoodManager();
        this.moodSprite = new MoodSprite_1.MoodSprite();
        this.humanProperties = humanProperties;
    }
    create(game, groups, worldKnowledge) {
        this.game = game;
        this.worldKnowledge = worldKnowledge;
        this.moodManager.create(game);
        this.sprite = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y, 24, 25, this.humanProperties.getSpriteKey());
        this.animationManager.create(this.sprite);
        this.sprite.anchor.set(0.5, 1.0);
        ObjectSelector_1.ObjectSelector.makeSelectable([this.sprite]);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, true, false);
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, worldKnowledge);
        this.stateManager.create(game, worldKnowledge, this.animationManager);
        this.talkBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.moodSprite.create(this.sprite, this.game, groups[Play_1.GROUP_INFOS]);
        if (PATH_DEBUG) {
            this.pathGraphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INFOS]);
            groups[Play_1.GROUP_INFOS].add(this.pathGraphics);
        }
    }
    update() {
        this.talkBubble.update();
        this.stateManager.updateState(this.game);
        this.moodManager.update();
        this.moodSprite.update(this.moodManager.getGeneralMood(), [
            this.moodManager.getMood(HumanMoodManager_1.MOOD.HUNGER),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.SOCIAL),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.RELAXATION)
        ]);
        if (PATH_DEBUG) {
            this.pathGraphics.clear();
            this.pathGraphics.lineStyle(2, 0x00ff00);
            if (this.path !== null && this.path.length > 0) {
                this.pathGraphics.moveTo(this.sprite.position.x, this.sprite.position.y);
                this.path.forEach((pathItem) => {
                    this.pathGraphics.lineTo(PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).x, PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).y - PositionTransformer_1.CELL_HEIGHT / 2);
                });
            }
        }
    }
    goMeeting(meeting) {
        return this.stateManager.goMeeting(this.game, meeting);
    }
    moveTo(cell) {
        const path = this.closestPathFinder.getPath(this.cell, cell);
        if (path === null) {
            this.stateManager.reset(this.game);
            return false;
        }
        this.path = path;
        if (!this.moving) {
            this.popPath(null, null);
        }
        return true;
    }
    moveToClosest(cell, entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        const path = this.closestPathFinder.getNeighborPath(this.cell, cell, entries);
        if (path === null) {
            this.stateManager.reset(this.game);
            return false;
        }
        this.path = path;
        if (!this.moving) {
            this.popPath(null, null);
        }
        return true;
    }
    animateMove(direction) {
        const isLeft = Employee.isHumanLeft(direction);
        const isTop = Employee.isHumanTop(direction);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.WALK, isLeft, isTop);
        this.moving = true;
        this.game.add.tween(this.sprite.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y
        }, this.getWalkDuration(), 'Linear', true)
            .onComplete.add((_tweenValues, _game, isLeft, isTop) => {
            this.popPath(isLeft, isTop);
        }, this, 0, isLeft, isTop);
    }
    getWalkDuration() {
        return MIN_WALK_CELL_DURATION + (MAX_WALK_CELL_DURATION - MIN_WALK_CELL_DURATION) * (1 - this.humanProperties.getSpeed());
    }
    popPath(isLeft, isTop) {
        this.moving = false;
        let humanPositions = [this.cell];
        if (this.path === null || this.path.length == 0) {
            // this.animationManager.loadAnimation(ANIMATION.FREEZE, isLeft, isTop);
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
        this.worldKnowledge.humanMoved(humanPositions);
    }
    getPosition() {
        return this.cell;
    }
    isMoving() {
        return this.moving;
    }
    interactWith(interactiveObject, isLeft = null) {
        const direction = Direction_1.Direction.getNeighborDirection(this.cell, interactiveObject.getPosition());
        const side = (isLeft !== null) ? isLeft : Employee.isHumanLeft(direction);
        // Employee has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
        this.anchorPixels.x = interactiveObject.getPositionGap().x + (side ? -5 : 5);
        this.anchorPixels.y = interactiveObject.getPositionGap().y - 1;
        this.cell = interactiveObject.getPosition();
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
            if (this.worldKnowledge.isFree(tryCell)) {
                cells.push(tryCell);
            }
        });
        if (cells.length === 0) {
            console.log('oops');
            debugger;
        }
        else {
            const freeCell = cells[Math.floor(Math.random() * cells.length)];
            this.path = [freeCell];
            if (!this.moving) {
                this.popPath(null, null);
            }
        }
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        this.animationManager.loadAnimation(animation, isLeft, isTop);
    }
    isSelected() {
        return ObjectSelector_1.ObjectSelector.isSelected(this.sprite);
    }
    getSprite() {
        return this.sprite;
    }
    resetAStar(newNonEmptyCell) {
        this.closestPathFinder.reset();
        if (this.path !== null) {
            // If human wants to go to a non-empty cell
            const matchingPath = this.path.filter((cell) => {
                return cell.x === newNonEmptyCell.x && cell.y === newNonEmptyCell.y;
            });
            if (matchingPath.length > 0) {
                const goal = this.path[this.path.length - 1];
                this.moveTo(goal);
                return;
            }
        }
    }
    resetStateIfCellEmpty(newEmptyCell) {
        if (this.cell.x == newEmptyCell.x && this.cell.y == newEmptyCell.y) {
            this.stateManager.reset(this.game);
        }
    }
    isFree() {
        return [HumanStateManager_1.STATE.SIT, HumanStateManager_1.STATE.MOVE_RANDOM, HumanStateManager_1.STATE.FREEZE, HumanStateManager_1.STATE.SMOKE].indexOf(this.getState()) > -1;
    }
    getState() {
        return this.stateManager.getState();
    }
    showTalkBubble() {
        this.talkBubble.show();
    }
    hideTalkBubble() {
        this.talkBubble.hide();
    }
    updateMoodFromState() {
        this.moodManager.updateFromState(this.getState());
    }
    getMood(mood = null) {
        if (mood === null) {
            return this.moodManager.getGeneralMood();
        }
        return this.moodManager.getMood(mood);
    }
    stopWalk() {
        this.path = null;
    }
    getMaxRetries() {
        return Math.ceil(MIN_RETRIES + (MAX_RETRIES - MIN_RETRIES) * this.humanProperties.getPerseverance());
    }
}
exports.Employee = Employee;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const LOSS = -0.05;
const DEFAULT = 0.75;
var MOOD;
(function (MOOD) {
    MOOD[MOOD["RELAXATION"] = 0] = "RELAXATION";
    MOOD[MOOD["HUNGER"] = 1] = "HUNGER";
    MOOD[MOOD["SOCIAL"] = 2] = "SOCIAL";
})(MOOD = exports.MOOD || (exports.MOOD = {}));
class HumanMoodManager {
    constructor() {
        this.moods = {};
        this.moods[MOOD.RELAXATION] = DEFAULT;
        this.moods[MOOD.HUNGER] = DEFAULT;
        this.moods[MOOD.SOCIAL] = DEFAULT;
        this.hasToBeUpdated = true;
    }
    create(game) {
        this.game = game;
    }
    update() {
        if (this.hasToBeUpdated) {
            let moodUpdate = {};
            moodUpdate[MOOD.RELAXATION] = LOSS;
            moodUpdate[MOOD.HUNGER] = LOSS;
            moodUpdate[MOOD.SOCIAL] = LOSS / 2;
            this.updateFromStateInner(moodUpdate);
            this.hasToBeUpdated = false;
            this.game.time.events.add(10 * Phaser.Timer.SECOND, () => {
                this.hasToBeUpdated = true;
            }, this);
        }
    }
    updateFromState(state) {
        this.updateFromStateInner(HumanStateManager_1.HumanStateManager.getMoodGains(state));
    }
    updateFromStateInner(moods) {
        Object.keys(moods).forEach((mood) => {
            this.moods[mood] = Math.max(0, Math.min(1, this.moods[mood] + moods[mood]));
        });
    }
    static getMoods() {
        return [
            MOOD.RELAXATION,
            MOOD.HUNGER,
            MOOD.SOCIAL
        ];
    }
    getMood(mood) {
        return this.moods[mood];
    }
    getGeneralMood() {
        return (this.moods[MOOD.RELAXATION] + this.moods[MOOD.SOCIAL] + this.moods[MOOD.HUNGER]) / 3;
    }
}
exports.HumanMoodManager = HumanMoodManager;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(7);
const app_1 = __webpack_require__(3);
const ObjectInfoRegistry_1 = __webpack_require__(13);
const ObjectPhantom_1 = __webpack_require__(37);
const Play_1 = __webpack_require__(0);
const TextStyle_1 = __webpack_require__(9);
exports.OBJECT_SELLER_CELL_SIZE = 41;
const CIRCLE_GAP = 7;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.sellerButtons = [];
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        ObjectInfoRegistry_1.ObjectInfoRegistry.getSellableObjects().forEach((object) => {
            this.sellerButtons.push(new SellerButton(object, this.worldKnowledge));
        });
    }
    create(game, groups) {
        let i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, groups, i);
            i++;
        });
    }
    update() {
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateCount(this.getCount(sellerButton.getName()));
        });
    }
    getCount(name) {
        return this.worldKnowledge.getDepot().getCount(name);
    }
    hide() {
        if (this.visible) {
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.show();
            });
        }
        this.visible = true;
    }
}
exports.ObjectSeller = ObjectSeller;
class SellerButton {
    constructor(objectInfo, worldKnowledge) {
        this.objectInfo = objectInfo;
        this.worldKnowledge = worldKnowledge;
        this.sprites = [];
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE;
        const spriteOrigin = new PIXI.Point(left + exports.OBJECT_SELLER_CELL_SIZE / 2, top + exports.OBJECT_SELLER_CELL_SIZE);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, 0xffffff);
        this.square.drawRect(0, 0, exports.OBJECT_SELLER_CELL_SIZE, exports.OBJECT_SELLER_CELL_SIZE);
        this.fakeCell = game.add.sprite(spriteOrigin.x, spriteOrigin.y, 'casedefault');
        this.fakeCell.anchor.set(0.5, 1);
        groups[Play_1.GROUP_INTERFACE].add(this.fakeCell);
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteOrigin, false).x, spriteInfo.getRealPositionFromOrigin(spriteOrigin, false).y, spriteInfo.getSpriteName());
            seller.anchor.set(spriteInfo.getAnchor(seller).x, spriteInfo.getAnchor(seller).y);
            seller.inputEnabled = true;
            seller.input.pixelPerfectOver = true;
            seller.input.pixelPerfectClick = true;
            seller.input.useHandCursor = true;
            seller.events.onInputDown.add(this.createPhantom, this, 0, game, groups);
            this.sprites.push(seller);
            groups[Play_1.GROUP_INTERFACE].add(seller);
        });
        this.circle = game.add.graphics(left, top + CIRCLE_GAP, groups[Play_1.GROUP_INTERFACE]);
        this.circle.beginFill(0xff0000);
        this.circle.drawCircle(exports.OBJECT_SELLER_CELL_SIZE, 0, 9);
        groups[Play_1.GROUP_INTERFACE].add(this.circle);
        this.counter = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE - 1.5, index * exports.OBJECT_SELLER_CELL_SIZE + UserInterface_1.TOP_GAP + CIRCLE_GAP - 5, '0', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.counter);
        this.updateCount(0);
    }
    getName() {
        return this.objectInfo.getName();
    }
    updateCount(count) {
        const str = count + '';
        const previousStr = this.counter.text;
        const diff = str.length - previousStr.length;
        this.counter.setText(str);
        this.counter.position.x -= diff * 3;
    }
    createPhantom(sprite, pointer, game, groups) {
        this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
        const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectInfo.getName(), game, this.worldKnowledge);
        phantom.create(game, groups);
    }
    hide() {
        this.counter.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.fakeCell.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.circle.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.counter.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.fakeCell.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.circle.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(2);
const WorldKnowledge_1 = __webpack_require__(10);
class Cell {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, WorldKnowledge_1.DEBUG_WORLD ? 'casedefault' : 'woodcell');
        this.sprite.anchor.setTo(0.5, 1);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Cell = Cell;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(3);
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
/* 19 */
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
        this.game.load.spritesheet('human_red', 'assets/human_red.png', 24, 25);
        this.game.load.spritesheet('human_red_selected', 'assets/human_red_selected.png', 24, 25);
        this.game.load.spritesheet('human_pink', 'assets/human_pink.png', 24, 25);
        this.game.load.spritesheet('human_pink_selected', 'assets/human_pink_selected.png', 24, 25);
        this.game.load.spritesheet('casedefault', 'assets/casedefault.png', 40, 19);
        this.game.load.spritesheet('woodcell', 'assets/woodcell.png', 40, 19);
        this.game.load.spritesheet('chair', 'assets/chair.png', 40, 40);
        this.game.load.spritesheet('chair_selected', 'assets/chair_selected.png', 40, 40);
        this.game.load.spritesheet('chair2', 'assets/chair2.png', 14, 17);
        this.game.load.spritesheet('table', 'assets/table.png', 42, 40);
        this.game.load.spritesheet('desk', 'assets/desk.png', 40, 40);
        this.game.load.spritesheet('desk_selected', 'assets/desk_selected.png', 40, 40);
        this.game.load.spritesheet('wall', 'assets/wall.png', 40, 37, 16);
        this.game.load.spritesheet('sofa', 'assets/sofa.png', 8, 6);
        this.game.load.spritesheet('dispenser', 'assets/dispenser.png', 26, 35);
        this.game.load.spritesheet('dispenser_selected', 'assets/dispenser_selected.png', 26, 35);
        this.game.load.spritesheet('sofa_selected', 'assets/sofa_selected.png', 8, 6);
        this.game.load.spritesheet('bubble', 'assets/bubble.png', 13, 15);
        this.game.load.spritesheet('bubble_images', 'assets/bubble_images.png', 9, 7);
        this.game.load.spritesheet('forbidden', 'assets/forbidden.png', 12, 12);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(2);
const HumanAnimationManager_1 = __webpack_require__(4);
const RageState_1 = __webpack_require__(11);
class CoffeeState {
    constructor(human, dispenser, worldKnowledge, tries = 0) {
        this.human = human;
        this.dispenser = dispenser;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
        this.tries = tries;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.dispenser) || this.worldKnowledge.isObjectUsed(this.dispenser)) {
                const nextDispenser = this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition());
                if (this.tries > this.human.getMaxRetries() || nextDispenser === null) {
                    this.active = false;
                    this.human.stopWalk();
                    return new RageState_1.RageState(this.human);
                }
                else {
                    return new CoffeeState(this.human, nextDispenser, this.worldKnowledge, this.tries + 1);
                }
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.dispenser, this.dispenser.forceOrientation());
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK), () => {
                    this.human.goToFreeCell(this.dispenser.getEntries());
                    this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                        this.active = false;
                    }, this));
                }, this));
            }));
        }
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        if (!this.human.moveToClosest(this.dispenser.getPosition(), this.dispenser.getEntries())) {
            this.active = false;
            this.stop(game);
            return false;
        }
        return true;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.dispenser.getPosition());
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.COFFEE;
    }
}
exports.CoffeeState = CoffeeState;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(4);
const HumanStateManager_1 = __webpack_require__(1);
class FreezeState {
    constructor(human) {
        this.human = human;
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE);
        this.event = game.time.events.add(Phaser.Math.random(1, 2) * Phaser.Timer.SECOND, this.end, this);
        return true;
    }
    end() {
        this.active = false;
    }
    stop(game) {
        if (this.event) {
            game.time.events.remove(this.event);
        }
        this.end();
    }
    getState() {
        return HumanStateManager_1.STATE.FREEZE;
    }
}
exports.FreezeState = FreezeState;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
class Meeting {
    constructor(humans, time, worldKnowledge) {
        const cells = worldKnowledge.getMeetingCells(humans.map((human) => {
            return human.getPosition();
        }));
        if (cells === null) {
            throw 'No meeting point found!';
        }
        this.time = time;
        this.places = [];
        for (let i = 0; i < cells.length; i++) {
            this.places.push({
                human: humans[i],
                position: cells[i]
            });
        }
    }
    getCell(human) {
        for (let i = 0; i < this.places.length; i++) {
            if (human === this.places[i].human) {
                return this.places[i].position;
            }
        }
        return null;
    }
    isReady() {
        for (let i = 0; i < this.places.length; i++) {
            const human = this.places[i].human;
            const position = this.places[i].position;
            if (human.isMoving() || human.getPosition().x !== position.x || human.getPosition().y !== position.y) {
                return false;
            }
        }
        return true;
    }
    getTime() {
        return this.time;
    }
    getAnotherHuman(human) {
        let anotherHumans = [];
        this.places.forEach((place) => {
            if (place.human !== human) {
                anotherHumans.push(place.human);
            }
        });
        return anotherHumans[Math.floor(Math.random() * anotherHumans.length)];
    }
    areAllHumanStillInMeeting() {
        for (let i = 0; i < this.places.length; i++) {
            const human = this.places[i].human;
            if (human.getState() !== HumanStateManager_1.STATE.TALK) {
                return false;
            }
        }
        return true;
    }
}
exports.Meeting = Meeting;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
class MoveRandomState {
    constructor(human, worldKnowledge) {
        this.active = false;
        this.human = human;
        this.goal = worldKnowledge.getRandomCell();
        while (this.human.getPosition().x === this.goal.x && this.human.getPosition().y === this.goal.y) {
            this.goal = worldKnowledge.getRandomCell();
        }
    }
    getNextState() {
        return (this.active && this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving()) ? this : null;
    }
    start(game) {
        this.active = true;
        if (!this.human.moveTo(this.goal)) {
            this.stop(game);
            return false;
        }
        return true;
    }
    stop(game) {
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.MOVE_RANDOM;
    }
}
exports.MoveRandomState = MoveRandomState;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(4);
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(2);
const RageState_1 = __webpack_require__(11);
class SitState {
    constructor(human, interactiveObject, worldKnowledge, tries = 0) {
        this.human = human;
        this.interactiveObject = interactiveObject;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
        this.tries = tries;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.interactiveObject) || this.worldKnowledge.isObjectUsed(this.interactiveObject)) {
                const nextSofa = this.worldKnowledge.getRandomFreeSittable();
                if (this.tries > this.human.getMaxRetries() || nextSofa === null) {
                    this.active = false;
                    this.human.stopWalk();
                    return new RageState_1.RageState(this.human);
                }
                else {
                    return new SitState(this.human, nextSofa, this.worldKnowledge, this.tries + 1);
                }
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.interactiveObject, this.interactiveObject.forceOrientation());
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.interactiveObject.forceOrientation());
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                        this.human.goToFreeCell(this.interactiveObject.getEntries());
                        this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                            this.active = false;
                        }, this));
                    }, this));
                }, this));
            }, this));
        }
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        if (!this.human.moveToClosest(this.interactiveObject.getPosition(), this.interactiveObject.getEntries())) {
            this.active = false;
            this.stop(game);
            return false;
        }
        return true;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.interactiveObject.getPosition());
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
}
exports.SitState = SitState;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(4);
const HumanStateManager_1 = __webpack_require__(1);
class SmokeState {
    constructor(human) {
        this.human = human;
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        game.time.events.add(Phaser.Math.random(1, 3) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SMOKE), this.end, this);
        this.active = true;
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SMOKE);
        this.human.updateMoodFromState();
        return true;
    }
    end() {
        this.active = false;
    }
    stop(game) {
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.SMOKE;
    }
}
exports.SmokeState = SmokeState;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(4);
const Meeting_1 = __webpack_require__(22);
const Direction_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
class TalkState {
    constructor(human, anotherHuman, game, worldKnowledge, meeting = null) {
        this.human = human;
        this.anotherHuman = anotherHuman;
        this.game = game;
        this.worldKnowledge = worldKnowledge;
        this.meetingStarted = false;
        this.events = [];
        this.meeting = meeting;
    }
    getNextState() {
        if (!this.meetingStarted) {
            if (!this.meeting.areAllHumanStillInMeeting()) {
                this.active = false;
            }
            else {
                if (this.meeting.isReady()) {
                    this.meetingStarted = true;
                    this.game.time.events.add(this.meeting.getTime() + Math.random() * Phaser.Timer.SECOND, this.end, this);
                    this.human.updateMoodFromState();
                    let animation = HumanAnimationManager_1.ANIMATION.TALK;
                    if (Math.random() > 0.5) {
                        animation = TalkState.otherAnimation(animation);
                    }
                    this.switchAnimation(animation);
                }
                else if (!this.human.isMoving()) {
                    const direction = Direction_1.Direction.getNeighborDirection(this.human.getPosition(), this.meeting.getAnotherHuman(this.human).getPosition());
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, Direction_1.Direction.isLeft(direction), Direction_1.Direction.isTop(direction));
                }
            }
        }
        return this.active ? this : null;
    }
    switchAnimation(animation) {
        const direction = Direction_1.Direction.getNeighborDirection(this.human.getPosition(), this.meeting.getAnotherHuman(this.human).getPosition());
        if (animation === HumanAnimationManager_1.ANIMATION.TALK) {
            this.human.showTalkBubble();
        }
        else {
            this.human.hideTalkBubble();
        }
        this.human.loadAnimation(animation, Direction_1.Direction.isLeft(direction), Direction_1.Direction.isTop(direction));
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 6) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(animation), this.switchAnimation, this, TalkState.otherAnimation(animation)));
    }
    start(game) {
        this.active = true;
        if (this.meeting === null) {
            this.meeting = new Meeting_1.Meeting([this.human, this.anotherHuman], Phaser.Math.random(8, 20) * Phaser.Timer.SECOND, this.worldKnowledge);
            if (!this.anotherHuman.goMeeting(this.meeting)) {
                this.end();
                return false;
            }
        }
        if (!this.human.moveTo(this.meeting.getCell(this.human))) {
            this.end();
            return false;
        }
        return true;
    }
    end() {
        this.human.hideTalkBubble();
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.active = false;
    }
    stop(game) {
        this.end();
    }
    getState() {
        return HumanStateManager_1.STATE.TALK;
    }
    static otherAnimation(animation) {
        return animation === HumanAnimationManager_1.ANIMATION.TALK ? HumanAnimationManager_1.ANIMATION.FREEZE : HumanAnimationManager_1.ANIMATION.TALK;
    }
}
exports.TalkState = TalkState;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(4);
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(2);
const RageState_1 = __webpack_require__(11);
class TypeState {
    constructor(human, interactiveObject, worldKnowledge, tries = 0) {
        this.human = human;
        this.interactiveObject = interactiveObject;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
        this.tries = tries;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.interactiveObject) || this.worldKnowledge.isObjectUsed(this.interactiveObject)) {
                const nextDesk = this.worldKnowledge.getClosestFreeDesk(this.human.getPosition());
                if (this.tries > this.human.getMaxRetries() || nextDesk === null) {
                    this.active = false;
                    this.human.stopWalk();
                    return new RageState_1.RageState(this.human);
                }
                else {
                    return new TypeState(this.human, nextDesk, this.worldKnowledge, this.tries + 1);
                }
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.interactiveObject, this.interactiveObject.forceOrientation());
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.interactiveObject.forceOrientation());
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE);
                    this.events.push(this.game.time.events.add(Phaser.Math.random(15, 60) * Phaser.Timer.SECOND, () => {
                        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                            this.human.goToFreeCell(this.interactiveObject.getEntries());
                            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                                this.active = false;
                            }, this));
                        }, this));
                    }, this));
                }));
            }, this));
        }
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        if (!this.human.moveToClosest(this.interactiveObject.getPosition(), this.interactiveObject.getEntries())) {
            this.active = false;
            return false;
        }
        return true;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.interactiveObject.getPosition());
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.TYPE;
    }
}
exports.TypeState = TypeState;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(5);
class ClosestPathFinder {
    constructor(game, worldKnowledge) {
        this.finders = {};
        this.worldKnowledge = worldKnowledge;
        const grid = worldKnowledge.getGrid();
        const acceptables = worldKnowledge.getAcceptables();
        Direction_1.Direction.neighborDirections().concat([Direction_1.DIRECTION.CURRENT]).forEach((direction) => {
            this.finders[direction] = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
            this.finders[direction].setGrid(grid, acceptables);
        });
    }
    getNeighborPath(originCell, goalCell, entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        return this.getPathInner(originCell, goalCell, entries);
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
    reset() {
        const grid = this.worldKnowledge.getGrid();
        const acceptables = this.worldKnowledge.getAcceptables();
        Object.keys(this.finders).forEach((key) => {
            this.finders[key].setGrid(grid, acceptables);
        });
    }
}
exports.ClosestPathFinder = ClosestPathFinder;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = __webpack_require__(12);
class HumanProperties {
    constructor(type, name, salary, speed, quality, perseverance) {
        this.type = type;
        this.name = name;
        this.salary = salary;
        this.speed = speed;
        this.quality = quality;
        this.perseverance = perseverance;
    }
    getSpriteKey() {
        switch (this.type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return 'human';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return 'human_pink';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return 'human_red';
        }
    }
    getName() {
        return this.name;
    }
    getSpeed() {
        return this.speed;
    }
    getStrType() {
        switch (this.type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return 'Developer';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return 'Marketing';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return 'Sale';
        }
    }
    getPerseverance() {
        return this.perseverance;
    }
}
exports.HumanProperties = HumanProperties;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(7);
class MoodRegister {
    constructor(humanRepository) {
        this.humanRepository = humanRepository;
        this.moods = [];
    }
    create(game) {
        game.time.events.loop(Phaser.Timer.SECOND, this.updateMood, this);
    }
    updateMood() {
        const moods = this.humanRepository.humans.map((human) => {
            return human.getMood();
        });
        const avgMood = moods.reduce((prev, mood) => { return prev + mood; }, 0) / moods.length;
        this.moods.push(avgMood);
    }
    getLastMoods() {
        let result = [];
        for (let i = 0; i < UserInterface_1.INTERFACE_WIDTH; i++) {
            result.push(this.moods[this.moods.length - 1 - i]);
        }
        return result;
    }
}
exports.MoodRegister = MoodRegister;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GAP_X = -7;
const GAP_Y = 1;
const DEBUG = false;
class MoodSprite {
    constructor() {
    }
    create(humanSprite, game, group) {
        this.parent = humanSprite;
        this.sprite = game.add.graphics(this.parent.position.x, this.parent.position.y, group);
        group.add(this.sprite);
    }
    update(generalMood, moods) {
        this.sprite.position.x = Math.ceil(this.parent.position.x + GAP_X);
        this.sprite.position.y = Math.ceil(this.parent.position.y + GAP_Y);
        this.sprite.clear();
        if (!DEBUG) {
            moods = [generalMood];
        }
        for (let i = 0; i < moods.length; i++) {
            this.sprite.moveTo(0, i * 2);
            if (moods[i] < 0.1) {
                this.sprite.lineStyle(2, 0xff004d);
            }
            else if (moods[i] < 0.5) {
                this.sprite.lineStyle(2, 0xfca203);
            }
            else {
                this.sprite.lineStyle(2, 0x00de2d);
            }
            this.sprite.lineTo(moods[i] * 15 + 1, i * 2);
        }
    }
}
exports.MoodSprite = MoodSprite;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const IMAGE_COUNT = 3;
class TalkBubble {
    create(humanSprite, game, group) {
        this.game = game;
        this.parent = humanSprite;
        this.sprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble', 0, group);
        this.sprite.anchor.set(1, 37 / this.sprite.height);
        group.add(this.sprite);
        this.imageSprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble_images', 0, group);
        this.imageSprite.anchor.set(1.2, 76 / this.sprite.height);
        group.add(this.imageSprite);
        this.switchImage();
        this.hide();
    }
    show() {
        this.sprite.alpha = 1;
        this.imageSprite.alpha = 1;
    }
    hide() {
        this.sprite.alpha = 0;
        this.imageSprite.alpha = 0;
    }
    update() {
        this.sprite.position = this.parent.position;
        this.sprite.scale.x = this.parent.scale.x;
        this.imageSprite.position = this.parent.position;
        this.imageSprite.scale.x = this.parent.scale.x;
    }
    static getRandomFrame() {
        return Math.floor(Math.random() * IMAGE_COUNT);
    }
    switchImage() {
        this.imageSprite.loadTexture(this.imageSprite.key, TalkBubble.getRandomFrame());
        this.game.time.events.add(Phaser.Math.random(2, 4) * Phaser.Timer.SECOND, this.switchImage, this);
    }
}
exports.TalkBubble = TalkBubble;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Depot {
    constructor() {
        this.objects = {};
    }
    add(name) {
        if (this.objects[name] === undefined) {
            this.objects[name] = 0;
        }
        this.objects[name]++;
    }
    getCount(name) {
        if (this.objects[name] === undefined) {
            return 0;
        }
        return this.objects[name];
    }
    remove(name) {
        if (this.objects[name] === undefined) {
            this.objects[name] = 0;
        }
        this.objects[name]--;
    }
}
exports.Depot = Depot;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const AbstractObject_1 = __webpack_require__(8);
const ObjectDeleter_1 = __webpack_require__(6);
class Desk extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Desk = Desk;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = __webpack_require__(8);
const ObjectDeleter_1 = __webpack_require__(6);
const Play_1 = __webpack_require__(0);
class Dispenser extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Dispenser = Dispenser;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(5);
class ObjectInfo {
    constructor(name, spriteInfos, entryPoints) {
        this.name = name;
        this.sprites = spriteInfos;
        this.entryPoints = entryPoints;
    }
    getName() {
        return this.name;
    }
    getSpriteInfos() {
        return this.sprites;
    }
    getEntryPoints(leftOriented) {
        if (!leftOriented) {
            return this.entryPoints;
        }
        else {
            return this.entryPoints.map((entryPoint) => {
                return Direction_1.Direction.getHorizontalMirror(entryPoint);
            });
        }
    }
}
exports.ObjectInfo = ObjectInfo;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfoRegistry_1 = __webpack_require__(13);
const PositionTransformer_1 = __webpack_require__(2);
const ObjectDeleter_1 = __webpack_require__(6);
const Direction_1 = __webpack_require__(5);
const Play_1 = __webpack_require__(0);
const ARROW_SIZE = 0.9;
const GAP = 4;
const SPRITE_OPACITY = 0.7;
class ObjectPhantom {
    constructor(name, game, worldKnowledge) {
        this.phantomSprites = [];
        this.leftOriented = false;
        this.worldKnowledge = worldKnowledge;
        this.position = new PIXI.Point(-10, -10);
        this.objectInfo = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(name);
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            this.phantomSprites.push(new PhantomSprite(spriteInfo));
        });
        this.directionsSprite = new DirectionsSprite(this);
        game.input.addMoveCallback((_pointer, x, y) => {
            this.updatePosition(new PIXI.Point(x, y), game.camera);
        }, this);
        this.putEvent = () => {
            if (this.worldKnowledge.canPutHere(this)) {
                this.put(game);
            }
        };
        game.input.activePointer.leftButton.onDown.add(this.putEvent);
        game.input.keyboard.onUpCallback = (event) => {
            if (event.keyCode == Phaser.Keyboard.ESC) {
                this.cancel(game);
                game.input.moveCallbacks = [];
            }
            else if (event.keyCode === Phaser.Keyboard.SPACEBAR) {
                this.switchOrientation();
            }
        };
    }
    create(game, groups) {
        this.directionsSprite.create(game, groups[Play_1.GROUP_INFOS]);
        this.directionsSprite.setPosition(this.position);
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.create(game, groups[Play_1.GROUP_INFOS]);
            phantomSprite.setPosition(this.position);
        });
        this.forbiddenSprite = game.add.sprite(0, 0, 'forbidden');
        this.forbiddenSprite.anchor.setTo(0.5, 0.5);
        groups[Play_1.GROUP_INFOS].add(this.forbiddenSprite);
    }
    cancel(game) {
        this.destroy();
        this.worldKnowledge.getDepot().add(this.objectInfo.getName());
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
    }
    destroy() {
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.destroy();
        });
        this.forbiddenSprite.destroy(true);
        this.directionsSprite.destroy();
    }
    updatePosition(point, camera) {
        const gappedPoint = new PIXI.Point(point.x + camera.x, point.y + camera.y);
        this.position = PositionTransformer_1.PositionTransformer.getCellPosition(gappedPoint);
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.setPosition(this.position);
        });
        this.directionsSprite.setPosition(this.position);
        this.updateForbiddenSprite();
    }
    switchOrientation() {
        this.leftOriented = !this.leftOriented;
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.updateOrientation(this.leftOriented);
            phantomSprite.setPosition(this.position);
        });
        this.updateForbiddenSprite();
        this.directionsSprite.updatePolygons();
    }
    getPosition() {
        return this.position;
    }
    getEntries() {
        return this.objectInfo.getEntryPoints(this.leftOriented);
    }
    updateForbiddenSprite() {
        const center = ObjectDeleter_1.ObjectDeleter.getCenterOfSprites(this.phantomSprites.map((phantomSprite) => {
            return phantomSprite.getSprite();
        }));
        this.forbiddenSprite.position.set(center.x, center.y);
        this.forbiddenSprite.alpha = this.worldKnowledge.canPutHere(this) ? 0 : 1;
    }
    put(game) {
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
        this.worldKnowledge.add(this.objectInfo.getName(), this.getPosition(), this.leftOriented);
        this.destroy();
    }
    getInfo() {
        return this.objectInfo;
    }
    getLeftOriented() {
        return this.leftOriented;
    }
    isEntryAccessible(direction) {
        return this.worldKnowledge.isEntryAccessibleForObject(this, direction);
    }
    isCellFree() {
        return this.worldKnowledge.isFree(this.getPosition());
    }
}
exports.ObjectPhantom = ObjectPhantom;
class DirectionsSprite {
    constructor(phantom) {
        this.phantom = phantom;
    }
    create(game, group) {
        this.graphics = game.add.graphics(0, 0, group);
        this.updatePolygons();
        group.add(this.graphics);
    }
    updatePolygons() {
        this.graphics.clear();
        Direction_1.Direction.neighborDirections().forEach((direction) => {
            if (this.phantom.getInfo().getEntryPoints(this.phantom.getLeftOriented()).indexOf(direction) <= -1) {
                this.graphics.beginFill(0x494947); // Grey
            }
            else if (this.phantom.isEntryAccessible(direction)) {
                this.graphics.beginFill(0x00de2d); // Green
            }
            else {
                this.graphics.beginFill(0xff004d); // Red
            }
            switch (direction) {
                case Direction_1.DIRECTION.BOTTOM:
                    this.graphics.drawPolygon(new PIXI.Point(-GAP, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, GAP), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.LEFT:
                    this.graphics.drawPolygon(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, -GAP), new PIXI.Point(-GAP, -PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.TOP:
                    this.graphics.drawPolygon(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, -GAP), new PIXI.Point(GAP, -PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.RIGHT:
                    this.graphics.drawPolygon(new PIXI.Point(GAP, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, GAP), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
            }
        });
        this.graphics.beginFill(this.phantom.isCellFree() ? 0x00de2d : 0xff004d);
        this.graphics.drawPolygon(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, 0), new PIXI.Point(0, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, 0), new PIXI.Point(0, -PositionTransformer_1.CELL_HEIGHT / 2));
    }
    setPosition(position) {
        this.graphics.x = PositionTransformer_1.PositionTransformer.getRealPosition(position).x;
        this.graphics.y = PositionTransformer_1.PositionTransformer.getRealPosition(position).y - PositionTransformer_1.CELL_HEIGHT / 2;
        this.updatePolygons();
    }
    destroy() {
        this.graphics.destroy(true);
    }
}
class PhantomSprite {
    constructor(infos) {
        this.spriteInfo = infos;
        this.leftOriented = false;
    }
    create(game, group) {
        this.sprite = game.add.sprite(0, 0, this.spriteInfo.getSpriteName(), 0, group);
        this.sprite.anchor.set(0.5, 1.0 - this.spriteInfo.getAnchorBottom() / this.sprite.height);
        this.sprite.alpha = SPRITE_OPACITY;
    }
    setPosition(position) {
        this.sprite.x = this.spriteInfo.getRealPosition(position, this.leftOriented).x;
        this.sprite.y = this.spriteInfo.getRealPosition(position, this.leftOriented).y;
    }
    destroy() {
        this.sprite.destroy(true);
    }
    updateOrientation(leftOriented) {
        this.leftOriented = leftOriented;
        this.sprite.scale.set(this.leftOriented ? -1 : 1, 1);
    }
    getSprite() {
        return this.sprite;
    }
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SELECTED = '_selected';
class ObjectSelector {
    static makeSelectable(sprites) {
        sprites.forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.click, this, 0, sprites);
        });
    }
    static setSelected(sprite, selected) {
        sprite.loadTexture(selected ?
            this.getSelectedKey(sprite.key) :
            this.getNonSelectedKey(sprite.key), sprite.frame, false);
    }
    static isSelected(tile) {
        return tile.key.indexOf(SELECTED) > -1;
    }
    static click(sprite, _pointer, sprites) {
        const isSelected = this.isSelected(sprite);
        sprites.forEach((sprite) => {
            this.setSelected(sprite, !isSelected);
        });
    }
    static getNonSelectedKey(key) {
        return key.replace(SELECTED, '');
    }
    static getSelectedKey(key) {
        if (key.indexOf(SELECTED) > -1) {
            return key;
        }
        return key + SELECTED;
    }
}
exports.ObjectSelector = ObjectSelector;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = __webpack_require__(8);
const ObjectDeleter_1 = __webpack_require__(6);
const Play_1 = __webpack_require__(0);
class Sofa extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
    forceOrientation() {
        return null;
    }
}
exports.Sofa = Sofa;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(2);
class SpriteInfo {
    constructor(name, left, bottom, anchorBottom, gapLeft) {
        this.name = name;
        this.left = left;
        this.bottom = bottom;
        this.anchorBottom = anchorBottom;
        this.gapLeft = gapLeft;
    }
    getSpriteName() {
        return this.name;
    }
    getAnchorBottom() {
        return this.anchorBottom;
    }
    getRealPosition(position, leftOriented) {
        return this.getRealPositionFromOrigin(PositionTransformer_1.PositionTransformer.getRealPosition(position), leftOriented);
    }
    getSittablePosition(leftOriented) {
        return new PIXI.Point(leftOriented ? -(this.left + this.gapLeft) : (this.left + this.gapLeft), this.bottom - this.anchorBottom + 3);
    }
    getRealPositionFromOrigin(spriteSource, leftOriented) {
        return new PIXI.Point(spriteSource.x + (leftOriented ? -this.left : this.left), spriteSource.y + this.bottom - this.anchorBottom);
    }
    getAnchor(sprite) {
        return new PIXI.Point(0.5, 1.0 - this.anchorBottom / sprite.height);
    }
}
exports.SpriteInfo = SpriteInfo;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const AbstractObject_1 = __webpack_require__(8);
const ObjectDeleter_1 = __webpack_require__(6);
class Table extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Table = Table;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(2);
const FAKE_MACHIN = -4;
class Wall {
    constructor(position) {
        this.cell = position;
    }
    create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        this.game = game;
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_MACHIN, 'wall', Wall.getFrame(hasWallLeft, hasWallTop, hasWallRight, hasWallBottom));
        this.sprite.anchor.set(0.5, 1 + (3 + FAKE_MACHIN) / this.sprite.height);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = __webpack_require__(14);
const HumanPropertiesFactory_1 = __webpack_require__(12);
class HumanRepository {
    constructor(worldKnowledge) {
        this.humans = [
            new Employee_1.Employee(worldKnowledge.getRandomCell(), HumanPropertiesFactory_1.HumanPropertiesFactory.create())
        ];
    }
    create(game, groups, worldKnowledge) {
        this.humans.forEach((human) => {
            human.create(game, groups, worldKnowledge);
        });
    }
    update() {
        this.humans.forEach((human) => {
            human.update();
        });
    }
    getSelectedHumanSprite() {
        for (let i = 0; i < this.humans.length; i++) {
            if (this.humans[i].isSelected()) {
                return this.humans[i].getSprite();
            }
        }
        return null;
    }
}
exports.HumanRepository = HumanRepository;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = __webpack_require__(42);
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
    getWall(x, y) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].getPosition().x === x && this.walls[i].getPosition().y === y) {
                return this.walls[i];
            }
        }
        return null;
    }
    hasWall(x, y) {
        return this.getWall(x, y) !== null;
    }
    getWalls() {
        return this.walls;
    }
}
exports.WallRepository = WallRepository;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = __webpack_require__(12);
const UserInterface_1 = __webpack_require__(7);
const app_1 = __webpack_require__(3);
const ObjectSeller_1 = __webpack_require__(16);
const Play_1 = __webpack_require__(0);
const TextStyle_1 = __webpack_require__(9);
class HumanEmployer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.applicantButtons = [];
        this.visible = true;
        for (let i = 0; i < 6; i++) {
            this.applicantButtons.push(new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(), this.worldKnowledge));
        }
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        let i = 0;
        this.applicantButtons.forEach((applicant) => {
            applicant.create(game, groups, i);
            i++;
        });
    }
    hide() {
        if (this.visible) {
            this.applicantButtons.forEach((applicantButton) => {
                applicantButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.applicantButtons.forEach((applicantButton) => {
                applicantButton.show();
            });
        }
        this.visible = true;
    }
    employ(applicant) {
        const index = this.applicantButtons.indexOf(applicant);
        this.applicantButtons[index] = new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(), this.worldKnowledge);
        this.applicantButtons[index].create(this.game, this.groups, index);
        this.worldKnowledge.addEmployee(applicant.getHumanProperties());
    }
}
exports.HumanEmployer = HumanEmployer;
class ApplicantButton {
    constructor(humanEmployer, humanProperties, worldKnowledge) {
        this.humanEmployer = humanEmployer;
        this.humanProperties = humanProperties;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE;
        const squareCenter = new PIXI.Point(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2, top + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, 0xffffff);
        this.square.drawRect(0, 0, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE);
        this.sprite = game.add.sprite(squareCenter.x, squareCenter.y, this.humanProperties.getSpriteKey(), 12, groups[Play_1.GROUP_INTERFACE]);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.input.pixelPerfectOver = true;
        this.sprite.input.pixelPerfectClick = true;
        this.sprite.input.useHandCursor = true;
        this.sprite.events.onInputDown.add(this.click, this, 0);
        this.name = game.add.text(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 3, top, this.humanProperties.getName(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.typeText = game.add.text(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 3, top + 8, this.humanProperties.getStrType(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
    }
    hide() {
        this.sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
    click() {
        this.sprite.destroy(true);
        this.name.destroy(true);
        this.typeText.destroy(true);
        this.square.destroy(true);
        this.humanEmployer.employ(this);
    }
    getHumanProperties() {
        return this.humanProperties;
    }
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(7);
const app_1 = __webpack_require__(3);
const Play_1 = __webpack_require__(0);
const HEIGHT = 80;
class InfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP;
        this.moods = game.add.graphics(left, top, groups[Play_1.GROUP_INTERFACE]);
    }
    update() {
        const lastMoods = this.worldKnowledge.getLastMoods();
        this.moods.clear();
        this.moods.lineStyle(1, 0xffffff);
        this.moods.moveTo(0, 0);
        this.moods.lineTo(0, HEIGHT);
        this.moods.lineTo(UserInterface_1.INTERFACE_WIDTH, HEIGHT);
        this.moods.moveTo(UserInterface_1.INTERFACE_WIDTH, HEIGHT - lastMoods[0] * HEIGHT);
        for (let i = 1; i < lastMoods.length; i++) {
            this.moods.lineTo(UserInterface_1.INTERFACE_WIDTH - i, HEIGHT - lastMoods[i] * HEIGHT);
        }
    }
    show() {
    }
    hide() {
    }
}
exports.InfoPanel = InfoPanel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);