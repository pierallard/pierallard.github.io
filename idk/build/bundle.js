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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(4);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = __webpack_require__(16);
const SmokeState_1 = __webpack_require__(20);
const SitState_1 = __webpack_require__(19);
const MoveRandomState_1 = __webpack_require__(18);
const TypeState_1 = __webpack_require__(22);
const TalkState_1 = __webpack_require__(21);
const CoffeeState_1 = __webpack_require__(15);
const HumanMoodManager_1 = __webpack_require__(8);
var STATE;
(function (STATE) {
    STATE[STATE["SMOKE"] = 0] = "SMOKE";
    STATE[STATE["FREEZE"] = 1] = "FREEZE";
    STATE[STATE["MOVE_RANDOM"] = 2] = "MOVE_RANDOM";
    STATE[STATE["SIT"] = 3] = "SIT";
    STATE[STATE["TYPE"] = 4] = "TYPE";
    STATE[STATE["TALK"] = 5] = "TALK";
    STATE[STATE["COFFEE"] = 6] = "COFFEE";
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
        if (!this.state.isActive()) {
            switch (this.randomNextStepName()) {
                case STATE.SMOKE:
                    this.state = new SmokeState_1.SmokeState(this.human);
                    break;
                case STATE.MOVE_RANDOM:
                    this.state = new MoveRandomState_1.MoveRandomState(this.human, this.worldKnowledge);
                    break;
                case STATE.SIT:
                    this.state = new SitState_1.SitState(this.human, this.worldKnowledge.getRandomFreeSofa(), this.worldKnowledge);
                    break;
                case STATE.TYPE:
                    this.state = new TypeState_1.TypeState(this.human, this.worldKnowledge.getRandomFreeDesk(), this.worldKnowledge);
                    break;
                case STATE.COFFEE:
                    this.state = new CoffeeState_1.CoffeeState(this.human, this.worldKnowledge.getRandomFreeDispenser(), this.worldKnowledge);
                    break;
                case STATE.TALK:
                    this.state = new TalkState_1.TalkState(this.human, this.worldKnowledge.getAnotherFreeHuman(this.human), game, this.worldKnowledge);
                    break;
                case STATE.FREEZE:
                default:
                    this.state = new FreezeState_1.FreezeState(this.human);
            }
            if (this.state.start(game)) {
                console.log('New state: ' + this.state.constructor.name);
            }
            else {
                console.log('State ' + this.state.constructor.name + ' failed. Retry.');
                this.updateState(game);
            }
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
        if (this.worldKnowledge.getRandomFreeSofa() !== null) {
            states.push({ state: STATE.SIT, probability: this.getProbability(STATE.SIT) });
        }
        if (this.worldKnowledge.getRandomFreeDesk() !== null) {
            states.push({ state: STATE.TYPE, probability: this.getProbability(STATE.TYPE) });
        }
        if (this.worldKnowledge.getRandomFreeDispenser() !== null) {
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
                result = 1;
                break;
            case STATE.MOVE_RANDOM:
                result = 2;
                break;
            case STATE.TALK:
                result = 8;
                break;
            case STATE.SIT:
                result = 2;
                break;
            case STATE.COFFEE:
                result = 6;
                break;
            case STATE.TYPE:
                result = 5 + 1 + 2 + 8 + 2 + 6;
                break;
        }
        if (state === this.state.getState()) {
            result = result / 10;
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
const WorldKnowledge_1 = __webpack_require__(7);
const app_1 = __webpack_require__(4);
const UserInterface_1 = __webpack_require__(11);
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
/* 3 */
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
                console.log('UNKNOWN ANIMATION ' + animation);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(13);
const Preload_1 = __webpack_require__(14);
const Play_1 = __webpack_require__(2);
exports.SCALE = 3;
exports.CAMERA_WIDTH_PIXELS = 1280 / exports.SCALE;
exports.CAMERA_HEIGHT_PIXELS = 720 / exports.SCALE;
exports.WORLD_WIDTH = 1280 * 1.1 / 3;
exports.WORLD_HEIGHT = 720 * 1.1 / 3;
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
}
exports.Direction = Direction;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const ClosestPathFinder_1 = __webpack_require__(23);
const Direction_1 = __webpack_require__(5);
const HumanAnimationManager_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
const ObjectSelector_1 = __webpack_require__(10);
const TalkBubble_1 = __webpack_require__(25);
const HumanMoodManager_1 = __webpack_require__(8);
const MoodSprite_1 = __webpack_require__(24);
const Play_1 = __webpack_require__(2);
exports.WALK_CELL_DURATION = 1200;
const GAP_FROM_BOTTOM = -8;
const PATH_DEBUG = false;
class Human {
    constructor(cell) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.stateManager = new HumanStateManager_1.HumanStateManager(this);
        this.anchorPixels = new PIXI.Point(0, GAP_FROM_BOTTOM);
        this.animationManager = new HumanAnimationManager_1.HumanAnimationManager();
        this.talkBubble = new TalkBubble_1.TalkBubble();
        this.moodManager = new HumanMoodManager_1.HumanMoodManager();
        this.moodSprite = new MoodSprite_1.MoodSprite();
    }
    create(game, groups, worldKnowledge) {
        this.game = game;
        this.worldKnowledge = worldKnowledge;
        this.moodManager.create(game);
        this.sprite = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y, 24, 25, Math.random() > 0.5 ? 'human' : 'human_red');
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
        const isLeft = Human.isHumanLeft(direction);
        const isTop = Human.isHumanTop(direction);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.WALK, isLeft, isTop);
        this.moving = true;
        this.game.add.tween(this.sprite.position).to({
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
        const side = (isLeft !== null) ? isLeft : Human.isHumanLeft(direction);
        // Human has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
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
    resetAStar(startPosition, endPosition) {
        console.log('Move object -> reset');
        this.closestPathFinder.reset();
        if (this.path !== null) {
            const matchingPath = this.path.filter((cell) => {
                return cell.x === endPosition.x && cell.y === endPosition.y;
            });
            if (matchingPath.length > 0) {
                const goal = this.path[this.path.length - 1];
                this.moveTo(goal);
                return;
            }
        }
        if (this.cell.x == startPosition.x && this.cell.y == startPosition.y) {
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
    getMood(mmod) {
        return this.moodManager.getMood(mmod);
    }
}
exports.Human = Human;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanRepository_1 = __webpack_require__(32);
const Sofa_1 = __webpack_require__(30);
const Desk_1 = __webpack_require__(27);
const Dispenser_1 = __webpack_require__(28);
const WallRepository_1 = __webpack_require__(33);
const Cell_1 = __webpack_require__(12);
const PositionTransformer_1 = __webpack_require__(0);
const Play_1 = __webpack_require__(2);
const Depot_1 = __webpack_require__(26);
const GRID_WIDTH = 12;
const GRID_HEIGHT = 12;
exports.DEBUG_WORLD = false;
class WorldKnowledge {
    constructor() {
        this.cells = [];
        this.objects = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        this.wallRepository = new WallRepository_1.WallRepository();
        this.depot = new Depot_1.Depot();
        if (exports.DEBUG_WORLD) {
            this.wallRepository.addWall(new PIXI.Point(5, 5));
            this.wallRepository.addWall(new PIXI.Point(6, 5));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 5), this));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 6), this));
            this.objects.push(new Dispenser_1.Dispenser(new PIXI.Point(5, 4), this));
        }
        else {
            for (let x = 0; x < GRID_WIDTH; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, 0));
                this.wallRepository.addWall(new PIXI.Point(x, GRID_HEIGHT - 1));
            }
            for (let y = 1; y < (GRID_HEIGHT - 1); y++) {
                this.wallRepository.addWall(new PIXI.Point(0, y));
                this.wallRepository.addWall(new PIXI.Point(GRID_WIDTH - 1, y));
            }
            for (let x = 1; x < 3 - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, GRID_WIDTH / 2 + 1));
            }
            for (let x = 5; x < GRID_WIDTH - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, GRID_WIDTH / 2 + 1));
            }
            [
                new PIXI.Point(4, 3),
                new PIXI.Point(4, 4),
                new PIXI.Point(3, 4),
                new PIXI.Point(3, 3),
            ].forEach((cell) => {
                this.wallRepository.addWall(cell);
            });
            for (let i = 0; i < 10; i++) {
                this.objects.push(new Desk_1.Desk(this.getRandomCell(), this));
            }
            for (let i = 0; i < 3; i++) {
                this.objects.push(new Sofa_1.Sofa(this.getRandomCell(), this));
            }
            for (let i = 0; i < 10; i++) {
                this.objects.push(new Dispenser_1.Dispenser(this.getRandomCell(), this));
            }
        }
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
    }
    create(game, groups) {
        console.log(Play_1.GROUP_OBJECTS_AND_HUMANS);
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
    resetAStar(startPosition, endPosition) {
        this.humanRepository.humans.forEach((human) => {
            human.resetAStar(startPosition, endPosition);
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
        if (point.x < 0 || point.y < 0 || point.x >= GRID_WIDTH || point.y >= GRID_HEIGHT) {
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
    getRandomFreeSofa() {
        const freeSofas = this.objects.filter((object) => {
            return object.constructor.name === 'Sofa' && !this.isObjectUsed(object);
        });
        if (freeSofas.length === 0) {
            return null;
        }
        return freeSofas[Math.floor(Math.random() * freeSofas.length)];
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
    getRandomFreeDesk() {
        const freeDesks = this.objects.filter((object) => {
            return object.constructor.name === 'Desk' && !this.isObjectUsed(object);
        });
        if (freeDesks.length === 0) {
            return null;
        }
        return freeDesks[Math.floor(Math.random() * freeDesks.length)];
    }
    getRandomFreeDispenser() {
        const freeDispensers = this.objects.filter((object) => {
            return object.constructor.name === 'Dispenser' && !this.isObjectUsed(object);
        });
        if (freeDispensers.length === 0) {
            return null;
        }
        return freeDispensers[Math.floor(Math.random() * freeDispensers.length)];
    }
    static getDist(sources, point) {
        let dist = 0;
        sources.forEach((source) => {
            dist += PositionTransformer_1.PositionTransformer.dist(source, point);
        });
        return dist;
    }
    moveToDepot(object) {
        const index = this.objects.indexOf(object, 0);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
        this.depot.add(object.constructor.name);
    }
    getDepot() {
        return this.depot;
    }
}
exports.WorldKnowledge = WorldKnowledge;


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const ObjectSelector_1 = __webpack_require__(10);
class ObjectMover {
    static makeMovable(movableObject, worldKnowledge) {
        movableObject.getSprites().forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.select, this, 0, movableObject, worldKnowledge);
        });
    }
    static select(sprite, _pointer, movableObject, worldKnowledge) {
        const gap = new PIXI.Point(_pointer.position.x - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).x, _pointer.position.y - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).y);
        const moveCallback = (p, x, y) => {
            movableObject.tryToMove(PositionTransformer_1.PositionTransformer.getCellPosition(new PIXI.Point(x - gap.x, y - gap.y)));
        };
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, true);
        });
        _pointer.game.input.addMoveCallback(moveCallback, this);
        sprite.events.onInputUp.add(this.unselect, this, 0, movableObject, worldKnowledge, movableObject.getPosition());
    }
    static unselect(sprite, _pointer, bool, movableObject, worldKnowledge, startPoint) {
        _pointer.game.input.moveCallbacks = [];
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, false);
        });
        if (startPoint.x !== movableObject.getPosition().x || startPoint.y !== movableObject.getPosition().y) {
            worldKnowledge.resetAStar(startPoint, movableObject.getPosition());
        }
    }
}
exports.ObjectMover = ObjectMover;


