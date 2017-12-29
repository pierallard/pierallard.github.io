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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = __webpack_require__(40);
const UserInterface_1 = __webpack_require__(16);
const MCV_1 = __webpack_require__(23);
const HumanPlayer_1 = __webpack_require__(43);
const ComputerPlayer_1 = __webpack_require__(42);
exports.SCALE = 2;
exports.MOVE = 3 * exports.SCALE;
exports.PANEL_WIDTH = 80;
class Play extends Phaser.State {
    constructor() {
        super();
        this.worldKnowledge = new WorldKnowledge_1.WorldKnowledge();
        this.players = [
            new HumanPlayer_1.HumanPlayer(this.worldKnowledge, 0, 0x00ff00),
            new ComputerPlayer_1.ComputerPlayer(this.worldKnowledge, 1, 0xff00ff),
        ];
        this.userInterface = new UserInterface_1.UserInterface(this.worldKnowledge, this.players[0]);
    }
    create() {
        this.worldKnowledge.create(this.game);
        this.userInterface.create(this.game);
        this.world.setBounds(0, 0, this.worldKnowledge.getGroundWidth(), this.worldKnowledge.getGroundHeight());
        this.game.camera.bounds.setTo(0, 0, this.worldKnowledge.getGroundWidth() + exports.PANEL_WIDTH * exports.SCALE, this.worldKnowledge.getGroundHeight());
        this.registerInputs();
        this.start();
    }
    start() {
        this.worldKnowledge.addUnit(new MCV_1.MCV(this.worldKnowledge, new PIXI.Point(5, 5), this.players[0]));
        this.worldKnowledge.addUnit(new MCV_1.MCV(this.worldKnowledge, new PIXI.Point(35, 35), this.players[1]));
        this.players.filter((player) => {
            if (player.constructor.name === 'ComputerPlayer') {
                player.getUnitCreator().create(this.game);
                player.getBuildingCreator().create(this.game);
            }
        });
        this.game.time.events.loop(5000, () => {
            this.players.filter((player) => {
                if (player.constructor.name === 'ComputerPlayer') {
                    player.update();
                }
            });
        });
    }
    update() {
        this.worldKnowledge.update();
        this.userInterface.update();
        if (this.upKey.isDown || this.zKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x, this.game.camera.position.y - exports.MOVE);
        }
        else if (this.downKey.isDown || this.sKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x, this.game.camera.position.y + exports.MOVE);
        }
        if (this.leftKey.isDown || this.qKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x - exports.MOVE, this.game.camera.position.y);
        }
        else if (this.rightKey.isDown || this.dKey.isDown) {
            this.game.camera.setPosition(this.game.camera.position.x + exports.MOVE, this.game.camera.position.y);
        }
    }
    registerInputs() {
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    }
}
exports.default = Play;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = __webpack_require__(10);
const Play_1 = __webpack_require__(0);
class Cell {
    static cellToReal(position) {
        return Ground_1.GROUND_SIZE * Play_1.SCALE * position + (Ground_1.GROUND_SIZE * Play_1.SCALE) / 2;
    }
    static realToCell(position) {
        return Math.round((position - (Ground_1.GROUND_SIZE * Play_1.SCALE) / 2) / (Ground_1.GROUND_SIZE * Play_1.SCALE));
    }
}
exports.Cell = Cell;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AStar_1 = __webpack_require__(13);
const MAX_SEARCH_RADIUS = 20;
class AlternativePosition {
    /**
     * Returns true if the unit is arrived to its goal, or close enough to be considered as arrived.
     *
     * @param goalPosition    The goal position
     * @param currentPosition The current position of the unit
     * @param isAccessible    This method checks if a position is accessible by this unit
     * @returns {boolean}
     */
    static isArrived(goalPosition, currentPosition, isAccessible) {
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            const points = this.getPointsFromRadius(goalPosition, radius);
            let foundAccessible = false;
            for (let i = 0; i < points.length; i++) {
                let test = points[i];
                if (currentPosition.x === test.x && currentPosition.y === test.y) {
                    return true;
                }
                if (isAccessible(test) && null !== AStar_1.AStar.getPath(currentPosition, test, isAccessible)) {
                    foundAccessible = true;
                }
            }
            if (foundAccessible) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns the closest available position to be considered as arrived.
     *
     * @param goalPosition    The goal position
     * @param currentPosition The current position of the unit
     * @param isAccessible    This method checks if a position is accessible by this unit
     * @returns {{PIXI.Point}}
     */
    static getClosestAvailable(goalPosition, currentPosition, isAccessible) {
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            let possiblePositions = this.getPointsFromRadius(goalPosition, radius);
            possiblePositions = possiblePositions.filter((pos) => {
                return isAccessible(pos) && null !== AStar_1.AStar.getPath(currentPosition, pos, isAccessible);
            });
            if (possiblePositions.length) {
                possiblePositions.sort((pos1, pos2) => {
                    return ((pos1.x - currentPosition.x) * (pos1.x - currentPosition.x) +
                        (pos1.y - currentPosition.y) * (pos1.y - currentPosition.y)) - ((pos2.x - currentPosition.x) * (pos2.x - currentPosition.x) +
                        (pos2.y - currentPosition.y) * (pos2.y - currentPosition.y));
                });
                return possiblePositions[0];
            }
        }
        return null;
    }
    static getPointsFromRadius(position, radius) {
        let possiblePositions = [];
        if (radius === 0) {
            possiblePositions.push(new PIXI.Point(position.x, position.y));
        }
        else {
            for (let x = -radius; x <= radius; x++) {
                possiblePositions.push(new PIXI.Point(position.x + x, position.y - radius));
                possiblePositions.push(new PIXI.Point(position.x + x, position.y + radius));
            }
            for (let y = -radius; y <= radius; y++) {
                possiblePositions.push(new PIXI.Point(position.x - radius, position.y + y));
                possiblePositions.push(new PIXI.Point(position.x + radius, position.y + y));
            }
        }
        return possiblePositions;
    }
}
exports.AlternativePosition = AlternativePosition;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Stand {
    constructor(unit) {
        this.unit = unit;
    }
    getNextStep() {
        return this;
    }
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable) {
            this.unit.shoot(shootable);
        }
    }
}
exports.Stand = Stand;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DATA = {
    Harvester: {
        allowed_by: ['WeaponsFactory', 'TiberiumRefinery'],
        construction_time: 2,
        life: 100,
        options: {
            load_time: 1,
            max_loading: 50,
            unload_time: 1,
        },
        shoot: 0.5,
        shoot_distance: Math.sqrt(2),
        slowness: 0.4,
        sprite_layer: 6,
        sprites: ['Builder2', 'Builder2'],
    },
    MCV: {
        allowed_by: ['WeaponsFactory', 'AdvancedCommandCenter'],
        construction_time: 2,
        life: 1000,
        shoot_distance: -1,
        slowness: 0.8,
        sprite_layer: 6,
        sprites: ['Transprt', 'Transprt'],
    },
    Tank: {
        allowed_by: ['Barracks'],
        construction_time: 2,
        life: 500,
        shoot: 0.5,
        shoot_distance: 4,
        slowness: 0.25,
        sprite_layer: 6,
        sprites: ['Tank11', 'Tank12'],
    },
};
class UnitProperties {
    static getSprite(unitName, playerId) {
        return DATA[unitName].sprites[playerId];
    }
    static getOption(unitName, optionName) {
        return DATA[unitName].options[optionName];
    }
    static getShootDistance(unitName) {
        return DATA[unitName].shoot_distance;
    }
    static getLife(unitName) {
        return DATA[unitName].life;
    }
    static getShootTime(unitName) {
        return DATA[unitName].shoot;
    }
    static getSlownessTime(unitName) {
        return DATA[unitName].slowness;
    }
    static getRequiredBuildings(unitName) {
        return DATA[unitName].allowed_by;
    }
    static getConstructableUnits() {
        return Object.keys(DATA);
    }
    static getSpriteLayer(unitName) {
        return DATA[unitName].sprite_layer;
    }
    static getConstructionTime(unitName) {
        return DATA[unitName].construction_time;
    }
}
exports.UnitProperties = UnitProperties;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DATA = {
    Barracks: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [
            'Tank',
        ],
        construction_time: 2,
        requireds: [
            'PowerPlant',
        ],
        sprite: 'Module',
        sprite_layer: 0,
    },
    ConcreteBarrier: {
        cellPositions: [[0, 0]],
        constructable: true,
        constructable_units: [],
        construction_time: 0.5,
        requireds: ['ConstructionYard'],
        sprite: 'Wall',
        sprite_layer: 0,
    },
    ConstructionYard: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: false,
        constructable_units: [
            'Harvester',
        ],
    },
    PowerPlant: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 2,
        requireds: [
            'ConstructionYard',
        ],
        sprite: 'Factory2',
        sprite_layer: 0,
    },
    TiberiumRefinery: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 2,
        requireds: [
            'PowerPlant',
        ],
        sprite: 'Factory3',
        sprite_layer: 0,
    },
};
/**
 * Buildings:
 * - construction yard    : MinerAni
 * - power plant          : Factory2
 * - barracks             : Module
 * - tiberium refinery    : Factory3
 * - comm center          : Silo
 * - concrete barrier     : Wall
 * - repair facility      : TradPlat
 * - guard tower          : Turret
 * - helipad              : Starport
 * - weapons factory      : ConstructionYard
 * - silo                 : Storage1
 * - advanced guard tower : Artilery2
 */
