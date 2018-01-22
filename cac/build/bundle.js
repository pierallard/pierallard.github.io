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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = __webpack_require__(56);
const UserInterface_1 = __webpack_require__(12);
const MCV_1 = __webpack_require__(21);
const HumanPlayer_1 = __webpack_require__(59);
const ComputerPlayer_1 = __webpack_require__(58);
const GeneratedGround_1 = __webpack_require__(13);
const TiberiumSource_1 = __webpack_require__(44);
const AlternativePosition_1 = __webpack_require__(6);
exports._DEBUG_FAST_CONSTRUCT = true;
exports.SCALE = 2;
exports.MOVE = 3 * exports.SCALE;
exports.PANEL_WIDTH = 80;
var GROUP;
(function (GROUP) {
    GROUP[GROUP["UNIT"] = 0] = "UNIT";
    GROUP[GROUP["EFFECTS"] = 1] = "EFFECTS";
    GROUP[GROUP["AERIAL"] = 2] = "AERIAL";
    GROUP[GROUP["SHADOW"] = 3] = "SHADOW";
    GROUP[GROUP["GROUND"] = 4] = "GROUND";
})(GROUP = exports.GROUP || (exports.GROUP = {}));
class Play extends Phaser.State {
    constructor() {
        super();
        this.startPositions = [
            new PIXI.Point(Math.round(GeneratedGround_1.GROUND_WIDTH / 5), Math.round(GeneratedGround_1.GROUND_HEIGHT / 5)),
            new PIXI.Point(Math.round(GeneratedGround_1.GROUND_WIDTH * 4 / 5), Math.round(GeneratedGround_1.GROUND_HEIGHT * 4 / 5)),
        ];
        this.startTiberiums = [
            new PIXI.Point(Math.round(GeneratedGround_1.GROUND_WIDTH * 2 / 5), Math.round(GeneratedGround_1.GROUND_HEIGHT / 5)),
            new PIXI.Point(Math.round(GeneratedGround_1.GROUND_WIDTH * 3 / 5), Math.round(GeneratedGround_1.GROUND_HEIGHT * 4 / 5)),
        ];
        this.worldKnowledge = new WorldKnowledge_1.WorldKnowledge();
        this.worldKnowledge.addPlayer(new HumanPlayer_1.HumanPlayer(this.worldKnowledge, 0, 0x00ff00));
        this.worldKnowledge.addPlayer(new ComputerPlayer_1.ComputerPlayer(this.worldKnowledge, 1, 0xff00ff));
        this.userInterface = new UserInterface_1.UserInterface(this.worldKnowledge, this.worldKnowledge.getPlayers()[0]);
    }
    create() {
        this.worldKnowledge.create(this.game, this.startPositions.concat(this.startTiberiums), this.worldKnowledge.getPlayers()[0]);
        this.userInterface.create(this.game);
        this.world.setBounds(0, 0, this.worldKnowledge.getGroundWidth(), this.worldKnowledge.getGroundHeight());
        this.game.camera.bounds.setTo(0, 0, this.worldKnowledge.getGroundWidth() + exports.PANEL_WIDTH * exports.SCALE, this.worldKnowledge.getGroundHeight());
        // this.game.stage.disableVisibilityChange = true;
        this.registerInputs();
        this.start();
    }
    start() {
        AlternativePosition_1.AlternativePosition.getZones(this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
        this.worldKnowledge.addArmy(new MCV_1.MCV(this.worldKnowledge, this.startPositions[0], this.worldKnowledge.getPlayers()[0]));
        this.worldKnowledge.addArmy(new MCV_1.MCV(this.worldKnowledge, this.startPositions[1], this.worldKnowledge.getPlayers()[1]));
        this.startTiberiums.forEach((tiberiumPosition) => {
            this.worldKnowledge.addArmy(new TiberiumSource_1.TiberiumSource(this.worldKnowledge, tiberiumPosition));
        });
        this.game.time.events.loop(5000, () => {
            this.worldKnowledge.getPlayers().filter((player) => {
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
const Ground_1 = __webpack_require__(9);
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
const BuildingProperties_1 = __webpack_require__(5);
class ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        this.life = 100;
        this.maxLife = 100;
        this.selected = false;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
        this.life = this.maxLife = BuildingProperties_1.BuildingProperties.getLife(this.constructor.name);
    }
    setVisible(value) {
        this.sprite.alpha = value ? 1 : 0;
    }
    isVisible() {
        return this.sprite.alpha > 0;
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
            this.worldKnowledge.removeArmy(this);
            this.destroy();
        }
        this.sprite.updateLife(this.life, this.maxLife);
    }
    update() {
    }
    isSelected() {
        return this.selected;
    }
    setSelected(value) {
        this.selected = value;
        this.sprite.setSelected(value);
    }
    updateStateAfterClick(point) {
    }
    isInside(left, right, top, bottom) {
        return this.sprite.isInside(left, right, top, bottom);
    }
    isAlive() {
        return this.life > 0;
    }
    isOnGround() {
        return true;
    }
}
exports.ConstructableBuilding = ConstructableBuilding;


/***/ }),
/* 3 */
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
                distances.push(this.distance(posTo, posFrom));
            });
        });
        return distances.reduce((dist1, dist2) => {
            return Math.min(dist1, dist2);
        });
    }
    static getClosestPosition(from, to) {
        let minDistance = null;
        let minPosition = null;
        to.forEach((posTo) => {
            const distance = this.distance(from, posTo);
            if (minDistance === null || minDistance > distance) {
                minPosition = posTo;
                minDistance = distance;
            }
        });
        return minPosition;
    }
    static getClosestItem(from, objects) {
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
    static getDisc(distance) {
        if (!this.discCache[distance]) {
            let result = [];
            for (let x = -distance; x <= distance; x++) {
                for (let y = -distance; y <= distance; y++) {
                    const point = new PIXI.Point(x, y);
                    if (Distance.to(new PIXI.Point(0, 0), point) < distance) {
                        result.push(point);
                    }
                }
            }
            this.discCache[distance] = result;
        }
        return this.discCache[distance];
    }
    static distance(posTo, posFrom) {
        return Math.sqrt((posFrom.x - posTo.x) * (posFrom.x - posTo.x) +
            (posFrom.y - posTo.y) * (posFrom.y - posTo.y));
    }
}
Distance.discCache = [];
exports.Distance = Distance;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AStar_1 = __webpack_require__(46);
const Stand_1 = __webpack_require__(14);
const Attack_1 = __webpack_require__(30);
const Follow_1 = __webpack_require__(78);
const MoveAttack_1 = __webpack_require__(80);
const UnitSprite_1 = __webpack_require__(20);
const Distance_1 = __webpack_require__(3);
const UnitProperties_1 = __webpack_require__(8);
const Rocket_1 = __webpack_require__(27);
const Cell_1 = __webpack_require__(1);
const Bullet_1 = __webpack_require__(61);
const MoveTo_1 = __webpack_require__(31);
const Play_1 = __webpack_require__(0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const DATA = {
    AdvancedGuardTower: {
        cellPositions: [
            [0, 0],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 66,
        life: 300,
        options: {
            shoot_air_power: 60,
            shoot_cooldown: 40,
            shoot_distance: 6,
            shoot_power: 60,
        },
        power: -20,
        price: 1000,
        requireds: [
            'CommunicationCenter',
        ],
        sight: 4,
        sprite: 'Artilery2',
        sprite_layer: 5,
    },
    AdvancedPowerPlant: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 47,
        life: 300,
        power: 200,
        price: 700,
        requireds: [
            'PowerPlant',
        ],
        sight: 2,
        sprite: 'Generator',
        sprite_layer: 0,
    },
    Barracks: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [
            'MinigunInfantry', 'Grenadier', 'RocketSoldier', 'EngineerInfantry',
        ],
        construction_time: 20,
        life: 400,
        power: -20,
        price: 300,
        requireds: [
            'PowerPlant',
        ],
        sight: 3,
        sprite: 'Module',
        sprite_layer: 0,
    },
    CommunicationCenter: {
        cellPositions: [
            [0, 0],
            [1, 0],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 66,
        life: 500,
        power: -40,
        price: 1000,
        requireds: [
            'TiberiumRefinery',
        ],
        sight: 10,
        sprite: 'Silo',
        sprite_layer: 0,
    },
    ConcreteBarrier: {
        cellPositions: [[0, 0]],
        constructable: true,
        constructable_units: [],
        construction_time: 7,
        life: 1,
        price: 100,
        requireds: ['ConstructionYard'],
        sight: 0,
        sprite: 'Wall',
        sprite_layer: 0,
    },
    ConstructionYard: {
        cellPositions: [
            [0, 0],
            [1, 0],
        ],
        constructable: false,
        constructable_units: [],
        life: 400,
        power: -20,
        sight: 3,
    },
    GuardTower: {
        cellPositions: [
            [0, 0],
            [1, 0],
        ],
        constructable: true,
        constructable_units: [],
        construction_time: 33,
        life: 200,
        options: {
            shoot_cooldown: 50,
            shoot_distance: 4,
            shoot_power: 25,
        },
        power: -10,
        price: 500,
        requireds: [
            'Barracks',
        ],
        sight: 2,
        sprite: 'Turret',
        sprite_layer: 5,
    },
    Helipad: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
            [0, -2],
            [1, -2],
        ],
        constructable: true,
        constructable_units: ['Chinook', 'Orca'],
        construction_time: 100,
        life: 400,
        power: -10,
        price: 1500,
        requireds: [
            'Barracks',
        ],
        sight: 3,
        sprite: 'Starport',
        sprite_layer: 16,
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
        construction_time: 20,
        life: 200,
        power: 100,
        price: 300,
        requireds: [
            'ConstructionYard',
        ],
        sight: 2,
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
        constructable_units: [
            'Harvester',
        ],
        construction_time: 73,
        life: 450,
        power: -40,
        price: 2000,
        requireds: [
            'PowerPlant',
        ],
        sight: 4,
        sprite: 'Factory3',
        sprite_layer: 0,
    },
    TiberiumSource: {
        cellPositions: [
            [0, 0],
        ],
        constructable: false,
    },
    WeaponsFactory: {
        cellPositions: [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, -1],
        ],
        constructable: true,
        constructable_units: [
            'HummVee', 'MediumTank', 'RocketLauncher', 'MCV', 'MamoothTank', 'Harvester',
        ],
        construction_time: 133,
        life: 200,
        power: -30,
        price: 2000,
        requireds: [
            'TiberiumRefinery',
        ],
        sight: 3,
        sprite: 'Base',
        sprite_layer: 0,
    }
};
/**
 * Buildings:
 * - construction yard    : MinerAni
 * - power plant          : Factory2
 * - advanced power plant : Generator
 * - barracks             : Module
 * - tiberium refinery    : Factory3
 * - comm center          : Silo
 * - concrete barrier     : Wall
 * - repair facility      : TradPlat
 * - guard tower          : Turret
 * - helipad              : Starport
 * - weapons factory      : Base
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
        return DATA[buildingName] ? DATA[buildingName].constructable_units || [] : [];
    }
    static getRequiredBuildings(buildingName) {
        return DATA[buildingName].requireds;
    }
    static getConstructionTime(buildingName) {
        if (Play_1._DEBUG_FAST_CONSTRUCT) {
            return DATA[buildingName].construction_time / 50;
        }
        return DATA[buildingName].construction_time / 6;
    }
    static getPrice(buildingName) {
        return DATA[buildingName].price;
    }
    static getLife(buildingName) {
        return DATA[buildingName].life;
    }
    static getOption(buildingName, optionName) {
        return DATA[buildingName].options[optionName];
    }
    static getPower(buildingName) {
        return DATA[buildingName] ? (DATA[buildingName].power || 0) : 0;
    }
    static getSight(buildingName) {
        return DATA[buildingName].sight || 0;
    }
}
exports.BuildingProperties = BuildingProperties;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedGround_1 = __webpack_require__(13);
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
        let zones = this.getZones(isAccessible, currentPosition);
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            const points = this.getPointsFromRadius(goalPosition, radius);
            let foundAccessible = false;
            for (let i = 0; i < points.length; i++) {
                let test = points[i];
                if (currentPosition.x === test.x && currentPosition.y === test.y) {
                    return true;
                }
                if (isAccessible(test) &&
                    AlternativePosition.getZone(zones, test) ===
                        AlternativePosition.getZone(zones, currentPosition)) {
                    foundAccessible = true;
                }
            }
            if (foundAccessible) {
                return false;
            }
        }
        return true;
    }
    static getSquareClosest(position, radius = 0) {
        let result = [];
        for (let x = position.x - radius; x <= position.x + radius; x++) {
            for (let y = position.y - radius; y <= position.y + radius; y++) {
                result.push(new PIXI.Point(x, y));
            }
        }
        return result;
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
        let zones = this.getZones(isAccessible, currentPosition);
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            let possiblePositions = this.getPointsFromRadius(goalPosition, radius);
            possiblePositions = possiblePositions.filter((pos) => {
                return isAccessible(pos) &&
                    AlternativePosition.getZone(zones, pos) ===
                        AlternativePosition.getZone(zones, currentPosition);
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
    static getZones(isAccessible, source = null) {
        if (this.zones) {
            return this.zones;
        }
        this.zones = [];
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                const point = new PIXI.Point(x, y);
                if ((null !== source && source.x === x && source.y === y) || isAccessible(point)) {
                    if (y === 0 && x === 0) {
                        this.zones.push([point]);
                    }
                    else if (y === 0) {
                        const leftZone = AlternativePosition.getZone(this.zones, new PIXI.Point(x - 1, y));
                        if (null !== leftZone) {
                            this.zones[leftZone].push(point);
                        }
                        else {
                            this.zones.push([point]);
                        }
                    }
                    else if (x === 0) {
                        const topZone = AlternativePosition.getZone(this.zones, new PIXI.Point(x, y - 1));
                        if (null !== topZone) {
                            this.zones[topZone].push(point);
                        }
                        else {
                            this.zones.push([point]);
                        }
                    }
                    else {
                        const topLeftZone = AlternativePosition.getZone(this.zones, new PIXI.Point(x - 1, y - 1));
                        const leftZone = AlternativePosition.getZone(this.zones, new PIXI.Point(x - 1, y));
                        const topZone = AlternativePosition.getZone(this.zones, new PIXI.Point(x, y - 1));
                        let neighbourZones = [topLeftZone, leftZone, topZone].filter((zone) => {
                            return null !== zone;
                        });
                        neighbourZones = Array.from(new Set(neighbourZones)).sort((a, b) => {
                            return a - b;
                        });
                        if (neighbourZones.length === 0) {
                            this.zones.push([point]);
                        }
                        else {
                            this.zones[neighbourZones[0]].push(point);
                            if (neighbourZones.length > 1) {
                                for (let i = 1; i < neighbourZones.length; i++) {
                                    this.zones[neighbourZones[0]] = this.zones[neighbourZones[0]]
                                        .concat(this.zones[neighbourZones[i]]);
                                    this.zones[neighbourZones[i]] = [];
                                }
                            }
                        }
                    }
                }
            }
        }
        return this.zones;
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
    static getZone(zones, point) {
        for (let i = 0; i < zones.length; i++) {
            for (let j = 0; j < zones[i].length; j++) {
                if (zones[i][j].x === point.x && zones[i][j].y === point.y) {
                    return i;
                }
            }
        }
        return null;
    }
}
exports.AlternativePosition = AlternativePosition;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Explosion_1 = __webpack_require__(15);
const LifeRectangle_1 = __webpack_require__(16);
const SelectRectangle_1 = __webpack_require__(17);
class BuildingSprite extends Phaser.Sprite {
    constructor(game, groups, x, y, key) {
        super(game, x, y, key);
        this.group = groups[Play_1.GROUP.UNIT];
        this.effectsGroup = groups[Play_1.GROUP.EFFECTS];
        this.scale.setTo(Play_1.SCALE);
        this.group.add(this);
        this.timerEvents = game.time.events;
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.timerEvents.add(0.3 * Phaser.Timer.SECOND, () => {
            this.destroy(true);
        });
    }
    setSelected(value) {
        this.selectedRectangle.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    updateLife(life, maxLife) {
        this.lifeRectangle.updateLife(life / maxLife);
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, (this.right - this.left) / 2 + this.left, (this.bottom - this.top) / 2 + this.top, Math.max(this.right - this.left, this.bottom - this.top)));
    }
}
exports.BuildingSprite = BuildingSprite;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const UnitSprite_1 = __webpack_require__(20);
exports.SHOOT_COOLDOWN_RATIO = 0.1;
const DATA = {
    Grenadier: {
        allowed_by: ['Barracks'],
        construction_time: 7,
        image_format: UnitSprite_1.IMAGE_FORMAT.FIVE,
        life: 50,
        price: 160,
        shoot_cooldown: 50,
        shoot_distance: 3.25,
        shoot_power: 50,
        shoot_type: 'default',
        sight: 1,
        speed: 10,
        sprite_layer: 20,
        sprites: ['Tank5', 'Tank5'],
    },
    Harvester: {
        allowed_by: ['WeaponsFactory', 'TiberiumRefinery'],
        construction_time: 93,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 600,
        options: {
            load_time: 1,
            max_loading: 500,
            unload_time: 1,
        },
        price: 1400,
        shoot_distance: -1,
        sight: 2,
        speed: 12,
        sprite_layer: 6,
        sprites: ['Builder2', 'Builder2'],
    },
    HummVee: {
        allowed_by: ['WeaponsFactory'],
        construction_time: 27,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 150,
        price: 400,
        shoot_cooldown: 30,
        shoot_distance: 4,
        shoot_power: 15,
        shoot_type: 'default',
        sight: 2,
        speed: 30,
        sprite_layer: 6,
        sprites: ['Tank7', 'Tank7'],
    },
    MCV: {
        allowed_by: ['WeaponsFactory', 'AdvancedCommandCenter'],
        construction_time: 213,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 600,
        price: 5000,
        shoot_distance: -1,
        sight: 2,
        speed: 12,
        sprite_layer: 6,
        sprites: ['Transprt', 'Transprt'],
    },
    MediumTank: {
        allowed_by: ['WeaponsFactory'],
        construction_time: 53,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 400,
        price: 800,
        shoot_cooldown: 50,
        shoot_distance: 4.75,
        shoot_power: 30,
        shoot_type: 'default',
        sight: 3,
        speed: 18,
        sprite_layer: 6,
        sprites: ['Tank11', 'Tank12'],
    },
    MinigunInfantry: {
        allowed_by: ['Barracks'],
        construction_time: 7,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 50,
        price: 100,
        shoot_cooldown: 20,
        shoot_distance: 2,
        shoot_power: 15,
        shoot_type: 'default',
        sight: 1,
        speed: 8,
        sprite_layer: 6,
        sprites: ['Scout2', 'Scout2'],
    },
    Orca: {
        allowed_by: ['Barracks', 'Helipad'],
        construction_time: 80,
        image_format: UnitSprite_1.IMAGE_FORMAT.ANIMATED,
        life: 125,
        price: 1200,
        shoot_air_power: 30,
        shoot_cooldown: 60,
        shoot_distance: 4,
        shoot_power: 30,
        shoot_type: 'rocket',
        sight: 3,
        speed: 40,
        sprite_layer: 5,
        sprites: ['Copter', 'Copter'],
    },
    RocketSoldier: {
        allowed_by: ['Barracks'],
        construction_time: 17,
        image_format: UnitSprite_1.IMAGE_FORMAT.NINE,
        life: 25,
        price: 300,
        shoot_air_power: 30,
        shoot_cooldown: 60,
        shoot_distance: 4,
        shoot_power: 30,
        shoot_type: 'rocket',
        sight: 2,
        speed: 6,
        sprite_layer: 14,
        sprites: ['Tank3', 'Tank3'],
    },
};
/**
 * Minigun infantry:  Scout2
 * Grenadier:         Tank5
 * Rocket soldier:    Tank3
 * Engineer Infantry: Tank10
 * Commando Infantry: Miner
 * APC:               Tank13
 * Chinook:           Copter2a
 * ORCA:              Copter
 * Humm-vee:          Tank7
 * Medium Tank:       Tank11
 * Rocket Launcher:   TankB2
 * MCV:               Transprt
 * Mammooth Tank:     Artil3
 * Harvester:         Builder2
 */
