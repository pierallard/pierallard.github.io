"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = require("../map/WorldKnowledge");
const UserInterface_1 = require("../interface/UserInterface");
const MCV_1 = require("../unit/MCV");
const HumanPlayer_1 = require("../player/HumanPlayer");
const ComputerPlayer_1 = require("../player/ComputerPlayer");
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
//# sourceMappingURL=Play.js.map