/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(2);
const app_1 = __webpack_require__(4);
const ObjectSeller_1 = __webpack_require__(34);
exports.INTERFACE_WIDTH = 100;
class UserInterface {
    constructor(worldKnowledge) {
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(0x272a60);
        this.backgroundGraphics.drawRect(0, 0, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS);
        interfaceGroup.add(this.backgroundGraphics);
        for (let i = 0; i < 10; i++) {
            this.backgroundGraphics.endFill();
            this.backgroundGraphics.lineStyle(1, 0xffffff);
            this.backgroundGraphics.drawRect(0, 10 + i * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE);
        }
        this.objectSeller.create(game, interfaceGroup);
    }
    update() {
        this.objectSeller.update();
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const WorldKnowledge_1 = __webpack_require__(7);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(4);
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
/* 14 */
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
        this.game.load.spritesheet('casedefault', 'assets/casedefault.png', 40, 19);
        this.game.load.spritesheet('woodcell', 'assets/woodcell.png', 40, 19);
        this.game.load.spritesheet('chair', 'assets/chair.png', 40, 40);
        this.game.load.spritesheet('chair_selected', 'assets/chair_selected.png', 40, 40);
        this.game.load.spritesheet('desk', 'assets/desk.png', 40, 40);
        this.game.load.spritesheet('desk_selected', 'assets/desk_selected.png', 40, 40);
        this.game.load.spritesheet('wall', 'assets/wall.png', 40, 37, 16);
        this.game.load.spritesheet('sofa', 'assets/sofa.png', 8, 6);
        this.game.load.spritesheet('dispenser', 'assets/dispenser.png', 26, 35);
        this.game.load.spritesheet('dispenser_selected', 'assets/dispenser_selected.png', 26, 35);
        this.game.load.spritesheet('sofa_selected', 'assets/sofa_selected.png', 8, 6);
        this.game.load.spritesheet('bubble', 'assets/bubble.png', 13, 15);
        this.game.load.spritesheet('bubble_images', 'assets/bubble_images.png', 9, 7);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(6);
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(0);
const HumanAnimationManager_1 = __webpack_require__(3);
class CoffeeState {
    constructor(human, dispenser, worldKnowledge) {
        this.human = human;
        this.dispenser = dispenser;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
    }
    isActive() {
        if (!this.isHumanOnTheRightCell) {
            if (this.worldKnowledge.isObjectUsed(this.dispenser)) {
                this.active = false;
                return false;
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.dispenser, this.dispenser.forceOrientation());
            this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK), () => {
                    this.human.goToFreeCell(this.dispenser.getEntries());
                    this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                        this.active = false;
                    }, this));
                }, this));
            }));
        }
        return this.active;
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
class FreezeState {
    constructor(human) {
        this.human = human;
    }
    isActive() {
        return this.active;
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
/* 17 */
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
/* 18 */
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
    isActive() {
        return this.active && this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving();
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(6);
const HumanAnimationManager_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(0);
class SitState {
    constructor(human, interactiveObject, worldKnowledge) {
        this.human = human;
        this.interactiveObject = interactiveObject;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
    }
    isActive() {
        if (!this.isHumanOnTheRightCell) {
            if (this.worldKnowledge.isObjectUsed(this.interactiveObject)) {
                this.active = false;
                return false;
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.interactiveObject);
            this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN);
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                        this.human.goToFreeCell(this.interactiveObject.getEntries());
                        this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                            this.active = false;
                        }, this));
                    }, this));
                }, this));
            }, this));
        }
        return this.active;
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
class SmokeState {
    constructor(human) {
        this.human = human;
    }
    isActive() {
        return this.active;
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(3);
const Meeting_1 = __webpack_require__(17);
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
    isActive() {
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
        return this.active;
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(6);
const HumanAnimationManager_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
const PositionTransformer_1 = __webpack_require__(0);
class TypeState {
    constructor(human, interactiveObject, worldKnowledge) {
        this.human = human;
        this.interactiveObject = interactiveObject;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
    }
    isActive() {
        if (!this.isHumanOnTheRightCell) {
            if (this.worldKnowledge.isObjectUsed(this.interactiveObject)) {
                this.active = false;
                return false;
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.interactiveObject, this.interactiveObject.forceOrientation());
            this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.interactiveObject.forceOrientation());
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE);
                    this.events.push(this.game.time.events.add(Phaser.Math.random(5, 10) * Phaser.Timer.SECOND, () => {
                        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                            this.human.goToFreeCell(this.interactiveObject.getEntries());
                            this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                                this.active = false;
                            }, this));
                        }, this));
                    }, this));
                }));
            }, this));
        }
        return this.active;
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
}
exports.Depot = Depot;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const Direction_1 = __webpack_require__(5);
const ObjectMover_1 = __webpack_require__(9);
const Play_1 = __webpack_require__(2);
/**
 * This variable will fake the position of the sprite without changing it for the enduser.
 * A negative number (e.g. -10) will draw the object 10 pixels on the top but will update the anchor to put it back
 * to its position.
 * If the Human is not seen because the object is in front of it, you have to put a more negative number.
 * @type {number}
 */