class UnitProperties {
    static getSprite(unitName, playerId) {
        return DATA[unitName].sprites[playerId];
    }
    static getOption(unitName, optionName) {
        return DATA[unitName].options[optionName];
    }
    static getShootDistance(unitName) {
        return DATA[unitName].shoot_distance * 1.5;
    }
    static getLife(unitName) {
        return DATA[unitName].life;
    }
    static getShootTime(unitName) {
        return DATA[unitName].shoot_cooldown * exports.SHOOT_COOLDOWN_RATIO;
    }
    static getSlownessTime(unitName) {
        return 6 / DATA[unitName].speed;
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
        if (Play_1._DEBUG_FAST_CONSTRUCT) {
            return DATA[unitName].construction_time / 50;
        }
        return DATA[unitName].construction_time / 6;
    }
    static getPrice(unitName) {
        return DATA[unitName].price;
    }
    static getShootPower(unitName) {
        return DATA[unitName].shoot_power;
    }
    static getShootAirPower(unitName) {
        return DATA[unitName].shoot_air_power ? DATA[unitName].shoot_air_power : 0;
    }
    static getImageFormat(unitName) {
        return DATA[unitName].image_format;
    }
    static getShootType(unitName) {
        return DATA[unitName].shoot_type;
    }
    static getSight(buildingName) {
        return DATA[buildingName].sight || 0;
    }
}
exports.UnitProperties = UnitProperties;


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(51);
const Preload_1 = __webpack_require__(52);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ROTATION;
(function (ROTATION) {
    ROTATION[ROTATION["RIGHT"] = 0] = "RIGHT";
    ROTATION[ROTATION["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    ROTATION[ROTATION["TOP"] = 2] = "TOP";
    ROTATION[ROTATION["TOP_LEFT"] = 3] = "TOP_LEFT";
    ROTATION[ROTATION["LEFT"] = 4] = "LEFT";
    ROTATION[ROTATION["BOTTOM_LEFT"] = 5] = "BOTTOM_LEFT";
    ROTATION[ROTATION["BOTTOM"] = 6] = "BOTTOM";
    ROTATION[ROTATION["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
})(ROTATION = exports.ROTATION || (exports.ROTATION = {}));
class Rotation {
    static getRotation(vector) {
        if (null === vector) {
            return ROTATION.TOP_LEFT;
        }
        const angle = Math.atan2(vector.y, vector.x);
        if (angle > Math.PI / 8 * 7) {
            return ROTATION.LEFT;
        }
        if (angle > Math.PI / 8 * 5) {
            return ROTATION.BOTTOM_LEFT;
        }
        if (angle > Math.PI / 8 * 3) {
            return ROTATION.BOTTOM;
        }
        if (angle > Math.PI / 8) {
            return ROTATION.BOTTOM_RIGHT;
        }
        if (angle > Math.PI / 8 * -1) {
            return ROTATION.RIGHT;
        }
        if (angle > Math.PI / 8 * -3) {
            return ROTATION.TOP_RIGHT;
        }
        if (angle > Math.PI / 8 * -5) {
            return ROTATION.TOP;
        }
        if (angle > Math.PI / 8 * -7) {
            return ROTATION.TOP_LEFT;
        }
        return ROTATION.LEFT;
    }
}
exports.Rotation = Rotation;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIBuildingCreator_1 = __webpack_require__(48);
const Minimap_1 = __webpack_require__(55);
const BuildingPositionner_1 = __webpack_require__(26);
const Selector_1 = __webpack_require__(54);
const UIUnitCreator_1 = __webpack_require__(49);
const app_1 = __webpack_require__(10);
const PowerInterface_1 = __webpack_require__(53);
const Custor_1 = __webpack_require__(33);
exports.INTERFACE_WIDTH = 94 * 2;
class UserInterface {
    constructor(worldKnowledge, player) {
        this.player = player;
        this.selector = new Selector_1.Selector(worldKnowledge, player);
        this.buildingPositionner = new BuildingPositionner_1.BuildingPositioner(worldKnowledge, this.player);
        this.UIBuildingCreator = new UIBuildingCreator_1.UIBuildingCreator(worldKnowledge, this.player, this.buildingPositionner);
        this.UIUnitCreator = new UIUnitCreator_1.UIUnitCreator(worldKnowledge, this.player);
        this.miniMap = new Minimap_1.MiniMap(worldKnowledge, this.player);
        this.powerInterface = new PowerInterface_1.PowerInterface(worldKnowledge, this.player);
        this.cursor = new Custor_1.Cursor(worldKnowledge, this.player);
    }
    create(game) {
        this.buildingPositionner.create(game);
        this.selector.create(game);
        this.interfaceGroup = game.add.group();
        this.interfaceGroup.fixedToCamera = true;
        let interfaceSprite = new Phaser.Sprite(game, 0, 0, 'interface');
        interfaceSprite.scale.setTo(2);
        this.interfaceGroup.add(interfaceSprite);
        this.UIUnitCreator.create(game, this.interfaceGroup);
        this.UIBuildingCreator.create(game, this.interfaceGroup);
        this.miniMap.create(game, this.interfaceGroup);
        this.mineralText = new Phaser.Text(game, app_1.GAME_WIDTH - exports.INTERFACE_WIDTH / 2, 212, this.player.getMinerals() + '', { align: 'center', fill: "#ffffff", font: '24px 000webfont' });
        this.interfaceGroup.add(this.mineralText);
        this.powerInterface.create(game, this.interfaceGroup);
        this.cursor.create(game);
    }
    update() {
        this.selector.update();
        this.miniMap.update();
        this.powerInterface.update();
        this.mineralText.text = Math.floor(this.player.getMinerals()) + '';
        this.UIUnitCreator.update();
        this.UIBuildingCreator.update();
        this.cursor.update();
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const AlternativePosition_1 = __webpack_require__(6);
exports.GROUND_WIDTH = 100;
exports.GROUND_HEIGHT = 40;
var TYPE;
(function (TYPE) {
    TYPE[TYPE["NORMAL"] = 0] = "NORMAL";
    TYPE[TYPE["VARIATION"] = 1] = "VARIATION";
})(TYPE || (TYPE = {}));
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
const MIN = 0.2;
const MAX = 0.8;
const TERRAINS = [TERRAIN.WATER, TERRAIN.GRASS, TERRAIN.MOUNTAIN, TERRAIN.SNOW, TERRAIN.STONE];
const STEP = (MAX - MIN) / TERRAINS.length;
class GeneratedGround {
    constructor() {
        this.collisions = [];
        this.tiles = {
            // Plain tiles
            312: [TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TYPE.NORMAL],
            212: [TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TYPE.NORMAL],
            412: [TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TYPE.NORMAL],
            640: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.NORMAL],
            612: [TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TYPE.NORMAL],
            712: [TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TYPE.NORMAL],
            930: [TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TYPE.NORMAL],
            // Variations
            118: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            120: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            132: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            134: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            136: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
        };
        this.collisions.push(TERRAIN.WATER);
        this.initializeTiles();
    }
    static generateNoises(max, predefinedTiles) {
        const maps = [];
        for (let i = 0; i <= max; i++) {
            maps.push(this.generateNoise(i, predefinedTiles));
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
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
    static generateNoise(power, predefinedTiles) {
        const littleMapWidth = Math.ceil(exports.GROUND_WIDTH / Math.pow(2, power));
        const littleMapHeight = Math.ceil(exports.GROUND_HEIGHT / Math.pow(2, power));
        const littleMap = [];
        const littlePredefinedTiles = predefinedTiles.map((predefinedTile) => {
            return [new PIXI.Point(Math.floor(predefinedTile[0].x / Math.pow(2, power)), Math.floor(predefinedTile[0].y / Math.pow(2, power))), predefinedTile[1]];
        });
        for (let y = 0; y <= littleMapHeight; y++) {
            const littleMapLine = [];
            for (let x = 0; x <= littleMapWidth; x++) {
                let value = Math.random();
                littlePredefinedTiles.forEach((predefinedTile) => {
                    const position = predefinedTile[0];
                    if (position.x === x && position.y === y) {
                        value = GeneratedGround.textureToRand(predefinedTile[1]);
                    }
                });
                littleMapLine.push(value);
            }
            littleMap.push(littleMapLine);
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                resultLine.push(littleMap[Math.floor(y / Math.pow(2, power))][Math.floor(x / Math.pow(2, power))]);
            }
            result.push(resultLine);
        }
        return this.fluzz(result, Math.floor(Math.pow(2, power) / 2) + 1);
    }
    static fluzz(cells, radius) {
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
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
                if (y >= 0 && x >= 0 && y <= exports.GROUND_HEIGHT && x <= exports.GROUND_WIDTH) {
                    cellsValues.push(cells[y][x]);
                }
            }
        }
        return cellsValues.reduce((cell, previousval) => {
            return cell + previousval;
        }, 0) / cellsValues.length;
    }
    static randToTexture(rand) {
        let val = TERRAINS[TERRAINS.length - 1];
        if (rand < MIN) {
            return TERRAINS[0];
        }
        for (let i = 0; i < TERRAINS.length; i++) {
            if (rand >= MIN + i * STEP && rand <= MIN + (i + 1) * STEP) {
                val = TERRAINS[i];
            }
        }
        return val;
    }
    static textureToRand(texture) {
        const index = TERRAINS.indexOf(texture);
        return MIN + (index + 0.5) * STEP;
    }
    create(game, startPositions) {
        this.createFakeData2(startPositions.reduce((previous, startPosition) => {
            AlternativePosition_1.AlternativePosition.getSquareClosest(startPosition, 5).forEach((position) => {
                previous.push([position, TERRAIN.GRASS]);
            });
            return previous;
        }, []));
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
        /*
        const zones = AlternativePosition.getZones(this.isGroundCellAccessible.bind(this));
        let graphics = game.add.graphics(0, 0);
        graphics.alpha = 0.5;
        for (let z = 0; z < zones.length; z++) {
            if (zones[z].length > 0) {
                game.add.text(zones[z][0].x * 40, zones[z][0].y * 40, z + '');
            }
            graphics.beginFill(Phaser.Color.getRandomColor(0, 255, 200));
            for (let i = 0; i < zones[z].length; i++) {
                graphics.drawRect(zones[z][i].x * 40, zones[z][i].y * 40, 40, 40);
            }
        }
        */
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.y < 0 || position.x >= exports.GROUND_WIDTH || position.y >= exports.GROUND_HEIGHT) {
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
        this.initializeTerrain(200, TERRAIN.SNOW, TERRAIN.ICE, true);
        this.initializeTerrain(400, TERRAIN.SNOW, TERRAIN.CRATER, true);
        this.initializeTerrain(500, TERRAIN.ICE, TERRAIN.ICE_BREAK2, false);
        this.initializeTerrain(600, TERRAIN.GRASS, TERRAIN.WATER, true, true);
        this.initializeTerrain(700, TERRAIN.MOUNTAIN, TERRAIN.GRASS, true);
        this.initializeTerrain(800, TERRAIN.MOUNTAIN, TERRAIN.SNOW, true);
        this.initializeTerrain(900, TERRAIN.STONE, TERRAIN.SNOW, true);
    }
    initializeTerrain(startNumber, terrain1, terrain2, rightGap = true, isCollision = false) {
        let result = {};
        result[startNumber] = [terrain1, terrain1, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + 2] = [terrain1, terrain1, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + 4] = [terrain1, terrain1, terrain1, terrain2, TYPE.NORMAL];
        result[startNumber + 10] = [terrain1, terrain2, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + 14] = [terrain2, terrain1, terrain1, terrain2, TYPE.NORMAL];
        result[startNumber + 20] = [terrain1, terrain2, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + 22] = [terrain2, terrain2, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + 24] = [terrain2, terrain1, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + (rightGap ? 32 : 30)] = [terrain1, terrain2, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + (rightGap ? 34 : 32)] = [terrain2, terrain1, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + (rightGap ? 42 : 40)] = [terrain2, terrain2, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + (rightGap ? 44 : 42)] = [terrain2, terrain2, terrain1, terrain2, TYPE.NORMAL];
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
    createFakeData2(predefinedTiles) {
        this.cornersMap = [];
        const noises = GeneratedGround.generateNoises(4, predefinedTiles);
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            let line = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                line.push(GeneratedGround.randToTexture(noises[y][x]));
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
        let normals = [];
        let variations = [];
        const keys = Object.keys(this.tiles);
        for (let i = 0; i < keys.length; i++) {
            if (this.tiles[keys[i]][0] === param[0] &&
                this.tiles[keys[i]][1] === param[1] &&
                this.tiles[keys[i]][2] === param[2] &&
                this.tiles[keys[i]][3] === param[3]) {
                if (this.tiles[keys[i]][4] === TYPE.NORMAL) {
                    normals.push(parseInt(keys[i]));
                }
                else {
                    variations.push(parseInt(keys[i]));
                }
            }
        }
        if (normals.length === 0 && variations.length === 0) {
            return null;
        }
        if (Math.random() > 0.97 && variations.length !== 0 || normals.length === 0) {
            return variations[Math.floor(Math.random() * variations.length)];
        }
        return normals[Math.floor(Math.random() * normals.length)];
    }
}
exports.GeneratedGround = GeneratedGround;


/***/ }),
/* 14 */
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
        if (this.unit.canShoot()) {
            const shootable = this.unit.getClosestShootable();
            if (shootable) {
                this.unit.shoot(shootable);
            }
        }
    }
}
exports.Stand = Stand;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Ground_1 = __webpack_require__(9);
class Explosion extends Phaser.Sprite {
    constructor(game, x, y, size = null) {
        super(game, x, y, 'exploBig');
        let explode = this.animations.add('explode');
        explode.play(20, false, true);
        this.anchor.set(0.5, 0.5);
        const scale = size ? size / (Play_1.SCALE * Ground_1.GROUND_SIZE) : Play_1.SCALE / 1.5;
        this.scale.setTo(scale, scale);
    }
}
exports.Explosion = Explosion;


/***/ }),
/* 16 */
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
            this.endFill();
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
    setAnchor(x, y) {
        this.x = (0.5 - x) * this.unitWidth;
        this.y = (0.5 - y) * this.unitHeight;
    }
}
exports.LifeRectangle = LifeRectangle;


