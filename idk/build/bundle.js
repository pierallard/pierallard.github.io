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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = __webpack_require__(17);
const app_1 = __webpack_require__(3);
const UserInterface_1 = __webpack_require__(6);
exports.GROUP_FLOOR = 'floor';
exports.GROUP_OBJECTS_AND_HUMANS = 'objects_and_humans';
exports.GROUP_INFOS = 'infos';
exports.GROUP_INTERFACE = 'interface';
exports.GROUP_TOOLTIP = 'tooltip';
exports.CAMERA_GAP = 2;
class Play extends Phaser.State {
    constructor() {
        super();
        this.worldKnowledge = new WorldKnowledge_1.WorldKnowledge();
        this.userInterface = new UserInterface_1.UserInterface(this.worldKnowledge);
        this.worldKnowledge.setUserInterface(this.userInterface);
    }
    create() {
        this.game.stage.backgroundColor = "#494947";
        this.groups = {};
        this.groups[exports.GROUP_FLOOR] = this.game.add.group();
        this.groups[exports.GROUP_OBJECTS_AND_HUMANS] = this.game.add.group();
        this.groups[exports.GROUP_INFOS] = this.game.add.group();
        this.groups[exports.GROUP_INTERFACE] = this.game.add.group();
        this.groups[exports.GROUP_TOOLTIP] = this.game.add.group();
        this.groups[exports.GROUP_INTERFACE].fixedToCamera = true;
        this.groups[exports.GROUP_TOOLTIP].fixedToCamera = true;
        this.worldKnowledge.create(this.game, this.groups);
        this.userInterface.create(this.game, this.groups);
        this.game.world.setBounds(0, 0, app_1.WORLD_WIDTH + UserInterface_1.INTERFACE_WIDTH, app_1.WORLD_HEIGHT);
        this.game.camera.setPosition((app_1.WORLD_WIDTH - app_1.CAMERA_WIDTH_PIXELS) / 2, (app_1.WORLD_HEIGHT - app_1.CAMERA_HEIGHT_PIXELS) / 2);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        // const text = this.game.add.bitmapText(CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + 60, 2, 'retro_computer','Bitmap Fonts!',7, this.groups[GROUP_INTERFACE]);
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
        /*
        const selected = this.worldKnowledge.getSelectedHumanSprite();
        if (null !== selected) {
            this.game.camera.follow(selected, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }*/
    }
}
exports.default = Play;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = __webpack_require__(31);
const SmokeState_1 = __webpack_require__(36);
const SitState_1 = __webpack_require__(34);
const MoveRandomState_1 = __webpack_require__(33);
const TypeState_1 = __webpack_require__(39);
const TalkState_1 = __webpack_require__(38);
const CoffeeState_1 = __webpack_require__(30);
const HumanMoodManager_1 = __webpack_require__(19);
const SitTalkState_1 = __webpack_require__(35);
const RageState_1 = __webpack_require__(11);
const ThoughtBubble_1 = __webpack_require__(9);
const LIMIT = 0.8;
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
    STATE[STATE["SIT_TALK"] = 8] = "SIT_TALK";
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
                this.state = new SitState_1.SitState(this.human, this.worldKnowledge.getClosestReferer(['Sofa'], 1, this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.TYPE:
                this.state = new TypeState_1.TypeState(this.human, this.worldKnowledge.getClosestReferer(['Desk'], 1, this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.COFFEE:
                this.state = new CoffeeState_1.CoffeeState(this.human, this.worldKnowledge.getClosestReferer(['Dispenser'], 1, this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.TALK:
                this.state = new TalkState_1.TalkState(this.human, this.worldKnowledge.getAnotherFreeHuman(this.human), this.worldKnowledge);
                break;
            case STATE.SIT_TALK:
                this.state = new SitTalkState_1.SitTalkState(this.human, this.worldKnowledge.getClosestReferer(['Table'], 4, this.human.getPosition()).getObject(), this.worldKnowledge.getAnotherFreeHumans(this.human, 3), this.worldKnowledge);
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
        const states = this.getNextProbabilities();
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
    getNextProbabilities() {
        const states = [];
        if (this.worldKnowledge.getClosestReferer(['Desk']) !== null) {
            states.push({ state: STATE.TYPE, probability: this.getProbability(STATE.TYPE) });
        }
        if (this.worldKnowledge.getClosestReferer(['Table'], 4) !== null &&
            this.worldKnowledge.getAnotherFreeHumans(this.human, 3).length === 3) {
            states.push({ state: STATE.SIT_TALK, probability: this.getProbability(STATE.SIT_TALK) });
        }
        if (this.worldKnowledge.getClosestReferer(['Dispenser']) !== null) {
            states.push({ state: STATE.COFFEE, probability: this.getProbability(STATE.COFFEE) });
        }
        if (this.worldKnowledge.getClosestReferer(['Sofa']) !== null) {
            states.push({ state: STATE.SIT, probability: this.getProbability(STATE.SIT) });
        }
        if (this.worldKnowledge.getAnotherFreeHuman(this.human) !== null) {
            states.push({ state: STATE.TALK, probability: this.getProbability(STATE.TALK) });
        }
        states.push({ state: STATE.FREEZE, probability: this.getProbability(STATE.FREEZE) });
        states.push({ state: STATE.MOVE_RANDOM, probability: this.getProbability(STATE.MOVE_RANDOM) });
        states.push({ state: STATE.SMOKE, probability: this.getProbability(STATE.SMOKE) });
        return states;
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
            case STATE.SIT_TALK:
                result = 6;
                break;
            case STATE.TYPE:
                result = (5 + 1 + 2 + 8 + 2 + 6 + 6);
                break;
        }
        if (state === this.state.getState()) {
            result = result / 2;
        }
        if (this.state instanceof RageState_1.RageState) {
            const rageState = this.state;
            if (rageState.getRageImage() === ThoughtBubble_1.RAGE_IMAGE.COFFEE && state === STATE.COFFEE) {
                result = result / 3;
            }
            if (rageState.getRageImage() === ThoughtBubble_1.RAGE_IMAGE.LAPTOP && state === STATE.TYPE) {
                result = result / 3;
            }
            if (rageState.getRageImage() === ThoughtBubble_1.RAGE_IMAGE.SLEEP && state === STATE.SIT) {
                result = result / 3;
            }
            if (rageState.getRageImage() === ThoughtBubble_1.RAGE_IMAGE.TABLE && state === STATE.SIT_TALK) {
                result = result / 3;
            }
        }
        HumanMoodManager_1.HumanMoodManager.getMoods().forEach((mood) => {
            if (this.human.getMood(mood) < LIMIT) {
                if (HumanStateManager.getMoodGains(state)[mood] > 0) {
                    let ratio = 1 - this.human.getMood(mood) / LIMIT;
                    ratio = ratio * HumanStateManager.getMoodGains(state)[mood] * 8;
                    result = result * (1 + ratio);
                }
            }
        });
        return result;
    }
    static getMoodGains(state) {
        let result = {};
        switch (state) {
            case STATE.SMOKE:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.1;
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
            case STATE.SIT_TALK:
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.6;
                break;
        }
        return result;
    }
    reset(game) {
        this.state.stop();
        this.updateState(game);
    }
    goMeeting(game, meeting) {
        this.state.stop();
        this.state = new TalkState_1.TalkState(this.human, null, this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    goSitMeeting(game, meeting) {
        this.state.stop();
        this.state = new SitTalkState_1.SitTalkState(this.human, meeting.getTable(), meeting.getAnotherHumans(this.human), this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    getState() {
        return this.state.getState();
    }
    static getStr(state) {
        switch (state) {
            case STATE.SMOKE: return 'Smoke';
            case STATE.FREEZE: return 'Freeze';
            case STATE.MOVE_RANDOM: return 'Move';
            case STATE.SIT: return 'Sit';
            case STATE.TYPE: return 'Work';
            case STATE.TALK: return 'Talk';
            case STATE.COFFEE: return 'Coffee';
            case STATE.RAGE: return 'Rage';
            case STATE.SIT_TALK: return 'Meeting';
        }
    }
}
exports.HumanStateManager = HumanStateManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var COLOR;
(function (COLOR) {
    COLOR[COLOR["BLACK"] = 512] = "BLACK";
    COLOR[COLOR["WHITE"] = 16773349] = "WHITE";
    COLOR[COLOR["DARK_GREY"] = 4802887] = "DARK_GREY";
    COLOR[COLOR["LIGHT_GREY"] = 13025990] = "LIGHT_GREY";
    COLOR[COLOR["MARROON"] = 11030581] = "MARROON";
    COLOR[COLOR["SKIN"] = 16698281] = "SKIN";
    COLOR[COLOR["ORANGE"] = 16556547] = "ORANGE";
    COLOR[COLOR["YELLOW"] = 16508205] = "YELLOW";
    COLOR[COLOR["DARK_GREEN"] = 885038] = "DARK_GREEN";
    COLOR[COLOR["LIGHT_GREEN"] = 56877] = "LIGHT_GREEN";
    COLOR[COLOR["LIGHT_BLUE"] = 2338302] = "LIGHT_BLUE";
    COLOR[COLOR["DARK_BLUE"] = 2566752] = "DARK_BLUE";
    COLOR[COLOR["LIGHT_PURPLE"] = 8878490] = "LIGHT_PURPLE";
    COLOR[COLOR["DARK_PURPLE"] = 8267345] = "DARK_PURPLE";
    COLOR[COLOR["RED"] = 16711757] = "RED";
    COLOR[COLOR["ROSE"] = 16611753] = "ROSE";
})(COLOR = exports.COLOR || (exports.COLOR = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(28);
const Preload_1 = __webpack_require__(29);
const Play_1 = __webpack_require__(0);
const PositionTransformer_1 = __webpack_require__(4);
const WorldKnowledge_1 = __webpack_require__(17);
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
const app_1 = __webpack_require__(3);
exports.CELL_WIDTH = 40;
exports.CELL_HEIGHT = 20;
class PositionTransformer {
    static getRealPosition(point) {
        return this.addGap(new PIXI.Point(app_1.WORLD_WIDTH / 2, app_1.WORLD_HEIGHT), point);
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
    static getCentroid(points) {
        return new PIXI.Point(points.reduce((sum, point) => { return sum + point.x; }, 0) / points.length, points.reduce((sum, point) => { return sum + point.y; }, 0) / points.length);
    }
    static addGap(realPosition, cellGap) {
        return new PIXI.Point(realPosition.x - (cellGap.x - cellGap.y) * exports.CELL_WIDTH / 2, realPosition.y - (cellGap.x + cellGap.y) * exports.CELL_HEIGHT / 2);
    }
}
exports.PositionTransformer = PositionTransformer;


/***/ }),
/* 5 */
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
    ANIMATION[ANIMATION["FREEZE_SIT"] = 9] = "FREEZE_SIT";
    ANIMATION[ANIMATION["SIT_TALK"] = 10] = "SIT_TALK";
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
            case ANIMATION.FREEZE_SIT: return topOriented ? [21, 22, 23] : [15, 16, 17];
            case ANIMATION.WALK: return topOriented ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
            case ANIMATION.SIT_DOWN: return topOriented ? [18, 78, 79, 80, 81] : [12, 36, 37, 38, 39];
            case ANIMATION.STAND_UP: return topOriented ? [81, 80, 79, 78, 18] : [39, 38, 37, 36, 12];
            case ANIMATION.TYPE: return [42, 43, 44, 45];
            case ANIMATION.TALK: return topOriented ? [54, 55, 56, 57, 58, 59] : [48, 49, 50, 51, 52, 53];
            case ANIMATION.SIT_TALK: return topOriented ? [90, 91, 92, 93, 94, 95] : [84, 85, 86, 87, 88, 89];
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
            ANIMATION.FREEZE_SIT,
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.SMOKE,
            ANIMATION.SIT_DOWN,
            ANIMATION.STAND_UP,
            ANIMATION.TYPE,
            ANIMATION.TALK,
            ANIMATION.DRINK,
            ANIMATION.RAGE,
            ANIMATION.SIT_TALK,
        ];
    }
    static hasTopOrientedVariation(animation) {
        return [
            ANIMATION.WALK,
            ANIMATION.FREEZE,
            ANIMATION.TALK,
            ANIMATION.SIT_DOWN,
            ANIMATION.STAND_UP,
            ANIMATION.FREEZE_SIT,
            ANIMATION.SIT_TALK,
        ].indexOf(animation) > -1;
    }
    static isLooped(animation) {
        return [
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.TALK,
            ANIMATION.SMOKE,
            ANIMATION.TYPE,
            ANIMATION.DRINK,
            ANIMATION.FREEZE_SIT,
            ANIMATION.SIT_TALK,
        ].indexOf(animation) > -1;
    }
    static getAnimationStr(animation) {
        switch (animation) {
            case ANIMATION.FREEZE: return 'FZ';
            case ANIMATION.FREEZE_SIT: return 'FS';
            case ANIMATION.WALK: return 'WK';
            case ANIMATION.SIT_DOWN: return 'SD';
            case ANIMATION.STAND_UP: return 'SU';
            case ANIMATION.TYPE: return 'TP';
            case ANIMATION.TALK: return 'TK';
            case ANIMATION.RAGE: return 'RG';
            case ANIMATION.DRINK: return 'DK';
            case ANIMATION.SMOKE: return 'SK';
            case ANIMATION.SIT_TALK: return 'ST';
            default:
                throw 'UNKNOWN ANIMATION ' + animation;
        }
    }
}
exports.HumanAnimationManager = HumanAnimationManager;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const app_1 = __webpack_require__(3);
const ObjectSeller_1 = __webpack_require__(24);
const TextStyle_1 = __webpack_require__(10);
const HumanEmployer_1 = __webpack_require__(59);
const InfoPanel_1 = __webpack_require__(60);
const LevelDisplayer_1 = __webpack_require__(61);
const UserInfoPanel_1 = __webpack_require__(62);
const Pico8Colors_1 = __webpack_require__(2);
exports.INTERFACE_WIDTH = 150.5;
exports.TOP_GAP_2 = 15.5 + 12;
exports.TOP_GAP = exports.TOP_GAP_2 + 15;
var PANEL;
(function (PANEL) {
    PANEL[PANEL["INFO"] = 0] = "INFO";
    PANEL[PANEL["USR"] = 1] = "USR";
    PANEL[PANEL["OBJ"] = 2] = "OBJ";
    PANEL[PANEL["USER_INFO"] = 3] = "USER_INFO";
})(PANEL = exports.PANEL || (exports.PANEL = {}));
class UserInterface {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
        this.humanEmployer = new HumanEmployer_1.HumanEmployer(worldKnowledge);
        this.infoPanel = new InfoPanel_1.InfoPanel(worldKnowledge);
        this.userInfoPanel = new UserInfoPanel_1.UserInfoPanel(worldKnowledge);
        this.levelDisplayer = new LevelDisplayer_1.LevelDisplayer(worldKnowledge);
        this.buttons = [];
        this.selectedPanel = PANEL.OBJ;
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(Pico8Colors_1.COLOR.DARK_BLUE);
        this.backgroundGraphics.drawRect(-0.5, 0, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS);
        interfaceGroup.add(this.backgroundGraphics);
        this.objectSeller.create(game, groups);
        this.humanEmployer.create(game, groups);
        this.infoPanel.create(game, groups);
        this.userInfoPanel.create(game, groups);
        this.levelDisplayer.create(game, groups);
        const buttonWidth = exports.INTERFACE_WIDTH / 3;
        this.moneyCounter = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + 2, 0, this.worldKnowledge.getMoneyInWallet().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        let i = 0;
        [['info', PANEL.INFO], ['usr', PANEL.USR], ['obj', PANEL.OBJ]].forEach((panelInfo) => {
            const button = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + i * buttonWidth, exports.TOP_GAP_2, panelInfo[0], TextStyle_1.TEXT_STYLE, interfaceGroup);
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
        this.levelDisplayer.update();
        this.userInfoPanel.update();
        this.humanEmployer.update();
        this.moneyCounter.setText(this.worldKnowledge.getMoneyInWallet().getStringValue());
    }
    selectPanel(panel) {
        if (this.selectedPanel === panel) {
            return;
        }
        this.selectedPanel = panel;
        if (this.selectedPanel === PANEL.INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.show();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
        }
        else if (this.selectedPanel === PANEL.USR) {
            this.objectSeller.hide();
            this.humanEmployer.show();
            this.infoPanel.hide();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
        }
        else if (this.selectedPanel === PANEL.OBJ) {
            this.objectSeller.show();
            this.humanEmployer.hide();
            this.infoPanel.hide();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
        }
        else if (this.selectedPanel === PANEL.USER_INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.hide();
            this.userInfoPanel.show();
        }
    }
    setSelectedHuman(param) {
        this.selectPanel(PANEL.USER_INFO);
        this.userInfoPanel.showEmployeeInfoPanelForYohan(param);
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 7 */
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
    static getNeighbor(point, direction) {
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
    static getDirectionStr(direction) {
        switch (direction) {
            case DIRECTION.TOP: return 'T';
            case DIRECTION.BOTTOM: return 'B';
            case DIRECTION.LEFT: return 'L';
            case DIRECTION.RIGHT: return 'R';
            case DIRECTION.CURRENT: return 'C';
        }
    }
}
exports.Direction = Direction;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractState {
    constructor(human) {
        this.events = [];
        this.active = false;
        this.human = human;
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        return true;
    }
    stop() {
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.active = false;
    }
}
exports.AbstractState = AbstractState;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Bubble_1 = __webpack_require__(22);
var RAGE_IMAGE;
(function (RAGE_IMAGE) {
    RAGE_IMAGE[RAGE_IMAGE["COFFEE"] = 0] = "COFFEE";
    RAGE_IMAGE[RAGE_IMAGE["LAPTOP"] = 1] = "LAPTOP";
    RAGE_IMAGE[RAGE_IMAGE["SLEEP"] = 2] = "SLEEP";
    RAGE_IMAGE[RAGE_IMAGE["TABLE"] = 3] = "TABLE";
})(RAGE_IMAGE = exports.RAGE_IMAGE || (exports.RAGE_IMAGE = {}));
class ThoughtBubble extends Bubble_1.Bubble {
    getSpriteFrame() {
        return 1;
    }
    getImageSpriteKey() {
        return 'bubble_images_angry';
    }
    showRage(rageImage) {
        this.imageSprite.loadTexture(this.getImageSpriteKey(), rageImage);
        super.show();
    }
}
exports.ThoughtBubble = ThoughtBubble;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_STYLE = {
    align: 'center',
    fill: "#ffffff",
    font: '16px 000webfont'
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const HumanAnimationManager_1 = __webpack_require__(5);
const AbstractState_1 = __webpack_require__(8);
class RageState extends AbstractState_1.AbstractState {
    constructor(human, rageImage) {
        super(human);
        this.rageImage = rageImage;
    }
    start(game) {
        super.start(game);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
        this.human.showThoughtBubble(this.rageImage);
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
            this.active = false;
            this.human.hideThoughtBubble();
        }, this));
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
    getRageImage() {
        return this.rageImage;
    }
}
exports.RageState = RageState;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanProperties_1 = __webpack_require__(41);
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
const Pico8Colors_1 = __webpack_require__(2);
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
        this.lineStyle(3, Pico8Colors_1.COLOR.RED);
        this.moveTo(0, -RADIUS);
        for (let i = 0; i < POINTS * this.percentage; i++) {
            const angle = Math.PI * 2 / POINTS * (i + 1) + Math.PI;
            this.lineTo(-Math.sin(angle) * RADIUS, Math.cos(angle) * RADIUS);
        }
    }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TIME_GAP = Phaser.Timer.SECOND / 10;
class SmoothValue {
    constructor(value) {
        this.maxValue = null;
        this.minValue = null;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    add(value, milliseconds = Phaser.Timer.SECOND) {
        if (milliseconds < TIME_GAP) {
            this.value += value;
        }
        else {
            setTimeout(() => {
                const numberOfSteps = milliseconds / TIME_GAP;
                const valuePerStep = value / numberOfSteps;
                this.value += valuePerStep;
                this.add(value - valuePerStep, milliseconds - TIME_GAP);
            }, TIME_GAP);
        }
        if (this.maxValue !== null) {
            this.value = Math.min(this.value, this.maxValue);
        }
        if (this.minValue !== null) {
            this.value = Math.max(this.value, this.minValue);
        }
    }
    setMaxValue(number) {
        this.maxValue = number;
    }
    setMinValue(number) {
        this.minValue = number;
    }
    setValue(number) {
        this.add(number - this.value);
    }
    setInstantValue(number) {
        this.value = number;
    }
}
exports.SmoothValue = SmoothValue;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const ObjectInfoRegistry_1 = __webpack_require__(16);
const ObjectReferer_1 = __webpack_require__(50);
class AbstractObject {
    constructor(point, worldKnowledge, leftOriented) {
        this.position = point;
        this.leftOriented = leftOriented;
        this.worldKnowledge = worldKnowledge;
        this.usedIdentifiers = [];
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
    getPositionGap(subObjectNumber) {
        const sittableObjectInfos = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getObjectInfo(this.constructor.name)
            .getSpriteInfo(subObjectNumber);
        return sittableObjectInfos.getSittablePosition(this.leftOriented);
    }
    getEntries(objectNumber) {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getEntryPoints(this.leftOriented, objectNumber);
    }
    getPositions() {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getCellGaps(this.leftOriented).map((gap) => {
            return new PIXI.Point(this.position.x + gap.x, this.position.y + gap.y);
        });
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
    forceOrientation(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return infos.getSpriteInfo(subObjectNumber).getOrientation(this.leftOriented);
    }
    forceTopOrientation(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return infos.getSpriteInfo(subObjectNumber).getTopOrientation();
    }
    getCellPositionSubObject(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return new PIXI.Point(this.position.x + infos.getPositionGapOfSubObject(this.leftOriented, subObjectNumber).x, this.position.y + infos.getPositionGapOfSubObject(this.leftOriented, subObjectNumber).y);
    }
    isUsed(subObjectNumber) {
        return this.getHumanAt(subObjectNumber) !== null;
    }
    getHumanAt(subObjectNumber) {
        return this.usedIdentifiers[subObjectNumber] ? this.usedIdentifiers[subObjectNumber] : null;
    }
    getOrigin() {
        return this.position;
    }
    setUsed(subObjectNumber, human) {
        if (this.getHumanAt(subObjectNumber)) {
            debugger;
            throw "This subobject is already taken!";
        }
        this.usedIdentifiers[subObjectNumber] = human;
    }
    setUnused(subObjectNumber) {
        this.usedIdentifiers[subObjectNumber] = null;
    }
    getUnusedReferers() {
        let result = [];
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        for (let i = 0; i < infos.getSpriteInfos().length; i++) {
            if (infos.getSpriteInfos()[i].getEntryPoints(this.leftOriented).length > 0) {
                if (!this.isUsed(i)) {
                    result.push(new ObjectReferer_1.ObjectReferer(this, i));
                }
            }
        }
        return result;
    }
}
exports.AbstractObject = AbstractObject;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfo_1 = __webpack_require__(48);
const SpriteInfo_1 = __webpack_require__(53);
const Direction_1 = __webpack_require__(7);
const Price_1 = __webpack_require__(20);
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
            new SpriteInfo_1.SpriteInfo('dispenser', [Direction_1.DIRECTION.BOTTOM], 4, -4, 3, -13, 0, 0, false, false)
        ], new Price_1.Price(70)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Sofa', [
            new SpriteInfo_1.SpriteInfo('sofa', [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM], 0, -8, 3, 0, 0, 0, null, false)
        ], new Price_1.Price(10)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Desk', [
            new SpriteInfo_1.SpriteInfo('chair', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], -10, -8, 5, 0, 0, 0, false, false),
            new SpriteInfo_1.SpriteInfo('desk', [], 0, 0, 4, 0, 0, 0, false, false)
        ], new Price_1.Price(20)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Table', [
            new SpriteInfo_1.SpriteInfo('chair2', [Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], -8, -9, 5, 0, 1, 1, false, false),
            new SpriteInfo_1.SpriteInfo('table', [], 0, 0, 4, 0, 1, 1, false, false),
            new SpriteInfo_1.SpriteInfo('chair2', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT], -8, -9, 5, 0, 1, 0, false, false),
            new SpriteInfo_1.SpriteInfo('table', [], 0, 0, 4, 0, 1, 0, false, false),
            new SpriteInfo_1.SpriteInfo('table_reverse', [], 0, 0, 10, 0, 0, 1, true, true),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', [Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT], 6, -5, 5, 0, 0, 1, true, true),
            new SpriteInfo_1.SpriteInfo('table_reverse', [], 0, 0, 10, 0, 0, 0, true, true),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT], 6, -5, 5, 0, 0, 0, true, true),
        ], new Price_1.Price(12)));
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanRepository_1 = __webpack_require__(56);
const Sofa_1 = __webpack_require__(52);
const Employee_1 = __webpack_require__(23);
const Desk_1 = __webpack_require__(46);
const Dispenser_1 = __webpack_require__(47);
const WallRepository_1 = __webpack_require__(57);
const Cell_1 = __webpack_require__(26);
const PositionTransformer_1 = __webpack_require__(4);
const Play_1 = __webpack_require__(0);
const Depot_1 = __webpack_require__(45);
const Direction_1 = __webpack_require__(7);
const MoodRegister_1 = __webpack_require__(42);
const Table_1 = __webpack_require__(54);
const LevelManager_1 = __webpack_require__(27);
const Price_1 = __webpack_require__(20);
const ObjectInfoRegistry_1 = __webpack_require__(16);
const SmoothValue_1 = __webpack_require__(14);
const UserInterface_1 = __webpack_require__(6);
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
        this.levelManager = new LevelManager_1.LevelManager();
        this.depot = new Depot_1.Depot();
        this.wallet = new SmoothValue_1.SmoothValue(130);
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
        this.levelManager.update();
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
    getMoneyInWallet() {
        return new Price_1.Price(this.wallet.getValue());
    }
    getSelectedHumanSprite() {
        return this.humanRepository.getSelectedHumanSprite();
    }
    resetAStar(position) {
        this.humanRepository.humans.forEach((human) => {
            human.resetAStar(position);
        });
    }
    resetStates(positions) {
        this.humanRepository.humans.forEach((human) => {
            positions.forEach((position) => {
                human.resetStateIfCellEmpty(position);
            });
        });
    }
    getAnotherFreeHuman(human) {
        const freeHuman = this.getAnotherFreeHumans(human, 1);
        if (freeHuman.length == 0) {
            return null;
        }
        return freeHuman[0];
    }
    getAnotherFreeHumans(human, max) {
        let availableHumans = this.humanRepository.humans.filter((anotherHuman) => {
            return anotherHuman !== human && anotherHuman.isFree();
        });
        if (availableHumans.length === 0) {
            return [];
        }
        availableHumans = availableHumans.sort(() => {
            return Math.random() - 0.5;
        });
        let result = [];
        for (let i = 0; i < max; i++) {
            if (availableHumans[i] !== undefined) {
                result.push(availableHumans[i]);
            }
        }
        return result;
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
            for (let k = 0; k < this.objects[j].getPositions().length; k++) {
                if (this.objects[j].getPositions()[k].x === point.x &&
                    this.objects[j].getPositions()[k].y === point.y &&
                    this.objects[j] !== object) {
                    return false;
                }
            }
        }
        if (this.wallRepository.hasWall(point.x, point.y)) {
            return false;
        }
        return true;
    }
    getClosestReferer(types, referersCountPerObject = 1, position = null) {
        let freeReferers = [];
        this.objects.forEach((object) => {
            if (types.indexOf(object.constructor.name) > -1) {
                const unusedReferers = object.getUnusedReferers();
                if (unusedReferers.length >= referersCountPerObject) {
                    freeReferers = freeReferers.concat(unusedReferers);
                }
            }
        });
        if (freeReferers.length === 0) {
            return null;
        }
        if (position === null) {
            return freeReferers[Math.floor(Math.random() * freeReferers.length)];
        }
        return freeReferers.sort((referer1, referer2) => {
            return PositionTransformer_1.PositionTransformer.dist(position, PositionTransformer_1.PositionTransformer.getCentroid([referer1.getPosition()]))
                - PositionTransformer_1.PositionTransformer.dist(position, PositionTransformer_1.PositionTransformer.getCentroid([referer2.getPosition()]));
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
        this.resetStates(object.getPositions());
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
    buy(objectName, price) {
        this.depot.add(objectName);
        this.wallet.add(-price.getValue());
    }
    canPutHere(objectInfo, origin, leftOriented) {
        return this.areAllTheCellsFree(objectInfo, origin, leftOriented) &&
            this.areAllSpritesEnterable(objectInfo, origin, leftOriented) &&
            this.isNewObjectNotBlockingExistingOne(objectInfo, origin, leftOriented);
    }
    ;
    areAllTheCellsFree(objectInfo, origin, leftOriented) {
        for (let i = 0; i < objectInfo.getSpriteInfos().length; i++) {
            const spriteInfo = objectInfo.getSpriteInfo(i);
            const gap = spriteInfo.getPositionGapFromOrigin(leftOriented);
            if (!this.isFree(new PIXI.Point(origin.x + gap.x, origin.y + gap.y))) {
                return false;
            }
        }
        return true;
    }
    areAllSpritesEnterable(objectInfo, origin, leftOriented) {
        for (let i = 0; i < objectInfo.getSpriteInfos().length; i++) {
            const spriteInfo = objectInfo.getSpriteInfo(i);
            if (spriteInfo.getEntryPoints(leftOriented).length > 0) {
                let isEntryPossible = false;
                spriteInfo.getEntryPoints(leftOriented).forEach((entry) => {
                    const gap = spriteInfo.getPositionGapFromOrigin(leftOriented);
                    isEntryPossible = isEntryPossible || this.isEntryAccessibleForObject(origin, gap, entry);
                });
                if (isEntryPossible === false) {
                    return false;
                }
            }
        }
        return true;
    }
    isNewObjectNotBlockingExistingOne(objectInfo, origin, leftOriented) {
        const newObjectCells = objectInfo.getCellGaps(leftOriented).map((gap) => {
            return new PIXI.Point(origin.x + gap.x, origin.y + gap.y);
        });
        this.objects.forEach((object) => {
            const otherObjectInfo = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(object.constructor.name);
            let isEntryPossible = false;
            otherObjectInfo.getEntryCells(object.getOrigin(), leftOriented).forEach((cell) => {
                if (this.isFree(cell)) {
                    let isCellBlocking = false;
                    newObjectCells.forEach((newObjectCell) => {
                        if (cell.x === newObjectCell.x && cell.y === newObjectCell.y) {
                            isCellBlocking = true;
                        }
                    });
                    if (!isCellBlocking) {
                        isEntryPossible = true;
                    }
                }
            });
            if (!isEntryPossible) {
                return false;
            }
        });
        return true;
    }
    isEntryAccessibleForObject(origin, gap, entry) {
        const gappedPosition = new PIXI.Point(origin.x + gap.x, origin.y + gap.y);
        return this.isFree(Direction_1.Direction.getNeighbor(gappedPosition, entry));
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
    getLevelProgress(type) {
        return this.levelManager.getLevelProgress(type);
    }
    addProgress(type, value) {
        this.levelManager.addLevelProgress(type, value);
    }
    addMoneyInWallet(price) {
        this.wallet.add(price.getValue());
    }
    setSelectedHuman(employee) {
        this.userInterface.setSelectedHuman(employee);
        this.humanRepository.humans.forEach((human) => {
            if (human !== employee) {
                human.unselect();
            }
        });
    }
    setUserInterface(userInterface) {
        this.userInterface = userInterface;
    }
    unselectHuman(switchPanel = true) {
        if (switchPanel) {
            this.userInterface.selectPanel(UserInterface_1.PANEL.INFO);
        }
        this.humanRepository.humans.forEach((human) => {
            human.unselect();
        });
    }
}
exports.WorldKnowledge = WorldKnowledge;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractState_1 = __webpack_require__(8);
const PositionTransformer_1 = __webpack_require__(4);
class MoveThenActAbstractState extends AbstractState_1.AbstractState {
    constructor(human, objectReferer, worldKnowledge, tries = 0) {
        super(human);
        this.objectReferer = objectReferer;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.tries = tries;
    }
    start(game) {
        super.start(game);
        if (!this.human.moveToClosest(this.objectReferer.getPosition(), this.objectReferer.getEntries())) {
            this.active = false;
            this.stop();
            return false;
        }
        return true;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.objectReferer.getObject()) || this.objectReferer.isUsed()) {
                return this.retry();
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.objectReferer, this.objectReferer.getObject().forceOrientation(this.objectReferer.getIdentifier()));
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.act();
            }));
        }
        return super.getNextState();
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.objectReferer.getPosition());
    }
}
exports.MoveThenActAbstractState = MoveThenActAbstractState;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const SmoothValue_1 = __webpack_require__(14);
const LOSS = -0.05;
const DEFAULT = 0.8;
const TIME_BETWEEN_LOSS = 10000;
var MOOD;
(function (MOOD) {
    MOOD[MOOD["RELAXATION"] = 0] = "RELAXATION";
    MOOD[MOOD["HUNGER"] = 1] = "HUNGER";
    MOOD[MOOD["SOCIAL"] = 2] = "SOCIAL";
})(MOOD = exports.MOOD || (exports.MOOD = {}));
class HumanMoodManager {
    constructor() {
        this.moods = {};
        this.moods[MOOD.RELAXATION] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.HUNGER] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.SOCIAL] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.RELAXATION].setMaxValue(1);
        this.moods[MOOD.HUNGER].setMaxValue(1);
        this.moods[MOOD.SOCIAL].setMaxValue(1);
        this.moods[MOOD.RELAXATION].setMinValue(0);
        this.moods[MOOD.HUNGER].setMinValue(0);
        this.moods[MOOD.SOCIAL].setMinValue(0);
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
            this.updateFromStateInner(moodUpdate, TIME_BETWEEN_LOSS);
            this.hasToBeUpdated = false;
            this.game.time.events.add(TIME_BETWEEN_LOSS, () => {
                this.hasToBeUpdated = true;
            }, this);
        }
    }
    updateFromState(state) {
        this.updateFromStateInner(HumanStateManager_1.HumanStateManager.getMoodGains(state));
    }
    updateFromStateInner(moods, time = Phaser.Timer.SECOND) {
        Object.keys(moods).forEach((mood) => {
            this.moods[mood].add(moods[mood], time);
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
        return this.moods[mood].getValue();
    }
    getGeneralMood() {
        return (this.moods[MOOD.RELAXATION].getValue() + this.moods[MOOD.SOCIAL].getValue() + this.moods[MOOD.HUNGER].getValue()) / 3;
    }
}
exports.HumanMoodManager = HumanMoodManager;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    constructor(value) {
        this.value = value;
    }
    getStringValue() {
        return Math.ceil(this.value).toString() + " FLOOZ";
    }
    isGreaterThan(value) {
        return this.value >= value.value;
    }
    substract(value) {
        this.value -= value.value;
    }
    add(value) {
        this.value += value.value;
    }
    getValue() {
        return this.value;
    }
}
exports.Price = Price;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Pico8Colors_1 = __webpack_require__(2);
exports.DEFAULT_BAR_HEIGHT = 10;
class Gauge {
    constructor(width, color, height = null) {
        this.value = 0;
        this.width = Math.round(width);
        this.color = color;
        this.visible = true;
        this.height = height ? height : exports.DEFAULT_BAR_HEIGHT;
    }
    create(game, groups, position) {
        this.graphics = game.add.graphics(position.x, position.y, groups[Play_1.GROUP_INTERFACE]);
        this.update();
    }
    setValue(value) {
        this.value = value;
        this.update();
    }
    update() {
        this.graphics.clear();
        if (this.visible) {
            this.graphics.lineStyle(0);
            this.graphics.beginFill(Pico8Colors_1.COLOR.BLACK);
            this.graphics.drawRect(0, 0.5, this.width, this.height);
            this.graphics.beginFill(this.color);
            this.graphics.drawRect(0, 0.5, Math.floor(this.width * this.value) + 0.5, this.height);
            this.graphics.endFill();
            this.graphics.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
            this.graphics.drawRect(0, 0.5, this.width, this.height);
        }
    }
    show() {
        this.visible = true;
        this.update();
    }
    hide() {
        this.visible = false;
        this.update();
    }
    destroy(destroyChildren) {
        this.graphics.destroy(destroyChildren);
    }
    getGraphics() {
        return this.graphics;
    }
}
exports.Gauge = Gauge;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Bubble {
    create(humanSprite, game, group) {
        this.game = game;
        this.parent = humanSprite;
        this.sprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble', this.getSpriteFrame(), group);
        this.sprite.anchor.set(1, 37 / this.sprite.height);
        group.add(this.sprite);
        this.imageSprite = game.add.sprite(this.parent.position.x, this.parent.position.y, this.getImageSpriteKey(), 0, group);
        this.imageSprite.anchor.set(1.2, 76 / this.sprite.height);
        group.add(this.imageSprite);
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
}
exports.Bubble = Bubble;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(4);
const ClosestPathFinder_1 = __webpack_require__(40);
const Direction_1 = __webpack_require__(7);
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const ObjectSelector_1 = __webpack_require__(51);
const TalkBubble_1 = __webpack_require__(44);
const HumanMoodManager_1 = __webpack_require__(19);
const MoodSprite_1 = __webpack_require__(43);
const Play_1 = __webpack_require__(0);
const ThoughtBubble_1 = __webpack_require__(9);
const Pico8Colors_1 = __webpack_require__(2);
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
        this.thoughtBubble = new ThoughtBubble_1.ThoughtBubble();
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
        ObjectSelector_1.ObjectSelector.makeSelectable([this.sprite], () => {
            this.worldKnowledge.setSelectedHuman(this);
        }, () => {
            this.worldKnowledge.unselectHuman();
        });
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, true, false);
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, worldKnowledge);
        this.stateManager.create(game, worldKnowledge, this.animationManager);
        this.talkBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.thoughtBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.moodSprite.create(this.sprite, this.game, groups[Play_1.GROUP_INFOS]);
        if (PATH_DEBUG) {
            this.pathGraphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INFOS]);
            groups[Play_1.GROUP_INFOS].add(this.pathGraphics);
        }
    }
    update() {
        this.talkBubble.update();
        this.thoughtBubble.update();
        this.stateManager.updateState(this.game);
        this.moodManager.update();
        this.moodSprite.update(this.moodManager.getGeneralMood(), [
            this.moodManager.getMood(HumanMoodManager_1.MOOD.HUNGER),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.SOCIAL),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.RELAXATION)
        ]);
        if (PATH_DEBUG) {
            this.pathGraphics.clear();
            this.pathGraphics.lineStyle(2, Pico8Colors_1.COLOR.LIGHT_GREEN);
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
    goSitMeeting(meeting) {
        return this.stateManager.goSitMeeting(this.game, meeting);
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
    interactWith(objectReferer, isLeft = null) {
        const direction = Direction_1.Direction.getNeighborDirection(this.cell, objectReferer.getPosition());
        const side = (isLeft !== null) ? isLeft : Employee.isHumanLeft(direction);
        // Employee has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
        this.anchorPixels.x = objectReferer.getPositionGap().x + (side ? -5 : 5);
        this.anchorPixels.y = objectReferer.getPositionGap().y - 1;
        this.cell = objectReferer.getPosition();
        objectReferer.setUsed(this);
        this.animateMove(direction);
    }
    static isHumanLeft(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.BOTTOM].indexOf(direction) > -1;
    }
    static isHumanTop(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP].indexOf(direction) > -1;
    }
    goToFreeCell(objectReferer) {
        objectReferer.setUnused();
        const cells = [];
        objectReferer.getEntries().forEach((direction) => {
            const tryCell = Direction_1.Direction.getNeighbor(this.cell, direction);
            if (this.worldKnowledge.isFree(tryCell)) {
                cells.push(tryCell);
            }
        });
        if (cells.length === 0) {
            console.log('oops');
            return;
        }
        this.path = [cells[Math.floor(Math.random() * cells.length)]];
        if (!this.moving) {
            this.popPath(null, null);
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
        return [HumanStateManager_1.STATE.MOVE_RANDOM, HumanStateManager_1.STATE.FREEZE, HumanStateManager_1.STATE.SMOKE].indexOf(this.getState()) > -1;
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
    getType() {
        return this.humanProperties.getType();
    }
    getName() {
        return this.humanProperties.getName();
    }
    showThoughtBubble(rageImage) {
        this.thoughtBubble.showRage(rageImage);
    }
    hideThoughtBubble() {
        this.thoughtBubble.hide();
    }
    getNextProbabilities() {
        return this.stateManager.getNextProbabilities();
    }
    unselect() {
        if (this.isSelected()) {
            ObjectSelector_1.ObjectSelector.click(this.sprite, null, [this.sprite]);
        }
    }
}
exports.Employee = Employee;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const ObjectInfoRegistry_1 = __webpack_require__(16);
const ObjectPhantom_1 = __webpack_require__(49);
const Play_1 = __webpack_require__(0);
const TextStyle_1 = __webpack_require__(10);
const PositionTransformer_1 = __webpack_require__(4);
const Pico8Colors_1 = __webpack_require__(2);
exports.OBJECT_SELLER_CELL_SIZE = 41;
const CIRCLE_GAP = 7;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.objectProvisionnerButtons = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getSellableObjects()
            .map((object) => new ObjectProvisionnerButton(object, this.worldKnowledge));
        this.sellerButtons = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getSellableObjects()
            .map((object) => new SellerButton(object, this.worldKnowledge));
    }
    create(game, groups) {
        let i = 0;
        this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
            objectProvisionnerButton.create(game, groups, i);
            i++;
        });
        i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, groups, i);
            i++;
        });
    }
    update() {
        this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
            objectProvisionnerButton.updateCount(this.getCount(objectProvisionnerButton.getName()));
        });
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateSprites();
        });
    }
    getCount(name) {
        return this.worldKnowledge.getDepot().getCount(name);
    }
    hide() {
        if (this.visible) {
            this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
                objectProvisionnerButton.hide();
            });
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
                objectProvisionnerButton.show();
            });
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
        this.isDown = false;
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * (exports.OBJECT_SELLER_CELL_SIZE / 2);
        const textTop = index * exports.OBJECT_SELLER_CELL_SIZE + 12 + UserInterface_1.TOP_GAP + CIRCLE_GAP;
        this.price = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE + 10, textTop, this.objectInfo.getPrice().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.price);
        this.button = game.add.sprite(this.price.x + this.price.width + 12, textTop, 'buy_button', 0, groups[Play_1.GROUP_INTERFACE]);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
        this.button.events.onInputDown.add(this.buy, this, 0);
        this.button.events.onInputUp.add(this.up, this, 0);
        groups[Play_1.GROUP_INTERFACE].add(this.button);
    }
    updateSprites() {
        if (this.isDown) {
            this.button.loadTexture(this.button.key, 1);
        }
        else {
            if (this.objectInfo.isSellable(this.worldKnowledge.getMoneyInWallet())) {
                this.button.loadTexture(this.button.key, 0);
            }
            else {
                this.button.loadTexture(this.button.key, 2);
            }
        }
    }
    buy() {
        if (this.objectInfo.isSellable(this.worldKnowledge.getMoneyInWallet())) {
            this.isDown = true;
            this.worldKnowledge.buy(this.objectInfo.getName(), this.objectInfo.getPrice());
        }
    }
    up() {
        this.isDown = false;
    }
    hide() {
        this.price.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.button.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
    show() {
        this.price.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.button.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
}
class ObjectProvisionnerButton {
    constructor(objectInfo, worldKnowledge) {
        this.objectInfo = objectInfo;
        this.worldKnowledge = worldKnowledge;
        this.sprites = [];
        this.fakeCells = [];
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE;
        const spriteOrigin = new PIXI.Point(left + exports.OBJECT_SELLER_CELL_SIZE / 2, top + exports.OBJECT_SELLER_CELL_SIZE);
        let width = 1;
        let height = 1;
        this.objectInfo.getCellGaps(false).forEach((gap) => {
            width = Math.max(width, 1 + gap.x);
            height = Math.max(height, 1 + gap.y);
        });
        const scale = 2 / (width + height);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.square.drawRect(0, 0, exports.OBJECT_SELLER_CELL_SIZE, exports.OBJECT_SELLER_CELL_SIZE);
        this.objectInfo.getCellGaps(false).forEach((cellGap) => {
            const fakeCell = game.add.sprite(spriteOrigin.x - (cellGap.x - cellGap.y) * (PositionTransformer_1.CELL_WIDTH / 2) * scale, spriteOrigin.y - (cellGap.x + cellGap.y) * (PositionTransformer_1.CELL_HEIGHT / 2) * scale, 'casedefault');
            fakeCell.scale.set(scale, scale);
            fakeCell.anchor.set(0.5, 1);
            groups[Play_1.GROUP_INTERFACE].add(fakeCell);
            this.fakeCells.push(fakeCell);
        });
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteOrigin, false, scale).x, spriteInfo.getRealPositionFromOrigin(spriteOrigin, false, scale).y, spriteInfo.getSpriteName());
            seller.scale.set(scale, scale);
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
        this.circle.beginFill(Pico8Colors_1.COLOR.RED);
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
        if (this.worldKnowledge.getDepot().getCount(this.objectInfo.getName()) > 0) {
            this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
            const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectInfo.getName(), game, this.worldKnowledge);
            phantom.create(game, groups);
        }
    }
    hide() {
        this.counter.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.fakeCells.forEach((fakeCell) => {
            fakeCell.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.circle.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.counter.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.fakeCells.forEach((fakeCell) => {
            fakeCell.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.circle.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextStyle_1 = __webpack_require__(10);
const Play_1 = __webpack_require__(0);
const Pico8Colors_1 = __webpack_require__(2);
const app_1 = __webpack_require__(3);
class Tooltip {
    constructor(getValueFunction) {
        this.getValueFunction = getValueFunction;
    }
    create(game, groups) {
        this.game = game;
        this.box = game.add.graphics(0, 0, groups[Play_1.GROUP_TOOLTIP]);
        this.text = game.add.text(0, 0, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_TOOLTIP]);
        this.hide();
    }
    update() {
        if (this.text.alpha > 0) {
            this.text.text = this.getValueFunction.call(this.tooltipable);
            this.text.x = this.getTooltipPosition().x;
            this.text.y = this.getTooltipPosition().y;
            this.updateBox();
        }
    }
    show() {
        this.text.alpha = 1;
        this.box.alpha = 1;
    }
    hide() {
        this.text.alpha = 0;
        this.box.alpha = 0;
        this.box.clear();
    }
    updateBox() {
        this.box.clear();
        this.box.beginFill(Pico8Colors_1.COLOR.BLACK);
        this.box.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.box.drawRect(this.getTooltipPosition().x - 2, this.getTooltipPosition().y + 1, this.getBoxWidth(), 8);
    }
    setInput(tooltipable, graphics) {
        graphics.inputEnabled = true;
        graphics.events.onInputOver.add(this.show, this, 0);
        graphics.events.onInputOut.add(this.hide, this, 0);
        this.tooltipable = tooltipable;
    }
    getTooltipPosition() {
        this.cursorPosition = new PIXI.Point(app_1.SCALE * Math.round(this.game.input.mousePointer.position.x / app_1.SCALE) + 0.5, app_1.SCALE * Math.round(this.game.input.mousePointer.position.y / app_1.SCALE) + 0.5);
        let position = new PIXI.Point(this.cursorPosition.x + 6, this.cursorPosition.y + 9);
        if (position.x + this.getBoxWidth() > app_1.CAMERA_WIDTH_PIXELS) {
            position.x = app_1.CAMERA_WIDTH_PIXELS - this.getBoxWidth() + 0.5;
        }
        return position;
    }
    getBoxWidth() {
        return this.text.width + 1;
    }
}
exports.Tooltip = Tooltip;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(4);
const WorldKnowledge_1 = __webpack_require__(17);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = __webpack_require__(12);
const SmoothValue_1 = __webpack_require__(14);
class LevelManager {
    constructor() {
        this.level = 1;
        this.goals = {};
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 10;
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = 10;
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = 10;
        this.levels = {};
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]);
    }
    getLevelProgress(type) {
        return this.levels[type].getValue() / this.goals[type];
    }
    addLevelProgress(type, value) {
        this.levels[type].add(value, Phaser.Timer.SECOND * 5);
    }
    update() {
        if (this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]) {
            this.level += 1;
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setInstantValue(0);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setInstantValue(0);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setInstantValue(0);
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] * 2;
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] * 2;
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] * 2;
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER]);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING]);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]);
        }
    }
}
exports.LevelManager = LevelManager;


