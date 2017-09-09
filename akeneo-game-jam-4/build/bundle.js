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
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>
/// <reference path="../lib/beepbox_synth.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(53);
const Preload_1 = __webpack_require__(55);
const Play_1 = __webpack_require__(54);
class SimpleGame extends Phaser.Game {
    constructor() {
        super(SimpleGame.WIDTH, SimpleGame.HEIGHT, Phaser.CANVAS, 'content', null, false, false);
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
SimpleGame.WIDTH = 800;
SimpleGame.HEIGHT = 456;
SimpleGame.SCALE = 4;
exports.SimpleGame = SimpleGame;
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = __webpack_require__(3);
const Verb_1 = __webpack_require__(9);
const TalkAction_1 = __webpack_require__(4);
const InteractiveObject_1 = __webpack_require__(22);
const Translator_1 = __webpack_require__(2);
class SceneObject extends InteractiveObject_1.InteractiveObject {
    constructor(play, identifier, x, y, key) {
        super(play);
        this.setSprite(new Phaser.Sprite(play.game, x, y, key));
        this.identifier = identifier;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.executeVerb, this);
        this.sprite.events.onInputOver.add(this.mouseOver, this);
        this.sprite.events.onInputOut.add(this.mouseOut, this);
        this.shouldDetach = true;
    }
    getIdentifier() {
        return this.identifier;
    }
    display() {
        this.sprite.visible = true;
    }
    mouseOver() {
        if (null !== this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setSecondaryObject(this);
        }
        else {
            this.play.getSentence().setObject(this);
        }
    }
    mouseOut() {
        if (!this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setObject(null);
        }
        this.play.getSentence().setSecondaryObject(null);
    }
    executeVerb(ignore, pointer) {
        let actions = [];
        if (!this.play.getActionManager().hasAction()) {
            switch (this.play.getCurrentVerb()) {
                case Verb_1.Verb.WALK_TO:
                    actions = this.walkTo(this, pointer);
                    break;
                case Verb_1.Verb.PICK_UP:
                    actions = this.pickUp(this, pointer);
                    break;
                case Verb_1.Verb.USE:
                    actions = this.use(this, pointer);
                    break;
                case Verb_1.Verb.LOOK_AT:
                    actions = this.lookAt(this, pointer);
                    break;
            }
            this.play.getActionManager().addActions(actions);
            if (this.shouldDetach) {
                this.play.getCursor().detach();
            }
        }
    }
    walkTo(origin, pointer) {
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x)
        ];
    }
    pickUp(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_pick_up');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)])
        ];
    }
    use(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_use');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)])
        ];
    }
    lookAt(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_look_at');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)]),
        ];
    }
    getLabel() {
        return Translator_1.Translator.t('scene.' + this.getIdentifier() + '.label');
    }
    getSprite() {
        return this.sprite;
    }
}
exports.SceneObject = SceneObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FileLoader_1 = __webpack_require__(56);
class Translator {
    static setLocale(locale) {
        this.locale = locale;
    }
    static initialize() {
        this.translations = [];
        FileLoader_1.getContent("translations/fr.json", data => {
            this.translations['fr'] = data;
        });
        FileLoader_1.getContent("translations/en.json", data => {
            this.translations['en'] = data;
        });
        FileLoader_1.getContent("translations/es.json", data => {
            this.translations['es'] = data;
        });
    }
    static t(key) {
        key = this.locale + '.' + key;
        let result = key;
        try {
            result = key.split('.').reduce((tree, key) => tree[key], this.translations);
        }
        catch (e) {
            console.log('Missing translation: "' + result + '"');
        }
        if (undefined === result) {
            return key;
        }
        return result;
    }
}
Translator.locale = 'fr';
exports.Translator = Translator;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
const app_1 = __webpack_require__(0);
const Baby_1 = __webpack_require__(21);
const LIMIT_CAMERA = 350;
class MoveAction extends Action_1.Action {
    constructor(play, goalX) {
        super(play);
        this.goalX = goalX;
    }
    execute() {
        let babyPosition = this.play.getBaby().getWorldPosition().x;
        if (babyPosition <= LIMIT_CAMERA) {
            let diff = LIMIT_CAMERA - babyPosition;
            if (this.play.getScene().getPosition().x + diff > MoveAction.leftBorder) {
                diff = -this.play.getScene().getPosition().x + MoveAction.leftBorder;
            }
            diff = Math.max(diff, -Baby_1.Baby.BABY_SPEED);
            this.play.getScene().getPosition().x += diff;
            this.goalX += diff;
        }
        else if (babyPosition >= app_1.SimpleGame.WIDTH - LIMIT_CAMERA) {
            let diff = (app_1.SimpleGame.WIDTH - LIMIT_CAMERA) - babyPosition;
            if (this.play.getScene().getPosition().x + diff < MoveAction.rightBorder) {
                diff = -this.play.getScene().getPosition().x + MoveAction.rightBorder;
            }
            diff = Math.max(diff, -Baby_1.Baby.BABY_SPEED);
            this.play.getScene().setPositionX(this.play.getScene().getPosition().x + diff);
            this.goalX += diff;
        }
        return this.play.getBaby().updatePosition(this.goalX - this.play.getScene().getPosition().x);
    }
    debugText() {
        return 'Move to ' + this.goalX;
    }
    static getLimitsCenter() {
        return (MoveAction.leftBorder + MoveAction.rightBorder) / 2;
    }
    static setLeftBorder(number) {
        this.leftBorder = number;
    }
    static setRightBorder(number) {
        this.rightBorder = number;
    }
}
MoveAction.leftBorder = -(612 + 20);
MoveAction.rightBorder = -(1036 - 20);
exports.MoveAction = MoveAction;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
const app_1 = __webpack_require__(0);
const DIALOG_WIDTH = 400;
class TalkAction extends Action_1.Action {
    constructor(play, source, text) {
        super(play);
        this.source = source;
        this.text = text;
        this.timing = Math.round(50 + 110 / 68 * this.text.length);
        this.textSprite = null;
    }
    execute() {
        if (null !== this.textSprite) {
            if (this.text.length) {
                this.textSprite.text = this.textSprite.text + this.text.charAt(0);
                this.text = this.text.substr(1);
                return false;
            }
            else {
                if (this.timing > 0) {
                    this.timing--;
                    return false;
                }
                this.textSprite.destroy();
            }
            return true;
        }
        else {
            let style = {
                font: "32px 3dventuremedium",
                align: "center",
                wordWrapWidth: DIALOG_WIDTH,
                wordWrap: true,
                stroke: this.source.getStroke(),
                strokeThickness: 20,
            };
            let x = this.source.getWorldPosition().x;
            if (x < DIALOG_WIDTH / 2) {
                x = DIALOG_WIDTH / 2;
            }
            else if (x > app_1.SimpleGame.WIDTH - DIALOG_WIDTH / 2) {
                x = app_1.SimpleGame.WIDTH - DIALOG_WIDTH / 2;
            }
            this.textSprite = this.play.game.add.text(x, this.source.getWorldPosition().y - this.source.getHeight(), '', style);
            this.textSprite.anchor.setTo(0.5, 1);
            this.textSprite.lineSpacing = -20;
            return false;
        }
    }
    debugText() {
        return "TalkAction " + this.timing + ' "' + this.text + '"';
    }
}
exports.TalkAction = TalkAction;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TalkAction_1 = __webpack_require__(4);
const SceneObject_1 = __webpack_require__(1);
const Translator_1 = __webpack_require__(2);
class InventoryObject extends SceneObject_1.SceneObject {
    constructor(play, texture) {
        super(play, texture, 0, 0, texture);
        this.sprite.anchor.setTo(0.5);
        this.active = false;
        this.hide();
        this.shouldDetach = false;
    }
    setActive(bool) {
        this.active = bool;
    }
    walkTo(origin, pointer) {
        this.attach();
        return [];
    }
    pickUp(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), "MAIS JE L'AI DEJA, BANANE")];
    }
    use(origin, pointer) {
        let attachedObject = this.play.getCursor().getInventoryObject();
        if (null === attachedObject) {
            this.attach();
            return [];
        }
        else {
            return this.mixObjects(origin, pointer);
        }
    }
    lookAt(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), this.getDescription())];
    }
    attach() {
        this.sprite.inputEnabled = false;
        this.oldPosition = new Phaser.Point(this.sprite.position.x, this.sprite.position.y);
        this.play.getCursor().attach(this);
    }
    detach() {
        this.sprite.position.setTo(this.oldPosition.x, this.oldPosition.y);
        this.sprite.inputEnabled = true;
    }
    updatePosition(x, y) {
        this.sprite.position.setTo(x, y);
    }
    mixObjects(origin, pointer) {
        this.play.getCursor().detach();
        return super.use(origin, pointer);
    }
    getLabel() {
        return Translator_1.Translator.t('inventory.' + this.getIdentifier() + '.label');
    }
    getDescription() {
        return Translator_1.Translator.t('inventory.' + this.getIdentifier() + '.description');
    }
    setPosition(x, y) {
        this.sprite.position.setTo(x, y);
    }
    isActive() {
        return this.active;
    }
}
exports.InventoryObject = InventoryObject;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class RemoveInventoryAction extends Action_1.Action {
    constructor(play, object) {
        super(play);
        this.objectIdentifier = object;
    }
    execute() {
        this.play.getInventory().removeItem(this.objectIdentifier);
        return true;
    }
    debugText() {
        return undefined;
    }
}
exports.RemoveInventoryAction = RemoveInventoryAction;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(play) {
        this.play = play;
    }
}
exports.Action = Action;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class UpdateAction extends Action_1.Action {
    constructor(play, origin, newTexture) {
        super(play);
        this.origin = origin;
        this.newTexture = newTexture;
    }
    execute() {
        this.origin.loadTexture(this.newTexture);
        return true;
    }
    debugText() {
        return 'Update ' + this.newTexture;
    }
}
exports.UpdateAction = UpdateAction;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Translator_1 = __webpack_require__(2);
const WALK_TO = 'walk_to';
const LOOK_AT = 'look_at';
const PICK_UP = 'pick_up';
const USE = 'use';
class Verb extends Phaser.Text {
    constructor(verbRepository, game, x, y, name) {
        let style = {
            font: "28px 3dventuremedium",
            align: "center",
        };
        super(game, x, y, '', style);
        this.name_ = name;
        this.text = this.getLabel();
        this.verbRepository = verbRepository;
        this.inputEnabled = true;
        this.events.onInputDown.add(this.setCurrentVerb, this);
        this.anchor.setTo(0.5);
    }
    setCurrentVerb() {
        this.verbRepository.setCurrentVerb(this);
    }
    getName() {
        return this.name_;
    }
    static get WALK_TO() {
        return WALK_TO;
    }
    static get LOOK_AT() {
        return LOOK_AT;
    }
    static get PICK_UP() {
        return PICK_UP;
    }
    static get USE() {
        return USE;
    }
    getLabel() {
        return Translator_1.Translator.t('verbs.' + this.name_);
    }
}
exports.Verb = Verb;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class AppearAction extends Action_1.Action {
    constructor(play, objectIdentifier) {
        super(play);
        this.objectIdentifier = objectIdentifier;
    }
    execute() {
        let object = this.play.getScene().getObject(this.objectIdentifier);
        if (null !== object) {
            object.display();
        }
        return true;
    }
    debugText() {
        return 'Appear ' + this.objectIdentifier;
    }
}
exports.AppearAction = AppearAction;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class DisappearAction extends Action_1.Action {
    constructor(play, objectIdentifier, object = null) {
        super(play);
        this.objectIdentifier = objectIdentifier;
        this.object = object;
    }
    execute() {
        let object = this.object;
        if (null === object) {
            object = this.play.getScene().getObject(this.objectIdentifier);
        }
        if (null !== object) {
            object.hide();
        }
        return true;
    }
    debugText() {
        return 'Appear ' + this.objectIdentifier;
    }
}
exports.DisappearAction = DisappearAction;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const app_1 = __webpack_require__(0);
class Father extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Father.IDENTIFIER, 400 * app_1.SimpleGame.SCALE, 65 * app_1.SimpleGame.SCALE, 'father');
        this.busy = false;
        this.sprite.anchor.setTo(0, 1);
    }
    setBusy() {
        this.busy = true;
        this.sprite.loadTexture('fatherBusy');
    }
    static get IDENTIFIER() {
        return 'father';
    }
    isBusy() {
        return this.busy;
    }
    getStroke() {
        return '#d95763';
    }
}
exports.Father = Father;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class AddInventoryAction extends Action_1.Action {
    constructor(play, objectIndentifier) {
        super(play);
        this.objectIdentifier = objectIndentifier;
    }
    execute() {
        this.play.getInventory().activeItem(this.objectIdentifier);
        return true;
    }
    debugText() {
        return undefined;
    }
}
exports.AddInventoryAction = AddInventoryAction;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const ZippoSec_1 = __webpack_require__(30);
class BouteilleAlcool extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, BouteilleAlcool.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === ZippoSec_1.ZippoSec.IDENTIFIER) {
            this.play.getInventory().activeItem('zippo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'bouteille';
    }
}
exports.BouteilleAlcool = BouteilleAlcool;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Battery_1 = __webpack_require__(23);
class Lamp extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Lamp.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Battery_1.Battery.IDENTIFIER) {
            this.play.getInventory().activeItem('lampePiles');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'neon';
    }
}
exports.Lamp = Lamp;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Lamp_1 = __webpack_require__(15);
const Couteau_1 = __webpack_require__(25);
const TalkAction_1 = __webpack_require__(4);
class Rallonge extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Rallonge.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Couteau_1.Couteau.IDENTIFIER) {
            this.play.getInventory().activeItem('rallongecoupee');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp_1.Lamp.IDENTIFIER) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), "C'est une lampe 12V, pas 220V")];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'rallonge';
    }
}
exports.Rallonge = Rallonge;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Lexomil_1 = __webpack_require__(27);
class Steak extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Steak.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lexomil_1.Lexomil.IDENTIFIER) {
            this.play.getInventory().activeItem('steaklexomil');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'steak';
    }
}
exports.Steak = Steak;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class BedroomDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, BedroomDoor.IDENTIFIER, 441 * app_1.SimpleGame.SCALE, 11 * app_1.SimpleGame.SCALE, 'porteChambre');
        this.open = false;
    }
    use(origin, pointer) {
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bedroomDoor.default_use'))
            ];
        }
        return super.use(origin, pointer);
    }
    doOpen() {
        this.open = true;
        this.sprite.loadTexture('porteChambreOpen');
        MoveAction_1.MoveAction.setRightBorder(-1556);
    }
    static get IDENTIFIER() {
        return 'bedroomDoor';
    }
}
exports.BedroomDoor = BedroomDoor;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const app_1 = __webpack_require__(0);
class Dog extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Dog.IDENTIFIER, 184 * app_1.SimpleGame.SCALE, 47 * app_1.SimpleGame.SCALE, 'chien');
    }
    static get IDENTIFIER() {
        return 'dog';
    }
    getStroke() {
        return '#eec39a';
    }
}
exports.Dog = Dog;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const Dog_1 = __webpack_require__(19);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class GarageDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, GarageDoor.IDENTIFIER, 158 * app_1.SimpleGame.SCALE, 11 * app_1.SimpleGame.SCALE, 'porteGarage');
        this.open = false;
    }
    use(origin, pointer) {
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.porteGarage.dog')),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteGarage.baby'))
            ];
        }
        return super.use(origin, pointer);
    }
    doOpen() {
        this.open = true;
        this.loadTexture('porteGarageOpen');
        MoveAction_1.MoveAction.setLeftBorder(0);
    }
    static get IDENTIFIER() {
        return 'porteGarage';
    }
}
exports.GarageDoor = GarageDoor;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InteractiveObject_1 = __webpack_require__(22);
const app_1 = __webpack_require__(0);
const BABY_SPEED = 3;
class Baby extends InteractiveObject_1.InteractiveObject {
    constructor(play) {
        super(play);
        this.walking = false;
        this.walkingSprite = new Phaser.Sprite(play.game, 1200, 66 * app_1.SimpleGame.SCALE, 'babyanim');
        this.walkingSprite.scale.setTo(app_1.SimpleGame.SCALE);
        this.walkingSprite.anchor.x = 0.5;
        this.walkingSprite.anchor.y = 1;
        this.walkingSprite.animations.add('walk');
        this.walkingSprite.visible = false;
        this.setSprite(new Phaser.Sprite(play.game, 1200, 66 * app_1.SimpleGame.SCALE, 'baby'));
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
    }
    updatePosition(goalX) {
        let diff = goalX - this.sprite.position.x;
        if (Math.abs(diff) <= BABY_SPEED) {
            this.sprite.position.setTo(goalX, this.sprite.position.y);
            this.walkingSprite.position.setTo(goalX, this.sprite.position.y);
            this.walking = false;
            this.sprite.visible = true;
            this.sprite.scale.x = (diff > 0) ? app_1.SimpleGame.SCALE : -app_1.SimpleGame.SCALE;
            this.walkingSprite.visible = false;
            return true;
        }
        if (!this.walking) {
            this.walking = true;
            this.sprite.visible = false;
            this.walkingSprite.visible = true;
            this.walkingSprite.animations.play('walk', 15, true);
        }
        if (this.walking) {
            this.walkingSprite.scale.x = (diff > 0) ? -app_1.SimpleGame.SCALE : app_1.SimpleGame.SCALE;
        }
        else {
            this.sprite.scale.x = (diff > 0) ? app_1.SimpleGame.SCALE : -app_1.SimpleGame.SCALE;
        }
        let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
        let newPos = this.sprite.position.x + vector;
        this.sprite.position.setTo(newPos, this.sprite.position.y);
        this.walkingSprite.position.setTo(newPos, this.walkingSprite.position.y);
        return false;
    }
    static get BABY_SPEED() {
        return BABY_SPEED;
    }
    getStroke() {
        return '#ffffff';
    }
    getSprites() {
        return [this.sprite, this.walkingSprite];
    }
    getWorldPosition() {
        if (this.walking) {
            return this.walkingSprite.worldPosition;
        }
        else {
            return this.sprite.worldPosition;
        }
    }
}
exports.Baby = Baby;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(0);
class InteractiveObject {
    constructor(play) {
        this.play = play;
    }
    setSprite(sprite) {
        this.sprite = sprite;
        this.sprite.scale.setTo(app_1.SimpleGame.SCALE);
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 0;
    }
    getStroke() {
        throw 'getStroke should be implemented';
    }
    getWorldPosition() {
        return this.sprite.worldPosition;
    }
    getPosition() {
        return this.sprite.position;
    }
    getHeight() {
        return this.sprite.height;
    }
    destroy() {
        this.sprite.destroy();
    }
    loadTexture(newTexture) {
        this.sprite.loadTexture(newTexture);
        this.sprite.update();
    }
    hide() {
        this.sprite.visible = false;
    }
}
exports.InteractiveObject = InteractiveObject;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Lamp_1 = __webpack_require__(15);
class Battery extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Battery.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp_1.Lamp.IDENTIFIER) {
            this.play.getInventory().activeItem('lampePiles');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'piles';
    }
}
exports.Battery = Battery;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Tabac_1 = __webpack_require__(28);
class Cannabis extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Cannabis.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Tabac_1.Tabac.IDENTIFIER) {
            this.play.getInventory().activeItem('tabacbeuh');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'cannabis';
    }
}
exports.Cannabis = Cannabis;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Rallonge_1 = __webpack_require__(16);
class Couteau extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Couteau.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Rallonge_1.Rallonge.IDENTIFIER) {
            this.play.getInventory().activeItem('rallongecoupee');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'knife';
    }
}
exports.Couteau = Couteau;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const TabacBeuh_1 = __webpack_require__(29);
class Feuilles extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Feuilles.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === TabacBeuh_1.TabacBeuh.IDENTIFIER) {
            this.play.getInventory().activeItem('bedo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'feuilles';
    }
}
exports.Feuilles = Feuilles;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Steak_1 = __webpack_require__(17);
class Lexomil extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Lexomil.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Steak_1.Steak.IDENTIFIER) {
            this.play.getInventory().activeItem('steaklexomil');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'lexomil';
    }
}
exports.Lexomil = Lexomil;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Cannabis_1 = __webpack_require__(24);
class Tabac extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Tabac.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Cannabis_1.Cannabis.IDENTIFIER) {
            this.play.getInventory().activeItem('tabacbeuh');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'tabac';
    }
}
exports.Tabac = Tabac;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const Feuilles_1 = __webpack_require__(26);
class TabacBeuh extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, TabacBeuh.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Feuilles_1.Feuilles.IDENTIFIER) {
            this.play.getInventory().activeItem('bedo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'tabacbeuh';
    }
}
exports.TabacBeuh = TabacBeuh;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = __webpack_require__(5);
const BouteilleAlcool_1 = __webpack_require__(14);
class ZippoSec extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, ZippoSec.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === BouteilleAlcool_1.BouteilleAlcool.IDENTIFIER) {
            this.play.getInventory().activeItem('zippo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'zipposec';
    }
}
exports.ZippoSec = ZippoSec;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const app_1 = __webpack_require__(0);
class FinalAnim extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, FinalAnim.IDENTIFIER, 200, 0, 'baby');
        this.setSprite(new Phaser.Sprite(play.game, 352 * app_1.SimpleGame.SCALE, 16 * app_1.SimpleGame.SCALE, 'caranim'));
        this.sprite.animations.add('a');
        this.hide();
    }
    display() {
        super.display();
        this.sprite.animations.play('a', 15, false);
    }
    static get IDENTIFIER() {
        return 'finalanim';
    }
}
exports.FinalAnim = FinalAnim;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const RemoveInventoryAction_1 = __webpack_require__(6);
const AddInventoryAction_1 = __webpack_require__(13);
const TalkAction_1 = __webpack_require__(4);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Four extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Four.IDENTIFIER, 233 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'four');
        this.on = false;
    }
    lookAt(origin, pointer) {
        if (!this.on) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.look_off'))];
        }
        return super.lookAt(origin, pointer);
    }
    use(origin, pointer) {
        if (!this.on) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.use_off'))];
        }
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'gode') {
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new AddInventoryAction_1.AddInventoryAction(this.play, 'piles'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.success')),
                ];
            }
        }
        return super.use(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'four';
    }
    doOn() {
        this.on = true;
    }
}
exports.Four = Four;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const RemoveInventoryAction_1 = __webpack_require__(6);
const UpdateAction_1 = __webpack_require__(8);
const TalkAction_1 = __webpack_require__(4);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Mother extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Mother.IDENTIFIER, 323 * app_1.SimpleGame.SCALE, 66 * app_1.SimpleGame.SCALE, 'mother');
        this.zippo = false;
        this.bedo = false;
        this.sprite.anchor.setTo(0, 1);
    }
    isDefoncee() {
        return this.zippo && this.bedo;
    }
    static get IDENTIFIER() {
        return 'mother';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'bedo') {
                this.bedo = true;
                let result = [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
                ];
                if (!this.zippo) {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.bedo')));
                }
                else {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.success')), new UpdateAction_1.UpdateAction(this.play, this, 'motherdefoncee'));
                }
                return result;
            }
            if (object.getIdentifier() === 'zippo') {
                this.zippo = true;
                let result = [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
                ];
                if (!this.bedo) {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.zippo')));
                }
                else {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.success')), new UpdateAction_1.UpdateAction(this.play, this, 'motherdefoncee'));
                }
                return result;
            }
        }
        return super.use(origin, pointer);
    }
    lookAt(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.mother.description'))];
    }
    getStroke() {
        return '#d77bba';
    }
}
exports.Mother = Mother;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = __webpack_require__(9);
const app_1 = __webpack_require__(0);
class Cursor extends Phaser.Sprite {
    constructor(play_) {
        super(play_.game, 0, 0, 'cursor');
        this.play_ = play_;
        this.anchor.setTo(0.5);
        this.scale.setTo(app_1.SimpleGame.SCALE);
        this.inventoryObject = null;
        play_.game.add.existing(this);
    }
    update() {
        let position = this.game.input.mousePointer;
        let positionX = Math.round(position.worldX / app_1.SimpleGame.SCALE) * app_1.SimpleGame.SCALE + 2;
        let positionY = Math.round(position.worldY / app_1.SimpleGame.SCALE) * app_1.SimpleGame.SCALE + 2;
        this.position.set(positionX, positionY);
        if (this.inventoryObject) {
            this.inventoryObject.updatePosition(positionX, positionY);
        }
    }
    attach(inventoryObject) {
        if (null !== this.inventoryObject) {
            this.detach();
        }
        this.play_.getVerbRepository().setCurrentVerbName(Verb_1.Verb.USE);
        this.play_.getSentence().setObject(inventoryObject);
        this.inventoryObject = inventoryObject;
    }
    detach() {
        if (null !== this.inventoryObject) {
            this.inventoryObject.detach();
            this.inventoryObject = null;
            this.play_.getVerbRepository().setCurrentVerbName(Verb_1.Verb.WALK_TO);
        }
    }
    getInventoryObject() {
        return this.inventoryObject;
    }
}
exports.Cursor = Cursor;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(0);
const InventoryObject_1 = __webpack_require__(5);
const Steak_1 = __webpack_require__(17);
const Lexomil_1 = __webpack_require__(27);
const Battery_1 = __webpack_require__(23);
const Lamp_1 = __webpack_require__(15);
const BouteilleAlcool_1 = __webpack_require__(14);
const ZippoSec_1 = __webpack_require__(30);
const Tabac_1 = __webpack_require__(28);
const Cannabis_1 = __webpack_require__(24);
const TabacBeuh_1 = __webpack_require__(29);
const Feuilles_1 = __webpack_require__(26);
const Rallonge_1 = __webpack_require__(16);
const Couteau_1 = __webpack_require__(25);
const INVENTORY_SIZE = (16 + 8) * 4;
const COLUMNS = 4;
const LINES = 2;
class Inventory {
    constructor(play) {
        this.items = [];
        this.play = play;
        this.table = 0;
        this.page = 0;
    }
    create() {
        this.inventoryGroup = this.play.game.add.group();
        for (let i = 0; i < COLUMNS * LINES; i++) {
            let position = Inventory.getPosition(i);
            let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, 'inventory');
            sprite.scale.setTo(app_1.SimpleGame.SCALE);
            sprite.anchor.setTo(0.5);
            this.play.add.existing(sprite);
            this.inventoryGroup.add(sprite);
        }
        let top = new Phaser.Sprite(this.play.game, app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_up');
        top.scale.setTo(app_1.SimpleGame.SCALE);
        top.anchor.setTo(1, 1);
        top.inputEnabled = true;
        top.events.onInputDown.add(this.pageDown, this);
        let bottom = new Phaser.Sprite(this.play.game, app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_down');
        bottom.scale.setTo(app_1.SimpleGame.SCALE);
        bottom.anchor.setTo(1, 0);
        bottom.inputEnabled = true;
        bottom.events.onInputDown.add(this.pageUp, this);
        this.play.add.existing(top);
        this.play.add.existing(bottom);
        this.createObjects();
    }
    createObjects() {
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'icesteak'));
        this.addObject(new Steak_1.Steak(this.play));
        this.addObject(new Lexomil_1.Lexomil(this.play));
        this.addObject(new Battery_1.Battery(this.play));
        this.addObject(new Lamp_1.Lamp(this.play));
        this.addObject(new BouteilleAlcool_1.BouteilleAlcool(this.play));
        this.addObject(new ZippoSec_1.ZippoSec(this.play));
        this.addObject(new Tabac_1.Tabac(this.play));
        this.addObject(new Cannabis_1.Cannabis(this.play));
        this.addObject(new TabacBeuh_1.TabacBeuh(this.play));
        this.addObject(new Feuilles_1.Feuilles(this.play));
        this.addObject(new Rallonge_1.Rallonge(this.play));
        this.addObject(new Couteau_1.Couteau(this.play));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'bedo'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'steaklexomil'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'engrais'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'gode'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'escabeauInventory'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'perceuse'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'sachet'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'lampePiles'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'dvdporno'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'zippo'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'rallongecoupee'));
    }
    pageUp() {
        if (this.page <= 2) {
            this.page++;
            this.update();
        }
    }
    pageDown() {
        if (this.page > 0) {
            this.page--;
            this.update();
        }
    }
    addObject(object) {
        this.items.push(object);
        this.inventoryGroup.add(object.getSprite());
    }
    activeItem(identifier) {
        this.getInventoryObject(identifier).setActive(true);
        this.update();
    }
    removeItem(item) {
        if (this.play.getCursor().getInventoryObject() === item) {
            this.play.getCursor().detach();
        }
        this.items = this.items.filter(function (obj) {
            return item !== obj;
        });
        item.destroy();
        this.update();
    }
    update() {
        let i = 0;
        this.items.forEach(function (item) {
            if (item.isActive()) {
                if (Math.floor(i / (COLUMNS * LINES)) === this.page) {
                    let position = Inventory.getPosition(i);
                    item.setPosition(position.x, position.y);
                    item.display();
                }
                else {
                    item.hide();
                }
                i++;
            }
            else {
                item.hide();
            }
        }.bind(this));
    }
    static getPosition(i) {
        let x = i % (COLUMNS * LINES) % COLUMNS;
        let y = Math.floor(i % (COLUMNS * LINES) / COLUMNS);
        return new Phaser.Point(app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE + (x + 0.5) * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - LINES * INVENTORY_SIZE + (y + 0.5) * INVENTORY_SIZE);
    }
    getInventoryObject(identifier) {
        for (let i = 0; i < this.items.length; i++) {
            let object = this.items[i];
            if (object.getIdentifier() === identifier) {
                return object;
            }
        }
        return null;
    }
}
exports.Inventory = Inventory;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Translator_1 = __webpack_require__(2);
const app_1 = __webpack_require__(0);
class LocaleSwitcher {
    constructor(play) {
        this.play = play;
        this.flags = [];
    }
    create() {
        this.createFlag('en', 760, 12);
        this.createFlag('es', 710, 12);
        this.createFlag('fr', 660, 12);
    }
    createFlag(locale, x, y) {
        let flag = this.play.game.add.sprite(x, y, locale);
        flag.scale.setTo(app_1.SimpleGame.SCALE);
        flag.inputEnabled = true;
        flag.events.onInputDown.add(this.switchLocale, this);
    }
    switchLocale(origin) {
        Translator_1.Translator.setLocale(origin.key);
    }
}
exports.LocaleSwitcher = LocaleSwitcher;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Sentence extends Phaser.Text {
    constructor(game) {
        let style = {
            font: "28px 3dventuremedium",
            align: "center",
            fill: '#639bff',
            wordWrapWidth: 400 - 12 * app_1.SimpleGame.SCALE,
            wordWrap: true,
        };
        super(game, (400 - 12 * app_1.SimpleGame.SCALE) / 2, 310, '', style);
        this.object = null;
        this.verb = null;
        this.secondaryObject = null;
        this.lineSpacing = -15;
        this.game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
    }
    setObject(object) {
        this.object = object;
        this.update();
    }
    setSecondaryObject(object) {
        this.secondaryObject = object;
        this.update();
    }
    setVerb(verb) {
        this.verb = verb;
        this.update();
    }
    update() {
        let result = '';
        if (null !== this.verb) {
            result = result + this.verb.getLabel();
            if (null !== this.object) {
                result = result + ' ' + this.object.getLabel();
                if (null !== this.secondaryObject) {
                    result = result + ' ' + Translator_1.Translator.translations[Translator_1.Translator.locale]['conjunctions']['with'] + ' ' + this.secondaryObject.getLabel();
                }
            }
        }
        this.text = result;
    }
}
exports.Sentence = Sentence;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(0);
class SoundSwitcher {
    constructor(play) {
        this.play = play;
        this.synth = new beepbox.Synth("5s6kbl00e0ftbm0a7g0fj7i0r1w1111f0000d1113c0000h0000v0000o3210b000i4x8i000i4N8j000i4N4h8y80014h4h4y8x4h8y8p21SFzR8idlgqaH0Q1F3g7n0MdlgqaE0c26Oyyw2Cv430Rl3EGM0W1QzE7F7oeMK2Cv5555555dcurGqqqqqqqqqqqoiI2C9N6EzihF8WgMt5lllRgqwRRRlw0");
        this.synth.volume = 0.05;
        this.synth.play();
        this.playing = true;
    }
    create() {
        this.icon = this.play.game.add.sprite(600, 12, 'sound');
        this.icon.scale.setTo(app_1.SimpleGame.SCALE);
        this.icon.inputEnabled = true;
        this.icon.events.onInputDown.add(this.toggleSound, this);
    }
    toggleSound() {
        if (this.playing) {
            this.synth.pause();
            this.icon.loadTexture('sounddisabled');
        }
        else {
            this.synth.play();
            this.icon.loadTexture('sound');
        }
        this.playing = !this.playing;
    }
}
exports.SoundSwitcher = SoundSwitcher;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = __webpack_require__(9);
class ActionManager {
    constructor(play) {
        this.play = play;
        this.actions = [];
    }
    execute() {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
            if (!this.actions.length) {
                this.play.getVerbRepository().setCurrentVerbName(Verb_1.Verb.WALK_TO);
            }
        }
    }
    addAction(action) {
        this.addActions([action]);
    }
    addActions(actions) {
        if (this.hasAction()) {
            return;
        }
        this.actions = this.actions.concat(actions);
    }
    hasAction() {
        return this.actions.length > 0;
    }
    getActions() {
        return this.actions;
    }
}
exports.ActionManager = ActionManager;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __webpack_require__(7);
class TakeAction extends Action_1.Action {
    constructor(play, object) {
        super(play);
        this.object = object;
    }
    execute() {
        this.play.getInventory().activeItem(this.object.getGeneratedObjectIdentifier());
        this.object.destroy();
        return true;
    }
    debugText() {
        return 'Take ' + this.object;
    }
}
exports.TakeAction = TakeAction;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = __webpack_require__(3);
const Fridge_1 = __webpack_require__(47);
const Cupboard_1 = __webpack_require__(45);
const Microwave_1 = __webpack_require__(48);
const Bowl_1 = __webpack_require__(43);
const GarageDoor_1 = __webpack_require__(20);
const Dog_1 = __webpack_require__(19);
const PickableObject_1 = __webpack_require__(50);
const Chain_1 = __webpack_require__(44);
const BedroomDoor_1 = __webpack_require__(18);
const Pot_1 = __webpack_require__(51);
const Four_1 = __webpack_require__(32);
const Bouteille_1 = __webpack_require__(42);
const DVDPlayer_1 = __webpack_require__(46);
const Father_1 = __webpack_require__(12);
const Mother_1 = __webpack_require__(33);
const OutDoor_1 = __webpack_require__(49);
const Prise_1 = __webpack_require__(52);
const app_1 = __webpack_require__(0);
const Verb_1 = __webpack_require__(9);
const FinalAnim_1 = __webpack_require__(31);
class Scene {
    constructor(play) {
        this.play = play;
        this.objects = [];
        this.group = new Phaser.Group(this.play.game, null, 'Main Group');
        this.group.x = MoveAction_1.MoveAction.getLimitsCenter();
    }
    createWithBaby(baby) {
        this.play.game.add.existing(this.group);
        this.createClouds();
        let sprite = this.play.game.add.sprite(0, 0, 'background', null, this.group);
        sprite.scale.setTo(app_1.SimpleGame.SCALE);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);
        this.createObjects();
        this.group.addMultiple(baby.getSprites());
        this.createObjectSecond();
    }
    move(ignore, pointer) {
        if (this.play.getVerbRepository().getCurrentVerb().getName() === Verb_1.Verb.WALK_TO) {
            this.play.getActionManager().addAction(new MoveAction_1.MoveAction(this.play, pointer.position.x));
        }
    }
    update() {
        this.group.update();
        this.clouds.x = (this.clouds.x + 0.2) % (169 * app_1.SimpleGame.SCALE);
    }
    getPosition() {
        return this.group.position;
    }
    setPositionX(x) {
        this.group.x = x;
    }
    createClouds() {
        this.clouds = new Phaser.TileSprite(this.play.game, 0, 48, 590 * app_1.SimpleGame.SCALE, 54, 'clouds');
        this.clouds.scale = new Phaser.Point(app_1.SimpleGame.SCALE, app_1.SimpleGame.SCALE);
        this.group.add(this.clouds);
    }
    addObject(object) {
        this.group.add(object.getSprite());
        this.objects.push(object);
    }
    createObjects() {
        this.addObject(new Prise_1.Prise(this.play));
        this.addObject(new Fridge_1.Fridge(this.play));
        this.addObject(new Cupboard_1.Cupboard(this.play));
        this.addObject(new Microwave_1.Microwave(this.play));
        this.addObject(new Bowl_1.Bowl(this.play));
        this.addObject(new GarageDoor_1.GarageDoor(this.play));
        this.addObject(new Dog_1.Dog(this.play));
        this.addObject(new BedroomDoor_1.BedroomDoor(this.play));
        this.addObject(new Chain_1.Chain(this.play));
        this.addObject(new Pot_1.Pot(this.play));
        this.addObject(new Four_1.Four(this.play));
        this.addObject(new Bouteille_1.Bouteille(this.play));
        this.addObject(new Father_1.Father(this.play));
        this.addObject(new Mother_1.Mother(this.play));
        this.addObject(new OutDoor_1.OutDoor(this.play));
        this.addObject(new FinalAnim_1.FinalAnim(this.play));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'lexomil', 380 * app_1.SimpleGame.SCALE, 55 * app_1.SimpleGame.SCALE, 'lexomil', 'lexomil'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'coldMeat', 295 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'icesteak', 'icesteak', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'engrais', 270 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'engrais', 'engrais', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'feuilles', 45 * app_1.SimpleGame.SCALE, 47 * app_1.SimpleGame.SCALE, 'feuilles', 'feuilles'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'knife', 234 * app_1.SimpleGame.SCALE, 26 * app_1.SimpleGame.SCALE, 'knife', 'knife'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'neon', 42 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'neon', 'neon'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'gode', 516 * app_1.SimpleGame.SCALE, 29 * app_1.SimpleGame.SCALE, 'gode', 'gode'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'rallonge', 71 * app_1.SimpleGame.SCALE, 46 * app_1.SimpleGame.SCALE, 'rallonge', 'rallonge'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'tabac', 570 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'tabac', 'tabac'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'escabeau', 5 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'escabeau', 'escabeauInventory'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'perceuse', 89 * app_1.SimpleGame.SCALE, 30 * app_1.SimpleGame.SCALE, 'perceuse', 'perceuse'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'sachet', 395 * app_1.SimpleGame.SCALE, 51 * app_1.SimpleGame.SCALE, 'sachet', 'sachet'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'potfull', 218 * app_1.SimpleGame.SCALE, 36 * app_1.SimpleGame.SCALE, 'potfull', 'cannabis', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'zipposec', 254 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'zipposec', 'zipposec'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'dvdporno', 500 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'dvdporno', 'dvdporno'));
    }
    createObjectSecond() {
        this.addObject(new DVDPlayer_1.DVDPlayer(this.play));
        let walls = new Phaser.Sprite(this.play.game, 0, 0, 'backgroundwalls');
        walls.scale.set(app_1.SimpleGame.SCALE);
        this.group.add(walls);
    }
    getObject(objectIdentifier) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getIdentifier() === objectIdentifier) {
                return this.objects[i];
            }
        }
        return null;
    }
}
exports.Scene = Scene;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const Father_1 = __webpack_require__(12);
const AddInventoryAction_1 = __webpack_require__(13);
const BouteilleAlcool_1 = __webpack_require__(14);
const DisappearAction_1 = __webpack_require__(11);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Bouteille extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Bouteille.IDENTIFIER, 382 * app_1.SimpleGame.SCALE, 41 * app_1.SimpleGame.SCALE, 'bouteille');
    }
    pickUp(origin, pointer) {
        let father = this.play.getScene().getObject(Father_1.Father.IDENTIFIER);
        if (!father.isBusy()) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, father, Translator_1.Translator.t('scene.bouteille.father')),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bouteille.baby'))
            ];
        }
        else {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new DisappearAction_1.DisappearAction(this.play, Bouteille.IDENTIFIER),
                new AddInventoryAction_1.AddInventoryAction(this.play, BouteilleAlcool_1.BouteilleAlcool.IDENTIFIER),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bouteille.success'))
            ];
        }
    }
    static get IDENTIFIER() {
        return 'bouteille';
    }
}
exports.Bouteille = Bouteille;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const UpdateAction_1 = __webpack_require__(8);
const TalkAction_1 = __webpack_require__(4);
const RemoveInventoryAction_1 = __webpack_require__(6);
const GarageDoor_1 = __webpack_require__(20);
const Steak_1 = __webpack_require__(17);
const Dog_1 = __webpack_require__(19);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Bowl extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Bowl.IDENTIFIER, 203 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'gamelleVide');
        this.full = false;
    }
    use(origin, pointer) {
        let inventoryObject = this.play.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steaklexomil') {
                this.full = true;
                let porteGarage = this.play.getScene().getObject(GarageDoor_1.GarageDoor.IDENTIFIER);
                porteGarage.doOpen();
                return [
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog1')),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 612),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, inventoryObject),
                    new UpdateAction_1.UpdateAction(this.play, this, 'gamellePleine'),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 300),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 320),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog1')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog2')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog3')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog4')),
                    new UpdateAction_1.UpdateAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), 'dogsleep'),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog5')),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.success'))
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.use_icesteak'))];
            }
            if (inventoryObject.getIdentifier() === Steak_1.Steak.IDENTIFIER) {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.use_steak'))];
            }
        }
        return super.use(origin, pointer);
    }
    lookAt(origin, pointer) {
        if (this.full) {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.look_full')),
            ];
        }
        else {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.look_empty')),
            ];
        }
    }
    static get IDENTIFIER() {
        return 'bowl';
    }
}
exports.Bowl = Bowl;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const BedroomDoor_1 = __webpack_require__(18);
const RemoveInventoryAction_1 = __webpack_require__(6);
const TalkAction_1 = __webpack_require__(4);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Chain extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Chain.IDENTIFIER, 438 * app_1.SimpleGame.SCALE, 19 * app_1.SimpleGame.SCALE, 'chaineClose');
    }
    static get IDENTIFIER() {
        return 'chain';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'escabeauInventory') {
            this.loadTexture('chaineOpen');
            let porteChambre = this.play.getScene().getObject(BedroomDoor_1.BedroomDoor.IDENTIFIER);
            porteChambre.doOpen();
            return [
                new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 1100),
                new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
            ];
        }
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.chain.default_use'))];
    }
}
exports.Chain = Chain;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const UpdateAction_1 = __webpack_require__(8);
const MoveAction_1 = __webpack_require__(3);
const AppearAction_1 = __webpack_require__(10);
const app_1 = __webpack_require__(0);
class Cupboard extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Cupboard.IDENTIFIER, 270 * app_1.SimpleGame.SCALE, 43 * app_1.SimpleGame.SCALE, 'placardClose');
        this.open = false;
    }
    use(origin, pointer) {
        if (null !== this.play.getCursor().getInventoryObject()) {
            return super.use(origin, pointer);
        }
        let actions = [
            new MoveAction_1.MoveAction(this.play, pointer.position.x)
        ];
        if (this.open) {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'placardClose'));
        }
        else {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'placardOpen'));
            actions.push(new AppearAction_1.AppearAction(this.play, 'engrais'));
        }
        this.open = !this.open;
        return actions;
    }
    static get IDENTIFIER() {
        return 'cupboard';
    }
}
exports.Cupboard = Cupboard;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const RemoveInventoryAction_1 = __webpack_require__(6);
const Father_1 = __webpack_require__(12);
const app_1 = __webpack_require__(0);
class DVDPlayer extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, DVDPlayer.IDENTIFIER, 420 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'dvdplayer');
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'dvdporno') {
            let father = this.play.getScene().getObject(Father_1.Father.IDENTIFIER);
            father.setBusy();
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
            ];
        }
        return super.use(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'dvdplayer';
    }
}
exports.DVDPlayer = DVDPlayer;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const UpdateAction_1 = __webpack_require__(8);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const AppearAction_1 = __webpack_require__(10);
const DisappearAction_1 = __webpack_require__(11);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Fridge extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Fridge.IDENTIFIER, 294 * app_1.SimpleGame.SCALE, 42 * app_1.SimpleGame.SCALE, 'fridgeClose');
        this.open = false;
    }
    use(origin, pointer) {
        if (null !== this.play.getCursor().getInventoryObject()) {
            return super.use(origin, pointer);
        }
        let actions = [
            new MoveAction_1.MoveAction(this.play, pointer.position.x)
        ];
        if (this.open) {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'fridgeClose'));
            actions.push(new DisappearAction_1.DisappearAction(this.play, 'coldMeat'));
        }
        else {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'fridgeOpen'));
            actions.push(new AppearAction_1.AppearAction(this.play, 'coldMeat'));
        }
        this.open = !this.open;
        return actions;
    }
    lookAt(origin, pointer) {
        if (this.open) {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.fridge.look_open')),
            ];
        }
        else {
            return super.lookAt(origin, pointer);
        }
    }
    static get IDENTIFIER() {
        return 'fridge';
    }
}
exports.Fridge = Fridge;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const AddInventoryAction_1 = __webpack_require__(13);
const RemoveInventoryAction_1 = __webpack_require__(6);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Microwave extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Microwave.IDENTIFIER, 251 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'microOndes');
    }
    use(origin, pointer) {
        let inventoryObject = this.play.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, inventoryObject),
                    new AddInventoryAction_1.AddInventoryAction(this.play, 'steak'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.microOndes.success'))
                ];
            }
            return super.use(origin, pointer);
        }
        else {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.microOndes.default_use'))];
        }
    }
    static get IDENTIFIER() {
        return 'microOndes';
    }
}
exports.Microwave = Microwave;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const TalkAction_1 = __webpack_require__(4);
const MoveAction_1 = __webpack_require__(3);
const UpdateAction_1 = __webpack_require__(8);
const Father_1 = __webpack_require__(12);
const Mother_1 = __webpack_require__(33);
const RemoveInventoryAction_1 = __webpack_require__(6);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
const AppearAction_1 = __webpack_require__(10);
const DisappearAction_1 = __webpack_require__(11);
const FinalAnim_1 = __webpack_require__(31);
class OutDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, OutDoor.IDENTIFIER, 352 * app_1.SimpleGame.SCALE, 16 * app_1.SimpleGame.SCALE, 'porteSortie');
        this.open = false;
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'perceuse') {
            let mother = this.play.getScene().getObject(Mother_1.Mother.IDENTIFIER);
            if (mother.isDefoncee()) {
                this.doOpen();
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new UpdateAction_1.UpdateAction(this.play, this, 'porteSortieOpen')
                ];
            }
            else {
                return [
                    new TalkAction_1.TalkAction(this.play, mother, Translator_1.Translator.t('scene.porteSortie.use_close'))
                ];
            }
        }
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteSortie.is_closed'))
            ];
        }
        return super.use(origin, pointer);
    }
    walkTo(origin, pointer) {
        if (!this.open) {
            return super.walkTo(origin, pointer);
        }
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x),
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteSortie.success_baby')),
            new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Father_1.Father.IDENTIFIER), Translator_1.Translator.t('scene.porteSortie.success_father')),
            new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Mother_1.Mother.IDENTIFIER), Translator_1.Translator.t('scene.porteSortie.success_mother')),
            new AppearAction_1.AppearAction(this.play, FinalAnim_1.FinalAnim.IDENTIFIER),
            new DisappearAction_1.DisappearAction(this.play, null, this.play.getBaby())
        ];
    }
    doOpen() {
        this.open = true;
    }
    static get IDENTIFIER() {
        return 'porteSortie';
    }
}
exports.OutDoor = OutDoor;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = __webpack_require__(3);
const TakeAction_1 = __webpack_require__(40);
const SceneObject_1 = __webpack_require__(1);
class PickableObject extends SceneObject_1.SceneObject {
    constructor(play, identifier, x, y, key, generatedObjectIdentifier, display = true) {
        super(play, identifier, x, y, key);
        this.generatedObjectIdentifier = generatedObjectIdentifier;
        if (!display) {
            this.hide();
        }
    }
    getGeneratedObjectIdentifier() {
        return this.generatedObjectIdentifier;
    }
    pickUp(origin, pointer) {
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x),
            new TakeAction_1.TakeAction(this.play, origin),
        ];
    }
}
exports.PickableObject = PickableObject;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const RemoveInventoryAction_1 = __webpack_require__(6);
const UpdateAction_1 = __webpack_require__(8);
const AppearAction_1 = __webpack_require__(10);
const DisappearAction_1 = __webpack_require__(11);
const TalkAction_1 = __webpack_require__(4);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Pot extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, 'potvide', 218 * app_1.SimpleGame.SCALE, 36 * app_1.SimpleGame.SCALE, 'potvide');
        this.graines = false;
        this.lampe = false;
        this.engrais = false;
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (!this.graines) {
                if (object.getIdentifier() === 'sachet') {
                    this.graines = true;
                    return [
                        new MoveAction_1.MoveAction(this.play, pointer.position.x),
                        new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        new UpdateAction_1.UpdateAction(this.play, this, 'potgraine'),
                    ];
                }
                else {
                    return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.use_empty'))];
                }
            }
            else {
                if (object.getIdentifier() === 'lampePiles' || object.getIdentifier() === 'engrais') {
                    let result = [];
                    if (object.getIdentifier() === 'lampePiles') {
                        this.lampe = true;
                        result = result.concat([
                            new MoveAction_1.MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        ]);
                        if (this.engrais) {
                            return result.concat([
                                new AppearAction_1.AppearAction(this.play, 'potfull'),
                                new DisappearAction_1.DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        }
                        else {
                            return result.concat([
                                new UpdateAction_1.UpdateAction(this.play, this, 'potpousse'),
                            ]);
                        }
                    }
                    else if (object.getIdentifier() === 'engrais') {
                        this.engrais = true;
                        result = result.concat([
                            new MoveAction_1.MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        ]);
                        if (this.lampe) {
                            return result.concat([
                                new AppearAction_1.AppearAction(this.play, 'potfull'),
                                new DisappearAction_1.DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        }
                        else {
                            return result.concat([
                                new UpdateAction_1.UpdateAction(this.play, this, 'potpousse'),
                            ]);
                        }
                    }
                    else {
                        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.use_full'))];
                    }
                }
                else {
                    return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.default_use'))];
                }
            }
        }
        return super.use(origin, pointer);
    }
    getLabel() {
        if (!this.graines) {
            return Translator_1.Translator.t('scene.pot.label_empty');
        }
        else {
            return Translator_1.Translator.t('scene.pot.label_full');
        }
    }
}
exports.Pot = Pot;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = __webpack_require__(1);
const MoveAction_1 = __webpack_require__(3);
const RemoveInventoryAction_1 = __webpack_require__(6);
const TalkAction_1 = __webpack_require__(4);
const Four_1 = __webpack_require__(32);
const Rallonge_1 = __webpack_require__(16);
const UpdateAction_1 = __webpack_require__(8);
const app_1 = __webpack_require__(0);
const Translator_1 = __webpack_require__(2);
class Prise extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Prise.IDENTIFIER, 175 * app_1.SimpleGame.SCALE, 57 * app_1.SimpleGame.SCALE, 'prisepetee');
    }
    static get IDENTIFIER() {
        return 'prise';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === Rallonge_1.Rallonge.IDENTIFIER) {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.tip'))];
            }
            if (object.getIdentifier() === 'rallongecoupee') {
                this.loadTexture('prise');
                let four = this.play.getScene().getObject(Four_1.Four.IDENTIFIER);
                four.doOn();
                return [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 500),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new UpdateAction_1.UpdateAction(this.play, this, 'prise'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.success'))
                ];
            }
        }
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.default_use'))];
    }
}
exports.Prise = Prise;