/***/ }),
/* 17 */
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
    setAnchor(x, y) {
        this.x = (0.5 - x) * this.unitWidth;
        this.y = (0.5 - y) * this.unitHeight;
    }
}
exports.SelectRectangle = SelectRectangle;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const HelipadSprite_1 = __webpack_require__(70);
class Helipad extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.loading = false;
    }
    create(game, groups) {
        this.sprite = new HelipadSprite_1.HelipadSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Starport');
    }
    runLoadAnimation() {
        this.sprite.runLoadAnimation();
    }
    setLoading(value) {
        this.loading = value;
    }
    isLoading() {
        return this.loading;
    }
}
exports.Helipad = Helipad;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CommandCenter_1 = __webpack_require__(57);
const START_MINERALS = 5000;
exports.START_POWER = 10;
class Player {
    constructor(worldKnowledge, id, color) {
        this.minerals = START_MINERALS;
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
    addMinerals(amount) {
        this.minerals = this.minerals + amount;
        this.getUnitCreator().unHoldProductionStatus();
        this.getBuildingCreator().unHoldProductionStatus();
    }
    removeMinerals(amount) {
        this.minerals = this.minerals - amount;
    }
    getMinerals() {
        return this.minerals;
    }
    getUnitCreator() {
        return this.commandCenter.getUnitCreator();
    }
    getBuildingCreator() {
        return this.commandCenter.getBuildingCreator();
    }
}
exports.Player = Player;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Explosion_1 = __webpack_require__(15);
const Cell_1 = __webpack_require__(1);
const SelectRectangle_1 = __webpack_require__(17);
const LifeRectangle_1 = __webpack_require__(16);
const Rotation_1 = __webpack_require__(11);
var IMAGE_FORMAT;
(function (IMAGE_FORMAT) {
    IMAGE_FORMAT[IMAGE_FORMAT["THREE"] = 0] = "THREE";
    IMAGE_FORMAT[IMAGE_FORMAT["FIVE"] = 1] = "FIVE";
    IMAGE_FORMAT[IMAGE_FORMAT["NINE"] = 2] = "NINE";
    IMAGE_FORMAT[IMAGE_FORMAT["ANIMATED"] = 3] = "ANIMATED";
})(IMAGE_FORMAT = exports.IMAGE_FORMAT || (exports.IMAGE_FORMAT = {}));
class UnitSprite extends Phaser.Sprite {
    constructor(game, groups, cellPosition, key, imageFormat = IMAGE_FORMAT.THREE) {
        super(game, Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y), key);
        this.imageFormat = imageFormat;
        this.group = groups[Play_1.GROUP.UNIT];
        this.group.add(this);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
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
        this.selectedRectangle.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    rotateTowards(cellPosition) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    loadRotation(rotation) {
        if (this.imageFormat === IMAGE_FORMAT.THREE) {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 1);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 5);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 8);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 7);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 6);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 3);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 0);
                    break;
            }
        }
        else if (this.imageFormat === IMAGE_FORMAT.FIVE) {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 4);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 14);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 24);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 22);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 20);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 10);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 0);
                    break;
            }
        }
        else {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 8);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 6);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 4);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 0);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 14);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 12);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 10);
                    break;
            }
        }
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, this.x, this.y));
    }
}
exports.UnitSprite = UnitSprite;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
const Stand_1 = __webpack_require__(14);
const ConstructionYard_1 = __webpack_require__(40);
class MCV extends Unit_1.Unit {
    constructor() {
        super(...arguments);
        this.expanded = false;
    }
    orderExpand() {
        this.state = new Stand_1.Stand(this);
        this.expand();
    }
    updateStateAfterClick(cell) {
        if (!this.expanded) {
            const unit = this.worldKnowledge.getGroundArmyAt(cell);
            if (null !== unit && unit === this) {
                this.orderExpand();
                return;
            }
        }
        super.updateStateAfterClick(cell);
    }
    expand() {
        this.expanded = true;
        this.worldKnowledge.addArmy(new ConstructionYard_1.ConstructionYard(this.worldKnowledge, new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y), this.player));
        this.worldKnowledge.removeArmy(this, 1000);
    }
}
exports.MCV = MCV;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
const OrcaSprite_1 = __webpack_require__(72);
const Play_1 = __webpack_require__(0);
const AttackReload_1 = __webpack_require__(77);
const Helipad_1 = __webpack_require__(18);
const Cell_1 = __webpack_require__(1);
const Reload_1 = __webpack_require__(81);
const SHOOT_COUNTER = 5;
exports.UNLAND_TIME = 0.5;
class Orca extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.counter = SHOOT_COUNTER;
    }
    create(game, groups) {
        this.effectsGroup = groups[Play_1.GROUP.EFFECTS];
        this.timerEvents = game.time.events;
        this.unitSprite = new OrcaSprite_1.OrcaSprite(game, groups, this.cellPosition, this.counter);
    }
    isOnGround() {
        return false;
    }
    shoot(enemy) {
        this.counter--;
        this.unitSprite.updateCounter(this.counter);
        super.shoot(enemy);
    }
    canShoot() {
        return this.counter > 0;
    }
    isOnHelipad() {
        return this.getCurrentHelipad() !== null;
    }
    getCurrentHelipad() {
        const helipads = this.worldKnowledge.getPlayerArmies(this.getPlayer(), 'Helipad');
        for (let i = 0; i < helipads.length; i++) {
            for (let j = 0; j < helipads[i].getCellPositions().length; j++) {
                if (helipads[i].getCellPositions()[j].x === this.cellPosition.x &&
                    helipads[i].getCellPositions()[j].y === this.cellPosition.y) {
                    return helipads[i];
                }
            }
        }
        return null;
    }
    isFullyReloaded() {
        return this.counter === SHOOT_COUNTER;
    }
    reload() {
        this.counter++;
        this.unitSprite.updateCounter(this.counter);
        this.unitSprite.landIfNeeded(this.getHelipadCenter());
        this.freeze(2 * Phaser.Timer.SECOND);
        this.getCurrentHelipad().runLoadAnimation();
        this.getCurrentHelipad().setLoading(true);
        if (this.counter >= SHOOT_COUNTER) {
            this.timerEvents.add((2 - exports.UNLAND_TIME) * Phaser.Timer.SECOND, () => {
                this.unlandIfNeeded();
                this.getCurrentHelipad().setLoading(false);
            }, this);
        }
    }
    unlandIfNeeded() {
        this.unitSprite.unlandIfNeeded(this.cellPosition);
    }
    updateStateAfterClick(cell) {
        const army = this.worldKnowledge.getArmyAt(cell);
        if (null !== army &&
            army instanceof Helipad_1.Helipad &&
            army.getPlayer() === this.player &&
            (!army.isLoading())) {
            this.state = new Reload_1.Reload(this, army);
            return;
        }
        super.updateStateAfterClick(cell);
    }
    setVisible(value) {
        super.setVisible(value);
        this.unitSprite.setShadowVisible(value);
    }
    getAttackState(army) {
        return new AttackReload_1.AttackReload(this.worldKnowledge, this, army);
    }
    getHelipadCenter() {
        const cellPosition = this.getCurrentHelipad().getCellPositions()[0];
        return new PIXI.Point(Cell_1.Cell.cellToReal(cellPosition.x + 0.5), Cell_1.Cell.cellToReal(cellPosition.y - 0.7));
    }
}
exports.Orca = Orca;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConstructableBuilding_1 = __webpack_require__(2);
const BuildingProperties_1 = __webpack_require__(5);
const UnitProperties_1 = __webpack_require__(8);
const Distance_1 = __webpack_require__(3);
class AbstractShootingBuilding extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
        this.isFrozen = false;
    }
    create(game, groups) {
        this.timerEvents = game.time.events;
    }
    update() {
        if (!this.isFrozen) {
            const shootable = this.getClosestShootable();
            if (shootable) {
                this.shoot(shootable);
            }
        }
        super.update();
    }
    shoot(enemy) {
        this.sprite.doShoot(enemy.getCellPositions()[0]);
        enemy.lostLife(BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_power'));
        this.freeze(BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_cooldown') *
            Phaser.Timer.SECOND *
            UnitProperties_1.SHOOT_COOLDOWN_RATIO);
    }
    freeze(time) {
        this.isFrozen = true;
        this.timerEvents.add(time, () => {
            this.isFrozen = false;
        }, this);
    }
    getClosestShootable() {
        const enemies = this.worldKnowledge.getEnemyArmies(this.player);
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy !== this) {
                if (enemy.isOnGround() || BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_air_power') > 0) {
                    const distance = Distance_1.Distance.to(this.cellPosition, enemy.getCellPositions());
                    if (distance <= BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_distance')) {
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
}
exports.AbstractShootingBuilding = AbstractShootingBuilding;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCreator {
    constructor(worldKnowledge, player) {
        this.productionStatus = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.timerEvent = game.time.events;
        this.game = game;
    }
    getPlayer() {
        return this.player;
    }
    orderProduction(itemName) {
        if (this.productionStatus && this.productionStatus.getItemName() === itemName) {
            this.productionStatus.playerUnHold();
        }
        else {
            if (this.canProduct(itemName)) {
                return this.runProduction(itemName);
            }
        }
    }
    isAllowed(itemName) {
        let found = true;
        this.getRequiredBuildings(itemName).forEach((requiredBuildingName) => {
            if (this.worldKnowledge.getPlayerArmies(this.player, requiredBuildingName).length === 0) {
                found = false;
            }
        });
        return found;
    }
    getProductionStatus() {
        return this.productionStatus;
    }
    isProduced(itemName) {
        return this.productionStatus &&
            this.productionStatus.getItemName() === itemName &&
            this.productionStatus.percentage >= 1;
    }
    isProducingAny() {
        return null !== this.productionStatus;
    }
    isProducing(itemName) {
        return this.productionStatus && this.productionStatus.getItemName() === itemName;
    }
    hold(itemName) {
        if (this.productionStatus && this.productionStatus.getItemName() === itemName) {
            this.productionStatus.playerHold();
        }
    }
    isHold(itemName) {
        return this.productionStatus &&
            this.productionStatus.getItemName() === itemName &&
            this.productionStatus.isHold();
    }
    cancel(itemName) {
        if (this.isHold(itemName)) {
            this.productionStatus.cancel();
            this.productionStatus = null;
        }
    }
    unHoldProductionStatus() {
        if (this.productionStatus) {
            this.productionStatus.unHold();
        }
    }
}
exports.AbstractCreator = AbstractCreator;
class ProductionStatus {
    constructor(itemName, duration, price, player, callBack, game) {
        this.itemName = itemName;
        this.percentage = 0;
        this.previousPercentage = 0;
        this.price = price;
        this.player = player;
        this.isHoldPlayer = false;
        this.tween = game.add.tween(this).to({
            percentage: 1,
        }, duration, Phaser.Easing.Default, true);
        this.tween.onComplete.add(() => {
            player.removeMinerals(this.diffMinerals());
            player.removeMinerals(this.diffMinerals());
            callBack(this.itemName);
        });
        this.tween.onUpdateCallback(() => {
            if (this.player.getMinerals() - this.diffMinerals() > 0) {
                player.removeMinerals(this.diffMinerals());
            }
            else {
                this.hold();
            }
            this.previousPercentage = this.percentage;
        });
    }
    getItemName() {
        return this.itemName;
    }
    playerHold() {
        this.isHoldPlayer = true;
        this.hold();
    }
    playerUnHold() {
        this.isHoldPlayer = false;
        this.unHold();
    }
    unHold() {
        this.tween.resume();
    }
    isHold() {
        return this.isHoldPlayer && this.tween.isPaused;
    }
    cancel() {
        this.tween.stop(false);
        this.player.addMinerals(this.percentage * this.price);
    }
    diffMinerals() {
        return (this.percentage - this.previousPercentage) * this.price;
    }
    hold() {
        this.tween.pause();
    }
}
exports.ProductionStatus = ProductionStatus;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const WIDTH = 33;
const HEIGHT = 36;
const TOP = 244;
class AbstractUICreator {
    static getUIText(itemName) {
        return itemName.split('').reduce((previousText, letter) => {
            if (/^[A-Z]$/.test(letter)) {
                if (previousText !== '') {
                    return previousText + "\n" + letter;
                }
                else {
                    return letter;
                }
            }
            else {
                return previousText + letter;
            }
        }, '');
    }
    constructor(worldKnowledge, player, x) {
        this.buttons = [];
        this.player = player;
        this.worldKnowledge = worldKnowledge;
        this.x = x;
        this.index = 0;
    }
    create(game, group) {
        this.game = game;
        this.group = group;
        this.bottomButton = new Phaser.Sprite(game, this.x + 3 * 2, 305 * 2, 'interfacebuttons', 3);
        this.bottomButton.scale.setTo(Play_1.SCALE);
        this.bottomButton.events.onInputDown.add(() => {
            this.goDown();
        }, this);
        this.topButton = new Phaser.Sprite(game, this.x + 18 * 2, 305 * 2, 'interfacebuttons', 2);
        this.topButton.scale.setTo(Play_1.SCALE);
        this.topButton.events.onInputDown.add(() => {
            this.goUp();
        }, this);
        group.add(this.bottomButton);
        group.add(this.topButton);
    }
    update() {
        this.createButtons(this.getPossibleButtons());
        const productionStatus = this.getProductionStatus();
        this.buttons.forEach((button) => {
            if (productionStatus && button.getName() === productionStatus.getItemName()) {
                button.updateProgress(productionStatus.percentage);
            }
            else {
                button.setAvailable(this.canProduct(button.getName()));
                button.updateProgress(0);
            }
        });
    }
    getPlayer() {
        return this.player;
    }
    createButton(itemName) {
        this.buttons.push(new CreationButton(this, this.game, this.buttons.length > 0 ? this.buttons[this.buttons.length - 1].getTop() + HEIGHT * Play_1.SCALE : TOP, itemName, this.group, this.x, this.getSpriteKey(itemName), this.getSpriteLayer(itemName), this.onClickFunction, this.onRightClickFunction));
    }
    goDown() {
        this.index += 1;
        this.buttons.forEach((button) => {
            button.goUp();
        });
        this.updateVisibleButtons();
    }
    goUp() {
        this.index -= 1;
        this.buttons.forEach((button) => {
            button.goDown();
        });
        this.updateVisibleButtons();
    }
    updateVisibleButtons() {
        let displayTop = false;
        let displayBottom = false;
        for (let i = 0; i < this.buttons.length; i++) {
            if (i < this.index) {
                this.buttons[i].setVisible(false);
                displayTop = true;
            }
            else if (i > this.index + 4) {
                this.buttons[i].setVisible(false);
                displayBottom = true;
            }
            else {
                this.buttons[i].setVisible(true);
            }
        }
        this.topButton.loadTexture(this.topButton.key, displayTop ? 0 : 2);
        this.topButton.inputEnabled = displayTop;
        this.bottomButton.loadTexture(this.bottomButton.key, displayBottom ? 1 : 3);
        this.bottomButton.inputEnabled = displayBottom;
    }
    createButtons(itemNames) {
        itemNames.forEach((itemName) => {
            if (!this.buttons.some((button) => {
                return button.getName() === itemName;
            })) {
                this.createButton(itemName);
            }
        });
        this.updateVisibleButtons();
    }
}
exports.AbstractUICreator = AbstractUICreator;
class CreationButton {
    constructor(creator, game, top, itemName, group, x, spriteKey, spriteLayer, onClickFunction, onRightClickFunction) {
        this.itemName = itemName;
        this.uiCreator = creator;
        this.button = new Phaser.Sprite(game, x, top, 'buttons', 2);
        this.button.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(() => {
            if (game.input.activePointer.rightButton.isDown) {
                onRightClickFunction.bind(creator)(this.itemName);
            }
            else {
                onClickFunction.bind(creator)(this.itemName);
            }
        }, creator);
        group.add(this.button);
        this.itemSprite = new Phaser.Sprite(game, x + WIDTH * Play_1.SCALE / 2, top + HEIGHT * Play_1.SCALE / 2, spriteKey, spriteLayer);
        this.itemSprite.scale.setTo(Play_1.SCALE / 2, Play_1.SCALE / 2);
        this.itemSprite.anchor.setTo(0.5, 0.7);
        group.add(this.itemSprite);
        this.text = new Phaser.Text(game, x, top, AbstractUICreator.getUIText(this.itemName), { align: 'center', fill: "#ffffff", font: '14px 000webfont' });
        group.add(this.text);
        this.progress = new CreationButtonProgress(game, top, x);
        group.add(this.progress);
        this.constructAllowed = true;
    }
    updateProgress(percentage) {
        this.setPending(percentage > 0);
        this.progress.setProgress(percentage);
    }
    getName() {
        return this.itemName;
    }
    setPending(value) {
        this.button.loadTexture(this.button.key, value ? 3 : this.constructAllowed ? 2 : 0);
    }
    setVisible(value) {
        this.applyAllElement((element) => {
            element.visible = value;
        });
    }
    goDown() {
        this.applyAllElement((element) => {
            element.y = element.y + HEIGHT * Play_1.SCALE;
        });
    }
    goUp() {
        this.applyAllElement((element) => {
            element.y = element.y - HEIGHT * Play_1.SCALE;
        });
    }
    setAvailable(value) {
        this.constructAllowed = value;
    }
    getTop() {
        return this.button.y;
    }
    applyAllElement(a) {
        [this.button, this.itemSprite, this.progress, this.text].forEach((element) => {
            a(element);
        });
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
    setProgress(percentage) {
        this.cropRect.width = WIDTH * percentage;
    }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Cell_1 = __webpack_require__(1);
const BuildingProperties_1 = __webpack_require__(5);
const Ground_1 = __webpack_require__(9);
const app_1 = __webpack_require__(10);
const UserInterface_1 = __webpack_require__(12);
const Distance_1 = __webpack_require__(3);
const ConstructableBuilding_1 = __webpack_require__(2);
exports.BUILDING_POSITIONNER_MIN_DIST = 6;
class BuildingPositioner {
    static isAccessible(cell, buildingName, worldKnowledge, player) {
        return this.isCellClose(cell, worldKnowledge, player) &&
            this.isCellAccessible(cell, worldKnowledge, buildingName);
    }
    static isCellClose(cell, worldKnowledge, player) {
        const armies = worldKnowledge.getPlayerArmies(player);
        for (let i = 0; i < armies.length; i++) {
            const army = armies[i];
            if (army instanceof ConstructableBuilding_1.ConstructableBuilding) {
                const distance = Distance_1.Distance.to(cell, army.getCellPositions());
                if (distance < exports.BUILDING_POSITIONNER_MIN_DIST) {
                    return true;
                }
            }
        }
        return false;
    }
    static isCellAccessible(cell, worldKnowledge, buildingName) {
        const cellPositions = BuildingProperties_1.BuildingProperties.getCellPositions(buildingName);
        for (let i = 0; i < cellPositions.length; i++) {
            const position = cellPositions[i];
            let newCell = new PIXI.Point(cell.x + position.x, cell.y + position.y);
            if (!worldKnowledge.isGroundCellAccessible(newCell)) {
                return false;
            }
        }
        return true;
    }
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.graphics = new BuildingPositionerGraphics(game, this.worldKnowledge, this.player);
    }
    activate(buildingName) {
        this.graphics.activate(buildingName);
    }
}
exports.BuildingPositioner = BuildingPositioner;
class BuildingPositionerGraphics extends Phaser.Graphics {
    constructor(game, worldKnowledge, player) {
        super(game, 0, 0);
        this.buildingName = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.scale.set(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(this);
    }
    static isInBounds(x) {
        return x < app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH;
    }
    activate(buildingName) {
        this.buildingName = buildingName;
    }
    deactivate() {
        this.buildingName = null;
    }
    update() {
        this.clear();
        if (null !== this.buildingName) {
            if (BuildingPositionerGraphics.isInBounds(this.game.input.mousePointer.x)) {
                let cellX = Cell_1.Cell.realToCell(this.game.input.mousePointer.x + this.game.camera.position.x);
                let cellY = Cell_1.Cell.realToCell(this.game.input.mousePointer.y + this.game.camera.position.y);
                const allowedToBuild = BuildingPositioner.isAccessible(new PIXI.Point(cellX, cellY), this.buildingName, this.worldKnowledge, this.player);
                if (allowedToBuild && this.game.input.activePointer.leftButton.isDown) {
                    this.worldKnowledge.runBuildingCreation(this.player, this.buildingName, new PIXI.Point(cellX, cellY));
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
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Rotation_1 = __webpack_require__(11);
const Play_1 = __webpack_require__(0);
const Explosion_1 = __webpack_require__(15);
const Distance_1 = __webpack_require__(3);
class Rocket extends Phaser.Sprite {
    static getRocketFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 10;
            case Rotation_1.ROTATION.TOP_RIGHT: return 11;
            case Rotation_1.ROTATION.RIGHT: return 23;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 35;
            case Rotation_1.ROTATION.BOTTOM: return 34;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 33;
            case Rotation_1.ROTATION.LEFT: return 21;
            case Rotation_1.ROTATION.TOP_LEFT: return 9;
        }
    }
    static getMuzzleFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 32;
            case Rotation_1.ROTATION.TOP_RIGHT: return 1;
            case Rotation_1.ROTATION.RIGHT: return 17;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 49;
            case Rotation_1.ROTATION.BOTTOM: return 33;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 48;
            case Rotation_1.ROTATION.LEFT: return 16;
            case Rotation_1.ROTATION.TOP_LEFT: return 0;
        }
    }
    constructor(group, source, dest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(dest.x - source.x, dest.y - source.y));
        super(group.game, source.x, source.y, 'Bullets', Rocket.getRocketFrame(rotation));
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        group.add(this);
        const startAnim = Rocket.getMuzzleFrame(rotation);
        const muzzle = new Phaser.Sprite(this.game, source.x, source.y, 'Muzzle', startAnim);
        muzzle.anchor.setTo(0.5, 0.8);
        muzzle.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        muzzle.animations.add('', [
            startAnim, startAnim + 2, startAnim + 4, startAnim + 6, startAnim + 8, startAnim + 10, startAnim + 12,
            startAnim + 14,
        ]).play(10, false, true);
        group.add(muzzle);
        this.game.add.tween(this).to({
            x: dest.x,
            y: dest.y,
        }, Distance_1.Distance.to(source, dest) * 4, Phaser.Easing.Default, true).onComplete.add(() => {
            let explosion = new Explosion_1.Explosion(this.game, dest.x, dest.y);
            group.add(explosion);
            this.destroy(true);
        });
    }
}
exports.Rocket = Rocket;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
const Rotation_1 = __webpack_require__(11);
const Cell_1 = __webpack_require__(1);
const Rocket_1 = __webpack_require__(27);
class AbstractShootingBuildingSprite extends BuildingSprite_1.BuildingSprite {
    doShoot(closestEnemyPosition) {
        this.rotateTowards(closestEnemyPosition);
        new Rocket_1.Rocket(this.effectsGroup, this.getShootSource(closestEnemyPosition), new PIXI.Point(Cell_1.Cell.cellToReal(closestEnemyPosition.x), Cell_1.Cell.cellToReal(closestEnemyPosition.y)));
    }
    getShootSource(cellDest) {
        return this.position;
    }
    rotateTowards(cellPosition) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    loadRotation(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP:
                this.loadTexture(this.key, 0);
                break;
            case Rotation_1.ROTATION.TOP_RIGHT:
                this.loadTexture(this.key, 1);
                break;
            case Rotation_1.ROTATION.RIGHT:
                this.loadTexture(this.key, 2);
                break;
            case Rotation_1.ROTATION.BOTTOM_RIGHT:
                this.loadTexture(this.key, 3);
                break;
            case Rotation_1.ROTATION.BOTTOM:
                this.loadTexture(this.key, 4);
                break;
            case Rotation_1.ROTATION.BOTTOM_LEFT:
                this.loadTexture(this.key, 5);
                break;
            case Rotation_1.ROTATION.LEFT:
                this.loadTexture(this.key, 6);
                break;
            case Rotation_1.ROTATION.TOP_LEFT:
                this.loadTexture(this.key, 7);
                break;
        }
    }
}
exports.AbstractShootingBuildingSprite = AbstractShootingBuildingSprite;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const Ground_1 = __webpack_require__(9);
const START_AMOUNT = 1000;
const HARVEST_QUANTITY = 100;
class TiberiumPlant extends Phaser.Sprite {
    static getLayerFromAmount(amount) {
        if (amount < START_AMOUNT / 3) {
            return 4;
        }
        else if (amount < 2 * START_AMOUNT / 3) {
            return 2;
        }
        else {
            return 0;
        }
    }
    constructor(source, game, x, y) {
        const amount = Math.random() * (START_AMOUNT / 2) + START_AMOUNT / 2;
        super(game, Cell_1.Cell.cellToReal(x), Cell_1.Cell.cellToReal(y), 'GrssCrtr', TiberiumPlant.getLayerFromAmount(amount));
        this.source = source;
        this.amount = amount;
        this.cellPosition = new PIXI.Point(x, y);
        this.scale.setTo(Play_1.SCALE * Ground_1.GROUND_SIZE / 27);
        this.anchor.setTo(0.5, 0.5);
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
            this.source.remove(this);
        }
        else {
            this.loadTexture(this.key, TiberiumPlant.getLayerFromAmount(this.amount));
        }
        return result;
    }
    getSource() {
        return this.source;
    }
}
exports.TiberiumPlant = TiberiumPlant;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(14);
const AlternativePosition_1 = __webpack_require__(6);
const Distance_1 = __webpack_require__(3);
const UnitProperties_1 = __webpack_require__(8);
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
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.unit.isOnGround() ?
            this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
            this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge));
    }
    isAbleToShoot() {
        return this.unit.canShoot &&
            (this.goal.isOnGround() || UnitProperties_1.UnitProperties.getShootAirPower(this.unit.constructor.name) > 0) &&
            Distance_1.Distance.to(this.unit.getCellPositions(), this.goal.getCellPositions()) < this.unit.getShootDistance();
    }
}
exports.Attack = Attack;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(14);
const AlternativePosition_1 = __webpack_require__(6);
class MoveTo {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
        this.standUpCounter = 0;
        this.lastPosition = this.unit.getCellPositions()[0];
    }
    getNextStep() {
        if (this.unit.getCellPositions()[0] === this.lastPosition) {
            this.standUpCounter += 1;
        }
        else {
            this.lastPosition = this.unit.getCellPositions()[0];
            this.standUpCounter = 0;
        }
        if (this.isArrived() || this.standUpCounter > 5) {
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
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal, this.unit.getCellPositions()[0], this.unit.isOnGround() ?
            this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
            this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge));
    }
}
exports.MoveTo = MoveTo;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
const Harvest_1 = __webpack_require__(79);
const TiberiumPlant_1 = __webpack_require__(29);
const Distance_1 = __webpack_require__(3);
const UnitProperties_1 = __webpack_require__(8);
class Harvester extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.loading = 0;
    }
    harvest() {
        const closestGround = Distance_1.Distance.getClosestItem(this.getCellPositions()[0], this.worldKnowledge.getGrounds());
        this.state = new Harvest_1.Harvest(this.worldKnowledge, this, closestGround.getSource());
    }
    updateStateAfterClick(cell) {
        const unit = this.worldKnowledge.getGroundArmyAt(cell);
        if (null === unit) {
            const ground = this.worldKnowledge.getGroundAt(cell);
            if (ground && ground instanceof TiberiumPlant_1.TiberiumPlant) {
                this.state = new Harvest_1.Harvest(this.worldKnowledge, this, ground.getSource());
                return;
            }
        }
        super.updateStateAfterClick(cell);
    }
    getClosestRefinery() {
        return Distance_1.Distance.getClosestItem(this.getCellPositions()[0], this.worldKnowledge.getPlayerArmies(this.player, 'TiberiumRefinery'));
    }
    getClosestPlant(source) {
        return Distance_1.Distance.getClosestItem(this.getCellPositions()[0], source.getFreePlants(this));
    }
    isFull() {
        return this.loading >= UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'max_loading');
    }
    unload(refinery) {
        refinery.runUnloadAnimation();
        refinery.getPlayer().addMinerals(this.loading);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const Unit_1 = __webpack_require__(4);
const Cell_1 = __webpack_require__(1);
const app_1 = __webpack_require__(10);
const UserInterface_1 = __webpack_require__(12);
const MCV_1 = __webpack_require__(21);
const UnitProperties_1 = __webpack_require__(8);
const Orca_1 = __webpack_require__(22);
const Helipad_1 = __webpack_require__(18);
var ACTION;
(function (ACTION) {
    ACTION[ACTION["DEFAULT"] = 0] = "DEFAULT";
    ACTION[ACTION["MOVE"] = 1] = "MOVE";
    ACTION[ACTION["ATTACK"] = 2] = "ATTACK";
    ACTION[ACTION["SPECIAL"] = 3] = "SPECIAL";
})(ACTION || (ACTION = {}));
class Cursor {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.cursors = [];
    }
    create(game) {
        this.mousePointer = game.input.mousePointer;
        this.camera = game.camera;
        let green = new Phaser.Sprite(game, 0, 0, 'Outline', 6);
        green.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        green.anchor.setTo(0.5, 0.5);
        green.fixedToCamera = true;
        game.add.existing(green);
        let red = new Phaser.Sprite(game, 0, 0, 'Outline2', 6);
        red.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        red.anchor.setTo(0.5, 0.5);
        red.fixedToCamera = true;
        game.add.existing(red);
        let mouse = new Phaser.Sprite(game, 0, 0, 'mouse', 6);
        mouse.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        mouse.fixedToCamera = true;
        mouse.anchor.setTo(0, 0);
        game.add.existing(mouse);
        let special = new Phaser.Sprite(game, 0, 0, 'Selected', 9);
        special.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        special.fixedToCamera = true;
        special.anchor.setTo(0.5, 0.5);
        special.animations.add('fou', [9, 10, 11], 100).play(10, true, false);
        game.add.existing(special);
        this.cursors[ACTION.DEFAULT] = mouse;
        this.cursors[ACTION.MOVE] = green;
        this.cursors[ACTION.ATTACK] = red;
        this.cursors[ACTION.SPECIAL] = special;
        this.showCursor(ACTION.DEFAULT);
    }
    update() {
        const position = new Phaser.Point(Play_1.SCALE * Math.ceil(this.mousePointer.position.x / Play_1.SCALE), Play_1.SCALE * Math.ceil(this.mousePointer.position.y / Play_1.SCALE));
        this.cursors.forEach((cursor) => {
            cursor.cameraOffset = position;
        });
        this.showCursor(this.getAction());
    }
    showCursor(selectedAction) {
        Object.keys(this.cursors).forEach((action) => {
            this.cursors[action].alpha = (+action) === selectedAction ? 1 : 0;
        });
    }
    getAction() {
        if (this.mousePointer.x > app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH) {
            return ACTION.DEFAULT;
        }
        if (!this.hasUnitSelected()) {
            return ACTION.DEFAULT;
        }
        const unitAt = this.worldKnowledge.getGroundArmyAt(new PIXI.Point(Cell_1.Cell.realToCell(this.mousePointer.x + this.camera.position.x), Cell_1.Cell.realToCell(this.mousePointer.y + this.camera.position.y)));
        if (unitAt && unitAt.getPlayer() !== this.player) {
            if (unitAt.isOnGround() || this.selectedUnitCanShootAir()) {
                return ACTION.ATTACK;
            }
            else {
                return ACTION.MOVE;
            }
        }
        else {
            if (this.isMCVExpanding(unitAt) || this.isOrcaReloading(unitAt)) {
                return ACTION.SPECIAL;
            }
            return ACTION.MOVE;
        }
    }
    hasUnitSelected() {
        const selecteds = this.worldKnowledge.getSelectedArmies();
        for (let i = 0; i < selecteds.length; i++) {
            if (selecteds[i] instanceof Unit_1.Unit) {
                return true;
            }
        }
        return false;
    }
    isMCVExpanding(unitAt) {
        const selecteds = this.worldKnowledge.getSelectedArmies();
        return selecteds.length === 1 &&
            selecteds[0] instanceof MCV_1.MCV &&
            selecteds[0] === unitAt;
    }
    isOrcaReloading(unitAt) {
        const selecteds = this.worldKnowledge.getSelectedArmies();
        return selecteds.filter((unit) => {
            return unit instanceof Orca_1.Orca;
        }).length === selecteds.length && selecteds.filter((unit) => {
            return !unit.isFullyReloaded();
        }).length > 0 &&
            unitAt instanceof Helipad_1.Helipad;
    }
    selectedUnitCanShootAir() {
        const selecteds = this.worldKnowledge.getSelectedArmies();
        for (let i = 0; i < selecteds.length; i++) {
            if (selecteds[i] instanceof Unit_1.Unit && UnitProperties_1.UnitProperties.getShootAirPower(selecteds[i].constructor.name) > 0) {
                return true;
            }
        }
        return false;
    }
}
exports.Cursor = Cursor;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedGround_1 = __webpack_require__(13);
const Distance_1 = __webpack_require__(3);
const FogSprite_1 = __webpack_require__(68);
const UnitProperties_1 = __webpack_require__(8);
const BuildingProperties_1 = __webpack_require__(5);
const Unit_1 = __webpack_require__(4);
const REFRESH_TIME = 0.25 * Phaser.Timer.SECOND;
const SIGHT_RATIO = 3;
class Fog {
    constructor(worldKnowledge, player) {
        this.hasRenderedRecently = false;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.sprite = null;
        this.knownCells = [];
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            this.knownCells[y] = [];
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                this.knownCells[y][x] = false;
            }
        }
    }
    create(game, group, addSprite) {
        this.timeEvents = game.time.events;
        if (addSprite) {
            this.sprite = new FogSprite_1.FogSprite();
            this.sprite.create(game, group);
            this.updateKnownCells();
            this.sprite.initialize(this.knownCells);
        }
    }
    update() {
        if (!this.hasRenderedRecently) {
            this.updateKnownCells();
            this.hasRenderedRecently = true;
            this.timeEvents.add(REFRESH_TIME, () => {
                this.hasRenderedRecently = false;
            }, this);
            if (this.sprite) {
                this.sprite.update(this.knownCells, true);
            }
        }
        else {
            if (this.sprite) {
                this.sprite.update(this.knownCells, false);
            }
        }
    }
    getPlayer() {
        return this.player;
    }
    getKnownCells() {
        return this.knownCells;
    }
    updateKnownCells() {
        this.worldKnowledge.getPlayerArmies(this.player).forEach((unit) => {
            const sight = ((unit instanceof Unit_1.Unit) ?
                UnitProperties_1.UnitProperties.getSight(unit.constructor.name) :
                BuildingProperties_1.BuildingProperties.getSight(unit.constructor.name)) * SIGHT_RATIO;
            unit.getCellPositions().forEach((unitCell) => {
                Distance_1.Distance.getDisc(sight).forEach((cell) => {
                    const y = unitCell.y + cell.y;
                    if (undefined !== this.knownCells[y]) {
                        const x = unitCell.x + cell.x;
                        if (undefined !== this.knownCells[y][x]) {
                            this.knownCells[y][x] = true;
                        }
                    }
                });
            });
        });
    }
}
exports.Fog = Fog;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const AbstractShootingBuilding_1 = __webpack_require__(23);
const AdvancedGuardTowerSprite_1 = __webpack_require__(62);
class AdvancedGuardTower extends AbstractShootingBuilding_1.AbstractShootingBuilding {
    create(game, groups) {
        this.sprite = new AdvancedGuardTowerSprite_1.AdvancedGuardTowerSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Artilery2');
        super.create(game, groups);
    }
}
exports.AdvancedGuardTower = AdvancedGuardTower;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const AdvancedPowerPlantSprite_1 = __webpack_require__(63);
class AdvancedPowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new AdvancedPowerPlantSprite_1.AdvancedPowerPlantSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Generator');
    }
}
exports.AdvancedPowerPlant = AdvancedPowerPlant;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const BarracksSprite_1 = __webpack_require__(65);
class Barracks extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new BarracksSprite_1.BarracksSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Module');
    }
}
exports.Barracks = Barracks;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const CommunicationCenterSprite_1 = __webpack_require__(66);
class CommunicationCenter extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new CommunicationCenterSprite_1.CommunicationCenterSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Silo');
    }
}
exports.CommunicationCenter = CommunicationCenter;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConstructableBuilding_1 = __webpack_require__(2);
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const Ground_1 = __webpack_require__(9);
const LifeRectangle_1 = __webpack_require__(16);
const SelectRectangle_1 = __webpack_require__(17);
class ConcreteBarrier extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
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
            groups[Play_1.GROUP.UNIT].add(sprite);
        });
        this.updateConcretes();
        this.selectedRectable = new SelectRectangle_1.SelectRectangle(game, Ground_1.GROUND_SIZE / Play_1.SCALE, Ground_1.GROUND_SIZE / Play_1.SCALE);
        groups[Play_1.GROUP.UNIT].add(this.selectedRectable);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, Ground_1.GROUND_SIZE / Play_1.SCALE, Ground_1.GROUND_SIZE / Play_1.SCALE);
        groups[Play_1.GROUP.UNIT].add(this.lifeRectangle);
    }
    updateTileLayers() {
        this.topLeftSprite.loadTexture(this.topLeftSprite.key, this.getTopLeftLayer());
        this.topRightSprite.loadTexture(this.topRightSprite.key, this.getTopRightLayer());
        this.bottomRightSprite.loadTexture(this.bottomRightSprite.key, this.getBottomRightLayer());
        this.bottomLeftSprite.loadTexture(this.bottomLeftSprite.key, this.getBottomLeftLayer());
    }
    destroy() {
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });
        this.updateConcretes();
    }
    isInside(left, right, top, bottom) {
        return this.topLeftSprite.x + Ground_1.GROUND_SIZE / 2 > left &&
            this.topLeftSprite.x - Ground_1.GROUND_SIZE / 2 < right &&
            this.topLeftSprite.y + Ground_1.GROUND_SIZE / 2 > top &&
            this.topLeftSprite.y - Ground_1.GROUND_SIZE / 2 < bottom;
    }
    setSelected(value) {
        this.selected = value;
        this.selectedRectable.setVisible(value);
        this.lifeRectangle.setVisible(value);
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
        const building = this.worldKnowledge.getGroundArmyAt(cell);
        return (null !== building &&
            building.constructor.name === this.constructor.name &&
            building.getPlayer() === this.getPlayer());
    }
    updateConcretes() {
        this.worldKnowledge.getPlayerArmies(this.player, this.constructor.name).forEach((building) => {
            const concreteBarrier = building;
            if (concreteBarrier !== this) {
                concreteBarrier.updateTileLayers();
            }
        });
    }
}
exports.ConcreteBarrier = ConcreteBarrier;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const ConstructionYardSprite_1 = __webpack_require__(67);
class ConstructionYard extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
        this.sprite = new ConstructionYardSprite_1.ConstructionYardSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'MinerAni');
    }
}
exports.ConstructionYard = ConstructionYard;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const GuardTowerSprite_1 = __webpack_require__(69);
const AbstractShootingBuilding_1 = __webpack_require__(23);
class GuardTower extends AbstractShootingBuilding_1.AbstractShootingBuilding {
    create(game, groups) {
        this.sprite = new GuardTowerSprite_1.GuardTowerSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Turret');
        super.create(game, groups);
    }
}
exports.GuardTower = GuardTower;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const PowerPlantSprite_1 = __webpack_require__(73);
class PowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new PowerPlantSprite_1.PowerPlantSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory2');
    }
}
exports.PowerPlant = PowerPlant;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const TiberiumRefinerySprite_1 = __webpack_require__(75);
class TiberiumRefinery extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new TiberiumRefinerySprite_1.TiberiumRefinerySprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory3');
    }
    runUnloadAnimation() {
        this.sprite.runUnloadAnimation();
    }
}
exports.TiberiumRefinery = TiberiumRefinery;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const Play_1 = __webpack_require__(0);
const TiberiumPlant_1 = __webpack_require__(29);
const Distance_1 = __webpack_require__(3);
const RADIUS = 6;
class TiberiumSource {
    constructor(worldKnowledge, cellPosition) {
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.plants = [];
    }
    create(game, groups) {
        this.game = game;
        this.group = groups[Play_1.GROUP.UNIT];
        this.sprite = game.add.sprite(Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'GrssMisc-2060', 0);
        this.sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.sprite.anchor.setTo(0.5, 5 / 6);
        groups[Play_1.GROUP.GROUND].add(this.sprite);
        for (let i = 0; i < 20; i++) {
            this.spread();
        }
    }
    spread() {
        let attempts = 100;
        let spreaded = false;
        while (!spreaded && attempts > 0) {
            const newTry = new PIXI.Point(Math.ceil(RADIUS * 2 * Math.random() + this.cellPosition.x - RADIUS), Math.ceil(RADIUS * 2 * Math.random() + this.cellPosition.y - RADIUS));
            if (Distance_1.Distance.to(this.cellPosition, newTry) <= RADIUS && null === this.worldKnowledge.getGroundAt(newTry)) {
                const newPlant = new TiberiumPlant_1.TiberiumPlant(this, this.game, newTry.x, newTry.y);
                this.worldKnowledge.addGroundElement(newPlant);
                this.plants.push(newPlant);
                spreaded = true;
            }
            attempts--;
        }
    }
    setVisible(value) {
    }
    isVisible() {
        return true;
    }
    getPlayer() {
        return null;
    }
    destroy() {
    }
    getCellPositions() {
        return [this.cellPosition];
    }
    isEmpty() {
        for (let i = 0; i < this.plants.length; i++) {
            if (!this.plants[i].isEmpty()) {
                return false;
            }
        }
        return true;
    }
    getFreePlants(harvester) {
        return this.plants.filter((plant) => {
            const unit = this.worldKnowledge.getGroundArmyAt(plant.getCellPositions()[0]);
            return unit === null || unit === harvester;
        });
    }
    remove(tiberiumPlant) {
        const index = this.plants.indexOf(tiberiumPlant);
        this.plants.splice(index, 1);
    }
    update() {
        // TODO Do Spread every x seconds
    }
    isSelected() {
        return false;
    }
    setSelected(b) {
    }
    updateStateAfterClick(point) {
    }
    isInside(left, right, top, bottom) {
        return false;
    }
    lostLife(life) {
    }
    isAlive() {
        return true;
    }
    isOnGround() {
        return true;
    }
}
exports.TiberiumSource = TiberiumSource;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ConstructableBuilding_1 = __webpack_require__(2);
const WeaponsFactorySprite_1 = __webpack_require__(76);
class WeaponsFactory extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
        this.sprite = new WeaponsFactorySprite_1.WeaponsFactorySprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Base');
    }
}
exports.WeaponsFactory = WeaponsFactory;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = __webpack_require__(6);
class AStar {
    static getPathOrClosest(cellPosition, cellGoal, isPositionAccessible) {
        let goal = AlternativePosition_1.AlternativePosition.getClosestAvailable(cellGoal, cellPosition, isPositionAccessible);
        return this.getPath(cellPosition, goal, isPositionAccessible);
    }
    static getPath(cellPosition, cellGoal, isPositionAccessible) {
        if (null === cellGoal) {
            debugger;
        }
        let firstPath = new Path(cellGoal);
        firstPath.add(cellPosition);
        let paths = new Paths();
        paths.add(firstPath);
        let tries = 1000;
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = __webpack_require__(5);
const PowerPlant_1 = __webpack_require__(42);
const Barracks_1 = __webpack_require__(37);
const AbstractCreator_1 = __webpack_require__(24);
const TiberiumRefinery_1 = __webpack_require__(43);
const Harvester_1 = __webpack_require__(32);
const AlternativePosition_1 = __webpack_require__(6);
const ConcreteBarrier_1 = __webpack_require__(39);
const AdvancedPowerPlant_1 = __webpack_require__(36);
const GuardTower_1 = __webpack_require__(41);
const WeaponsFactory_1 = __webpack_require__(45);
const AdvancedGuardTower_1 = __webpack_require__(35);
const CommunicationCenter_1 = __webpack_require__(38);
const Helipad_1 = __webpack_require__(18);
class BuildingCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
    }
    getAllowedBuildings() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings().filter((buildingName) => {
            return this.isAllowed(buildingName);
        });
    }
    getRequiredBuildings(itemName) {
        return BuildingProperties_1.BuildingProperties.getRequiredBuildings(itemName);
    }
    canProduct(itemName) {
        return !this.isProducingAny() && this.isAllowed(itemName);
    }
    runProduction(buildingName) {
        this.productionStatus = new AbstractCreator_1.ProductionStatus(buildingName, BuildingProperties_1.BuildingProperties.getConstructionTime(buildingName) * Phaser.Timer.SECOND, BuildingProperties_1.BuildingProperties.getPrice(buildingName), this.player, () => { }, this.game);
    }
    runCreation(buildingName, cell) {
        this.productionStatus = null;
        switch (buildingName) {
            case 'PowerPlant':
                let powerPlant = new PowerPlant_1.PowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(powerPlant, true, 2);
                break;
            case 'AdvancedPowerPlant':
                let advancedPowerPlant = new AdvancedPowerPlant_1.AdvancedPowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(advancedPowerPlant, true, 2);
                break;
            case 'Barracks':
                let barracks = new Barracks_1.Barracks(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(barracks, true, 2);
                break;
            case 'TiberiumRefinery':
                let tiberiumRefinery = new TiberiumRefinery_1.TiberiumRefinery(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(tiberiumRefinery, true, 2);
                const cellHarvester = AlternativePosition_1.AlternativePosition.getClosestAvailable(cell, cell, this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellHarvester, this.player);
                this.worldKnowledge.addArmy(harvester, true);
                this.timerEvent.add(3 * Phaser.Timer.SECOND, () => {
                    harvester.harvest();
                });
                break;
            case 'ConcreteBarrier':
                let concreteBarrier = new ConcreteBarrier_1.ConcreteBarrier(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(concreteBarrier, false);
                break;
            case 'GuardTower':
                let guardTower = new GuardTower_1.GuardTower(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(guardTower, true, 2);
                break;
            case 'AdvancedGuardTower':
                let advancedGuardTower = new AdvancedGuardTower_1.AdvancedGuardTower(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(advancedGuardTower, true, 2);
                break;
            case 'CommunicationCenter':
                let communicationCenter = new CommunicationCenter_1.CommunicationCenter(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(communicationCenter, true, 2);
                break;
            case 'WeaponsFactory':
                let weaponsFactory = new WeaponsFactory_1.WeaponsFactory(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(weaponsFactory, true, 2);
                break;
            case 'Helipad':
                let helipad = new Helipad_1.Helipad(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(helipad, true, 2);
                break;
            default:
                throw "Unable to build building " + buildingName;
        }
    }
}
exports.BuildingCreator = BuildingCreator;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractUICreator_1 = __webpack_require__(25);
const BuildingProperties_1 = __webpack_require__(5);
const X = 1202 - 66;
class UIBuildingCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player, buildingPositioner) {
        super(worldKnowledge, player, X);
        this.buildingPositioner = buildingPositioner;
    }
    getPossibleButtons() {
        return this.worldKnowledge.getPlayerAllowedBuildings(this.player);
    }
    getSpriteKey(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteKey(itemName);
    }
    getSpriteLayer(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteLayer(itemName);
    }
    onClickFunction(itemName) {
        if (this.worldKnowledge.isBuildingProduced(this.player, itemName)) {
            this.buildingPositioner.activate(itemName);
        }
        else {
            this.worldKnowledge.productBuilding(this.player, itemName);
        }
    }
    onRightClickFunction(itemName) {
        if (this.worldKnowledge.isBuildingProducing(this.player, itemName)) {
            if (this.worldKnowledge.isBuildingHold(this.player, itemName)) {
                this.worldKnowledge.cancelBuilding(this.player, itemName);
            }
            else {
                this.worldKnowledge.holdBuilding(this.player, itemName);
            }
        }
    }
    getProductionStatus() {
        return this.worldKnowledge.getBuildingProductionStatus(this.player);
    }
    canProduct(itemName) {
        return this.worldKnowledge.canProductBuilding(this.player, itemName);
    }
}
exports.UIBuildingCreator = UIBuildingCreator;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnitProperties_1 = __webpack_require__(8);
const AbstractUICreator_1 = __webpack_require__(25);
const X = 1202;
class UIUnitCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player, X);
    }
    getPossibleButtons() {
        return this.worldKnowledge.getPlayerAllowedUnits(this.player);
    }
    getSpriteKey(itemName) {
        return UnitProperties_1.UnitProperties.getSprite(itemName, this.player.getId());
    }
    getSpriteLayer(itemName) {
        return UnitProperties_1.UnitProperties.getSpriteLayer(itemName);
    }
    onClickFunction(itemName) {
        this.worldKnowledge.productUnit(this.player, itemName);
    }
    getProductionStatus() {
        return this.worldKnowledge.getUnitProductionStatus(this.player);
    }
    canProduct(itemName) {
        return this.worldKnowledge.canProductUnit(this.player, itemName);
    }
    onRightClickFunction(itemName) {
        if (this.worldKnowledge.isUnitProducing(this.player, itemName)) {
            if (this.worldKnowledge.isUnitHold(this.player, itemName)) {
                this.worldKnowledge.cancelUnit(this.player, itemName);
            }
            else {
                this.worldKnowledge.holdUnit(this.player, itemName);
            }
        }
    }
}
exports.UIUnitCreator = UIUnitCreator;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCreator_1 = __webpack_require__(24);
const UnitProperties_1 = __webpack_require__(8);
const Harvester_1 = __webpack_require__(32);
const MediumTank_1 = __webpack_require__(84);
const MCV_1 = __webpack_require__(21);
const AlternativePosition_1 = __webpack_require__(6);
const MinigunInfantry_1 = __webpack_require__(85);
const Grenadier_1 = __webpack_require__(82);
const RocketSoldier_1 = __webpack_require__(86);
const HummVee_1 = __webpack_require__(83);
const Orca_1 = __webpack_require__(22);
class UnitCreator extends AbstractCreator_1.AbstractCreator {
    canProduct(itemName) {
        return !this.isProducingAny() && this.isAllowed(itemName);
    }
    getAllowedUnits() {
        return UnitProperties_1.UnitProperties.getConstructableUnits().filter((unitName) => {
            return this.isAllowed(unitName);
        });
    }
    getRequiredBuildings(itemName) {
        return UnitProperties_1.UnitProperties.getRequiredBuildings(itemName);
    }
    runProduction(unitName) {
        this.productionStatus = new AbstractCreator_1.ProductionStatus(unitName, UnitProperties_1.UnitProperties.getConstructionTime(unitName) * Phaser.Timer.SECOND, UnitProperties_1.UnitProperties.getPrice(unitName), this.player, this.runCreation.bind(this), this.game);
    }
    runCreation(unitName) {
        this.productionStatus = null;
        const building = this.worldKnowledge.getCreatorOf(unitName, this.player);
        if (null == building) {
            return;
        }
        const cellPosition = AlternativePosition_1.AlternativePosition.getClosestAvailable(building.getCellPositions()[0], building.getCellPositions()[0], this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
        switch (unitName) {
            case 'Harvester':
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(harvester, true);
                break;
            case 'MediumTank':
                let tank = new MediumTank_1.MediumTank(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(tank, true);
                break;
            case 'MCV':
                let mcv = new MCV_1.MCV(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(mcv, true);
                break;
            case 'MinigunInfantry':
                let minigunInfantry = new MinigunInfantry_1.MinigunInfantry(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(minigunInfantry, true);
                break;
            case 'Grenadier':
                let grenadier = new Grenadier_1.Grenadier(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(grenadier, true);
                break;
            case 'RocketSoldier':
                let rocketSoldier = new RocketSoldier_1.RocketSoldier(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(rocketSoldier, true);
                break;
            case 'HummVee':
                let hummVee = new HummVee_1.HummVee(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(hummVee, true);
                break;
            case 'Orca':
                let orca = new Orca_1.Orca(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(orca, true);
                break;
            default:
                throw "Unable to build unit " + unitName;
        }
    }
}
exports.UnitCreator = UnitCreator;


/***/ }),
/* 51 */
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
/* 52 */
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
        this.load.spritesheet('Tank11', 'assets/Tank11.png', 20, 20, 9, 0, 0);
        this.load.spritesheet('Tank5', 'assets/Tank5.png', 20, 20, 25, 0, 0);
        this.load.spritesheet('Tank3', 'assets/Tank3.png', 20, 20, 75, 0, 0);
        this.load.spritesheet('Tank12', 'assets/Tank12.png', 20, 20, 9, 0, 0);
        this.load.spritesheet('Builder2', 'assets/Builder2.png', 20, 20, 9, 0, 0);
        this.load.spritesheet('Transprt', 'assets/Transprt.png', 40, 40, 9, 0, 0);
        this.load.spritesheet('Scout2', 'assets/Scout2.png', 20, 20, 9, 0, 0);
        this.load.spritesheet('Tank7', 'assets/Tank7.png', 20, 20, 9, 0, 0);
        this.load.spritesheet('Copter', 'assets/Copter.png', 40, 20, 8 * 4, 0, 0);
        this.load.spritesheet('CptrShd1', 'assets/CptrShd1.png', 40, 20, 8 * 4, 0, 0);
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
        this.load.spritesheet('Factory2', 'assets/Factory2.png', 40, 60, 24, 0, 0);
        this.load.spritesheet('Module', 'assets/Module.png', 40, 60, 1, 0, 0);
        this.load.spritesheet('Factory3', 'assets/Factory3.png', 40, 60, 11, 0, 0);
        this.load.spritesheet('Wall', 'assets/Wall.png', 20, 40, 52, 0, 0);
        this.load.spritesheet('GrssMisc-2060', 'assets/GrssMisc.png', 20, 60, 1, 0, 0);
        this.load.spritesheet('GrssCrtr', 'assets/GrssCrtr.png', 20, 20, 5, 0, 0);
        this.load.spritesheet('Generator', 'assets/Generator.png', 40, 60, 21, 0, 0);
        this.load.spritesheet('Turret', 'assets/Turret.png', 40, 40, 8, 0, 0);
        this.load.spritesheet('Artilery2', 'assets/Artilery2.png', 80, 80, 8, 0, 0);
        this.load.spritesheet('MinerAni', 'assets/MinerAni.png', 40, 60, 21, 0, 0);
        this.load.spritesheet('Silo', 'assets/Silo.png', 40, 60, 1, 0, 0);
        this.load.spritesheet('Starport', 'assets/Starport.png', 40, 60, 8 * 3, 0, 0);
        // Others
        this.load.spritesheet('exploBig', 'assets/exploBig.png', 39, 39, 12, 1, 1);
        this.load.spritesheet('ArtlFlsh', 'assets/ArtlFlsh.png', 19, 19, 45, 1, 1);
        this.load.spritesheet('interface', 'assets/interface.png', 640, 360);
        this.load.spritesheet('buttons', 'assets/buttons.png', 33, 36, 4, 0, 0);
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
        this.load.spritesheet('interfacebuttons', 'assets/interfacebuttons.png', 12, 13, 4, 0, 0);
        this.load.spritesheet('interfaceprogress', 'assets/interfaceprogress.png', 10, 349, 1, 0, 0);
        this.load.spritesheet('interfacelimit', 'assets/interfacelimit.png', 10, 10, 2, 0, 0);
        this.load.spritesheet('Bullets', 'assets/Bullets.png', 9, 9, 36, 1, 1);
        this.load.spritesheet('Muzzle', 'assets/Muzzle.png', 20, 20, 64, 0, 0);
        this.load.spritesheet('Dark', 'assets/Dark.png', 20, 20, 14, 0, 0);
        this.load.spritesheet('Outline', 'assets/Outline.png', 20, 20, 13 * 5, 0, 0);
        this.load.spritesheet('Outline2', 'assets/Outline2.png', 20, 20, 13 * 5, 0, 0);
        this.load.spritesheet('mouse', 'assets/mouse.png', 20, 13, 1, 0, 0);
        this.load.spritesheet('Selected', 'assets/Selected.png', 20, 20, 12, 0, 0);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const app_1 = __webpack_require__(10);
const UserInterface_1 = __webpack_require__(12);
const BuildingProperties_1 = __webpack_require__(5);
const HEIGHT = 349 * 2;
const TOP = 5 * 2;
class PowerInterface {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.maxPower = BuildingProperties_1.BuildingProperties.getPower('AdvancedPowerPlant') * 10;
        this.neededPower = this.worldKnowledge.getPlayerNeededPower(this.player);
        this.providedPower = this.worldKnowledge.getPlayerProvidedPower(this.player);
    }
    create(game, group) {
        this.game = game;
        this.powerProgress = new Phaser.Sprite(game, app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH + 4, TOP + HEIGHT, 'interfaceprogress');
        this.powerProgress.scale.setTo(Play_1.SCALE);
        this.powerProgress.anchor.setTo(0, 1);
        this.cropPowerProgress = new Phaser.Rectangle(0, 0, 20, this.getHeight(this.providedPower));
        this.cropPowerProgress.scale(Play_1.SCALE);
        this.powerArrow = new Phaser.Sprite(game, app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH + 4, this.getTop(this.neededPower), 'interfacelimit', 1);
        this.powerArrow.scale.setTo(Play_1.SCALE);
        this.powerArrow.anchor.setTo(0, 0.5);
        group.add(this.powerProgress);
        group.add(this.powerArrow);
    }
    update() {
        const neededPower = this.worldKnowledge.getPlayerNeededPower(this.player);
        const providedPower = this.worldKnowledge.getPlayerProvidedPower(this.player);
        if (this.neededPower !== neededPower) {
            this.game.add.tween(this.powerArrow).to({
                y: this.getTop(neededPower),
            }, 500, Phaser.Easing.Power0, true);
            this.neededPower = neededPower;
        }
        if (this.providedPower !== providedPower) {
            this.game.add.tween(this.cropPowerProgress).to({
                height: this.getHeight(providedPower),
            }, 500, Phaser.Easing.Power0, true);
            this.providedPower = providedPower;
        }
        this.powerArrow.loadTexture(this.powerArrow.key, neededPower > providedPower ? 0 : 1);
        this.powerProgress.crop(this.cropPowerProgress, false);
    }
    getTop(value) {
        return Math.round(TOP + HEIGHT - value * HEIGHT / this.maxPower);
    }
    getHeight(value) {
        // I have no idea why I have to divide by SCALE...
        return value * HEIGHT / this.maxPower / Play_1.SCALE;
    }
}
exports.PowerInterface = PowerInterface;


/***/ }),
/* 54 */
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
        this.camera = game.camera;
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
        return new PIXI.Point(this.mousePointer.x + this.camera.position.x, this.mousePointer.y + this.camera.position.y);
    }
    update() {
        if (null === this.corner && this.leftButton.isDown) {
            this.corner = this.getMousePointer();
        }
        if (this.corner !== null && this.leftButton.isUp) {
            if (this.corner.x === this.getMousePointer().x && this.corner.y === this.getMousePointer().y) {
                let unitUnderPointer = this.worldKnowledge.getArmyAt(new PIXI.Point(Cell_1.Cell.realToCell(this.corner.x), Cell_1.Cell.realToCell(this.corner.y)));
                if (unitUnderPointer && unitUnderPointer.getPlayer() === this.player && this.isDoubleClick) {
                    this.selectUnitsInside(new PIXI.Point(this.camera.position.x, this.camera.position.y), new PIXI.Point(this.camera.position.x + this.gameWidth, this.camera.position.y + this.gameHeight), unitUnderPointer.constructor);
                }
                else {
                    this.worldKnowledge.getArmies().forEach((army) => {
                        army.setSelected(army === unitUnderPointer);
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
            this.worldKnowledge.getSelectedArmies().forEach((source) => {
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
        this.worldKnowledge.getArmies().forEach((unit) => {
            let isInside = false;
            if (unit.isVisible() &&
                unit.getPlayer() === this.player &&
                (null === constructor || unit.constructor === constructor)) {
                isInside = unit.isInside(left, right, top, bottom);
            }
            unit.setSelected(isInside);
        });
    }
}
exports.Selector = Selector;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const GeneratedGround_1 = __webpack_require__(13);
const UserInterface_1 = __webpack_require__(12);
const Ground_1 = __webpack_require__(9);
const SIZE = 60;
const X = 571;
const Y = 9;
const REFRESH_TIME = 0.25 * Phaser.Timer.SECOND;
const TILE_SIZE = 20;
const IDONTKNOW = 1;
class MiniMap {
    constructor(worldKnowledge, player) {
        this.hasRenderedRecently = false;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game, group) {
        this.timerEvents = game.time.events;
        let data = this.worldKnowledge.getGroundCSV();
        game.cache.addTilemap('minimap', null, data, Phaser.Tilemap.CSV);
        let map = game.add.tilemap('minimap', IDONTKNOW, IDONTKNOW, GeneratedGround_1.GROUND_WIDTH * 2, GeneratedGround_1.GROUND_HEIGHT * 2);
        map.addTilesetImage('GrasClif', 'GrasClif', TILE_SIZE, TILE_SIZE, 0, 0, 0);
        map.addTilesetImage('GrssMisc', 'GrssMisc', TILE_SIZE, TILE_SIZE, 0, 0, 100);
        map.addTilesetImage('Ice2Snow', 'Ice2Snow', TILE_SIZE, TILE_SIZE, 0, 0, 200);
        map.addTilesetImage('Snow', 'Snow', TILE_SIZE, TILE_SIZE, 0, 0, 300);
        map.addTilesetImage('Snw2Crtb', 'Snw2Crtb', TILE_SIZE, TILE_SIZE, 0, 0, 400);
        map.addTilesetImage('IceBrk2', 'IceBrk2', TILE_SIZE, TILE_SIZE, 0, 0, 500);
        map.addTilesetImage('Grs2Watr', 'Grs2Watr', TILE_SIZE, TILE_SIZE, 0, 0, 600);
        map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', TILE_SIZE, TILE_SIZE, 0, 0, 700);
        map.addTilesetImage('Snw2Mnt', 'Snw2Mnt', TILE_SIZE, TILE_SIZE, 0, 0, 800);
        map.addTilesetImage('Stn2SnwB', 'Stn2SnwB', TILE_SIZE, TILE_SIZE, 0, 0, 900);
        this.layer = map.createLayer(0, GeneratedGround_1.GROUND_WIDTH * IDONTKNOW, GeneratedGround_1.GROUND_HEIGHT * IDONTKNOW, group);
        this.scale = SIZE / Math.max(GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT) * Play_1.SCALE;
        this.layer.scale.setTo(this.scale, this.scale);
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(X * Play_1.SCALE, Y * Play_1.SCALE);
        this.layer.scrollFactorX = 0;
        this.layer.scrollFactorY = 0;
        const secondScale = SIZE * Play_1.SCALE / Math.max(GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT);
        this.unitAndBuildingGraphics = new Phaser.Graphics(game);
        this.unitAndBuildingGraphics.position.setTo(X * Play_1.SCALE, Y * Play_1.SCALE);
        this.unitAndBuildingGraphics.fixedToCamera = true;
        this.unitAndBuildingGraphics.scale.set(secondScale, secondScale);
        game.add.existing(this.unitAndBuildingGraphics);
        this.fogGraphics = new Phaser.Graphics(game);
        this.fogGraphics.position.setTo(X * Play_1.SCALE, Y * Play_1.SCALE);
        this.fogGraphics.fixedToCamera = true;
        this.fogGraphics.scale.set(secondScale, secondScale);
        game.add.existing(this.fogGraphics);
        this.rectGraphics = new Phaser.Graphics(game);
        this.rectGraphics.position.setTo(X * Play_1.SCALE, Y * Play_1.SCALE);
        this.rectGraphics.fixedToCamera = true;
        game.add.existing(this.rectGraphics);
        this.layer.inputEnabled = true;
        this.layer.events.onInputDown.add(() => {
            const scaleCamera = this.scale / Play_1.SCALE / Ground_1.GROUND_SIZE;
            const cameraView = this.layer.game.camera.view;
            const cameraWidth = (cameraView.width - UserInterface_1.INTERFACE_WIDTH) * scaleCamera;
            const cameraHeight = cameraView.height * scaleCamera;
            const x = (game.input.mousePointer.x - X * Play_1.SCALE - cameraWidth / 2) / this.scale * Ground_1.GROUND_SIZE * Play_1.SCALE;
            const y = (game.input.mousePointer.y - Y * Play_1.SCALE - cameraHeight / 2) / this.scale * Ground_1.GROUND_SIZE * Play_1.SCALE;
            game.camera.setPosition(x, y);
        });
    }
    update() {
        if (this.hasRenderedRecently) {
            return;
        }
        this.updateUnitAndBuildingGraphics();
        this.updateFogGraphics();
        this.udpateRectGraphics();
        this.hasRenderedRecently = true;
        this.timerEvents.add(REFRESH_TIME, () => {
            this.hasRenderedRecently = false;
        }, this);
    }
    updateUnitAndBuildingGraphics() {
        this.unitAndBuildingGraphics.clear();
        this.worldKnowledge.getArmies().forEach((unit) => {
            if (null !== unit.getPlayer()) {
                this.unitAndBuildingGraphics.beginFill(unit.getPlayer().getColor());
                this.unitAndBuildingGraphics.lineStyle(1, unit.getPlayer().getColor());
                unit.getCellPositions().forEach((cellPosition) => {
                    this.unitAndBuildingGraphics.drawRect(cellPosition.x, cellPosition.y, 1, 1);
                });
            }
        });
    }
    updateFogGraphics() {
        this.fogGraphics.clear();
        this.fogGraphics.beginFill(0x000000);
        const fogKnownCells = this.worldKnowledge.getFogKnownCells(this.player);
        for (let y = 0; y < fogKnownCells.length; y++) {
            for (let x = 0; x < fogKnownCells[y].length; x++) {
                if (!fogKnownCells[y][x]) {
                    this.fogGraphics.drawRect(x, y, 1, 1);
                }
            }
        }
    }
    udpateRectGraphics() {
        this.rectGraphics.clear();
        const cameraView = this.layer.game.camera.view;
        const scaleCamera = this.scale / Play_1.SCALE / Ground_1.GROUND_SIZE;
        this.rectGraphics.lineStyle(1, 0xffffff);
        this.rectGraphics.endFill();
        this.rectGraphics.drawRect(cameraView.x * scaleCamera, cameraView.y * scaleCamera, (cameraView.width - UserInterface_1.INTERFACE_WIDTH) * scaleCamera, cameraView.height * scaleCamera);
    }
}
exports.MiniMap = MiniMap;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(19);
const ArmyRepository_1 = __webpack_require__(60);
const GeneratedGround_1 = __webpack_require__(13);
const MiniAppear_1 = __webpack_require__(71);
const BuildingProperties_1 = __webpack_require__(5);
const Fog_1 = __webpack_require__(34);
const Appear_1 = __webpack_require__(64);
const Play_1 = __webpack_require__(0);
class WorldKnowledge {
    constructor() {
        this.ground = new GeneratedGround_1.GeneratedGround();
        this.armyRepository = new ArmyRepository_1.ArmyRepository();
        this.groundRepository = [];
        this.unitCreators = [];
        this.buildingCreators = [];
        this.players = [];
        this.fogs = [];
        this.groups = [];
    }
    create(game, startPositions, player) {
        this.game = game;
        this.ground.create(this.game, startPositions);
        this.groups[Play_1.GROUP.GROUND] = this.game.add.group();
        this.groups[Play_1.GROUP.UNIT] = this.game.add.group();
        this.groups[Play_1.GROUP.SHADOW] = this.game.add.group();
        this.groups[Play_1.GROUP.EFFECTS] = this.game.add.group();
        this.groups[Play_1.GROUP.AERIAL] = this.game.add.group();
        this.groups.forEach((group) => {
            group.fixedToCamera = false;
        });
        this.unitCreators.forEach((unitCreator) => {
            unitCreator.create(game);
        });
        this.buildingCreators.forEach((buildingCreator) => {
            buildingCreator.create(game);
        });
        this.fogGroup = this.game.add.group();
        this.fogs.forEach((fog) => {
            fog.create(game, this.fogGroup, fog.getPlayer() === player);
        });
    }
    update() {
        this.groups[Play_1.GROUP.UNIT].sort('y');
        this.armyRepository.getItems().forEach((army) => {
            army.update();
        });
        this.fogs.forEach((fog) => {
            fog.update();
        });
    }
    isGroundCellAccessible(position) {
        return this.ground.isCellAccessible(position) && this.armyRepository.isGroundCellAccessible(position);
    }
    isAerialCellAccessible(position) {
        return this.armyRepository.isAerialCellAccessible(position);
    }
    getGroundWidth() {
        return this.ground.getGroundWidth();
    }
    getGroundHeight() {
        return this.ground.getGroundHeight();
    }
    addArmy(army, appear = false, appearSize = 1) {
        this.armyRepository.add(army);
        army.create(this.game, this.groups);
        if (appear) {
            army.setVisible(false);
            let appearSprite = appearSize === 1 ?
                new MiniAppear_1.MiniAppear(army.getCellPositions()[0]) :
                new Appear_1.Appear(army.getCellPositions()[0]);
            appearSprite.create(this.game, this.groups[Play_1.GROUP.UNIT]);
            this.game.time.events.add(Phaser.Timer.SECOND * (appearSize === 1 ? 2 : 1.2), () => {
                army.setVisible(true);
            }, this);
        }
    }
    removeArmy(army, delay = 0) {
        if (delay === 0) {
            this.armyRepository.removeArmy(army);
        }
        else {
            this.game.time.events.add(delay, () => {
                this.armyRepository.removeArmy(army);
            });
        }
    }
    getArmyAt(cell) {
        const aerial = this.armyRepository.aerialItemAt(cell);
        return aerial ? aerial : this.armyRepository.groundItemAt(cell);
    }
    getGroundArmyAt(cell) {
        return this.armyRepository.groundItemAt(cell);
    }
    getGroundAt(cell) {
        for (let i = 0; i < this.groundRepository.length; i++) {
            if (this.groundRepository[i].getCellPositions()[0].x === cell.x &&
                this.groundRepository[i].getCellPositions()[0].y === cell.y) {
                return this.groundRepository[i];
            }
        }
        return null;
    }
    getArmies() {
        return this.armyRepository.getItems();
    }
    getSelectedArmies() {
        return this.armyRepository.getSelectedArmies();
    }
    getPlayerArmies(player, type = null) {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() === player;
        });
    }
    getEnemyArmies(player, type = null) {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() !== null && army.getPlayer() !== player;
        });
    }
    getCreatorOf(buildingName, player) {
        const creators = this.armyRepository.getCreatorOf(buildingName).filter((building) => {
            return building.getPlayer() === player;
        });
        return creators.length > 0 ? creators[0] : null;
    }
    getGroundCSV() {
        return this.ground.getCSV();
    }
    addGroundElement(newPlant) {
        this.groups[Play_1.GROUP.GROUND].add(newPlant);
        this.groundRepository.push(newPlant);
    }
    getGrounds() {
        return this.groundRepository;
    }
    getPlayerNeededPower(player) {
        return -this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.min(0, BuildingProperties_1.BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }
    getPlayerProvidedPower(player) {
        return Player_1.START_POWER + this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.max(0, BuildingProperties_1.BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }
    addPlayer(player) {
        this.players.push(player);
        this.unitCreators.push(player.getUnitCreator());
        this.buildingCreators.push(player.getBuildingCreator());
        this.fogs.push(new Fog_1.Fog(this, player));
    }
    getPlayers() {
        return this.players;
    }
    productUnit(player, unitName) {
        this.getPlayerUnitCreator(player).orderProduction(unitName);
    }
    productBuilding(player, unitName) {
        this.getPlayerBuildingCreator(player).orderProduction(unitName);
    }
    isBuildingProduced(player, buildingName) {
        return this.getPlayerBuildingCreator(player).isProduced(buildingName);
    }
    runBuildingCreation(player, buildingName, cell) {
        this.getPlayerBuildingCreator(player).runCreation(buildingName, cell);
    }
    getPlayerAllowedBuildings(player) {
        return this.getPlayerBuildingCreator(player).getAllowedBuildings();
    }
    getPlayerAllowedUnits(player) {
        return this.getPlayerUnitCreator(player).getAllowedUnits();
    }
    getBuildingProductionStatus(player) {
        return this.getPlayerBuildingCreator(player).getProductionStatus();
    }
    canProductBuilding(player, buildingName) {
        return this.getPlayerBuildingCreator(player).canProduct(buildingName);
    }
    getUnitProductionStatus(player) {
        return this.getPlayerUnitCreator(player).getProductionStatus();
    }
    canProductUnit(player, unitName) {
        return this.getPlayerUnitCreator(player).canProduct(unitName);
    }
    holdBuilding(player, itemName) {
        return this.getPlayerBuildingCreator(player).hold(itemName);
    }
    holdUnit(player, itemName) {
        return this.getPlayerUnitCreator(player).hold(itemName);
    }
    isBuildingProducing(player, itemName) {
        return this.getPlayerBuildingCreator(player).isProducing(itemName);
    }
    isBuildingHold(player, itemName) {
        return this.getPlayerBuildingCreator(player).isHold(itemName);
    }
    isUnitHold(player, itemName) {
        return this.getPlayerUnitCreator(player).isHold(itemName);
    }
    isUnitProducing(player, itemName) {
        return this.getPlayerUnitCreator(player).isProducing(itemName);
    }
    cancelBuilding(player, itemName) {
        return this.getPlayerBuildingCreator(player).cancel(itemName);
    }
    cancelUnit(player, itemName) {
        return this.getPlayerUnitCreator(player).cancel(itemName);
    }
    getFogKnownCells(player) {
        return this.fogs.filter((fog) => {
            return fog.getPlayer() === player;
        })[0].getKnownCells();
    }
    getPlayerUnitCreator(player) {
        return this.unitCreators.filter((unitCreator) => {
            return unitCreator.getPlayer() === player;
        })[0];
    }
    getPlayerBuildingCreator(player) {
        return this.buildingCreators.filter((buildingCreator) => {
            return buildingCreator.getPlayer() === player;
        })[0];
    }
}
exports.WorldKnowledge = WorldKnowledge;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnitCreator_1 = __webpack_require__(50);
const BuildingCreator_1 = __webpack_require__(47);
class CommandCenter {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.unitCreator = new UnitCreator_1.UnitCreator(this.worldKnowledge, this.player);
        this.buildingCreator = new BuildingCreator_1.BuildingCreator(this.worldKnowledge, this.player);
    }
    getUnitCreator() {
        return this.unitCreator;
    }
    getBuildingCreator() {
        return this.buildingCreator;
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
        this.buildingCreator.orderProduction(buildingName);
    }
    productUnit(unitName) {
        this.unitCreator.orderProduction(unitName);
    }
    createBuilding(buildingName, cell) {
        if (this.buildingCreator.isProduced(buildingName)) {
            this.buildingCreator.runCreation(buildingName, cell);
        }
    }
}
exports.CommandCenter = CommandCenter;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(19);
const BuildingPositionner_1 = __webpack_require__(26);
class ComputerPlayer extends Player_1.Player {
    update() {
        // Check if MCV to open
        this.worldKnowledge.getPlayerArmies(this, 'MCV').forEach((unit) => {
            this.order().expand(unit);
        });
        this.constructWhenYouCan('PowerPlant');
        this.constructWhenYouCan('TiberiumRefinery');
        this.constructWhenYouCan('Barracks');
        if (this.worldKnowledge.getPlayerArmies(this, 'Barracks').length > 0) {
            this.order().productUnit('MinigunInfantry');
        }
        // Attack
        if (this.worldKnowledge.getPlayerArmies(this, 'MinigunInfantry').length > 5) {
            this.worldKnowledge.getPlayerArmies(this, 'MinigunInfantry').forEach((unit) => {
                this.order().orderMoveAttack(unit, new PIXI.Point(0, 0));
            });
        }
    }
    getRandomCellNearBase(buildingName) {
        const constructionYard = this.worldKnowledge.getPlayerArmies(this, 'ConstructionYard')[0];
        if (!constructionYard) {
            return null;
        }
        const cellPos = constructionYard.getCellPositions()[0];
        let tries = 10;
        while (tries > 0) {
            const test = new PIXI.Point(cellPos.x + (BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST / 2 + Math.floor(Math.random() * BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST)), cellPos.y + (BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST / 2 + Math.floor(Math.random() * BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST)));
            if (BuildingPositionner_1.BuildingPositioner.isAccessible(test, buildingName, this.worldKnowledge, this)) {
                return test;
            }
            tries--;
        }
        return null;
    }
    constructWhenYouCan(buildingName) {
        if (this.worldKnowledge.getPlayerArmies(this, buildingName).length === 0) {
            if (this.worldKnowledge.isBuildingProduced(this, buildingName)) {
                const randomCell = this.getRandomCellNearBase(buildingName);
                if (randomCell) {
                    this.order().createBuilding(buildingName, randomCell);
                }
            }
            else {
                this.order().productBuilding(buildingName);
            }
        }
    }
}
exports.ComputerPlayer = ComputerPlayer;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(19);
class HumanPlayer extends Player_1.Player {
}
exports.HumanPlayer = HumanPlayer;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = __webpack_require__(5);
class ArmyRepository {
    static itemAt(position, items) {
        for (let i = 0; i < items.length; i++) {
            const cellPositions = items[i].getCellPositions();
            for (let j = 0; j < cellPositions.length; j++) {
                if (cellPositions[j].x === position.x &&
                    cellPositions[j].y === position.y) {
                    return items[i];
                }
            }
        }
        return null;
    }
    constructor() {
        this.items = [];
    }
    add(army) {
        this.items.push(army);
    }
    getItems(type = null) {
        if (null === type) {
            return this.items;
        }
        return this.items.filter((unit) => {
            return unit.constructor.name === type;
        });
    }
    removeArmy(army) {
        army.destroy();
        const index = this.items.indexOf(army);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    isGroundCellAccessible(position) {
        return (null === this.groundItemAt(position));
    }
    isAerialCellAccessible(position) {
        return (null === this.aerialItemAt(position));
    }
    groundItemAt(position) {
        return ArmyRepository.itemAt(position, this.items.filter((item) => {
            return item.isOnGround();
        }));
    }
    aerialItemAt(position) {
        return ArmyRepository.itemAt(position, this.items.filter((item) => {
            return !item.isOnGround();
        }));
    }
    getSelectedArmies() {
        return this.items.filter((unit) => {
            return unit.isSelected();
        });
    }
    getCreatorOf(unit) {
        return this.items.filter((item) => {
            return (BuildingProperties_1.BuildingProperties.getConstructableUnits(item.constructor.name).indexOf(unit) > -1);
        });
    }
}
exports.ArmyRepository = ArmyRepository;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Rotation_1 = __webpack_require__(11);
const Play_1 = __webpack_require__(0);
const Explosion_1 = __webpack_require__(15);
const Distance_1 = __webpack_require__(3);
class Bullet extends Phaser.Sprite {
    static getBulletFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 7;
            case Rotation_1.ROTATION.TOP_RIGHT: return 8;
            case Rotation_1.ROTATION.RIGHT: return 20;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 32;
            case Rotation_1.ROTATION.BOTTOM: return 31;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 30;
            case Rotation_1.ROTATION.LEFT: return 18;
            case Rotation_1.ROTATION.TOP_LEFT: return 6;
        }
    }
    constructor(group, source, dest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(dest.x - source.x, dest.y - source.y));
        super(group.game, source.x, source.y, 'Bullets', Bullet.getBulletFrame(rotation));
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        group.add(this);
        this.game.add.tween(this).to({
            x: dest.x,
            y: dest.y,
        }, Distance_1.Distance.to(source, dest) * 2, Phaser.Easing.Default, true).onComplete.add(() => {
            let explosion = new Explosion_1.Explosion(this.game, dest.x, dest.y);
            group.add(explosion);
            this.destroy(true);
        });
    }
}
exports.Bullet = Bullet;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShootingBuildingSprite_1 = __webpack_require__(28);
class AdvancedGuardTowerSprite extends AbstractShootingBuildingSprite_1.AbstractShootingBuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.loadTexture(this.key, 4);
        this.anchor.setTo(3 / 8, 5 / 6);
        this.lifeRectangle.setAnchor(3 / 8, 5 / 6);
        this.selectedRectangle.setAnchor(3 / 8, 5 / 6);
    }
}
exports.AdvancedGuardTowerSprite = AdvancedGuardTowerSprite;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class AdvancedPowerPlantSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14]);
        this.animationElec.play(10, true, false);
    }
}
exports.AdvancedPowerPlantSprite = AdvancedPowerPlantSprite;


