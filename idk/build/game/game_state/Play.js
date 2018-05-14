"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorldKnowledge_1 = require("../WorldKnowledge");
const app_1 = require("../../app");
const UserInterface_1 = require("../user_interface/UserInterface");
const PositionTransformer_1 = require("../PositionTransformer");
const Infobox_1 = require("../user_interface/Infobox");
exports.GROUP_FLOOR = 'floor';
exports.GROUP_OBJECTS_AND_HUMANS = 'objects_and_humans';
exports.GROUP_INFOS = 'infos';
exports.GROUP_INTERFACE = 'interface';
exports.GROUP_TOOLTIP = 'tooltip';
exports.CAMERA_GAP = 2;
class Play extends Phaser.State {
    // private isPaused: boolean;
    constructor() {
        super();
        this.worldKnowledge = new WorldKnowledge_1.WorldKnowledge();
        this.userInterface = new UserInterface_1.UserInterface(this.worldKnowledge);
        this.worldKnowledge.setUserInterface(this.userInterface);
        // this.isPaused = false;
    }
    create() {
        // this.game.stage.disableVisibilityChange = true;
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
        const gapLeft = -(WorldKnowledge_1.GRID_WIDTH - WorldKnowledge_1.GRID_HEIGHT) * PositionTransformer_1.CELL_HEIGHT / 2;
        this.game.world.setBounds(gapLeft, 0, app_1.WORLD_WIDTH + 110, app_1.WORLD_HEIGHT);
        this.game.camera.setPosition((app_1.WORLD_WIDTH - app_1.CAMERA_WIDTH_PIXELS) / 2, (app_1.WORLD_HEIGHT - app_1.CAMERA_HEIGHT_PIXELS) / 2);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        // const text = this.game.add.bitmapText(CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + 60, 2, 'retro_computer','Bitmap Fonts!',7, this.groups[GROUP_INTERFACE]);
        const infobox = new Infobox_1.InfoBox('Welcome!', [
            'Welcome to Office Tycoon!',
            '',
            'You are in charge of the recruitment to run',
            'your business.',
            'Complete your goals for each level and you will',
            'gain new people, new objects for your employees!',
            'Be careful of the health of your employees, the',
            'better they are, the better they work.'
        ], 'OK, let\'s go!');
        infobox.create(this.game, this.groups);
        this.worldKnowledge.selectFirstHuman();
    }
    update(game) {
        this.groups[exports.GROUP_OBJECTS_AND_HUMANS].sort('y', Phaser.Group.SORT_ASCENDING);
        this.worldKnowledge.update();
        this.userInterface.update();
        // if (this.pauseKey.isDown && this.pauseKey.justDown) {
        //     if (this.isPaused) {
        //         this.game.time.events.resume();
        //         this.isPaused = false;
        //         this.game.stage.backgroundColor = "#494947";
        //         this.worldKnowledge.resume();
        //         this.game.tweens.resumeAll();
        //     } else {
        //         this.game.time.events.pause();
        //         this.isPaused = true;
        //         this.game.stage.backgroundColor = "#ffffff";
        //         this.worldKnowledge.pause();
        //         this.game.tweens.pauseAll();
        //     }
        // }
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
            this.game.camera.width = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
            this.game.camera.follow(selected, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
        else {
            this.game.camera.unfollow();
        }
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map