/***/ }),
/* 28 */
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
/* 29 */
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
        this.game.load.spritesheet('chair2_reverse', 'assets/chair2_reverse.png', 14, 17);
        this.game.load.spritesheet('table', 'assets/table.png', 42, 40);
        this.game.load.spritesheet('table_reverse', 'assets/table_reverse.png', 42, 40);
        this.game.load.spritesheet('desk', 'assets/desk.png', 40, 40);
        this.game.load.spritesheet('desk_selected', 'assets/desk_selected.png', 40, 40);
        this.game.load.spritesheet('wall', 'assets/wall.png', 40, 37, 16);
        this.game.load.spritesheet('sofa', 'assets/sofa.png', 8, 6);
        this.game.load.spritesheet('dispenser', 'assets/dispenser.png', 26, 35);
        this.game.load.spritesheet('dispenser_selected', 'assets/dispenser_selected.png', 26, 35);
        this.game.load.spritesheet('sofa_selected', 'assets/sofa_selected.png', 8, 6);
        this.game.load.spritesheet('bubble', 'assets/bubble.png', 13, 15);
        this.game.load.spritesheet('bubble_images', 'assets/bubble_images.png', 9, 7);
        this.game.load.spritesheet('bubble_images_angry', 'assets/bubble_images_angry.png', 9, 7);
        this.game.load.spritesheet('forbidden', 'assets/forbidden.png', 12, 12);
        this.game.load.spritesheet('buy_button', 'assets/buy_button.png', 10, 10);
    }
    loadFonts() {
        this.game.load.bitmapFont('retro_computer', 'assets/font/font.png', 'assets/font/font.ftn');
    }
}
exports.default = Preload;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const HumanAnimationManager_1 = __webpack_require__(5);
const RageState_1 = __webpack_require__(11);
const MoveThenActAbstractState_1 = __webpack_require__(18);
const ThoughtBubble_1 = __webpack_require__(9);
class CoffeeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextDispenserReferer = this.worldKnowledge.getClosestReferer(['Dispenser'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextDispenserReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.COFFEE);
        }
        else {
            return new CoffeeState(this.human, nextDispenserReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK), () => {
            this.human.goToFreeCell(this.objectReferer);
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.active = false;
            }, this));
        }, this));
    }
    getState() {
        return HumanStateManager_1.STATE.COFFEE;
    }
}
exports.CoffeeState = CoffeeState;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const AbstractState_1 = __webpack_require__(8);
class FreezeState extends AbstractState_1.AbstractState {
    start(game) {
        super.start(game);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE);
        this.event = game.time.events.add(Phaser.Math.random(1, 2) * Phaser.Timer.SECOND, () => {
            this.active = false;
        }, this);
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.FREEZE;
    }
}
exports.FreezeState = FreezeState;