/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class BarracksSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
    }
}
exports.BarracksSprite = BarracksSprite;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class CommunicationCenterSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
    }
}
exports.CommunicationCenterSprite = CommunicationCenterSprite;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class ConstructionYardSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        let animationOpen = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        animationOpen.play(10, false, false);
        animationOpen.onComplete.add(() => {
            this.loadTexture(this.key, 19);
        });
    }
}
exports.ConstructionYardSprite = ConstructionYardSprite;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = __webpack_require__(0);
const app_1 = __webpack_require__(10);
const UserInterface_1 = __webpack_require__(12);
const Cell_1 = __webpack_require__(1);
const GeneratedGround_1 = __webpack_require__(13);
const SECURITY_MARGIN = 3;
class FogSprite {
    static getIndex(knownCells, x, y) {
        if (y + 1 >= knownCells.length) {
            return 12;
        }
        const topLeft = knownCells[y][x];
        const topRight = knownCells[y][x + 1];
        const bottomLeft = knownCells[y + 1][x];
        const bottomRight = knownCells[y + 1][x + 1];
        if (topLeft) {
            if (topRight) {
                if (bottomLeft) {
                    return bottomRight ? 13 : 8;
                }
                else {
                    return bottomRight ? 9 : 5;
                }
            }
            else {
                if (bottomLeft) {
                    return bottomRight ? 11 : 3;
                }
                else {
                    return bottomRight ? -2 : 4;
                }
            }
        }
        else {
            if (topRight) {
                if (bottomLeft) {
                    return bottomRight ? 10 : -3;
                }
                else {
                    return bottomRight ? 7 : 6;
                }
            }
            else {
                if (bottomLeft) {
                    return bottomRight ? 1 : 2;
                }
                else {
                    return bottomRight ? 0 : 12;
                }
            }
        }
    }
    create(game, group) {
        this.camera = game.camera;
        this.lastCameraPosition = new PIXI.Point(this.camera.position.x, this.camera.position.y);
        this.group = group;
        this.game = game;
        this.tilemap = new Phaser.Tilemap(game, null, 20, 20, GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT);
        this.tilemap.addTilesetImage('Dark', 'Dark', 20, 20, 0, 0, 0);
        this.layer = this.tilemap.createLayer(0, (app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH) / Play_1.SCALE, app_1.GAME_HEIGHT / Play_1.SCALE, group);
        this.layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.tilemap.widthInPixels = GeneratedGround_1.GROUND_WIDTH * 20;
        this.tilemap.heightInPixels = GeneratedGround_1.GROUND_HEIGHT * 20;
        this.tilemap.format = 0;
        this.tilemap.layers[0].width = GeneratedGround_1.GROUND_WIDTH;
        this.tilemap.layers[0].height = GeneratedGround_1.GROUND_HEIGHT;
        this.tilemap.layers[0].data = [];
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            let dataY = [];
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                dataY[x] = 0;
            }
            this.tilemap.layers[0].data[y] = dataY;
        }
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                this.tilemap.putTile(12, x, y, this.layer);
            }
        }
        this.layer.fixedToCamera = true;
        group.add(this.layer);
    }
    initialize(knownCells) {
        this.updateInner(knownCells, 0, 0, knownCells.length - 1, knownCells[0].length - 1);
    }
    update(knownCells, force) {
        if (force ||
            this.camera.position.x !== this.lastCameraPosition.x ||
            this.camera.position.y !== this.lastCameraPosition.y) {
            const top = Cell_1.Cell.realToCell(this.tilemap.game.camera.position.y);
            const left = Cell_1.Cell.realToCell(this.tilemap.game.camera.position.x);
            const height = Cell_1.Cell.realToCell(app_1.GAME_HEIGHT);
            const width = Cell_1.Cell.realToCell(app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH);
            this.updateInner(knownCells, top, left, height, width);
            this.lastCameraPosition = new PIXI.Point(this.camera.position.x, this.camera.position.y);
        }
    }
    updateInner(knownCells, top, left, height, width) {
        for (let y = top - SECURITY_MARGIN; y < top + height + 1 + SECURITY_MARGIN; y++) {
            for (let x = left - SECURITY_MARGIN; x < left + width + 1 + SECURITY_MARGIN; x++) {
                if (undefined !== knownCells[y] && undefined !== knownCells[y][x]) {
                    const index = FogSprite.getIndex(knownCells, x, y);
                    if (index >= 0) {
                        const currentTile = this.tilemap.getTile(x, y, this.layer);
                        if (currentTile && currentTile.index !== index) {
                            this.tilemap.putTile(index, x, y, this.layer);
                        }
                    }
                }
            }
        }
    }
}
exports.FogSprite = FogSprite;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShootingBuildingSprite_1 = __webpack_require__(28);
class GuardTowerSprite extends AbstractShootingBuildingSprite_1.AbstractShootingBuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 3 / 4);
        this.lifeRectangle.setAnchor(1 / 4, 3 / 4);
        this.selectedRectangle.setAnchor(1 / 4, 3 / 4);
    }
}
exports.GuardTowerSprite = GuardTowerSprite;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class HelipadSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.animationLoad = this.animations.add('tata', [16, 14, 13, 12, 11, 10, 9, 8, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]);
        this.animationStand = this.animations.add('toto', [17, 18, 19, 20, 21, 22, 23, 22, 21, 20, 19, 18]);
        this.animationStand.play(10, true, false);
    }
    runLoadAnimation() {
        let animation = this.animationLoad.play(20, false, false);
        animation.onComplete.add(() => {
            this.animationStand.play(5, true, false);
        });
    }
}
exports.HelipadSprite = HelipadSprite;


