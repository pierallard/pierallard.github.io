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
    update() {
        this.groups['noname'].customSort((obj1, obj2) => {
            const bottom1 = obj1.y + obj1.anchor.y * obj1.height;
            const bottom2 = obj2.y + obj2.anchor.y * obj2.height;
            return bottom1 - bottom2;
        });
        this.worldKnowledge.update();
    }
}
exports.default = Play;
//# sourceMappingURL=Play.js.map