/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = __webpack_require__(1);
const AbstractState_1 = __webpack_require__(8);
class MoveRandomState extends AbstractState_1.AbstractState {
    constructor(human, worldKnowledge) {
        super(human);
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
        super.start(game);
        if (!this.human.moveTo(this.goal)) {
            this.stop();
            return false;
        }
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.MOVE_RANDOM;
    }
}
exports.MoveRandomState = MoveRandomState;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const RageState_1 = __webpack_require__(11);
const MoveThenActAbstractState_1 = __webpack_require__(18);
const ThoughtBubble_1 = __webpack_require__(9);
class SitState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextSofaReferer = this.worldKnowledge.getClosestReferer(['Sofa'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextSofaReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.SLEEP);
        }
        else {
            return new SitState(this.human, nextSofaReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceOrientation(this.objectReferer.getIdentifier()));
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                this.human.goToFreeCell(this.objectReferer);
                this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                    this.active = false;
                }, this));
            }, this));
        }, this));
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
}
exports.SitState = SitState;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const AbstractState_1 = __webpack_require__(8);
const TableMeeting_1 = __webpack_require__(37);
const PositionTransformer_1 = __webpack_require__(4);
const RageState_1 = __webpack_require__(11);
const ThoughtBubble_1 = __webpack_require__(9);
class SitTalkState extends AbstractState_1.AbstractState {
    constructor(human, table, anotherHumans, worldKnowledge, meeting = null) {
        super(human);
        this.anotherHumans = anotherHumans;
        this.table = table;
        this.worldKnowledge = worldKnowledge;
        this.meetingStarted = false;
        this.meeting = meeting;
        this.isHumanOnTheRightCell = false;
        this.isHumanSit = false;
    }
    getNextState() {
        if (!this.worldKnowledge.hasObject(this.table)) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.TABLE);
        }
        else {
            if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
                this.isHumanOnTheRightCell = true;
                this.human.interactWith(this.meeting.getCell(this.human), this.meeting.getTable().forceOrientation(this.meeting.getCell(this.human).getIdentifier()));
                this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.meeting.getTable().forceOrientation(this.meeting.getCell(this.human).getIdentifier()), this.table.forceTopOrientation(this.meeting.getCell(this.human).getIdentifier()));
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN) + 100, () => {
                        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE_SIT);
                    }, this));
                    this.isHumanSit = true;
                }));
            }
            if (!this.isHumanOnTheRightCell && !this.meetingStarted && this.meeting.aPlaceWasTakenBySomeoneElse()) {
                this.active = false;
                this.human.stopWalk();
                return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.TABLE);
            }
            if (this.isHumanSit && !this.meetingStarted && this.meeting.isReady()) {
                this.meetingStarted = true;
                this.game.time.events.add(this.meeting.getTime() + Math.random() * Phaser.Timer.SECOND, this.endMeeting, this); // TODO this will fail
                this.human.updateMoodFromState();
                let animation = HumanAnimationManager_1.ANIMATION.SIT_TALK;
                if (Math.random() > 0.5) {
                    animation = SitTalkState.otherAnimation(animation);
                }
                this.switchAnimation(animation);
            }
        }
        return super.getNextState();
    }
    switchAnimation(animation) {
        if (animation === HumanAnimationManager_1.ANIMATION.SIT_TALK) {
            this.human.showTalkBubble();
        }
        else {
            this.human.hideTalkBubble();
        }
        this.human.loadAnimation(animation);
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 6) * ((animation !== HumanAnimationManager_1.ANIMATION.SIT_TALK) ? 3 : 1) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(animation), this.switchAnimation, this, SitTalkState.otherAnimation(animation)));
    }
    start(game) {
        super.start(game);
        if (this.meeting === null) {
            this.meeting = new TableMeeting_1.TableMeeting(this.anotherHumans.concat([this.human]), Phaser.Math.random(8, 20) * Phaser.Timer.SECOND, this.table);
            let shouldStop = false;
            this.anotherHumans.forEach((human) => {
                if (!human.goSitMeeting(this.meeting)) {
                    shouldStop = true;
                }
            });
            if (shouldStop) {
                this.stop();
                return false;
            }
        }
        const referer = this.meeting.getCell(this.human);
        if (!this.human.moveToClosest(referer.getPosition(), referer.getEntries())) {
            this.stop();
            return false;
        }
        return true;
    }
    endMeeting() {
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.human.hideTalkBubble();
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP, this.meeting.getTable().forceOrientation(this.meeting.getCell(this.human).getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
            this.human.goToFreeCell(this.meeting.getCell(this.human));
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.stop();
            }));
        }));
    }
    getState() {
        return HumanStateManager_1.STATE.SIT_TALK;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.meeting.getCell(this.human).getPosition());
    }
    static otherAnimation(animation) {
        return animation === HumanAnimationManager_1.ANIMATION.SIT_TALK ? HumanAnimationManager_1.ANIMATION.FREEZE_SIT : HumanAnimationManager_1.ANIMATION.SIT_TALK;
    }
}
exports.SitTalkState = SitTalkState;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const AbstractState_1 = __webpack_require__(8);
class SmokeState extends AbstractState_1.AbstractState {
    start(game) {
        super.start(game);
        game.time.events.add(Phaser.Math.random(1, 3) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SMOKE), () => {
            this.active = false;
        }, this);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SMOKE);
        this.human.updateMoodFromState();
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.SMOKE;
    }
}
exports.SmokeState = SmokeState;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TableMeeting {
    constructor(humans, time, table) {
        this.time = time;
        this.places = [];
        this.table = table;
        let unusedReferers = table.getUnusedReferers();
        if (unusedReferers.length < humans.length) {
            debugger;
        }
        for (let i = 0; i < unusedReferers.length; i++) {
            this.places.push({
                human: humans[i],
                position: unusedReferers[i]
            });
        }
    }
    getCell(human) {
        for (let i = 0; i < this.places.length; i++) {
            if (human === this.places[i].human) {
                return this.places[i].position;
            }
        }
        debugger;
        throw 'No cell found for this human!';
    }
    isReady() {
        for (let i = 0; i < this.places.length; i++) {
            const human = this.places[i].human;
            const position = this.places[i].position.getPosition();
            if (human.isMoving() || human.getPosition().x !== position.x || human.getPosition().y !== position.y) {
                return false;
            }
        }
        return true;
    }
    getTime() {
        return this.time;
    }
    getAnotherHumans(human) {
        let anotherHumans = [];
        this.places.forEach((place) => {
            if (place.human !== human) {
                anotherHumans.push(place.human);
            }
        });
        return anotherHumans;
    }
    getTable() {
        return this.table;
    }
    aPlaceWasTakenBySomeoneElse() {
        for (let i = 0; i < this.places.length; i++) {
            const currentHuman = this.table.getHumanAt(this.places[i].position.getIdentifier());
            if (currentHuman && currentHuman !== this.places[i].human) {
                console.log('Place ' + i + ' was taken ! Cancel meeting!');
                return true;
            }
        }
        return false;
    }
}
exports.TableMeeting = TableMeeting;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const Meeting_1 = __webpack_require__(32);
const Direction_1 = __webpack_require__(7);
const HumanStateManager_1 = __webpack_require__(1);
const AbstractState_1 = __webpack_require__(8);
class TalkState extends AbstractState_1.AbstractState {
    constructor(human, anotherHuman, worldKnowledge, meeting = null) {
        super(human);
        this.anotherHuman = anotherHuman;
        this.worldKnowledge = worldKnowledge;
        this.meetingStarted = false;
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
                    this.game.time.events.add(this.meeting.getTime() + Math.random() * Phaser.Timer.SECOND, this.stop, this); // TODO this will fail
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
        return super.getNextState();
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
        super.start(game);
        if (this.meeting === null) {
            this.meeting = new Meeting_1.Meeting([this.human, this.anotherHuman], Phaser.Math.random(8, 20) * Phaser.Timer.SECOND, this.worldKnowledge);
            if (!this.anotherHuman.goMeeting(this.meeting)) {
                this.stop();
                return false;
            }
        }
        if (!this.human.moveTo(this.meeting.getCell(this.human))) {
            this.stop();
            return false;
        }
        return true;
    }
    stop() {
        this.human.hideTalkBubble();
        super.stop();
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = __webpack_require__(5);
const HumanStateManager_1 = __webpack_require__(1);
const RageState_1 = __webpack_require__(11);
const MoveThenActAbstractState_1 = __webpack_require__(18);
const Price_1 = __webpack_require__(20);
const ThoughtBubble_1 = __webpack_require__(9);
class TypeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextDeskReferer = this.worldKnowledge.getClosestReferer(['Desk'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextDeskReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.LAPTOP);
        }
        else {
            return new TypeState(this.human, nextDeskReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE);
            this.worldKnowledge.addProgress(this.human.getType(), 1);
            this.worldKnowledge.addMoneyInWallet(new Price_1.Price(100));
            this.events.push(this.game.time.events.add(Phaser.Math.random(15, 60) * Phaser.Timer.SECOND, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                    this.human.goToFreeCell(this.objectReferer);
                    this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                        this.active = false;
                    }, this));
                }, this));
            }, this));
        }));
    }
    getState() {
        return HumanStateManager_1.STATE.TYPE;
    }
}
exports.TypeState = TypeState;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(7);
class ClosestPathFinder {
    constructor(game, worldKnowledge) {
        this.finders = {};
        this.worldKnowledge = worldKnowledge;
        Direction_1.Direction.neighborDirections().concat([Direction_1.DIRECTION.CURRENT]).forEach((direction) => {
            this.finders[direction] = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        });
        this.reseted = true;
    }
    getNeighborPath(originCell, goalCell, entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        return this.getPathInner(originCell, goalCell, entries);
    }
    getPath(originCell, goalCell) {
        return this.getPathInner(originCell, goalCell, [Direction_1.DIRECTION.CURRENT]);
    }
    getPathInner(originCell, goalCell, directions) {
        this.initialize();
        let results = {};
        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];
            try {
                const gappedCell = Direction_1.Direction.getNeighbor(goalCell, direction);
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
        this.reseted = true;
    }
    initialize() {
        if (this.reseted === true) {
            const grid = this.worldKnowledge.getGrid();
            const acceptables = this.worldKnowledge.getAcceptables();
            Direction_1.Direction.neighborDirections().concat([Direction_1.DIRECTION.CURRENT]).forEach((direction) => {
                this.finders[direction].setGrid(grid, acceptables);
            });
            this.reseted = false;
        }
    }
}
exports.ClosestPathFinder = ClosestPathFinder;