/***/ }),
/* 71 */
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnitSprite_1 = __webpack_require__(20);
const Rotation_1 = __webpack_require__(11);
const SelectRectangle_1 = __webpack_require__(17);
const LifeRectangle_1 = __webpack_require__(16);
const Play_1 = __webpack_require__(0);
const ShotCounter_1 = __webpack_require__(74);
const Cell_1 = __webpack_require__(1);
const Orca_1 = __webpack_require__(22);
const ANIM_SPEED = 30;
const GAP_X = 20;
const GAP_Y = 50;
class OrcaSprite extends UnitSprite_1.UnitSprite {
    constructor(game, groups, cellPosition, counter) {
        super(game, groups, cellPosition, 'Copter', UnitSprite_1.IMAGE_FORMAT.ANIMATED);
        groups[Play_1.GROUP.AERIAL].add(this);
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, 20, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, 20, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
        this.shotCounter = new ShotCounter_1.ShotCounter(game, counter);
        this.addChild(this.shotCounter);
        this.anims = [];
        for (let i = 0; i < 8; i++) {
            this.anims.push(this.animations.add('toto', [i, 8 + i, 16 + i, 24 + i]));
        }
        this.shadow = new OrcaSpriteShadow(game, this.x + GAP_X, this.y + GAP_Y);
        groups[Play_1.GROUP.SHADOW].add(this.shadow);
        this.loadRotation(Rotation_1.ROTATION.RIGHT);
        this.isLanded = false;
    }
    update() {
        super.update();
        if (!this.isLanded) {
            this.shadow.x = this.x + GAP_X;
            this.shadow.y = this.y + GAP_Y;
        }
    }
    doDestroy() {
        super.doDestroy();
        this.shadow.destroy(true);
    }
    setSelected(value = true) {
        this.shotCounter.setVisible(value);
        super.setSelected(value);
    }
    updateCounter(value) {
        this.shotCounter.updateCounter(value);
    }
    landIfNeeded(position) {
        if (!this.isLanded) {
            this.land(position);
        }
    }
    unlandIfNeeded(cellPosition) {
        if (this.isLanded) {
            this.unland(cellPosition);
        }
    }
    setShadowVisible(value) {
        this.shadow.alpha = value ? 0.5 : 0;
    }
    loadRotation(rotation) {
        this.anims[rotation].play(ANIM_SPEED, true, false);
        this.shadow.loadRotation(rotation);
    }
    land(position) {
        this.isLanded = true;
        this.shadow.land(position);
        this.game.add.tween(this).to({
            x: position.x,
            y: position.y,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
    unland(cellPosition) {
        this.isLanded = false;
        this.shadow.unland(cellPosition);
        this.game.add.tween(this).to({
            x: Cell_1.Cell.cellToReal(cellPosition.x),
            y: Cell_1.Cell.cellToReal(cellPosition.y),
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
}
exports.OrcaSprite = OrcaSprite;
class OrcaSpriteShadow extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'CptrShd1');
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.anims = [];
        for (let i = 0; i < 8; i++) {
            this.anims.push(this.animations.add('toto', [i, 8 + i, 16 + i, 24 + i]));
        }
        this.alpha = 0.5;
        this.loadRotation(Rotation_1.ROTATION.RIGHT);
    }
    loadRotation(rotation) {
        this.anims[rotation].play(ANIM_SPEED, true, false);
    }
    land(position) {
        this.game.add.tween(this).to({
            x: position.x,
            y: position.y,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
    unland(cellPosition) {
        const goalX = Cell_1.Cell.cellToReal(cellPosition.x) + GAP_X;
        const goalY = Cell_1.Cell.cellToReal(cellPosition.y) + GAP_Y;
        this.game.add.tween(this).to({
            x: goalX,
            y: goalY,
        }, Orca_1.UNLAND_TIME * Phaser.Timer.SECOND, Phaser.Easing.Power0, true);
    }
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class PowerPlantSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 11, 10, 9, 8, 5, 4, 3, 2, 1]);
        this.animationElec.play(10, true, false);
    }
}
exports.PowerPlantSprite = PowerPlantSprite;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = __webpack_require__(9);
const SQUARE_SIZE = 4;
class ShotCounter extends Phaser.Graphics {
    constructor(game, max) {
        super(game, 0, 0);
        this.game.add.existing(this);
        this.max = max;
        this.isVisible = false;
        this.counter = max;
        this.render();
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(null);
            this.beginFill(0x00ff00, 1);
            for (let i = 0; i < this.counter; i++) {
                this.drawRect(Ground_1.GROUND_SIZE / 2 - i * SQUARE_SIZE, Ground_1.GROUND_SIZE / 2, -SQUARE_SIZE, SQUARE_SIZE);
            }
            this.endFill();
            this.lineStyle(1, 0xffffff, 1);
            for (let i = 0; i < this.max; i++) {
                this.drawRect(Ground_1.GROUND_SIZE / 2 - i * SQUARE_SIZE, Ground_1.GROUND_SIZE / 2, -SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
    updateCounter(counter) {
        this.counter = counter;
        this.render();
    }
}
exports.ShotCounter = ShotCounter;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class TiberiumRefinerySprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [4, 5, 8, 9, 10, 9, 8, 5]);
        this.animationPump = this.animations.add('toto', [0, 1, 2, 3, 2, 1]);
        this.animationPump.play(5, true, false);
    }
    runUnloadAnimation() {
        let animation = this.animationElec.play(10, false, false);
        animation.onComplete.add(() => {
            this.animationPump.play(5, true, false);
        });
    }
}
exports.TiberiumRefinerySprite = TiberiumRefinerySprite;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = __webpack_require__(7);
class WeaponsFactorySprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 6, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 6, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 6, 5 / 6);
        let animationOpen = this.animations.add('toto', [5, 6, 7]);
        animationOpen.play(10, true, false);
    }
}
exports.WeaponsFactorySprite = WeaponsFactorySprite;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Attack_1 = __webpack_require__(30);
const Distance_1 = __webpack_require__(3);
class AttackReload extends Attack_1.Attack {
    run() {
        if (this.unit.isOnHelipad()) {
            if (this.unit.isFullyReloaded()) {
                super.run();
            }
            else {
                this.unit.reload();
            }
        }
        else if (this.unit.canShoot()) {
            super.run();
        }
        else {
            const closestHelipad = this.getClosestHelipad();
            if (closestHelipad) {
                const closestPoint = Distance_1.Distance.getClosestPosition(this.unit.getCellPositions()[0], closestHelipad.getCellPositions());
                this.unit.moveTowards(closestPoint);
            }
        }
    }
    getClosestHelipad() {
        return this.worldKnowledge.getPlayerArmies(this.unit.getPlayer(), 'Helipad').filter((helipad) => {
            return !helipad.isLoading();
        })[0];
    }
}
exports.AttackReload = AttackReload;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = __webpack_require__(6);
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
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.unit.isOnGround() ?
            this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
            this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Follow = Follow;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(14);