class BuildingProperties {
    static getCellPositions(buildingName) {
        return DATA[buildingName].cellPositions.map((position) => {
            return new PIXI.Point(position[0], position[1]);
        });
    }
    static getConstructableBuildings() {
        return Object.keys(DATA).filter((buildingKey) => {
            return DATA[buildingKey].constructable;
        });
    }
    static getSpriteKey(buildingName) {
        return DATA[buildingName].sprite;
    }
    static getSpriteLayer(buildingName) {
        return DATA[buildingName].sprite_layer;
    }
    static getConstructableUnits(buildingName) {
        return DATA[buildingName].constructable_units;
    }
    static getRequiredBuildings(buildingName) {
        return DATA[buildingName].requireds;
    }
    static getConstructionTime(buildingName) {
        return DATA[buildingName].construction_time;
    }
}
exports.BuildingProperties = BuildingProperties;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = __webpack_require__(5);
class ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        this.life = 100;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
    }
    setVisible(value) {
        this.sprite.alpha = value ? 1 : 0;
    }
    getCellPositions() {
        return BuildingProperties_1.BuildingProperties.getCellPositions(this.constructor.name).map((position) => {
            return new PIXI.Point(position.x + this.cellPosition.x, position.y + this.cellPosition.y);
        });
    }
    ;
    getPlayer() {
        return this.player;
    }
    destroy() {
        this.sprite.doDestroy();
    }
    lostLife(life) {
        this.life -= life;
        if (!this.isAlive()) {
            this.sprite.doDestroy();
            this.worldKnowledge.removeBuilding(this);
        }
    }
    isAlive() {
        return this.life > 0;
    }
}
exports.ConstructableBuilding = ConstructableBuilding;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
class BuildingSprite extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.scale.setTo(Play_1.SCALE);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
    }
    doExplodeEffect() {
        // this.game.add.existing(new Explosion(this.game, this.x, this.y));
    }
}
exports.BuildingSprite = BuildingSprite;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AStar_1 = __webpack_require__(13);
const Stand_1 = __webpack_require__(3);
const Attack_1 = __webpack_require__(20);
const Follow_1 = __webpack_require__(11);
const MoveAttack_1 = __webpack_require__(21);
const UnitSprite_1 = __webpack_require__(19);
const Distance_1 = __webpack_require__(9);
const UnitProperties_1 = __webpack_require__(4);
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Distance {
    static to(from, to) {
        let toArray = ((!(to instanceof Array)) ? [to] : to);
        let fromArray = ((!(from instanceof Array)) ? [from] : from);
        let distances = [];
        toArray.forEach((posTo) => {
            fromArray.forEach((posFrom) => {
                distances.push(Math.sqrt((posFrom.x - posTo.x) * (posFrom.x - posTo.x) +
                    (posFrom.y - posTo.y) * (posFrom.y - posTo.y)));
            });
        });
        return distances.reduce((dist1, dist2) => {
            return Math.min(dist1, dist2);
        });
    }
    static getClosest(from, objects) {
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const distance = Distance.to(from, object.getCellPositions());
            if (null === closest || minDistance > distance) {
                minDistance = distance;
                closest = object;
            }
        }
        return closest;
    }
}
exports.Distance = Distance;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
exports.GROUND_SIZE = 20;
class Ground {
    constructor() {
        this.obstacles = [];
    }
    create(game) {
        this.map = game.add.tilemap('basicmap');
        this.map.addTilesetImage('GrasClif', 'GrasClif');
        this.map.addTilesetImage('GrssMisc', 'GrssMisc');
        let layer = this.map.createLayer('layer');
        layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(layer);
        this.initializeObstacles();
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.x >= this.map.width || position.y < 0 || position.y >= this.map.height) {
            return false;
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === position.x && this.obstacles[i].y === position.y) {
                return false;
            }
        }
        return true;
    }
    getGroundWidth() {
        return this.map.widthInPixels * Play_1.SCALE;
    }
    getGroundHeight() {
        return this.map.heightInPixels * Play_1.SCALE;
    }
    initializeObstacles() {
        for (let x = 0; x < this.map.width; x++) {
            for (let y = 0; y < this.map.height; y++) {
                let index = this.map.getTile(x, y).index;
                if (index !== 13) {
                    this.obstacles.push(new PIXI.Point(x, y));
                }
            }
        }
    }
}
exports.Ground = Ground;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = __webpack_require__(2);
class Follow {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        return this;
    }
    run() {
        if (!this.isArrived()) {
            this.unit.moveTowards(this.goal.getCellPositions()[0]);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Follow = Follow;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(35);
const Preload_1 = __webpack_require__(36);
const Play_1 = __webpack_require__(0);
exports.GAME_WIDTH = 1600 * 0.8;
exports.GAME_HEIGHT = 900 * 0.8;
class SimpleGame extends Phaser.Game {
    constructor() {
        super(exports.GAME_WIDTH, exports.GAME_HEIGHT, Phaser.AUTO, // Open GL for effect / shader ?
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = __webpack_require__(2);
class AStar {
    static getPathOrClosest(cellPosition, cellGoal, isPositionAccessible) {
        let goal = AlternativePosition_1.AlternativePosition.getClosestAvailable(cellGoal, cellPosition, isPositionAccessible);
        return this.getPath(cellPosition, goal, isPositionAccessible);
    }
    static getPath(cellPosition, cellGoal, isPositionAccessible) {
        let firstPath = new Path(cellGoal);
        firstPath.add(cellPosition);
        let paths = new Paths();
        paths.add(firstPath);
        let tries = 500;
        while (tries > 0) {
            let path = paths.getBetterConfidence();
            if (!path) {
                return null;
            }
            const nextPositions = path.getNextPositions().filter(isPositionAccessible.bind(this));
            path.setDone();
            for (let i = 0; i < nextPositions.length; i++) {
                tries--;
                const nextPosition = nextPositions[i];
                let newPath = path.clonez().add(nextPosition);
                let existingPath = paths.getExistingThrough(nextPosition);
                if (!existingPath) {
                    if (nextPosition.x === cellGoal.x &&
                        nextPosition.y === cellGoal.y) {
                        return newPath;
                    }
                    paths.add(newPath);
                }
                else {
                    const newWeight = newPath.weight();
                    const oldWeight = existingPath.weightUntil(nextPosition);
                    if (newWeight < oldWeight) {
                        existingPath.replaceBeginWith(newPath);
                    }
                }
            }
        }
        return null;
    }
}
exports.AStar = AStar;
class Paths {
    constructor() {
        this.paths = [];
    }
    add(path) {
        this.paths.push(path);
    }
    getExistingThrough(position) {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].passThrough(position)) {
                return this.paths[i];
            }
        }
        return null;
    }
    length() {
        return this.paths.length;
    }
    getBetterConfidence() {
        const sortedPaths = this.paths.filter((path) => {
            return path.isNotDone();
        }).sort((path1, path2) => {
            return path1.getConfidence() - path2.getConfidence();
        });
        return sortedPaths[0];
    }
}
class Path {
    constructor(goal) {
        this.done = false;
        this.goal = goal;
        this.steps = [];
    }
    add(position) {
        this.steps.push(position);
        this.confidence = Math.sqrt((position.x - this.goal.x) * (position.x - this.goal.x) +
            (position.y - this.goal.y) * (position.y - this.goal.y));
        return this;
    }
    getNextPositions() {
        const lastStep = this.steps[this.steps.length - 1];
        return [
            new PIXI.Point(lastStep.x, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y),
            new PIXI.Point(lastStep.x, lastStep.y + 1),
            new PIXI.Point(lastStep.x - 1, lastStep.y),
            new PIXI.Point(lastStep.x - 1, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y + 1),
            new PIXI.Point(lastStep.x - 1, lastStep.y + 1),
        ];
    }
    clonez() {
        let result = new Path(this.goal);
        this.steps.forEach((step) => {
            result.add(step);
        });
        return result;
    }
    toString() {
        return this.steps.map((step) => { return '(' + step.x + ', ' + step.y + ')'; }).join(', ');
    }
    passThrough(position) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return true;
            }
        }
        return false;
    }
    getConfidence() {
        return this.confidence;
    }
    firstStep() {
        return this.steps[1];
    }
    setDone() {
        this.done = true;
    }
    isNotDone() {
        return this.done === false;
    }
    weight() {
        let weight = 0;
        for (let i = 0; i < this.steps.length - 1; i++) {
            weight += Math.sqrt((this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y));
        }
        return weight;
    }
    weightUntil(position) {
        let weight = 0;
        for (let i = 0; i < this.steps.length - 1; i++) {
            weight += Math.sqrt((this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y));
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return weight;
            }
        }
        return weight;
    }
    replaceBeginWith(newPath) {
        let newSteps = [];
        for (let i = 0; i < newPath.steps.length; i++) {
            newSteps.push(newPath.steps[i]);
        }
        let add = false;
        const x = newPath.steps[newPath.steps.length - 1].x;
        const y = newPath.steps[newPath.steps.length - 1].y;
        for (let i = 0; i < this.steps.length; i++) {
            if (add) {
                newSteps.push(this.steps[i]);
            }
            else if (this.steps[i].x === x && this.steps[i].y === y) {
                add = true;
            }
        }
        this.steps = newSteps;
    }
    isStillAvailable(isPositionAccessible) {
        for (let i = 0; i < this.steps.length; i++) {
            if (!isPositionAccessible(this.steps[i])) {
                return false;
            }
        }
        return true;
    }
    splice() {
        return this.steps.splice(1, 1)[0];
    }
}
exports.Path = Path;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCreator {
    constructor(worldKnowledge, player) {
        this.uiCreator = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game, uiCreator = null) {
        this.timerEvent = game.time.events;
        this.uiCreator = uiCreator;
    }
    updateAllowedItems() {
        if (this.uiCreator) {
            this.uiCreator.updateAllowedItems(this.getAlloweds());
        }
    }
    isAllowed(itemName) {
        let found = true;
        this.getRequiredBuildings(itemName).forEach((requiredBuildingName) => {
            if (this.worldKnowledge.getPlayerBuildings(this.player, requiredBuildingName).length === 0) {
                found = false;
            }
        });
        return found;
    }
    getAlloweds() {
        return this.getProducibles().filter((itemName) => {
            return this.isAllowed(itemName);
        });
    }
}
exports.AbstractCreator = AbstractCreator;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const WIDTH = 33;
const HEIGHT = 36;
class AbstractUICreator {
    constructor(worldKnowledge, player, x) {
        this.buttons = [];
        this.player = player;
        this.worldKnowledge = worldKnowledge;
        this.x = x;
    }
    create(game, group, creator) {
        let top = 250;
        this.getConstructableItems().forEach((item) => {
            this.buttons.push(new CreationButton(this, game, top, item, group, this.x, this.getSpriteKey(item), this.getSpriteLayer(item), this.onClickFunction, this.onProductFinish));
            top += HEIGHT * Play_1.SCALE;
        });
        creator.create(game, this);
    }
    updateAllowedItems(allowedItems) {
        this.buttons.forEach((button) => {
            if (allowedItems.indexOf(button.getName()) > -1) {
                button.show();
            }
            else {
                button.hide();
            }
        });
    }
    resetButton(itemName) {
        this.getButton(itemName).reset();
    }
    setPendingButton(itemName) {
        this.getButton(itemName).setPending();
    }
    runProduction(itemName) {
        this.getButton(itemName).runProduction(this.getConstructionTime(itemName));
    }
    getPlayer() {
        return this.player;
    }
    getButton(itemName) {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].getName() === itemName) {
                return this.buttons[i];
            }
        }
        return null;
    }
}
exports.AbstractUICreator = AbstractUICreator;
class CreationButton {
    constructor(creator, game, top, itemName, group, x, spriteKey, spriteLayer, onClickFunction, onProductFinished) {
        this.itemName = itemName;
        this.onProductFinished = onProductFinished;
        this.creator = creator;
        this.button = new Phaser.Sprite(game, x, top, 'buttons', 0);
        this.button.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(() => {
            onClickFunction.bind(creator)(this.itemName);
        }, creator);
        group.add(this.button);
        this.itemSprite = new Phaser.Sprite(game, x + WIDTH * Play_1.SCALE / 2, top + HEIGHT * Play_1.SCALE / 2, spriteKey, spriteLayer);
        this.itemSprite.scale.setTo(Play_1.SCALE / 2, Play_1.SCALE / 2);
        this.itemSprite.anchor.setTo(0.5, 0.7);
        group.add(this.itemSprite);
        this.progress = new CreationButtonProgress(game, top, x);
        group.add(this.progress);
        this.hide();
    }
    runProduction(constructionTime) {
        this.button.loadTexture(this.button.key, 1);
        const tween = this.progress.startProgress(constructionTime * Phaser.Timer.SECOND);
        tween.onComplete.add(() => {
            this.onProductFinished.bind(this.creator)(this.itemName);
        }, this.creator);
    }
    getName() {
        return this.itemName;
    }
    reset() {
        this.progress.resetProgress();
        this.button.loadTexture(this.button.key, 0);
    }
    setPending() {
        this.button.loadTexture(this.button.key, 2);
    }
    hide() {
        this.button.alpha = 0;
        this.itemSprite.alpha = 0;
        this.progress.alpha = 0;
    }
    show() {
        this.button.alpha = 1;
        this.itemSprite.alpha = 1;
        this.progress.alpha = 1;
    }
}
class CreationButtonProgress extends Phaser.Sprite {
    constructor(game, top, x) {
        super(game, x, top + 54, 'button-progress');
        this.scale.setTo(Play_1.SCALE);
        this.myCropRect = new Phaser.Rectangle(0, 0, 0, 8);
        this.crop(this.myCropRect, false);
    }
    update() {
        this.crop(this.myCropRect, false);
    }
    startProgress(time) {
        return this.game.add.tween(this.cropRect).to({ width: WIDTH }, time, "Linear", true);
    }
    resetProgress() {
        this.cropRect.width = 0;
        this.crop(this.myCropRect, false);
    }
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIBuildingCreator_1 = __webpack_require__(32);
const Minimap_1 = __webpack_require__(39);
const BuildingPositionner_1 = __webpack_require__(37);
const Selector_1 = __webpack_require__(38);
const UIUnitCreator_1 = __webpack_require__(33);
exports.INTERFACE_WIDTH = 160;
class UserInterface {
    constructor(worldKnowledge, player) {
        this.player = player;
        this.selector = new Selector_1.Selector(worldKnowledge, player);
        this.buildingPositionner = new BuildingPositionner_1.BuildingPositioner(worldKnowledge, this.player);
        this.UIBuildingCreator = new UIBuildingCreator_1.UIBuildingCreator(worldKnowledge, this.player, this.buildingPositionner);
        this.UIUnitCreator = new UIUnitCreator_1.UIUnitCreator(worldKnowledge, this.player);
        this.miniMap = new Minimap_1.MiniMap(worldKnowledge);
    }
    create(game) {
        this.buildingPositionner.create(game);
        this.selector.create(game);
        this.interfaceGroup = game.add.group();
        this.interfaceGroup.fixedToCamera = true;
        let interfaceSprite = new Phaser.Sprite(game, 0, 0, 'interface');
        interfaceSprite.scale.setTo(2);
        this.interfaceGroup.add(interfaceSprite);
        this.UIUnitCreator.create(game, this.interfaceGroup, this.player.getUnitCreator());
        this.UIBuildingCreator.create(game, this.interfaceGroup, this.player.getBuildingCreator());
        this.miniMap.create(game);
    }
    update() {
        this.selector.update();
        this.miniMap.update();
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
exports.GROUND_WIDTH = 80;
exports.GROUND_HEIGHT = 80;
var TERRAIN;
(function (TERRAIN) {
    TERRAIN[TERRAIN["SNOW"] = 312] = "SNOW";
    TERRAIN[TERRAIN["ICE"] = 212] = "ICE";
    TERRAIN[TERRAIN["CRATER"] = 412] = "CRATER";
    TERRAIN[TERRAIN["ICE_BREAK2"] = 512] = "ICE_BREAK2";
    TERRAIN[TERRAIN["GRASS"] = 640] = "GRASS";
    TERRAIN[TERRAIN["WATER"] = 612] = "WATER";
    TERRAIN[TERRAIN["MOUNTAIN"] = 712] = "MOUNTAIN";
    TERRAIN[TERRAIN["STONE"] = 930] = "STONE";
})(TERRAIN || (TERRAIN = {}));
class GeneratedGround {
    constructor() {
        this.collisions = [];
        this.tiles = {
            312: [TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW],
            212: [TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE],
            412: [TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER],
            640: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS],
            612: [TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER],
            712: [TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN],
            930: [TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE],
        };
        this.collisions.push(TERRAIN.WATER);
        this.initializeTiles();
    }
    static generateNoises(max) {
        const maps = [];
        for (let i = 0; i <= max; i++) {
            maps.push(this.generateNoise(i));
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                let value = 0;
                let count = 0;
                for (let i = 0; i <= max; i++) {
                    value += maps[i][y][x] * i;
                    count += i;
                }
                resultLine.push(value / count);
            }
            result.push(resultLine);
        }
        return result;
    }
    static generateNoise(power) {
        const littleMapWidth = Math.ceil(exports.GROUND_WIDTH / Math.pow(2, power));
        const littleMapHeight = Math.ceil(exports.GROUND_HEIGHT / Math.pow(2, power));
        const littleMap = [];
        for (let y = 0; y <= littleMapWidth; y++) {
            const littleMapLine = [];
            for (let x = 0; x <= littleMapHeight; x++) {
                littleMapLine.push(Math.random());
            }
            littleMap.push(littleMapLine);
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                resultLine.push(littleMap[Math.floor(y / Math.pow(2, power))][Math.floor(x / Math.pow(2, power))]);
            }
            result.push(resultLine);
        }
        return this.fluzz(result, Math.floor(Math.pow(2, power) / 2));
    }
    static fluzz(cells, radius) {
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_HEIGHT; x++) {
                resultLine.push(this.getAvgAroundCellValues(cells, radius, x, y));
            }
            result.push(resultLine);
        }
        return result;
    }
    static getAvgAroundCellValues(cells, radius, startX, startY) {
        const cellsValues = [];
        for (let y = startY - radius; y <= startY + radius; y++) {
            for (let x = startX - radius; x <= startX + radius; x++) {
                if (y >= 0 && x >= 0 && y <= exports.GROUND_WIDTH && x <= exports.GROUND_HEIGHT) {
                    cellsValues.push(cells[y][x]);
                }
            }
        }
        return cellsValues.reduce((cell, previousval) => {
            return cell + previousval;
        }, 0) / cellsValues.length;
    }
    create(game) {
        this.createFakeData2();
        let data = this.getCSV();
        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);
        this.map = game.add.tilemap('dynamicMap', 20, 20, exports.GROUND_WIDTH, exports.GROUND_HEIGHT);
        this.map.addTilesetImage('GrasClif', 'GrasClif', 20, 20, 0, 0, 0);
        this.map.addTilesetImage('GrssMisc', 'GrssMisc', 20, 20, 0, 0, 100);
        this.map.addTilesetImage('Ice2Snow', 'Ice2Snow', 20, 20, 0, 0, 200);
        this.map.addTilesetImage('Snow', 'Snow', 20, 20, 0, 0, 300);
        this.map.addTilesetImage('Snw2Crtb', 'Snw2Crtb', 20, 20, 0, 0, 400);
        this.map.addTilesetImage('IceBrk2', 'IceBrk2', 20, 20, 0, 0, 500);
        this.map.addTilesetImage('Grs2Watr', 'Grs2Watr', 20, 20, 0, 0, 600);
        this.map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', 20, 20, 0, 0, 700);
        this.map.addTilesetImage('Snw2Mnt', 'Snw2Mnt', 20, 20, 0, 0, 800);
        this.map.addTilesetImage('Stn2SnwB', 'Stn2SnwB', 20, 20, 0, 0, 900);
        let layer = this.map.createLayer(0);
        layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(layer);
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.y < 0) {
            return false;
        }
        const value = this.generatedTiles[position.y][position.x];
        return this.collisions.indexOf(value) <= -1;
    }
    getGroundWidth() {
        return this.map.widthInPixels * Play_1.SCALE;
    }
    getGroundHeight() {
        return this.map.heightInPixels * Play_1.SCALE;
    }
    getCSV() {
        if (this.generatedTiles !== null) {
            this.generatedTiles = [];
            for (let y = 0; y < exports.GROUND_HEIGHT; y++) {
                let line = [];
                for (let x = 0; x < exports.GROUND_WIDTH; x++) {
                    line.push(this.getTileNumber(this.getCorners(x, y)));
                }
                this.generatedTiles.push(line);
            }
        }
        return this.generatedTiles.map((line) => {
            return line.join(',');
        }).join("\n");
    }
    initializeTiles() {
        this.generate(200, TERRAIN.SNOW, TERRAIN.ICE, true);
        this.generate(400, TERRAIN.SNOW, TERRAIN.CRATER, true);
        this.generate(500, TERRAIN.ICE, TERRAIN.ICE_BREAK2, false);
        this.generate(600, TERRAIN.GRASS, TERRAIN.WATER, true, true);
        this.generate(700, TERRAIN.MOUNTAIN, TERRAIN.GRASS, true);
        this.generate(800, TERRAIN.MOUNTAIN, TERRAIN.SNOW, true);
        this.generate(900, TERRAIN.STONE, TERRAIN.SNOW, true);
    }
    generate(startNumber, terrain1, terrain2, rightGap = true, isCollision = false) {
        let result = {};
        result[startNumber] = [terrain1, terrain1, terrain2, terrain1];
        result[startNumber + 2] = [terrain1, terrain1, terrain2, terrain2];
        result[startNumber + 4] = [terrain1, terrain1, terrain1, terrain2];
        result[startNumber + 10] = [terrain1, terrain2, terrain2, terrain1];
        result[startNumber + 14] = [terrain2, terrain1, terrain1, terrain2];
        result[startNumber + 20] = [terrain1, terrain2, terrain1, terrain1];
        result[startNumber + 22] = [terrain2, terrain2, terrain1, terrain1];
        result[startNumber + 24] = [terrain2, terrain1, terrain1, terrain1];
        result[startNumber + (rightGap ? 32 : 30)] = [terrain1, terrain2, terrain2, terrain2];
        result[startNumber + (rightGap ? 34 : 32)] = [terrain2, terrain1, terrain2, terrain2];
        result[startNumber + (rightGap ? 42 : 40)] = [terrain2, terrain2, terrain2, terrain1];
        result[startNumber + (rightGap ? 44 : 42)] = [terrain2, terrain2, terrain1, terrain2];
        if (isCollision) {
            this.collisions.push(startNumber);
            this.collisions.push(startNumber + 2);
            this.collisions.push(startNumber + 4);
            this.collisions.push(startNumber + 10);
            this.collisions.push(startNumber + 14);
            this.collisions.push(startNumber + 20);
            this.collisions.push(startNumber + 22);
            this.collisions.push(startNumber + 24);
            this.collisions.push(startNumber + (rightGap ? 32 : 30));
            this.collisions.push(startNumber + (rightGap ? 34 : 32));
            this.collisions.push(startNumber + (rightGap ? 42 : 40));
            this.collisions.push(startNumber + (rightGap ? 44 : 42));
        }
        this.tiles = Object.assign(this.tiles, result);
    }
    createFakeData2() {
        this.cornersMap = [];
        const noises = GeneratedGround.generateNoises(4);
        let min = 1;
        let max = 0;
        for (let y = 0; y < noises.length; y++) {
            for (let x = 0; x < noises[y].length; x++) {
                min = Math.min(noises[y][x], min);
                max = Math.max(noises[y][x], max);
            }
        }
        const terrains = [TERRAIN.WATER, TERRAIN.GRASS, TERRAIN.MOUNTAIN, TERRAIN.SNOW, TERRAIN.STONE];
        const step = (max - min) / terrains.length;
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            let line = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                let val = 0;
                for (let i = 0; i < 5; i++) {
                    if (noises[y][x] >= min + i * step && noises[y][x] <= min + (i + 1) * step) {
                        val = terrains[i];
                    }
                }
                line.push(val);
            }
            this.cornersMap.push(line);
        }
    }
    getCorners(x, y) {
        return [
            this.cornersMap[y][x],
            this.cornersMap[y][x + 1],
            this.cornersMap[y + 1][x + 1],
            this.cornersMap[y + 1][x],
        ];
    }
    getTileNumber(param) {
        const keys = Object.keys(this.tiles);
        for (let i = 0; i < keys.length; i++) {
            if (this.tiles[keys[i]][0] === param[0] &&
                this.tiles[keys[i]][1] === param[1] &&
                this.tiles[keys[i]][2] === param[2] &&
                this.tiles[keys[i]][3] === param[3]) {
                return parseInt(keys[i]);
            }
        }
        return null;
    }
}
exports.GeneratedGround = GeneratedGround;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CommandCenter_1 = __webpack_require__(41);
class Player {
    constructor(worldKnowledge, id, color) {
        this.worldKnowledge = worldKnowledge;
        this.id = id;
        this.color = color;
        this.commandCenter = new CommandCenter_1.CommandCenter(this.worldKnowledge, this);
    }
    getColor() {
        return this.color;
    }
    getId() {
        return this.id;
    }
    order() {
        return this.commandCenter;
    }
    getBuildingCreator() {
        return this.commandCenter.getBuildingCreator();
    }
    getUnitCreator() {
        return this.commandCenter.getUnitCreator();
    }
    updateAllowedUnitsAndBuildings() {
        this.commandCenter.updateAllowedUnitsAndBuildings();
    }
}
exports.Player = Player;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Explosion_1 = __webpack_require__(49);
const Shoot_1 = __webpack_require__(54);
const Cell_1 = __webpack_require__(1);
const SelectRectangle_1 = __webpack_require__(53);
const LifeRectangle_1 = __webpack_require__(50);
var Rotation;
(function (Rotation) {
    Rotation[Rotation["TOP"] = 1] = "TOP";
    Rotation[Rotation["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    Rotation[Rotation["RIGHT"] = 3] = "RIGHT";
    Rotation[Rotation["BOTTOM_RIGHT"] = 4] = "BOTTOM_RIGHT";
    Rotation[Rotation["BOTTOM"] = 5] = "BOTTOM";
    Rotation[Rotation["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Rotation[Rotation["LEFT"] = 7] = "LEFT";
    Rotation[Rotation["TOP_LEFT"] = 8] = "TOP_LEFT";
})(Rotation = exports.Rotation || (exports.Rotation = {}));
class UnitSprite extends Phaser.Sprite {
    constructor(game, group, cellPosition, key) {
        super(game, Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y), key);
        this.group = group;
        this.group.add(this);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.selectedRectable = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectable);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
        group.add(this);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
    }
    doShoot(cellPosition) {
        this.rotateTowards(cellPosition);
        this.doShootEffect(cellPosition);
    }
    updateLife(life, maxLife) {
        this.lifeRectangle.updateLife(life / maxLife);
    }
    doMove(cellPosition, duration) {
        this.rotateTowards(cellPosition);
        this.game.add.tween(this).to({
            x: Cell_1.Cell.cellToReal(cellPosition.x),
            y: Cell_1.Cell.cellToReal(cellPosition.y),
        }, duration, Phaser.Easing.Default, true);
    }
    doLoad(cellPosition) {
        this.rotateTowards(cellPosition);
    }
    setSelected(value = true) {
        this.selectedRectable.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    rotateTowards(cellPosition) {
        const rotation = this.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, this.x, this.y));
    }
    doShootEffect(cellPosition) {
        const rotation = this.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.group.add(new Shoot_1.Shoot(this.game, this.x, this.y, rotation));
    }
    loadRotation(rotation) {
        switch (rotation) {
            case Rotation.TOP:
                this.loadTexture(this.key, 1);
                break;
            case Rotation.TOP_RIGHT:
                this.loadTexture(this.key, 2);
                break;
            case Rotation.RIGHT:
                this.loadTexture(this.key, 5);
                break;
            case Rotation.BOTTOM_RIGHT:
                this.loadTexture(this.key, 8);
                break;
            case Rotation.BOTTOM:
                this.loadTexture(this.key, 7);
                break;
            case Rotation.BOTTOM_LEFT:
                this.loadTexture(this.key, 6);
                break;
            case Rotation.LEFT:
                this.loadTexture(this.key, 3);
                break;
            case Rotation.TOP_LEFT:
                this.loadTexture(this.key, 0);
                break;
        }
    }
    getRotation(vector) {
        if (null === vector) {
            return Rotation.TOP_LEFT;
        }
        const angle = Math.atan2(vector.y, vector.x);
        if (angle > Math.PI / 8 * 7) {
            return Rotation.LEFT;
        }
        if (angle > Math.PI / 8 * 5) {
            return Rotation.BOTTOM_LEFT;
        }
        if (angle > Math.PI / 8 * 3) {
            return Rotation.BOTTOM;
        }
        if (angle > Math.PI / 8) {
            return Rotation.BOTTOM_RIGHT;
        }
        if (angle > Math.PI / 8 * -1) {
            return Rotation.RIGHT;
        }
        if (angle > Math.PI / 8 * -3) {
            return Rotation.TOP_RIGHT;
        }
        if (angle > Math.PI / 8 * -5) {
            return Rotation.TOP;
        }
        if (angle > Math.PI / 8 * -7) {
            return Rotation.TOP_LEFT;
        }
        return Rotation.LEFT;
    }
}
exports.UnitSprite = UnitSprite;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(3);
const AlternativePosition_1 = __webpack_require__(2);
const Distance_1 = __webpack_require__(9);
class Attack {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        if (this.isArrived() || !this.goal.isAlive()) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        if (!this.goal.isAlive()) {
            return;
        }
        if (this.isAbleToShoot()) {
            this.unit.shoot(this.goal);
        }
        else {
            this.unit.moveTowards(this.goal.getCellPositions()[0]);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
    isAbleToShoot() {
        return Distance_1.Distance.to(this.unit.getCellPositions(), this.goal.getCellPositions()) < this.unit.getShootDistance();
    }
}
exports.Attack = Attack;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(3);
const AlternativePosition_1 = __webpack_require__(2);
class MoveAttack {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        if (this.isArrived()) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable) {
            this.unit.shoot(shootable);
        }
        else {
            this.unit.moveTowards(this.goal);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal, this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.MoveAttack = MoveAttack;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(8);
const Attack_1 = __webpack_require__(20);
const Follow_1 = __webpack_require__(11);
const MoveAttack_1 = __webpack_require__(21);
const Harvest_1 = __webpack_require__(56);
const Distance_1 = __webpack_require__(9);
const CubeSet_1 = __webpack_require__(28);
const UnitProperties_1 = __webpack_require__(4);
class Harvester extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(Harvester.prototype.constructor.name, player.getId()));
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(Harvester.prototype.constructor.name);
        this.loading = 0;
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
            const building = this.worldKnowledge.getBuildingAt(cell);
            if (building && building instanceof CubeSet_1.CubeSet) {
                this.state = new Harvest_1.Harvest(this.worldKnowledge, this, building);
            }
            else {
                this.state = new MoveAttack_1.MoveAttack(this.worldKnowledge, this, cell);
            }
        }
    }
    getClosestBase() {
        return Distance_1.Distance.getClosest(this.getCellPositions()[0], this.worldKnowledge.getPlayerBuildings(this.player, 'ConstructionYard'));
    }
    getClosestCube(cubeSet) {
        return Distance_1.Distance.getClosest(this.getCellPositions()[0], cubeSet.getCubes());
    }
    isFull() {
        return this.loading >= UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'max_loading');
    }
    unload(base) {
        base.addMinerals(this.loading);
        this.loading = 0;
        this.freeze(UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'unload_time') * Phaser.Timer.SECOND);
    }
    load(cube) {
        this.unitSprite.doLoad(cube.getCellPositions()[0]);
        this.loading += cube.harvest();
        this.freeze(UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'load_time') * Phaser.Timer.SECOND);
    }
    isLoaded() {
        return this.loading > 0;
    }
}
exports.Harvester = Harvester;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(8);
const UnitProperties_1 = __webpack_require__(4);
const MoveTo_1 = __webpack_require__(57);
const Follow_1 = __webpack_require__(11);
const Stand_1 = __webpack_require__(3);
const ConstructionYard_1 = __webpack_require__(26);
class MCV extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(MCV.prototype.constructor.name, player.getId()));
        this.expanded = false;
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(MCV.prototype.constructor.name);
    }
    orderExpand() {
        this.state = new Stand_1.Stand(this);
        this.expand();
    }
    updateStateAfterClick(cell) {
        if (!this.expanded) {
            const unit = this.worldKnowledge.getUnitAt(cell);
            if (null !== unit) {
                if (unit === this) {
                    this.orderExpand();
                }
                if (this.getPlayer() !== unit.getPlayer()) {
                    this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, unit.getCellPositions()[0]);
                }
                else {
                    this.state = new Follow_1.Follow(this.worldKnowledge, this, unit);
                }
            }
            else {
                this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, cell);
            }
        }
    }
    expand() {
        this.expanded = true;
        this.worldKnowledge.addBuilding(new ConstructionYard_1.ConstructionYard(this.worldKnowledge, new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y), this.player), true);
        this.worldKnowledge.removeUnit(this, 1000);
        this.player.updateAllowedUnitsAndBuildings();
    }
}
exports.MCV = MCV;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(6);
const BarracksSprite_1 = __webpack_require__(47);
class Barracks extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, group) {
        this.sprite = new BarracksSprite_1.BarracksSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Module');
        group.add(this.sprite);
    }
}
exports.Barracks = Barracks;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConstructableBuilding_1 = __webpack_require__(6);
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
class ConcreteBarrier extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, group) {
        const positionX = Cell_1.Cell.cellToReal(this.cellPosition.x);
        const positionY = Cell_1.Cell.cellToReal(this.cellPosition.y);
        this.topLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopLeftLayer());
        this.topLeftSprite.anchor.setTo(1, 1);
        this.topRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopRightLayer());
        this.topRightSprite.anchor.setTo(0, 1);
        this.bottomRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomRightLayer());
        this.bottomRightSprite.anchor.setTo(0, 0.5);
        this.bottomLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomLeftLayer());
        this.bottomLeftSprite.anchor.setTo(1, 0.5);
        this.getSprites().forEach((sprite) => {
            sprite.scale.setTo(Play_1.SCALE / 2, Play_1.SCALE / 2); // Wall texture should be resized by 50%
            group.add(sprite);
        });
        this.worldKnowledge.getPlayerBuildings(this.player, this.constructor.name).forEach((building) => {
            const concreteBarrier = building;
            if (concreteBarrier !== this) {
                concreteBarrier.updateTileLayers();
            }
        });
    }
    updateTileLayers() {
        this.topLeftSprite.loadTexture(this.topLeftSprite.key, this.getTopLeftLayer());
        this.topRightSprite.loadTexture(this.topRightSprite.key, this.getTopRightLayer());
        this.bottomRightSprite.loadTexture(this.bottomRightSprite.key, this.getBottomRightLayer());
        this.bottomLeftSprite.loadTexture(this.bottomLeftSprite.key, this.getBottomLeftLayer());
    }
    getSprites() {
        return [
            this.topLeftSprite,
            this.topRightSprite,
            this.bottomRightSprite,
            this.bottomLeftSprite,
        ];
    }
    getTopLeftLayer() {
        // left, top left, top
        switch ([this.getNeighbours()[3], this.getNeighbours()[0], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 41;
            default:
                return 0;
        }
    }
    getTopRightLayer() {
        // right, top right, top
        switch ([this.getNeighbours()[4], this.getNeighbours()[2], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 39;
            default:
                return 4;
        }
    }
    getBottomRightLayer() {
        // right, bottom right, bottom
        switch ([this.getNeighbours()[4], this.getNeighbours()[7], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 43;
            default:
                return 30;
        }
    }
    getBottomLeftLayer() {
        // left, bottom left, bottom
        switch ([this.getNeighbours()[3], this.getNeighbours()[5], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 45;
            default:
                return 26;
        }
    }
    getNeighbours() {
        return [
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y + 1)),
        ];
    }
    hasConcreteNeighbourAt(cell) {
        const building = this.worldKnowledge.getBuildingAt(cell);
        return (null !== building &&
            building.constructor.name === this.constructor.name &&
            building.getPlayer() === this.getPlayer());
    }
}
exports.ConcreteBarrier = ConcreteBarrier;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(6);
const ConstructionYardSprite_1 = __webpack_require__(48);
class ConstructionYard extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.minerals = 0;
    }
    create(game, group) {
        this.sprite = new ConstructionYardSprite_1.ConstructionYardSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Base');
        group.add(this.sprite);
    }
    addMinerals(loading) {
        this.minerals += loading;
    }
}
exports.ConstructionYard = ConstructionYard;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const Ground_1 = __webpack_require__(10);
const START_AMOUNT = 100;
const HARVEST_QUANTITY = 10;
class Cube extends Phaser.Sprite {
    constructor(game, x, y, group) {
        super(game, Cell_1.Cell.cellToReal(x), Cell_1.Cell.cellToReal(y), 'Cube');
        this.amount = START_AMOUNT;
        this.frame = 2;
        this.cellPosition = new PIXI.Point(x, y);
        this.scale.setTo(Play_1.SCALE * Ground_1.GROUND_SIZE / 27);
        this.anchor.setTo(0.5, 0.5);
        group.add(this);
    }
    getCellPositions() {
        return [this.cellPosition];
    }
    isEmpty() {
        return this.amount <= 0;
    }
    harvest() {
        let result = HARVEST_QUANTITY;
        if (this.amount < HARVEST_QUANTITY) {
            result = this.amount;
        }
        this.amount--;
        if (this.amount <= 0) {
            this.destroy();
        }
        else if (this.amount < START_AMOUNT / 3) {
            this.loadTexture(this.key, 0);
        }
        else if (this.amount < 2 * START_AMOUNT / 3) {
            this.loadTexture(this.key, 1);
        }
        return result;
    }
}
exports.Cube = Cube;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cube_1 = __webpack_require__(27);
class CubeSet {
    constructor(cubePositions) {
        this.cubePositions = cubePositions;
    }
    create(game, group) {
        this.cubes = this.cubePositions.map((position) => {
            return new Cube_1.Cube(game, position.x, position.y, group);
        });
    }
    getCellPositions() {
        this.checkEmptyCubes();
        return this.cubes.map((cube) => {
            return cube.getCellPositions()[0];
        });
    }
    isEmpty() {
        this.checkEmptyCubes();
        for (let i = 0; i < this.cubes.length; i++) {
            if (!this.cubes[i].isEmpty()) {
                return false;
            }
        }
        return true;
    }
    getCubes() {
        this.checkEmptyCubes();
        return this.cubes;
    }
    setVisible(value) {
    }
    getPlayer() {
        return null;
    }
    lostLife(life) {
    }
    destroy() {
    }
    checkEmptyCubes() {
        this.cubes = this.cubes.filter((cube) => {
            return !cube.isEmpty();
        });
    }
}
exports.CubeSet = CubeSet;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(6);
const PowerPlanSprite_1 = __webpack_require__(52);
class PowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, group) {
        this.sprite = new PowerPlanSprite_1.PowerPlantSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory2');
        group.add(this.sprite);
    }
}
exports.PowerPlant = PowerPlant;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(6);
const TiberiumRefinerySprite_1 = __webpack_require__(55);
class TiberiumRefinery extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, group) {
        this.sprite = new TiberiumRefinerySprite_1.TiberiumRefinerySprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory3');
        group.add(this.sprite);
    }
}
exports.TiberiumRefinery = TiberiumRefinery;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = __webpack_require__(5);
const PowerPlant_1 = __webpack_require__(29);
const Barracks_1 = __webpack_require__(24);
const AbstractCreator_1 = __webpack_require__(14);
const TiberiumRefinery_1 = __webpack_require__(30);
const Harvester_1 = __webpack_require__(22);
const AlternativePosition_1 = __webpack_require__(2);
const ConcreteBarrier_1 = __webpack_require__(25);
class BuildingCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
        this.producedBuildings = [];
        this.inProductionBuildings = [];
    }
    getProducibles() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings();
    }
    getRequiredBuildings(itemName) {
        return BuildingProperties_1.BuildingProperties.getRequiredBuildings(itemName);
    }
    runProduction(buildingName) {
        this.inProductionBuildings.push(buildingName);
        this.timerEvent.add(BuildingProperties_1.BuildingProperties.getConstructionTime(buildingName) * Phaser.Timer.SECOND, () => {
            let index = this.inProductionBuildings.indexOf(buildingName);
            if (index > -1) {
                this.inProductionBuildings.splice(index, 1);
            }
            this.producedBuildings.push(buildingName);
        });
        if (this.uiCreator !== null) {
            this.uiCreator.runProduction(buildingName);
        }
    }
    isProduced(buildingName) {
        return this.producedBuildings.indexOf(buildingName) > -1;
    }
    isProducing(buildingName) {
        return this.inProductionBuildings.indexOf(buildingName) > -1;
    }
    runCreation(buildingName, cell) {
        switch (buildingName) {
            case 'PowerPlant':
                let powerPlant = new PowerPlant_1.PowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(powerPlant, true);
                break;
            case 'Barracks':
                let barracks = new Barracks_1.Barracks(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(barracks, true);
                break;
            case 'TiberiumRefinery':
                let tiberiumRefinery = new TiberiumRefinery_1.TiberiumRefinery(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(tiberiumRefinery, true);
                const cellHarvester = AlternativePosition_1.AlternativePosition.getClosestAvailable(cell, cell, this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellHarvester, this.player);
                this.worldKnowledge.addUnit(harvester, true);
                break;
            case 'ConcreteBarrier':
                let concreteBarrier = new ConcreteBarrier_1.ConcreteBarrier(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(concreteBarrier, false);
                break;
            default:
                throw "Unable to build building " + buildingName;
        }
        this.player.order().updateAllowedUnitsAndBuildings();
        if (this.uiCreator) {
            this.uiCreator.resetButton(buildingName);
        }
        let index = this.producedBuildings.indexOf(buildingName);
        if (index > -1) {
            this.producedBuildings.splice(index, 1);
        }
    }
}
exports.BuildingCreator = BuildingCreator;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractUICreator_1 = __webpack_require__(15);
const BuildingProperties_1 = __webpack_require__(5);
const X = 1202 - 66;
class UIBuildingCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player, buildingPositionner) {
        super(worldKnowledge, player, X);
        this.buildingPositioner = buildingPositionner;
    }
    getConstructableItems() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings();
    }
    getSpriteKey(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteKey(itemName);
    }
    getSpriteLayer(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteLayer(itemName);
    }
    getConstructionTime(itemName) {
        return BuildingProperties_1.BuildingProperties.getConstructionTime(itemName);
    }
    onProductFinish(itemName) {
        return this.setPendingButton(itemName);
    }
    onClickFunction(itemName) {
        if (this.player.order().getBuildingCreator().isProduced(itemName)) {
            this.buildingPositioner.activate(this.player.order().getBuildingCreator(), itemName);
        }
        else if (this.player.order().getBuildingCreator().isProducing(itemName)) {
            // Do nothing
        }
        else if (this.player.order().getBuildingCreator().isAllowed(itemName)) {
            this.player.order().productBuilding(itemName);
        }
    }
}
exports.UIBuildingCreator = UIBuildingCreator;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnitProperties_1 = __webpack_require__(4);
const AbstractUICreator_1 = __webpack_require__(15);
const X = 1202;
class UIUnitCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player, X);
    }
    getConstructableItems() {
        return UnitProperties_1.UnitProperties.getConstructableUnits();
    }
    getSpriteKey(itemName) {
        return UnitProperties_1.UnitProperties.getSprite(itemName, this.player.getId());
    }
    getSpriteLayer(itemName) {
        return UnitProperties_1.UnitProperties.getSpriteLayer(itemName);
    }
    getConstructionTime(itemName) {
        return UnitProperties_1.UnitProperties.getConstructionTime(itemName);
    }
    onProductFinish(itemName) {
        return this.resetButton(itemName);
    }
    onClickFunction(itemName) {
        if (this.player.order().getUnitCreator().isProducing(itemName)) {
            // Do nothing
        }
        else if (this.player.order().getUnitCreator().isAllowed(itemName)) {
            this.player.order().productUnit(itemName);
        }
    }
}
exports.UIUnitCreator = UIUnitCreator;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCreator_1 = __webpack_require__(14);
const UnitProperties_1 = __webpack_require__(4);
const Harvester_1 = __webpack_require__(22);
const Tank_1 = __webpack_require__(58);
const MCV_1 = __webpack_require__(23);
const AlternativePosition_1 = __webpack_require__(2);
class UnitCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
        this.inProductionUnits = [];
    }
    getProducibles() {
        return UnitProperties_1.UnitProperties.getConstructableUnits();
    }
    getRequiredBuildings(itemName) {
        return UnitProperties_1.UnitProperties.getRequiredBuildings(itemName);
    }
    isProducing(itemName) {
        return this.inProductionUnits.indexOf(itemName) > -1;
    }
    runProduction(unitName) {
        this.inProductionUnits.push(unitName);
        this.timerEvent.add(UnitProperties_1.UnitProperties.getConstructionTime(unitName) * Phaser.Timer.SECOND, () => {
            let index = this.inProductionUnits.indexOf(unitName);
            if (index > -1) {
                this.inProductionUnits.splice(index, 1);
            }
            if (this.uiCreator) {
                this.uiCreator.resetButton(unitName);
            }
            const building = this.worldKnowledge.getCreatorOf(unitName, this.player);
            if (null == building) {
                return;
            }
            const cellPosition = AlternativePosition_1.AlternativePosition.getClosestAvailable(building.getCellPositions()[0], building.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
            switch (unitName) {
                case 'Harvester':
                    let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(harvester);
                    break;
                case 'Tank':
                    let tank = new Tank_1.Tank(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(tank);
                    break;
                case 'MCV':
                    let mcv = new MCV_1.MCV(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(mcv);
                    break;
                default:
                    throw "Unable to build unit " + unitName;
            }
        });
        if (this.uiCreator !== null) {
            this.uiCreator.runProduction(unitName);
        }
    }
}
exports.UnitCreator = UnitCreator;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Boot extends Phaser.State {
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('Preload');
    }
}
exports.default = Boot;


/***/ }),
/* 36 */
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
        this.load.tilemap('basicmap', 'assets/basicmap.json', null, Phaser.Tilemap.TILED_JSON);
    }
    loadGameImages() {
        // Units
        this.load.spritesheet('Tank11', 'assets/Tank11.png', 19, 19, 9, 1, 1);
        this.load.spritesheet('Tank12', 'assets/Tank12.png', 19, 19, 9, 1, 1);
        this.load.spritesheet('Builder2', 'assets/Builder2.png', 19, 19, 9, 1, 1);
        this.load.spritesheet('Tank5c', 'assets/Tank5c.png', 19, 19, 25, 1, 1);
        this.load.spritesheet('Transprt', 'assets/Transprt.png', 39, 39, 9, 1, 1);
        // Tiles
        this.load.spritesheet('GrssMisc', 'assets/GrssMisc.png', 20, 20, 40, 0, 0);
        this.load.spritesheet('GrasClif', 'assets/GrasClif.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Ice2Snow', 'assets/Ice2Snow.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Snow', 'assets/Snow.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Snw2Crtb', 'assets/Snw2Crtb.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('IceBrk2', 'assets/IceBrk2.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Grs2Watr', 'assets/Grs2Watr.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Grs2Mnt', 'assets/Grs2Mnt.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Snw2Mnt', 'assets/Snw2Mnt.png', 20, 20, 45, 0, 0);
        this.load.spritesheet('Stn2SnwB', 'assets/Stn2SnwB.png', 20, 20, 45, 0, 0);
        // Buildings
        this.load.spritesheet('Base', 'assets/Base.png', 60, 60, 8, 0, 0);
        this.load.spritesheet('Cube', 'assets/Cube.png', 23, 27, 21, 1, 1);
        this.load.spritesheet('Factory2', 'assets/Factory2.png', 40, 60, 24, 0, 0);
        this.load.spritesheet('Module', 'assets/Module.png', 40, 60, 1, 0, 0);
        this.load.spritesheet('Factory3', 'assets/Factory3.png', 40, 60, 11, 0, 0);
        this.load.spritesheet('Wall', 'assets/Wall.png', 20, 40, 52, 0, 0);
        // Others
        this.load.spritesheet('exploBig', 'assets/exploBig.png', 39, 39, 12, 1, 1);
        this.load.spritesheet('ArtlFlsh', 'assets/ArtlFlsh.png', 19, 19, 45, 1, 1);
        this.load.spritesheet('interface', 'assets/interface.png', 640, 360);
        this.load.spritesheet('buttons', 'assets/buttons.png', 33, 36, 3, 0, 0);
        this.load.spritesheet('button-progress', 'assets/button-progress.png', 33, 8, 1, 0, 0);
        this.load.spritesheet('Build1', 'assets/Build1.png', 80, 80, 14, 0, 0);
        this.load.spritesheet('Build2', 'assets/Build2.png', 80, 80, 12, 0, 0);
        this.load.spritesheet('Build3', 'assets/Build3.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('Build4', 'assets/Build4.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('Build5', 'assets/Build5.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('Build6', 'assets/Build6.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('Build7', 'assets/Build7.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('Platform', 'assets/Platform.png', 40, 40, 31, 0, 0);
        this.load.spritesheet('Creation', 'assets/Creation.png', 40, 40, 23, 0, 0);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Cell_1 = __webpack_require__(1);
const BuildingProperties_1 = __webpack_require__(5);
const Ground_1 = __webpack_require__(10);
const app_1 = __webpack_require__(12);
const UserInterface_1 = __webpack_require__(16);
class BuildingPositioner {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.graphics = new BuildingPositionerGraphics(game, this.worldKnowledge);
    }
    activate(buildingCreator, buildingName) {
        this.graphics.activate(buildingCreator, buildingName);
    }
}
exports.BuildingPositioner = BuildingPositioner;
class BuildingPositionerGraphics extends Phaser.Graphics {
    constructor(game, worldKnowledge) {
        super(game, 0, 0);
        this.buildingName = null;
        this.worldKnowledge = worldKnowledge;
        this.scale.set(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(this);
    }
    activate(buildingCreator, buildingName) {
        this.buildingCreator = buildingCreator;
        this.buildingName = buildingName;
    }
    deactivate() {
        this.buildingName = null;
    }
    update() {
        this.clear();
        if (null !== this.buildingName) {
            if (this.isInBounds(this.game.input.mousePointer.x)) {
                let cellX = Cell_1.Cell.realToCell(this.game.input.mousePointer.x + this.game.camera.position.x);
                let cellY = Cell_1.Cell.realToCell(this.game.input.mousePointer.y + this.game.camera.position.y);
                const allowedToBuild = this.isAccessible(cellX, cellY);
                if (allowedToBuild && this.game.input.activePointer.leftButton.isDown) {
                    this.buildingCreator.runCreation(this.buildingName, new PIXI.Point(cellX, cellY));
                    this.deactivate();
                    return;
                }
                BuildingProperties_1.BuildingProperties.getCellPositions(this.buildingName).forEach((position) => {
                    let cellGapX = cellX + position.x;
                    let cellGapY = cellY + position.y;
                    let realCellGapX = Cell_1.Cell.cellToReal(cellGapX) / Play_1.SCALE;
                    let realCellGapY = Cell_1.Cell.cellToReal(cellGapY) / Play_1.SCALE;
                    this.lineStyle(1, allowedToBuild ? 0xffffff : 0xff0000, 0.8);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 4);
                    this.lineTo(realCellGapX - Ground_1.GROUND_SIZE / 4, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY);
                    this.lineTo(realCellGapX, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 4);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 4, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 4, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 4);
                    this.moveTo(realCellGapX, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY);
                    this.moveTo(realCellGapX + Ground_1.GROUND_SIZE / 4, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 4);
                });
            }
        }
    }
    isAccessible(cellX, cellY) {
        const cellPositions = BuildingProperties_1.BuildingProperties.getCellPositions(this.buildingName);
        for (let i = 0; i < cellPositions.length; i++) {
            const position = cellPositions[i];
            let cell = new PIXI.Point(cellX + position.x, cellY + position.y);
            if (!this.worldKnowledge.isCellAccessible(cell)) {
                return false;
            }
        }
        return true;
    }
    isInBounds(x) {
        return x < app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH;
    }
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
class Selector {
    constructor(worldKnowledge, player) {
        this.corner = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.mousePointer = game.input.mousePointer;
        this.cameraPosition = game.camera.position;
        this.leftButton = game.input.activePointer.leftButton;
        this.rightButton = game.input.activePointer.rightButton;
        this.graphics = game.add.graphics(0, 0);
        this.timeEvents = game.time.events;
        // TODO Remove these values
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        game.input.mouse.capture = true;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        game.add.existing(this.graphics);
    }
    getMousePointer() {
        return new PIXI.Point(this.mousePointer.x + this.cameraPosition.x, this.mousePointer.y + this.cameraPosition.y);
    }
    update() {
        if (null === this.corner && this.leftButton.isDown) {
            this.corner = this.getMousePointer();
        }
        if (this.corner !== null && this.leftButton.isUp) {
            if (this.corner.x === this.getMousePointer().x && this.corner.y === this.getMousePointer().y) {
                let unitUnderPointer = this.worldKnowledge.getUnitAt(new PIXI.Point(Cell_1.Cell.realToCell(this.corner.x), Cell_1.Cell.realToCell(this.corner.y)));
                if (unitUnderPointer && unitUnderPointer.getPlayer() !== this.player) {
                    unitUnderPointer = null;
                }
                if (unitUnderPointer && this.isDoubleClick) {
                    this.selectUnitsInside(new PIXI.Point(this.cameraPosition.x, this.cameraPosition.y), new PIXI.Point(this.cameraPosition.x + this.gameWidth, this.cameraPosition.y + this.gameHeight), unitUnderPointer.constructor);
                }
                else {
                    this.worldKnowledge.getUnits().forEach((unit) => {
                        unit.setSelected(unit === unitUnderPointer);
                    });
                }
            }
            else {
                this.selectUnitsInside(this.corner, this.getMousePointer());
            }
            this.corner = null;
            this.graphics.clear();
            this.isDoubleClick = true;
            if (this.timerDoubleClick) {
                this.timeEvents.remove(this.timerDoubleClick);
            }
            this.timerDoubleClick = this.timeEvents.add(0.3 * Phaser.Timer.SECOND, () => {
                this.isDoubleClick = false;
            }, this);
        }
        if (this.rightButton.isDown) {
            this.worldKnowledge.getSelectedUnits().forEach((source) => {
                source.updateStateAfterClick(new PIXI.Point(Cell_1.Cell.realToCell(this.getMousePointer().x), Cell_1.Cell.realToCell(this.getMousePointer().y)));
            });
        }
        if (null !== this.corner) {
            this.graphics.clear();
            this.graphics.beginFill(0x00ff00);
            this.graphics.alpha = 0.5;
            this.graphics.drawRect(this.corner.x, this.corner.y, this.getMousePointer().x - this.corner.x, this.getMousePointer().y - this.corner.y);
        }
    }
    selectUnitsInside(corner, mousePointer, constructor = null) {
        const left = Math.min(corner.x, mousePointer.x);
        const right = Math.max(corner.x, mousePointer.x);
        const top = Math.min(corner.y, mousePointer.y);
        const bottom = Math.max(corner.y, mousePointer.y);
        this.worldKnowledge.getUnits().forEach((unit) => {
            let isInside = false;
            if (unit.getPlayer() === this.player && (null === constructor || unit.constructor === constructor)) {
                isInside = unit.isInside(left, right, top, bottom);
            }
            unit.setSelected(isInside);
        });
    }
}
exports.Selector = Selector;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const GeneratedGround_1 = __webpack_require__(17);
const SIZE = 60;
const X = 571;
const Y = 9;
const REFRESH_TIME = 0.5 * Phaser.Timer.SECOND;
class MiniMap {
    constructor(worldKnowledge) {
        this.hasRenderedRecently = false;
        this.worldKnowledge = worldKnowledge;
    }
    create(game) {
        this.timerEvents = game.time.events;
        let data = this.worldKnowledge.getGroundCSV();
        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);
        let map = game.add.tilemap('dynamicMap', 20, 20, GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT);
        map.addTilesetImage('GrasClif', 'GrasClif', 20, 20, 0, 0, 0);
        map.addTilesetImage('GrssMisc', 'GrssMisc', 20, 20, 0, 0, 100);
        map.addTilesetImage('Ice2Snow', 'Ice2Snow', 20, 20, 0, 0, 200);
        map.addTilesetImage('Snow', 'Snow', 20, 20, 0, 0, 300);
        map.addTilesetImage('Snw2Crtb', 'Snw2Crtb', 20, 20, 0, 0, 400);
        map.addTilesetImage('IceBrk2', 'IceBrk2', 20, 20, 0, 0, 500);
        map.addTilesetImage('Grs2Watr', 'Grs2Watr', 20, 20, 0, 0, 600);
        map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', 20, 20, 0, 0, 700);
        map.addTilesetImage('Snw2Mnt', 'Snw2Mnt', 20, 20, 0, 0, 800);
        map.addTilesetImage('Stn2SnwB', 'Stn2SnwB', 20, 20, 0, 0, 900);
        this.layer = map.createLayer(0, 1000000, 100000);
        let scale = SIZE / Math.max(map.widthInPixels, map.heightInPixels) * 2;
        this.layer.scale.setTo(scale, scale);
        this.layer.fixedToCamera = true;
        this.layer.cameraOffset.setTo(X * 2, Y * 2);
        this.layer.scrollFactorX = 0;
        this.layer.scrollFactorY = 0;
        game.camera.bounds.setTo(0, 0, this.worldKnowledge.getGroundWidth(), this.worldKnowledge.getGroundHeight());
        this.layer.resizeWorld();
        game.add.existing(this.layer);
        let scale2 = SIZE / Math.max(map.width, map.height) * Play_1.SCALE;
        this.graphics = new Phaser.Graphics(game);
        this.graphics.scale.set(scale2, scale2);
        this.graphics.position.setTo(X * 2, Y * 2);
        this.graphics.fixedToCamera = true;
        game.add.existing(this.graphics);
    }
    update() {
        if (this.hasRenderedRecently) {
            return;
        }
        this.graphics.clear();
        this.worldKnowledge.getUnits().forEach((unit) => {
            this.graphics.beginFill(unit.getPlayer().getColor());
            unit.getCellPositions().forEach((cellPosition) => {
                this.graphics.drawRect(cellPosition.x, cellPosition.y, 1, 1);
            });
        });
        this.hasRenderedRecently = true;
        this.timerEvents.add(REFRESH_TIME, () => {
            this.hasRenderedRecently = false;
        }, this);
    }
}
exports.MiniMap = MiniMap;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingRepository_1 = __webpack_require__(44);
const UnitRepository_1 = __webpack_require__(45);
const Appear_1 = __webpack_require__(46);
const GeneratedGround_1 = __webpack_require__(17);
const MiniAppear_1 = __webpack_require__(51);
class WorldKnowledge {
    constructor() {
        this.ground = new GeneratedGround_1.GeneratedGround();
        this.unitRepository = new UnitRepository_1.UnitRepository();
        this.buildingRepository = new BuildingRepository_1.BuildingRepository();
    }
    create(game) {
        this.game = game;
        this.ground.create(this.game);
        this.unitBuildingGroup = this.game.add.group();
        this.unitBuildingGroup.fixedToCamera = false;
    }
    update() {
        this.unitBuildingGroup.sort('y');
        this.unitRepository.getUnits().forEach((unit) => {
            unit.update();
        });
    }
    isCellAccessible(position) {
        return this.ground.isCellAccessible(position) &&
            this.unitRepository.isCellNotOccupied(position) &&
            this.buildingRepository.isCellNotOccupied(position);
    }
    getGroundWidth() {
        return this.ground.getGroundWidth();
    }
    getGroundHeight() {
        return this.ground.getGroundHeight();
    }
    addBuilding(newBuilding, appear = false) {
        this.buildingRepository.add(newBuilding);
        newBuilding.create(this.game, this.unitBuildingGroup);
        if (appear) {
            newBuilding.setVisible(false);
            let appearSprite = new Appear_1.Appear(newBuilding.getCellPositions()[0]);
            appearSprite.create(this.game, this.unitBuildingGroup);
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, () => {
                newBuilding.setVisible(true);
            }, this);
        }
    }
    addUnit(newUnit, appear = false) {
        this.unitRepository.add(newUnit);
        newUnit.create(this.game, this.unitBuildingGroup);
        if (appear) {
            newUnit.setVisible(false);
            let appearSprite = new MiniAppear_1.MiniAppear(newUnit.getCellPositions()[0]);
            appearSprite.create(this.game, this.unitBuildingGroup);
            this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                newUnit.setVisible(true);
            }, this);
        }
    }
    removeUnit(unit, delay = 0) {
        if (delay === 0) {
            this.unitRepository.removeUnit(unit);
        }
        else {
            this.game.time.events.add(delay, () => {
                this.unitRepository.removeUnit(unit);
            });
        }
    }
    getUnitAt(cell) {
        return this.unitRepository.unitAt(cell);
    }
    getBuildingAt(cell) {
        return this.buildingRepository.buildingAt(cell);
    }
    getUnits() {
        return this.unitRepository.getUnits();
    }
    getSelectedUnits() {
        return this.unitRepository.getSelectedUnits();
    }
    getPlayerBuildings(player, type = null) {
        return this.buildingRepository.getBuildings(type).filter((building) => {
            return building.getPlayer() === player;
        });
    }
    getEnemyBuildings(player, type = null) {
        return this.buildingRepository.getBuildings(type).filter((building) => {
            return building.getPlayer() !== null && building.getPlayer() !== player;
        });
    }
    getPlayerUnits(player, type = null) {
        return this.unitRepository.getUnits(type).filter((unit) => {
            return unit.getPlayer() === player;
        });
    }
    getEnemyUnits(player, type = null) {
        return this.unitRepository.getUnits(type).filter((unit) => {
            return unit.getPlayer() !== null && unit.getPlayer() !== player;
        });
    }
    getCreatorOf(buildingName, player) {
        const creators = this.buildingRepository.getCreatorOf(buildingName).filter((building) => {
            return building.getPlayer() === player;
        });
        return creators.length > 0 ? creators[0] : null;
    }
    getEnemies(player) {
        let result = [];
        this.getEnemyUnits(player).forEach((unit) => {
            result.push(unit);
        });
        this.getEnemyBuildings(player).forEach((building) => {
            result.push(building);
        });
        return result;
    }
    removeBuilding(building) {
        this.buildingRepository.removeBuilding(building);
    }
    getGroundCSV() {
        return this.ground.getCSV();
    }
}
exports.WorldKnowledge = WorldKnowledge;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnitCreator_1 = __webpack_require__(34);
const BuildingCreator_1 = __webpack_require__(31);
class CommandCenter {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.unitCreator = new UnitCreator_1.UnitCreator(this.worldKnowledge, this.player);
        this.buildingCreator = new BuildingCreator_1.BuildingCreator(this.worldKnowledge, this.player);
    }
    expand(mcv) {
        if (mcv.getPlayer() === this.player) {
            mcv.orderExpand();
        }
    }
    orderMoveAttack(unit, goal) {
        if (unit.getPlayer() === this.player) {
            unit.orderMoveAttack(goal);
        }
    }
    productBuilding(buildingName) {
        if (this.buildingCreator.isAllowed(buildingName) && !this.buildingCreator.isProducing(buildingName)) {
            this.buildingCreator.runProduction(buildingName);
        }
    }
    createBuilding(buildingName, cell) {
        if (this.buildingCreator.isProduced(buildingName)) {
            this.buildingCreator.runCreation(buildingName, cell);
        }
    }
    getBuildingCreator() {
        return this.buildingCreator;
    }
    getUnitCreator() {
        return this.unitCreator;
    }
    updateAllowedUnitsAndBuildings() {
        this.unitCreator.updateAllowedItems();
        this.buildingCreator.updateAllowedItems();
    }
    productUnit(unitName) {
        if (this.unitCreator.isAllowed(unitName) && !this.unitCreator.isProducing(unitName)) {
            this.unitCreator.runProduction(unitName);
        }
    }
}
exports.CommandCenter = CommandCenter;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(18);
class ComputerPlayer extends Player_1.Player {
    update() {
        // Check if MCV to open
        this.worldKnowledge.getPlayerUnits(this, 'MCV').forEach((unit) => {
            this.order().expand(unit);
        });
        // Check if there is Power Plant
        if (this.worldKnowledge.getPlayerBuildings(this, 'PowerPlant').length === 0) {
            if (this.order().getBuildingCreator().isProduced('PowerPlant')) {
                this.order().createBuilding('PowerPlant', this.getRandomCellNearBase());
            }
            else {
                this.order().productBuilding('PowerPlant');
            }
        }
        // Check if there is Barracks
        if (this.worldKnowledge.getPlayerBuildings(this, 'Barracks').length === 0) {
            if (this.order().getBuildingCreator().isProduced('Barracks')) {
                this.order().createBuilding('Barracks', this.getRandomCellNearBase());
            }
            else {
                this.order().productBuilding('Barracks');
            }
        }
        else {
            this.order().productUnit('Tank');
        }
        // Attack
        this.worldKnowledge.getPlayerUnits(this, 'Tank').forEach((unit) => {
            this.order().orderMoveAttack(unit, new PIXI.Point(0, 0));
        });
    }
    getRandomCellNearBase() {
        const cellPos = this.worldKnowledge.getPlayerBuildings(this, 'ConstructionYard')[0].getCellPositions()[0];
        return new PIXI.Point(cellPos.x + (2 + Math.floor(Math.random() * 3)) * (Math.random() > 0.5 ? -1 : 1), cellPos.y + (2 + Math.floor(Math.random() * 3)) * (Math.random() > 0.5 ? -1 : 1));
    }
}
exports.ComputerPlayer = ComputerPlayer;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(18);
class HumanPlayer extends Player_1.Player {
}
exports.HumanPlayer = HumanPlayer;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = __webpack_require__(5);
class BuildingRepository {
    constructor() {
        this.buildings = [];
    }
    add(building) {
        this.buildings.push(building);
    }
    isCellNotOccupied(position) {
        return this.buildingAt(position) === null;
    }
    buildingAt(position) {
        for (let i = 0; i < this.buildings.length; i++) {
            let building = this.buildings[i];
            const cellPositions = building.getCellPositions();
            for (let j = 0; j < cellPositions.length; j++) {
                if (cellPositions[j].x === position.x &&
                    cellPositions[j].y === position.y) {
                    return building;
                }
            }
        }
        return null;
    }
    getBuildings(type = null) {
        if (type === null) {
            return this.buildings;
        }
        return this.buildings.filter((building) => {
            return building.constructor.name === type;
        });
    }
    getCreatorOf(unit) {
        return this.buildings.filter((building) => {
            return (BuildingProperties_1.BuildingProperties.getConstructableUnits(building.constructor.name).indexOf(unit) > -1);
        });
    }
    removeBuilding(building) {
        building.destroy();
        const index = this.buildings.indexOf(building);
        if (index > -1) {
            this.buildings.splice(index, 1);
        }
    }
}
exports.BuildingRepository = BuildingRepository;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(8);
class UnitRepository {
    constructor() {
        this.units = [];
    }
    add(unit) {
        this.units.push(unit);
    }
    getUnits(type = null) {
        if (null === type) {
            return this.units;
        }
        return this.units.filter((unit) => {
            return unit.constructor.name === type;
        });
    }
    removeUnit(movedSprite) {
        movedSprite.destroy();
        const index = this.units.indexOf(movedSprite);
        if (index > -1) {
            this.units.splice(index, 1);
        }
    }
    isCellNotOccupied(position) {
        return (null === this.unitAt(position));
    }
    unitAt(position) {
        for (let i = 0; i < this.units.length; i++) {
            if (this.units[i] instanceof Unit_1.Unit) {
                const cellPositions = this.units[i].getCellPositions();
                for (let j = 0; j < cellPositions.length; j++) {
                    if (cellPositions[j].x === position.x &&
                        cellPositions[j].y === position.y) {
                        return this.units[i];
                    }
                }
            }
        }
        return null;
    }
    getSelectedUnits() {
        return this.units.filter((unit) => {
            return unit.isSelected();
        });
    }
}
exports.UnitRepository = UnitRepository;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const FRAME_RATE = 30;
const ANCHOR_X = 3 / 8;
const ANCHOR_Y = 6.5 / 8;
class Appear {
    constructor(cellPosition) {
        this.position = new PIXI.Point(Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y));
    }
    create(game, group) {
        this.game = game;
        this.group = group;
        this.buildSprite1();
    }
    buildSprite1() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build1');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite2.bind(this));
    }
    buildSprite2() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build2');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite3.bind(this));
    }
    buildSprite3() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build3');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite4.bind(this));
    }
    buildSprite4() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build4');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite5.bind(this));
    }
    buildSprite5() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build5');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite6.bind(this));
    }
    buildSprite6() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build6');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite7.bind(this));
    }
    buildSprite7() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Build7');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [0, 1, 2, 3, 4, 5, 6, 7], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
    }
}
exports.Appear = Appear;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class BarracksSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
    }
}
exports.BarracksSprite = BarracksSprite;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class ConstructionYardSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 6, 5 / 6);
        this.animationPump = this.animations.add('toto', [0, 1, 2, 3, 2, 1]);
        this.animationElec = this.animations.add('toto', [5, 6, 7]);
        this.animationElec.play(10, true, false);
    }
}
exports.ConstructionYardSprite = ConstructionYardSprite;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
class Explosion extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'exploBig');
        let explode = this.animations.add('explode');
        explode.play(20, false, true);
        this.anchor.set(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE / 1.5, Play_1.SCALE / 1.5);
    }
}
exports.Explosion = Explosion;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HEIGHT = 3;
class LifeRectangle extends Phaser.Graphics {
    constructor(game, width, height) {
        super(game, 0, 0);
        this.isVisible = false;
        this.percentage = 1;
        this.unitWidth = width;
        this.unitHeight = height;
        this.game.add.existing(this);
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(1, 0x000000, 1);
            this.drawRect(-this.unitWidth / 2 + 1, -this.unitHeight / 2 - 1 - HEIGHT, this.unitWidth - 2, HEIGHT);
            this.lineStyle(null);
            this.beginFill(0x00ff00, 1);
            this.drawRect(-this.unitWidth / 2 + 2, -this.unitHeight / 2 - HEIGHT, Math.round((this.unitWidth - 4 + 1) * this.percentage), HEIGHT - 1);
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
    updateLife(percentage) {
        this.percentage = percentage;
        this.render();
    }
}
exports.LifeRectangle = LifeRectangle;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const FRAME_RATE = 20;
const ANCHOR_X = 0.75;
const ANCHOR_Y = 0.6;
class MiniAppear {
    constructor(cellPosition) {
        this.position = new PIXI.Point(Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y));
    }
    create(game, group) {
        this.game = game;
        this.group = group;
        this.buildSprite1();
    }
    buildSprite1() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Platform');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [
            4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            32, 33, 34,
        ], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
        spriteAnim.onComplete.add(this.buildSprite2.bind(this));
    }
    buildSprite2() {
        let sprite = this.game.add.sprite(this.position.x, this.position.y, 'Creation');
        this.group.add(sprite);
        sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        sprite.anchor.setTo(ANCHOR_X, ANCHOR_Y);
        let spriteAnim = sprite.animations.add('toto', [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        ], FRAME_RATE);
        spriteAnim.play(FRAME_RATE, false, true);
    }
}
exports.MiniAppear = MiniAppear;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class PowerPlantSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 11, 10, 9, 8, 5, 4, 3, 2, 1]);
        this.animationElec.play(10, true, false);
    }
}
exports.PowerPlantSprite = PowerPlantSprite;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SELECT_SIZE = 3;
class SelectRectangle extends Phaser.Graphics {
    constructor(game, width, height) {
        super(game, 0, 0);
        this.isVisible = false;
        this.unitWidth = width;
        this.unitHeight = height;
        this.game.add.existing(this);
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(1, 0xffffff, 1);
            this.moveTo(-this.unitWidth / 2, -this.unitHeight / 2 + SELECT_SIZE);
            this.lineTo(-this.unitWidth / 2, -this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2 + SELECT_SIZE, -this.unitHeight / 2);
            this.moveTo(this.unitWidth / 2 - SELECT_SIZE, -this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2, -this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2, -this.unitHeight / 2 + SELECT_SIZE);
            this.moveTo(this.unitWidth / 2, this.unitHeight / 2 - SELECT_SIZE);
            this.lineTo(this.unitWidth / 2, this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2 - SELECT_SIZE, this.unitHeight / 2);
            this.moveTo(-this.unitWidth / 2 + SELECT_SIZE, this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2, this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2, this.unitHeight / 2 - SELECT_SIZE);
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
}
exports.SelectRectangle = SelectRectangle;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const UnitSprite_1 = __webpack_require__(19);
class Shoot extends Phaser.Sprite {
    static getStartFrame(rotation) {
        switch (rotation) {
            case UnitSprite_1.Rotation.TOP: return 8;
            case UnitSprite_1.Rotation.TOP_RIGHT: return 34;
            case UnitSprite_1.Rotation.RIGHT: return 42;
            case UnitSprite_1.Rotation.BOTTOM_RIGHT: return 0;
            case UnitSprite_1.Rotation.BOTTOM: return 12;
            case UnitSprite_1.Rotation.BOTTOM_LEFT: return 4;
            case UnitSprite_1.Rotation.LEFT: return 38;
            case UnitSprite_1.Rotation.TOP_LEFT: return 30;
        }
    }
    static getAnchor(rotation) {
        switch (rotation) {
            case UnitSprite_1.Rotation.TOP: return [0, 1];
            case UnitSprite_1.Rotation.TOP_RIGHT: return [0.7, 0.7];
            case UnitSprite_1.Rotation.RIGHT: return [1, 0];
            case UnitSprite_1.Rotation.BOTTOM_RIGHT: return [0.7, -0.7];
            case UnitSprite_1.Rotation.BOTTOM: return [0, -1];
            case UnitSprite_1.Rotation.BOTTOM_LEFT: return [-0.7, -0.7];
            case UnitSprite_1.Rotation.LEFT: return [-1, 0];
            case UnitSprite_1.Rotation.TOP_LEFT: return [-0.7, 0.7];
        }
    }
    constructor(game, x, y, rotation) {
        super(game, x, y, 'ArtlFlsh');
        this.firstFrame = Shoot.getStartFrame(rotation);
        let explode = this.animations.add('explode');
        explode.play(10, false, true);
        explode.setFrame(this.firstFrame);
        explode.enableUpdate = true;
        explode.onUpdate.add(() => {
            if (explode.currentFrame.index >= this.firstFrame + 3) {
                explode.stop();
                explode.destroy();
            }
        });
        this.anchor.set(0.5 - Shoot.getAnchor(rotation)[0] * 0.5, 0.5 + Shoot.getAnchor(rotation)[1] * 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
    }
}
exports.Shoot = Shoot;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class TiberiumRefinerySprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [4, 5, 8, 9, 10, 9, 8, 5]);
        this.animationPump = this.animations.add('toto', [0, 1, 2, 3, 2, 1]);
        // this.animationPump.play(5, true, false);
        this.animationElec.play(10, true, false);
    }
}
exports.TiberiumRefinerySprite = TiberiumRefinerySprite;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(3);
const AlternativePosition_1 = __webpack_require__(2);
class Harvest {
    constructor(worldKnowledge, harvester, cubeSet) {
        this.worldKnowledge = worldKnowledge;
        this.harvester = harvester;
        this.cubeSet = cubeSet;
    }
    getNextStep() {
        if (this.cubeSet.isEmpty() && !this.harvester.isLoaded()) {
            return new Stand_1.Stand(this.harvester);
        }
        return this;
    }
    run() {
        if (this.harvester.isFull()) {
            this.goToBaseAndUnload();
        }
        else {
            const closestCube = this.harvester.getClosestCube(this.cubeSet);
            if (!closestCube) {
                this.goToBaseAndUnload();
            }
            else {
                if (this.isArrivedToCube(closestCube)) {
                    this.harvester.load(closestCube);
                }
                else {
                    this.harvester.moveTowards(closestCube.getCellPositions()[0]);
                }
            }
        }
    }
    goToBaseAndUnload() {
        const closestBase = this.harvester.getClosestBase();
        if (this.isArrivedToBase(closestBase)) {
            this.harvester.unload(closestBase);
        }
        else {
            this.harvester.moveTowards(new PIXI.Point(closestBase.getCellPositions()[0].x + 1, closestBase.getCellPositions()[0].y + 1));
        }
    }
    isArrivedToCube(cube) {
        return AlternativePosition_1.AlternativePosition.isArrived(cube.getCellPositions()[0], this.harvester.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
    isArrivedToBase(base) {
        return AlternativePosition_1.AlternativePosition.isArrived(new PIXI.Point(base.getCellPositions()[0].x + 1, base.getCellPositions()[0].y + 1), this.harvester.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Harvest = Harvest;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(3);
const AlternativePosition_1 = __webpack_require__(2);
class MoveTo {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        if (this.isArrived()) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        if (!this.isArrived()) {
            this.unit.moveTowards(this.goal);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal, this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.MoveTo = MoveTo;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(8);
const UnitProperties_1 = __webpack_require__(4);
class Tank extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(Tank.prototype.constructor.name, player.getId()));
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(Tank.prototype.constructor.name);
    }
}
exports.Tank = Tank;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ]);