/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Baby_1 = __webpack_require__(21);
const Inventory_1 = __webpack_require__(35);
const VerbRepository_1 = __webpack_require__(57);
const Scene_1 = __webpack_require__(41);
const Sentence_1 = __webpack_require__(37);
const GarageDoor_1 = __webpack_require__(20);
const BedroomDoor_1 = __webpack_require__(18);
const ActionManager_1 = __webpack_require__(39);
const Cursor_1 = __webpack_require__(34);
const LocaleSwitcher_1 = __webpack_require__(36);
const SoundSwitcher_1 = __webpack_require__(38);
class Play extends Phaser.State {
    constructor() {
        super();
        this.inventory = new Inventory_1.Inventory(this);
        this.actionManager = new ActionManager_1.ActionManager(this);
        this.verbRepository = new VerbRepository_1.VerbRepository(this);
        this.localeSwitcher = new LocaleSwitcher_1.LocaleSwitcher(this);
        this.soundSwitcher = new SoundSwitcher_1.SoundSwitcher(this);
        this.debug = false;
    }
    create() {
        this.scene = new Scene_1.Scene(this);
        this.sentence = new Sentence_1.Sentence(this.game);
        this.verbRepository.create();
        this.baby = new Baby_1.Baby(this);
        this.scene.createWithBaby(this.baby);
        this.localeSwitcher.create();
        this.soundSwitcher.create();
        this.inventory.create();
        this.cursor = new Cursor_1.Cursor(this);
        if (this.debug) {
            this.scene.getObject(GarageDoor_1.GarageDoor.IDENTIFIER).doOpen();
            this.scene.getObject(BedroomDoor_1.BedroomDoor.IDENTIFIER).doOpen();
        }
    }
    update() {
        this.actionManager.execute();
        this.cursor.update();
        this.verbRepository.update();
    }
    getBaby() {
        return this.baby;
    }
    getInventory() {
        return this.inventory;
    }
    getCurrentVerb() {
        return this.verbRepository.getCurrentVerb().getName();
    }
    render() {
        if (this.debug) {
            this.game.debug.text('mainGroup.x = ' + this.scene.getPosition().x, 0, 15);
            this.game.debug.text('action : ' + this.getActionManager().getActions().map(function (action) { return action.debugText(); }).join(', '), 0, 30);
            this.game.debug.text('Inventory : ' + ((null !== this.getCursor().getInventoryObject()) ? this.getCursor().getInventoryObject().getIdentifier() : 'null'), 0, 45);
        }
    }
    getScene() {
        return this.scene;
    }
    getSentence() {
        return this.sentence;
    }
    getVerbRepository() {
        return this.verbRepository;
    }
    getActionManager() {
        return this.actionManager;
    }
    getCursor() {
        return this.cursor;
    }
}
exports.default = Play;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Translator_1 = __webpack_require__(2);
class Preload extends Phaser.State {
    preload() {
        // Game
        this.game.load.image('baby', 'assets/baby.png');
        this.game.load.image('inventory', 'assets/inventory.png');
        this.game.load.image('arrow_up', 'assets/arrow_up.png');
        this.game.load.image('arrow_down', 'assets/arrow_down.png');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('backgroundwalls', 'assets/backgroundwalls.png');
        this.game.load.image('cursor', 'assets/cursor.png');
        this.game.load.image('clouds', 'assets/clouds.png');
        this.game.load.spritesheet('babyanim', 'assets/babyanim.png', 32, 32);
        this.game.load.spritesheet('caranim', 'assets/caranim.png', 23, 50);
        this.game.load.image('fr', 'assets/fr.png');
        this.game.load.image('en', 'assets/en.png');
        this.game.load.image('es', 'assets/es.png');
        this.game.load.image('sound', 'assets/sound.png');
        this.game.load.image('sounddisabled', 'assets/sounddisabled.png');
        // Scene
        this.game.load.image('fridgeClose', 'assets/fridgeClose.png');
        this.game.load.image('fridgeOpen', 'assets/fridgeOpen.png');
        this.game.load.image('placardClose', 'assets/placardClose.png');
        this.game.load.image('placardOpen', 'assets/placardOpen.png');
        this.game.load.image('microOndes', 'assets/microondes.png');
        this.game.load.image('gamelleVide', 'assets/gamelleVide.png');
        this.game.load.image('gamellePleine', 'assets/gamellePleine.png');
        this.game.load.image('porteGarage', 'assets/porteGarage.png');
        this.game.load.image('porteGarageOpen', 'assets/porteGarageOpen.png');
        this.game.load.image('porteChambre', 'assets/porteChambre.png');
        this.game.load.image('porteChambreOpen', 'assets/porteChambreOpen.png');
        this.game.load.image('chien', 'assets/chien.png');
        this.game.load.image('dogsleep', 'assets/dogsleep.png');
        this.game.load.image('chaineClose', 'assets/chaineClose.png');
        this.game.load.image('chaineOpen', 'assets/chaineOpen.png');
        this.game.load.image('prisepetee', 'assets/prisepetee.png');
        this.game.load.image('bouteille', 'assets/bouteille.png');
        this.game.load.image('potvide', 'assets/potvide.png');
        this.game.load.image('potgraine', 'assets/potgraine.png');
        this.game.load.image('potpousse', 'assets/potpousse.png');
        this.game.load.image('potfull', 'assets/potfull.png');
        this.game.load.image('four', 'assets/four.png');
        this.game.load.image('father', 'assets/father.png');
        this.game.load.image('fatherBusy', 'assets/fatherBusy.png');
        this.game.load.image('mother', 'assets/mother.png');
        this.game.load.image('motherdefoncee', 'assets/motherdefoncee.png');
        this.game.load.image('porteSortie', 'assets/porteSortie.png');
        this.game.load.image('porteSortieOpen', 'assets/porteSortieOpen.png');
        this.game.load.image('dvdplayer', 'assets/dvdplayer.png');
        this.game.load.image('prise', 'assets/prise.png');
        // Inventory
        this.game.load.image('cannabis', 'assets/cannabis.png');
        this.game.load.image('engrais', 'assets/engrais.png');
        this.game.load.image('feuilles', 'assets/feuilles.png');
        this.game.load.image('gode', 'assets/gode.png');
        this.game.load.image('icesteak', 'assets/icesteak.png');
        this.game.load.image('escabeau', 'assets/escabeau.png');
        this.game.load.image('knife', 'assets/knife.png');
        this.game.load.image('lexomil', 'assets/lexomil.png');
        this.game.load.image('neon', 'assets/neon.png');
        this.game.load.image('piles', 'assets/piles.png');
        this.game.load.image('rallonge', 'assets/rallonge.png');
        this.game.load.image('rallongecoupee', 'assets/rallongecoupee.png');
        this.game.load.image('sachet', 'assets/sachet.png');
        this.game.load.image('steak', 'assets/steak.png');
        this.game.load.image('tabac', 'assets/tabac.png');
        this.game.load.image('zippo', 'assets/zippo.png');
        this.game.load.image('zipposec', 'assets/zipposec.png');
        this.game.load.image('perceuse', 'assets/perceuse.png');
        this.game.load.image('dvdporno', 'assets/dvdporno.png');
        this.game.load.image('escabeauInventory', 'assets/escabeau.png');
        this.game.load.image('lampePiles', 'assets/lampepiles.png');
        this.game.load.image('steaklexomil', 'assets/steaklexomil.png');
        this.game.load.image('bedo', 'assets/bedo.png');
        this.game.load.image('tabacbeuh', 'assets/tabacbeuh.png');
        Translator_1.Translator.initialize();
    }
    create() {
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;
        this.game.state.start('Play');
    }
}
exports.default = Preload;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () { callback(this.responseText); };
    xhr.open('GET', url, true);
    xhr.send();
}
function getContent(url, callback) {
    getJSON(url, data => callback(JSON.parse(data)));
}
exports.getContent = getContent;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = __webpack_require__(9);
const app_1 = __webpack_require__(0);
const PANEL_WIDTH = 400 - 12 * 4;
const PANEL_HEIGHT = 100;
class VerbRepository {
    constructor(play) {
        this.items = [];
        this.play = play;
    }
    create() {
        this.items = [
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb_1.Verb.WALK_TO),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4 * 3, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb_1.Verb.LOOK_AT),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb_1.Verb.PICK_UP),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4 * 3, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb_1.Verb.USE)
        ];
        this.items.forEach(function (verb) {
            this.play.add.existing(verb);
        }.bind(this));
        this.setCurrentVerb(this.items[0]);
    }
    update() {
        this.items.forEach(function (verb, i) {
            let f = verb.style;
            f.fill = (verb === this.currentItem) ? '#639bff' : '#306082';
            verb.setStyle(f);
            verb.text = verb.getLabel();
        }.bind(this));
    }
    setCurrentVerb(verb) {
        if (false === this.play.getActionManager().hasAction()) {
            this.currentItem = verb;
            this.play.getSentence().setVerb(this.currentItem);
            this.update();
        }
    }
    getCurrentVerb() {
        return this.currentItem;
    }
    setCurrentVerbName(verbName) {
        this.setCurrentVerb(this.items.find(function (verb) {
            return verb.getName() === verbName;
        }));
    }
}
exports.VerbRepository = VerbRepository;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);