/***/ }),
/* 41 */
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
    getType() {
        return this.type;
    }
}
exports.HumanProperties = HumanProperties;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(6);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Pico8Colors_1 = __webpack_require__(2);
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
                this.sprite.lineStyle(2, Pico8Colors_1.COLOR.RED);
            }
            else if (moods[i] < 0.5) {
                this.sprite.lineStyle(2, Pico8Colors_1.COLOR.ORANGE);
            }
            else {
                this.sprite.lineStyle(2, Pico8Colors_1.COLOR.LIGHT_GREEN);
            }
            this.sprite.lineTo(moods[i] * 15 + 1, i * 2);
        }
    }
}
exports.MoodSprite = MoodSprite;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Bubble_1 = __webpack_require__(22);
const IMAGE_COUNT = 6;
class TalkBubble extends Bubble_1.Bubble {
    getImageSpriteKey() {
        return 'bubble_images';
    }
    getSpriteFrame() {
        return 0;
    }
    create(humanSprite, game, group) {
        super.create(humanSprite, game, group);
        this.switchImage();
    }
    static getRandomFrame() {
        return Math.floor(Math.random() * IMAGE_COUNT);
    }
    switchImage() {
        //this.imageSprite.loadTexture(this.imageSprite.key, TalkBubble.getRandomFrame());
        this.game.time.events.add(Phaser.Math.random(2, 4) * Phaser.Timer.SECOND, this.switchImage, this);
    }
}
exports.TalkBubble = TalkBubble;


