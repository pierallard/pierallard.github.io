"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("./game_state/Play");
const Unit_1 = require("./unit/Unit");
const Cell_1 = require("./computing/Cell");
const app_1 = require("../app");
const UserInterface_1 = require("./interface/UserInterface");
const MCV_1 = require("./unit/MCV");
const UnitProperties_1 = require("./unit/UnitProperties");
const Orca_1 = require("./unit/Orca");
const Helipad_1 = require("./building/Helipad");
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
//# sourceMappingURL=Custor.js.map