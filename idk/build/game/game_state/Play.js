"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = require("../World");
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
    }
    update(game) {
        this.groups['noname'].sort('y', Phaser.Group.SORT_ASCENDING);
        this.worldKnowledge.update();
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map