/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const AbstractObject_1 = __webpack_require__(15);
const ObjectDeleter_1 = __webpack_require__(13);
class Desk extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Desk = Desk;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = __webpack_require__(15);
const ObjectDeleter_1 = __webpack_require__(13);
const Play_1 = __webpack_require__(0);
class Dispenser extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Dispenser = Dispenser;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(7);
class ObjectInfo {
    constructor(name, spriteInfos, price) {
        this.name = name;
        this.spriteInfos = spriteInfos;
        this.price = price;
    }
    getName() {
        return this.name;
    }
    getSpriteInfos() {
        return this.spriteInfos;
    }
    getSpriteInfo(objectOrder) {
        return this.spriteInfos[objectOrder];
    }
    getEntryPoints(leftOriented, objectNumber) {
        return this.spriteInfos[objectNumber].getEntryPoints(leftOriented);
    }
    getPositionGapOfSubObject(leftOriented, subObjectNumber) {
        return this.spriteInfos[subObjectNumber].getPositionGapFromOrigin(leftOriented);
    }
    isSellable(remainingMoney) {
        return remainingMoney.isGreaterThan(this.price);
    }
    getPrice() {
        return this.price;
    }
    getCellGaps(leftOriented) {
        let result = [];
        this.spriteInfos.forEach((spriteInfo) => {
            const newGap = spriteInfo.getPositionGapFromOrigin(leftOriented);
            let found = false;
            result.forEach((previousGap) => {
                found = found || (previousGap.x === newGap.x && previousGap.y === newGap.y);
            });
            if (!found) {
                result.push(newGap);
            }
        });
        return result;
    }
    getEntryCells(origin, leftOriented) {
        let result = [];
        this.spriteInfos.forEach((spriteInfo) => {
            spriteInfo.getEntryPoints(leftOriented).forEach((entryPoint) => {
                const gap = spriteInfo.getPositionGapFromOrigin(leftOriented);
                const spriteCell = new PIXI.Point(origin.x + gap.x, origin.y + gap.y);
                result.push(Direction_1.Direction.getNeighbor(spriteCell, entryPoint));
            });
        });
        return result;
    }
}
exports.ObjectInfo = ObjectInfo;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfoRegistry_1 = __webpack_require__(16);
const PositionTransformer_1 = __webpack_require__(4);
const ObjectDeleter_1 = __webpack_require__(13);
const Direction_1 = __webpack_require__(7);
const Play_1 = __webpack_require__(0);
const Pico8Colors_1 = __webpack_require__(2);
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
            if (this.worldKnowledge.canPutHere(this.objectInfo, this.position, this.leftOriented)) {
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
    getPositions() {
        return this.objectInfo.getCellGaps(this.leftOriented).map((cellGap) => {
            return new PIXI.Point(this.position.x + cellGap.x, this.position.y + cellGap.y);
        });
    }
    getEntries(objectNumber) {
        return this.objectInfo.getEntryPoints(this.leftOriented, objectNumber);
    }
    updateForbiddenSprite() {
        const center = ObjectDeleter_1.ObjectDeleter.getCenterOfSprites(this.phantomSprites.map((phantomSprite) => {
            return phantomSprite.getSprite();
        }));
        this.forbiddenSprite.position.set(center.x, center.y);
        this.forbiddenSprite.alpha = this.worldKnowledge.canPutHere(this.objectInfo, this.position, this.leftOriented) ? 0 : 1;
    }
    put(game) {
        game.input.moveCallbacks = [];
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
        this.worldKnowledge.add(this.objectInfo.getName(), this.getOrigin(), this.leftOriented);
        this.destroy();
    }
    getInfo() {
        return this.objectInfo;
    }
    getLeftOriented() {
        return this.leftOriented;
    }
    isEntryAccessible(cellGap, direction) {
        return this.worldKnowledge.isEntryAccessibleForObject(this.position, cellGap, direction);
    }
    isCellFree() {
        for (let i = 0; i < this.getPositions().length; i++) {
            if (!this.worldKnowledge.isFree(this.getPositions()[i])) {
                return false;
            }
        }
        return true;
    }
    getOrigin() {
        return this.position;
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
        this.phantom.getInfo().getSpriteInfos().forEach((spriteInfo) => {
            spriteInfo.getEntryPoints(this.phantom.getLeftOriented()).forEach((direction) => {
                const cellGap = spriteInfo.getPositionGapFromOrigin(this.phantom.getLeftOriented());
                if (this.phantom.isEntryAccessible(cellGap, direction)) {
                    this.graphics.beginFill(Pico8Colors_1.COLOR.LIGHT_GREEN); // Green
                }
                else {
                    this.graphics.beginFill(Pico8Colors_1.COLOR.RED); // Red
                }
                switch (direction) {
                    case Direction_1.DIRECTION.BOTTOM:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-GAP, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.LEFT:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, -GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-GAP, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.TOP:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, -GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(GAP, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.RIGHT:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(GAP, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                }
            });
        });
        this.graphics.beginFill(this.phantom.isCellFree() ? Pico8Colors_1.COLOR.LIGHT_GREEN : Pico8Colors_1.COLOR.RED);
        this.phantom.getInfo().getCellGaps(this.phantom.getLeftOriented()).forEach((cellGap) => {
            this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, 0), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(0, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, 0), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(0, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap));
        });
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ObjectReferer {
    constructor(object, subObjectNumber) {
        this.obj = object;
        this.subObjectNumber = subObjectNumber;
    }
    getObject() {
        return this.obj;
    }
    isUsed() {
        return this.obj.isUsed(this.subObjectNumber);
    }
    getPositionGap() {
        return this.obj.getPositionGap(this.subObjectNumber);
    }
    getEntries() {
        return this.obj.getEntries(this.subObjectNumber);
    }
    getPosition() {
        return this.obj.getCellPositionSubObject(this.subObjectNumber);
    }
    setUsed(human) {
        this.obj.setUsed(this.subObjectNumber, human);
    }
    setUnused() {
        this.obj.setUnused(this.subObjectNumber);
    }
    getIdentifier() {
        return this.subObjectNumber;
    }
}
exports.ObjectReferer = ObjectReferer;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SELECTED = '_selected';
class ObjectSelector {
    static makeSelectable(sprites, fallbackSelect = () => { }, fallbackUnselect = () => { }) {
        sprites.forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.click, this, 0, sprites, fallbackSelect, fallbackUnselect);
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
    static click(sprite, _pointer, sprites, fallbackSelect = () => { }, fallbackUnselect = () => { }) {
        const isSelected = this.isSelected(sprite);
        sprites.forEach((sprite) => {
            this.setSelected(sprite, !isSelected);
        });
        if (isSelected) {
            fallbackUnselect.call();
        }
        else {
            fallbackSelect.call();
        }
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = __webpack_require__(15);
const ObjectDeleter_1 = __webpack_require__(13);
const Play_1 = __webpack_require__(0);
class Sofa extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
    forceOrientation(subObjectNumber) {
        return null;
    }
}
exports.Sofa = Sofa;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(4);
const Direction_1 = __webpack_require__(7);
class SpriteInfo {
    constructor(name, entryPoints, left, bottom, anchorBottom, gapLeft, cellGapX, cellGapY, leftOriented, topOriented) {
        this.name = name;
        this.entryPoints = entryPoints;
        this.left = left;
        this.bottom = bottom;
        this.anchorBottom = anchorBottom;
        this.gapLeft = gapLeft;
        this.cellGap = new PIXI.Point(cellGapX, cellGapY);
        this.leftOriented = leftOriented;
        this.topOriented = topOriented;
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
    getRealPositionFromOrigin(spriteSource, leftOriented, scale = 1) {
        return new PIXI.Point(spriteSource.x + (leftOriented ? -1 : 1) * (this.left - (this.cellGap.x - this.cellGap.y) * PositionTransformer_1.CELL_WIDTH / 2) * scale, spriteSource.y + this.bottom - this.anchorBottom - ((this.cellGap.x + this.cellGap.y) * PositionTransformer_1.CELL_HEIGHT / 2) * scale);
    }
    getAnchor(sprite) {
        return new PIXI.Point(0.5, 1.0 - this.anchorBottom / sprite.height);
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
    /**
     * Returns the gap from the origin cell. It takes the mirror effect in account. For examples:
     * [1, 0] => [0, 1]
     * [0, 1] => [1, 0]
     * [1, 1] => [1, 1]
     * @param {boolean} leftOriented
     * @returns {PIXI.Point}
     */
    getPositionGapFromOrigin(leftOriented) {
        if (!leftOriented) {
            return this.cellGap;
        }
        else {
            return new PIXI.Point(this.cellGap.y, this.cellGap.x);
        }
    }
    getTopOrientation() {
        return this.topOriented;
    }
    /**
     * Returns false if the user looks to the right when he interacts with the object.
     * Returns true if the user looks to the left when he interacts with the object.
     *
     * @param {boolean} leftOriented
     * @returns {boolean}
     */
    getOrientation(leftOriented) {
        return leftOriented ? !this.leftOriented : this.leftOriented;
    }
}
exports.SpriteInfo = SpriteInfo;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const AbstractObject_1 = __webpack_require__(15);
const ObjectDeleter_1 = __webpack_require__(13);
class Table extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Table = Table;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = __webpack_require__(4);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = __webpack_require__(23);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = __webpack_require__(55);
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Pico8Colors_1 = __webpack_require__(2);
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const HumanStateManager_1 = __webpack_require__(1);
const Tooltip_1 = __webpack_require__(25);
const SmoothValue_1 = __webpack_require__(14);
const PARTS = 36;
class Camembert {
    constructor() {
        this.data = [];
        this.tooltip = new Tooltip_1.Tooltip(() => {
            const position = this.game.input.mousePointer.position;
            const positionThroughtCenter = new PIXI.Point(position.x - this.graphics.x, position.y - this.graphics.y);
            let angle = Math.atan2(positionThroughtCenter.x, -positionThroughtCenter.y);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            const currentCamembert = this.getSelectedCamembertPart(angle);
            if (currentCamembert) {
                return currentCamembert.getString();
            }
            return '';
        });
        this.shouldRefreshData = true;
        this.shouldRefreshCamembert = true;
    }
    create(game, groups) {
        this.game = game;
        this.graphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH / 2, 180, groups[Play_1.GROUP_INTERFACE]);
        this.drawCamembert();
        this.tooltip.setInput(this, this.graphics);
        groups[Play_1.GROUP_INTERFACE].add(this.graphics);
        this.tooltip.create(game, groups);
    }
    setHuman(human) {
        this.human = human;
    }
    update() {
        if (this.human) {
            if (this.shouldRefreshData) {
                this.refreshData();
            }
            if (this.shouldRefreshCamembert) {
                this.drawCamembert();
            }
        }
        this.tooltip.update();
    }
    drawCamembert() {
        this.graphics.clear();
        const sumValues = this.sumValues();
        let currentAngle = 0;
        const RADIUS = (UserInterface_1.INTERFACE_WIDTH - 30) / 2;
        for (let i = 0; i < this.data.length; i++) {
            const camembertPart = this.data[i];
            const points = camembertPart.getPoints(currentAngle, sumValues, RADIUS);
            currentAngle += camembertPart.getAngle(sumValues);
            this.graphics.beginFill(camembertPart.getColor());
            this.graphics.drawPolygon(points);
            this.graphics.endFill();
        }
        this.shouldRefreshCamembert = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
            this.shouldRefreshCamembert = true;
        }, this);
    }
    refreshData() {
        let foundIdentifiers = [];
        this.human.getNextProbabilities().forEach((state) => {
            let found = false;
            for (let i = 0; i < this.data.length; i++) {
                const camembertPart = this.data[i];
                if (camembertPart.getState() === state.state) {
                    camembertPart.setValue(state.probability);
                    found = true;
                    foundIdentifiers.push(i);
                }
            }
            if (!found) {
                this.data.push(new CamembertPart(state.state, state.probability, Camembert.getColor(state.state), HumanStateManager_1.HumanStateManager.getStr(state.state)));
            }
        });
        for (let i = 0; i < this.data.length; i++) {
            if (foundIdentifiers.indexOf(i) <= -1) {
                this.data[i].setValue(0);
            }
        }
        this.shouldRefreshData = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 1.1, () => {
            this.shouldRefreshData = true;
        }, this);
    }
    static getColor(state) {
        switch (state) {
            case HumanStateManager_1.STATE.SMOKE: return Pico8Colors_1.COLOR.DARK_GREY;
            case HumanStateManager_1.STATE.FREEZE: return Pico8Colors_1.COLOR.LIGHT_BLUE;
            case HumanStateManager_1.STATE.MOVE_RANDOM: return Pico8Colors_1.COLOR.ROSE;
            case HumanStateManager_1.STATE.SIT: return Pico8Colors_1.COLOR.ORANGE;
            case HumanStateManager_1.STATE.TYPE: return Pico8Colors_1.COLOR.LIGHT_GREEN;
            case HumanStateManager_1.STATE.TALK: return Pico8Colors_1.COLOR.YELLOW;
            case HumanStateManager_1.STATE.COFFEE: return Pico8Colors_1.COLOR.MARROON;
            case HumanStateManager_1.STATE.RAGE: return Pico8Colors_1.COLOR.RED;
            case HumanStateManager_1.STATE.SIT_TALK: return Pico8Colors_1.COLOR.DARK_GREEN;
        }
    }
    getSelectedCamembertPart(angle) {
        let currentAngle = 0;
        const sum = this.sumValues();
        for (let i = 0; i < this.data.length; i++) {
            const camembertPart = this.data[i];
            const camembertAngle = camembertPart.getAngle(sum);
            if (angle >= currentAngle && angle <= (currentAngle + camembertAngle)) {
                return camembertPart;
            }
            currentAngle += camembertAngle;
        }
        return null;
    }
    sumValues() {
        return this.data.reduce((cur, camembertPart) => {
            return cur + camembertPart.getValue();
        }, 0);
    }
    show() {
        this.graphics.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
    hide() {
        this.graphics.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
}
exports.Camembert = Camembert;
class CamembertPart {
    constructor(state, value, color, text) {
        this.state = state;
        this.value = new SmoothValue_1.SmoothValue(value);
        this.color = color;
        this.text = text;
    }
    getValue() {
        return this.value.getValue();
    }
    getPoints(currentAngle, sumValues, RADIUS) {
        const angleOfAPart = Math.PI * 2 / PARTS;
        const littleGap = 1 * Math.PI * 2 / 360;
        const valueAngle = this.getAngle(sumValues);
        let points = [
            new PIXI.Point(Math.sin(currentAngle) * RADIUS, -Math.cos(currentAngle) * RADIUS)
        ];
        for (let j = 0; j < Math.PI * 2; j += angleOfAPart) {
            if (j > currentAngle && j < currentAngle + valueAngle) {
                points.push(new PIXI.Point(Math.sin(j) * RADIUS, -Math.cos(j) * RADIUS));
            }
        }
        points.push(new PIXI.Point(Math.sin(Math.min(currentAngle + valueAngle + littleGap, Math.PI * 2)) * RADIUS, -Math.cos(Math.min(currentAngle + valueAngle + littleGap, Math.PI * 2)) * RADIUS));
        points.push(new PIXI.Point(0, 0));
        return points;
    }
    getAngle(sumValues) {
        return this.value.getValue() / sumValues * Math.PI * 2;
    }
    getColor() {
        return this.color;
    }
    getString() {
        return this.text;
    }
    getState() {
        return this.state;
    }
    setValue(probability) {
        this.value.setValue(probability);
    }
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = __webpack_require__(12);
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const ObjectSeller_1 = __webpack_require__(24);
const Play_1 = __webpack_require__(0);
const TextStyle_1 = __webpack_require__(10);
const Pico8Colors_1 = __webpack_require__(2);
const Gauge_1 = __webpack_require__(21);
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
    update() {
        this.applicantButtons.forEach((applicantButton) => {
            applicantButton.update();
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
        this.cancel(applicant);
        this.worldKnowledge.addEmployee(applicant.getHumanProperties());
    }
    cancel(applicant) {
        const index = this.applicantButtons.indexOf(applicant);
        this.applicantButtons[index] = new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(), this.worldKnowledge);
        this.applicantButtons[index].create(this.game, this.groups, index);
        if (!this.visible) {
            this.applicantButtons[index].hide();
        }
    }
}
exports.HumanEmployer = HumanEmployer;
class ApplicantButton {
    constructor(humanEmployer, humanProperties, worldKnowledge) {
        this.humanEmployer = humanEmployer;
        this.humanProperties = humanProperties;
        this.worldKnowledge = worldKnowledge;
        this.availabilityTime = (45 + Math.random() * 45) * Phaser.Timer.SECOND;
        this.remainingTime = this.availabilityTime;
        this.remainingGauge = new Gauge_1.Gauge(ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, Pico8Colors_1.COLOR.YELLOW, 5);
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE;
        const squareCenter = new PIXI.Point(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2, top + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
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
        this.remainingGauge.create(game, groups, new PIXI.Point(left, top + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE - 5 - 0.5));
        this.remainingGauge.setValue(1);
        game.add.tween(this).to({
            remainingTime: 0
        }, this.availabilityTime, 'Linear', true);
    }
    hide() {
        this.sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
        this.remainingGauge.hide();
    }
    show() {
        this.sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
        this.remainingGauge.show();
    }
    click() {
        this.destroy();
        this.humanEmployer.employ(this);
    }
    getHumanProperties() {
        return this.humanProperties;
    }
    update() {
        if (this.remainingTime <= 0) {
            this.destroy();
            this.humanEmployer.cancel(this);
            return;
        }
        this.remainingGauge.setValue(this.remainingTime / this.availabilityTime);
        this.remainingGauge.update();
    }
    destroy() {
        this.sprite.destroy(true);
        this.name.destroy(true);
        this.typeText.destroy(true);
        this.square.destroy(true);
        this.remainingGauge.destroy(true);
    }
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const Play_1 = __webpack_require__(0);
const Pico8Colors_1 = __webpack_require__(2);
const HEIGHT = 80;
const GRAPH_GAP = 2;
class InfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        const top = UserInterface_1.TOP_GAP;
        this.moods = game.add.graphics(left, top, groups[Play_1.GROUP_INTERFACE]);
    }
    update() {
        const graphWidth = UserInterface_1.INTERFACE_WIDTH - 2 * GRAPH_GAP;
        const lastMoods = this.worldKnowledge.getLastMoods();
        this.moods.clear();
        this.moods.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.moods.moveTo(0, 0);
        this.moods.lineTo(0, HEIGHT);
        this.moods.lineTo(graphWidth, HEIGHT);
        this.moods.moveTo(graphWidth, HEIGHT - lastMoods[0] * HEIGHT);
        for (let i = 1; i < lastMoods.length; i++) {
            this.moods.lineTo(graphWidth - i, HEIGHT - lastMoods[i] * HEIGHT);
        }
    }
    show() {
        if (!this.visible) {
            this.moods.position.x -= UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.moods.position.x += UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = false;
    }
}
exports.InfoPanel = InfoPanel;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const HumanPropertiesFactory_1 = __webpack_require__(12);
const Pico8Colors_1 = __webpack_require__(2);
const Gauge_1 = __webpack_require__(21);
const Tooltip_1 = __webpack_require__(25);
const GAP = 3;
const TOP = 12;
class LevelDisplayer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.gauges = {};
        this.tooltips = {};
        const width = Math.floor((UserInterface_1.INTERFACE_WIDTH - 4 * GAP) / 3);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.LIGHT_GREEN);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.RED);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.ROSE);
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER) * 1000) + ' lines coded';
        });
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) * 10) + ' licence sell';
        });
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) * 10) + ' campaigns done';
        });
    }
    create(game, groups) {
        const width = Math.floor((UserInterface_1.INTERFACE_WIDTH - 4 * GAP) / 3);
        for (let i = 0; i < Object.keys(this.gauges).length; i++) {
            this.gauges[Object.keys(this.gauges)[i]].create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAP + (width + GAP) * i, TOP));
        }
        Object.keys(this.tooltips).forEach((employeeType) => {
            this.tooltips[employeeType].create(game, groups);
            this.tooltips[employeeType].setInput(this, this.gauges[parseInt(employeeType)].getGraphics());
        });
    }
    update() {
        Object.keys(this.gauges).forEach((employeeType) => {
            this.gauges[employeeType].setValue(this.worldKnowledge.getLevelProgress(parseInt(employeeType)));
            this.gauges[employeeType].update();
        });
        Object.keys(this.tooltips).forEach((employeeType) => {
            this.tooltips[employeeType].update();
        });
    }
}
exports.LevelDisplayer = LevelDisplayer;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = __webpack_require__(6);
const app_1 = __webpack_require__(3);
const Play_1 = __webpack_require__(0);
const TextStyle_1 = __webpack_require__(10);
const HumanMoodManager_1 = __webpack_require__(19);
const Camembert_1 = __webpack_require__(58);
const HumanStateManager_1 = __webpack_require__(1);
const Gauge_1 = __webpack_require__(21);
const Pico8Colors_1 = __webpack_require__(2);
const HEIGHT = 80;
const GRAPH_GAP = 2;
const GAP_BETWEEN_LINES = 10;
const GAUGE_GAP = 100;
class UserInfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.camembert = new Camembert_1.Camembert();
        const gaugeWidth = UserInterface_1.INTERFACE_WIDTH - GAUGE_GAP - GRAPH_GAP;
        this.moodRelaxationGauge = new Gauge_1.Gauge(gaugeWidth, Pico8Colors_1.COLOR.WHITE, 8);
        this.moodHungerGauge = new Gauge_1.Gauge(gaugeWidth, Pico8Colors_1.COLOR.WHITE, 8);
        this.moodSocialGauge = new Gauge_1.Gauge(gaugeWidth, Pico8Colors_1.COLOR.WHITE, 8);
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        this.employeeName = game.add.text(left, UserInterface_1.TOP_GAP, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodRelaxationText = game.add.text(left, UserInterface_1.TOP_GAP + GAP_BETWEEN_LINES, 'Relax', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodHungerText = game.add.text(left, UserInterface_1.TOP_GAP + 2 * GAP_BETWEEN_LINES, 'Hunger', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodSocialText = game.add.text(left, UserInterface_1.TOP_GAP + 3 * GAP_BETWEEN_LINES, 'Social', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.currentState = game.add.text(left, UserInterface_1.TOP_GAP + 4 * GAP_BETWEEN_LINES, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.camembert.create(game, groups);
        this.moodRelaxationGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + GAP_BETWEEN_LINES - 3.5));
        this.moodHungerGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + 2 * GAP_BETWEEN_LINES - 3.5));
        this.moodSocialGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + 3 * GAP_BETWEEN_LINES - 3.5));
    }
    update() {
        if (this.human) {
            this.moodRelaxationGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.RELAXATION));
            this.moodHungerGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.HUNGER));
            this.moodSocialGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.SOCIAL));
            this.moodRelaxationGauge.update();
            this.moodHungerGauge.update();
            this.moodSocialGauge.update();
            this.camembert.update();
            this.currentState.setText('State: ' + HumanStateManager_1.HumanStateManager.getStr(this.human.getState()));
        }
    }
    show() {
        if (!this.visible) {
            this.employeeName.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.camembert.show();
            this.moodRelaxationText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodRelaxationGauge.show();
            this.moodHungerGauge.show();
            this.moodSocialGauge.show();
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.employeeName.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.camembert.hide();
            this.moodRelaxationText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodRelaxationGauge.hide();
            this.moodHungerGauge.hide();
            this.moodSocialGauge.hide();
        }
        this.visible = false;
    }
    showEmployeeInfoPanelForYohan(human) {
        this.human = human;
        this.employeeName.setText(human.getName());
        this.camembert.setHuman(human);
    }
}
exports.UserInfoPanel = UserInfoPanel;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);