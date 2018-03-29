"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = require("../World");
const app_1 = require("../../app");
class Play extends Phaser.State {
    constructor() {
        super();
        this.worldKnowledge = new World_1.World();
    }
    create() {
        this.game.stage.backgroundColor = "#4488AA";
        this.groups = {
            'floor': this.game.add.group(),
            'noname': this.game.add.group()
        };
        this.worldKnowledge.create(this.game, this.groups);
        this.game.world.setBounds(0, 0, app_1.WORLD_WIDTH, app_1.WORLD_HEIGHT);
        this.game.camera.setPosition((app_1.WORLD_WIDTH - app_1.CAMERA_WIDTH_PIXELS) / 2, (app_1.WORLD_HEIGHT - app_1.CAMERA_HEIGHT_PIXELS) / 2);
    }
    update(game) {
        this.groups['noname'].sort('y', Phaser.Group.SORT_ASCENDING);
        this.worldKnowledge.update();
        const selected = this.worldKnowledge.getSelectedHumanSprite();
        if (selected) {
            this.game.camera.follow(selected, Phaser.Camera.FOLLOW_LOCKON, 0.02, 0.02);
        }
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map