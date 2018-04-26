"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = require("../WorldKnowledge");
const app_1 = require("../../app");
const UserInterface_1 = require("../user_interface/UserInterface");
exports.GROUP_FLOOR = 'floor';
exports.GROUP_OBJECTS_AND_HUMANS = 'objects_and_humans';
exports.GROUP_INFOS = 'infos';
exports.GROUP_INTERFACE = 'interface';
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
        /*
        const selected = this.worldKnowledge.getSelectedHumanSprite();
        if (null !== selected) {
            this.game.camera.follow(selected, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }*/
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map