const AlternativePosition_1 = __webpack_require__(6);
class Harvest {
    constructor(worldKnowledge, harvester, source) {
        this.worldKnowledge = worldKnowledge;
        this.harvester = harvester;
        this.source = source;
    }
    getNextStep() {
        if (null === this.harvester.getClosestRefinery()) {
            return new Stand_1.Stand(this.harvester);
        }
        if (this.source.isEmpty() && !this.harvester.isLoaded()) {
            return new Stand_1.Stand(this.harvester);
        }
        return this;
    }
    run() {
        if (this.harvester.isFull()) {
            this.goToBaseAndUnload();
        }
        else {
            const closestPlant = this.harvester.getClosestPlant(this.source);
            if (!closestPlant) {
                this.goToBaseAndUnload();
            }
            else {
                if (this.isArrivedToPlant(closestPlant)) {
                    this.harvester.load(closestPlant);
                }
                else {
                    this.harvester.moveTowards(closestPlant.getCellPositions()[0]);
                }
            }
        }
    }
    goToBaseAndUnload() {
        const closestRefinery = this.harvester.getClosestRefinery();
        if (null !== closestRefinery) {
            if (this.isArrivedToRefinery(closestRefinery)) {
                this.harvester.unload(closestRefinery);
            }
            else {
                this.harvester.moveTowards(new PIXI.Point(closestRefinery.getCellPositions()[0].x + 1, closestRefinery.getCellPositions()[0].y + 1));
            }
        }
    }
    isArrivedToPlant(plant) {
        return plant.getCellPositions()[0].x === this.harvester.getCellPositions()[0].x &&
            plant.getCellPositions()[0].y === this.harvester.getCellPositions()[0].y;
    }
    isArrivedToRefinery(refinery) {
        return AlternativePosition_1.AlternativePosition.isArrived(refinery.getCellPositions()[0], this.harvester.getCellPositions()[0], this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Harvest = Harvest;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MoveTo_1 = __webpack_require__(31);
class MoveAttack extends MoveTo_1.MoveTo {
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable && this.unit.canShoot()) {
            this.unit.shoot(shootable);
        }
        else {
            this.unit.moveTowards(this.goal);
        }
    }
}
exports.MoveAttack = MoveAttack;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __webpack_require__(14);
const Distance_1 = __webpack_require__(3);
class Reload {
    constructor(orca, helipad) {
        this.orca = orca;
        this.helipad = helipad;
    }
    getNextStep() {
        if (this.orca.isFullyReloaded()) {
            return new Stand_1.Stand(this.orca);
        }
        return this;
    }
    run() {
        if (this.orca.getCurrentHelipad() !== this.helipad) {
            const closestHelipadPoint = Distance_1.Distance.getClosestPosition(this.orca.getCellPositions()[0], this.helipad.getCellPositions());
            this.orca.moveTowards(closestHelipadPoint);
        }
        else {
            if (!this.orca.isFullyReloaded()) {
                this.orca.reload();
            }
        }
    }
}
exports.Reload = Reload;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
class Grenadier extends Unit_1.Unit {
}
exports.Grenadier = Grenadier;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
class HummVee extends Unit_1.Unit {
}
exports.HummVee = HummVee;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
class MediumTank extends Unit_1.Unit {
}
exports.MediumTank = MediumTank;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
class MinigunInfantry extends Unit_1.Unit {
}
exports.MinigunInfantry = MinigunInfantry;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __webpack_require__(4);
const Rotation_1 = __webpack_require__(11);
const Cell_1 = __webpack_require__(1);
class RocketSoldier extends Unit_1.Unit {
    getShootSource(cellDest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellDest.x - this.cellPosition.x, cellDest.y - this.cellPosition.y));
        const angle = rotation / 8 * 2 * Math.PI;
        const dist = 12;
        return new PIXI.Point(Cell_1.Cell.cellToReal(this.cellPosition.x) + Math.cos(angle) * dist, Cell_1.Cell.cellToReal(this.cellPosition.y) - Math.sin(angle) * dist);
    }
}
exports.RocketSoldier = RocketSoldier;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })
/******/ ]);