const FAKE_ANCHOR_BOTTOM = -4;
/**
 * Negative : will display the object to the left
 * @type {number}
 */
const GAP_HORIZONTAL = -10;
/**
 * Negative: Will display the object to the top
 * @type {number}
 */
const GAP_VERTICAL = -8;
class Desk {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        const isLeftOriented = Math.random() >= 0.5;
        this.chairSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + (isLeftOriented ? -GAP_HORIZONTAL : GAP_HORIZONTAL), PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM + GAP_VERTICAL, 'chair');
        this.deskSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM, 'desk');
        this.chairSprite.anchor.set(0.5, 1 + FAKE_ANCHOR_BOTTOM / this.chairSprite.height);
        this.deskSprite.anchor.set(0.5, 1 + FAKE_ANCHOR_BOTTOM / this.deskSprite.height);
        ObjectMover_1.ObjectMover.makeMovable(this, this.worldKnowledge);
        if (isLeftOriented) {
            this.deskSprite.scale.set(-1, 1);
            this.chairSprite.scale.set(-1, 1);
        }
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.chairSprite);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.deskSprite);
    }
    getPosition() {
        return this.position;
    }
    getPositionGap() {
        return new PIXI.Point(this.isLeftOriented() ? -GAP_HORIZONTAL : GAP_HORIZONTAL, GAP_VERTICAL - 2);
    }
    getEntries() {
        return this.isLeftOriented() ?
            [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP] :
            [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT];
    }
    isLeftOriented() {
        return this.deskSprite.scale.x === -1;
    }
    forceOrientation() {
        return this.isLeftOriented();
    }
    getSprites() {
        return [this.deskSprite, this.chairSprite];
    }
    tryToMove(point) {
        if (this.worldKnowledge.isFree(point, this)) {
            this.position = point;
            this.chairSprite.position.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + (this.isLeftOriented() ? -GAP_HORIZONTAL : GAP_HORIZONTAL);
            this.chairSprite.position.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM + GAP_VERTICAL;
            this.deskSprite.position.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x;
            this.deskSprite.position.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM;
        }
    }
}
exports.Desk = Desk;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const Direction_1 = __webpack_require__(5);
const ObjectDeleter_1 = __webpack_require__(29);
const Play_1 = __webpack_require__(2);
const DISPENSER_BOTTOM = -4;
const DISPENSER_LEFT = 4;
const DISPENSER_ANCHOR_BOTTOM = 3;
class Dispenser {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + DISPENSER_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + DISPENSER_BOTTOM - DISPENSER_ANCHOR_BOTTOM, 'dispenser');
        this.sprite.anchor.set(0.5, 1.0 - DISPENSER_ANCHOR_BOTTOM / this.sprite.height);
        // ObjectMover.makeMovable(this, this.worldKnowledge);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
    getSprites() {
        return [this.sprite];
    }
    getEntries() {
        return [Direction_1.DIRECTION.BOTTOM];
    }
    getPositionGap() {
        return new PIXI.Point(0, 0);
    }
    forceOrientation() {
        return true;
    }
    remove() {
        this.worldKnowledge.moveToDepot(this);
        this.sprite.destroy(true);
    }
}
exports.Dispenser = Dispenser;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const POINTS = 20;
const RADIUS = 6;
const DELAY = 1500;
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
        const xMin = object.getSprites().map((sprite) => {
            return (sprite.position.x - sprite.width / 2);
        }).reduce((a, b) => {
            return Math.min(a, b);
        });
        const xMax = object.getSprites().map((sprite) => {
            return (sprite.position.x + sprite.width / 2);
        }).reduce((a, b) => {
            return Math.max(a, b);
        });
        const yMin = object.getSprites().map((sprite) => {
            return (sprite.position.y);
        }).reduce((a, b) => {
            return Math.min(a, b);
        });
        const yMax = object.getSprites().map((sprite) => {
            return (sprite.position.y - sprite.width);
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
const Direction_1 = __webpack_require__(5);
const ObjectMover_1 = __webpack_require__(9);
const Play_1 = __webpack_require__(2);
const SOFA_BOTTOM = -8;
const SOFA_LEFT = 0;
const SOFA_ANCHOR_BOTTOM = 3;
class Sofa {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + SOFA_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + SOFA_BOTTOM - SOFA_ANCHOR_BOTTOM, 'sofa');
        this.sprite.anchor.set(0.5, 1.0 - SOFA_ANCHOR_BOTTOM / this.sprite.height);
        ObjectMover_1.ObjectMover.makeMovable(this, this.worldKnowledge);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
    getPositionGap() {
        return new PIXI.Point(SOFA_LEFT, SOFA_BOTTOM);
    }
    getEntries() {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM];
    }
    forceOrientation() {
        return null;
    }
    getSprites() {
        return [this.sprite];
    }
    tryToMove(point) {
        if (this.worldKnowledge.isFree(point, this)) {
            this.position = point;
            this.sprite.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + SOFA_LEFT;
            this.sprite.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + SOFA_BOTTOM - SOFA_ANCHOR_BOTTOM;
        }
    }
}
exports.Sofa = Sofa;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(0);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = __webpack_require__(6);
class HumanRepository {
    constructor(worldKnowledge) {
        this.humans = [
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell())
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = __webpack_require__(31);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(11);
const app_1 = __webpack_require__(4);
exports.OBJECT_SELLER_CELL_SIZE = 35;
var OBJECT;
(function (OBJECT) {
    OBJECT[OBJECT["SOFA"] = 0] = "SOFA";
    OBJECT[OBJECT["DESK"] = 1] = "DESK";
    OBJECT[OBJECT["DISPENSER"] = 2] = "DISPENSER";
})(OBJECT || (OBJECT = {}));
class ObjectSeller {
    constructor(worldKnowledge) {
        this.sellerButtons = [];
        this.worldKnowledge = worldKnowledge;
        ObjectSeller.objectProperties().forEach((objectProperties) => {
            this.sellerButtons.push(new SellerButton(objectProperties.type, objectProperties.class, objectProperties.sprite));
        });
    }
    create(game, interfaceGroup) {
        let i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, interfaceGroup, i);
            i++;
        });
    }
    update() {
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateCount(this.getCount(sellerButton.getKlass()));
        });
    }
    static objectProperties() {
        let result = [];
        result.push({
            type: OBJECT.SOFA,
            class: 'Sofa',
            sprite: 'sofa'
        });
        result.push({
            type: OBJECT.DESK,
            class: 'Desk',
            sprite: 'desk'
        });
        result.push({
            type: OBJECT.DISPENSER,
            class: 'Dispenser',
            sprite: 'dispenser'
        });
        return result;
    }
    getCount(klass) {
        return this.worldKnowledge.getDepot().getCount(klass);
    }
}
exports.ObjectSeller = ObjectSeller;
class SellerButton {
    constructor(type, klass, sprite) {
        this.type = type;
        this.klass = klass;
        this.sprite = sprite;
    }
    create(game, interfaceGroup, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const seller = game.add.sprite(left + exports.OBJECT_SELLER_CELL_SIZE / 2, 10 + (index + 1) * exports.OBJECT_SELLER_CELL_SIZE - exports.OBJECT_SELLER_CELL_SIZE / 2, this.sprite);
        seller.anchor.set(0.5, 0.5);
        interfaceGroup.add(seller);
        const circle = game.add.graphics(left, index * exports.OBJECT_SELLER_CELL_SIZE + 10, interfaceGroup);
        circle.beginFill(0xff0000);
        circle.drawCircle(exports.OBJECT_SELLER_CELL_SIZE, 0, 10);
        interfaceGroup.add(circle);
        this.counter = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE - 4, index * exports.OBJECT_SELLER_CELL_SIZE + 10 - 6, '', {
            align: 'center',
            fill: "#ffffff",
            font: '16px 000webfont'
        }, interfaceGroup);
        interfaceGroup.add(this.counter);
        this.updateCount(0);
    }
    getKlass() {
        return this.klass;
    }
    updateCount(count) {
        const str = count + '';
        this.counter.setText(str);
        if (str.length > 1) {
            this.counter.position.set(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + exports.OBJECT_SELLER_CELL_SIZE - 4, this.counter.position.y);
        }
        else {
            this.counter.position.set(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + exports.OBJECT_SELLER_CELL_SIZE - 1, this.counter.position.y);
        }
    }
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);