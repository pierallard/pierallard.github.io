"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Baby_1 = require("../Baby");
const Inventory_1 = require("../Inventory");
const VerbRepository_1 = require("../verbs/VerbRepository");
const Scene_1 = require("../groups/Scene");
const Sentence_1 = require("../Sentence");
const GarageDoor_1 = require("../scene_objects/GarageDoor");
const BedroomDoor_1 = require("../scene_objects/BedroomDoor");
const ActionManager_1 = require("../actions/ActionManager");
const Cursor_1 = require("../Cursor");
const LocaleSwitcher_1 = require("../LocaleSwitcher");
const SoundSwitcher_1 = require("../SoundSwitcher");
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
//# sourceMappingURL=Play.js.map