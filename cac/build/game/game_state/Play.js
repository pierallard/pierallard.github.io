"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = require("../map/WorldKnowledge");
const UserInterface_1 = require("../interface/UserInterface");
const MCV_1 = require("../unit/MCV");
const HumanPlayer_1 = require("../player/HumanPlayer");
const ComputerPlayer_1 = require("../player/ComputerPlayer");
const GeneratedGround_1 = require("../map/GeneratedGround");
const TiberiumSource_1 = require("../building/TiberiumSource");
const AlternativePosition_1 = require("../computing/AlternativePosition");
exports._DEBUG_FAST_CONSTRUCT = true;
exports.SCALE = 1.2;
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
//# sourceMappingURL=Play.js.map