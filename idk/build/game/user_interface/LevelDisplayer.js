"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const Pico8Colors_1 = require("../Pico8Colors");
const BAR_HEIGHT = 10;
const GAP = 3;
const TOP = 12;
class LevelDisplayer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        this.graphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH, TOP, groups[Play_1.GROUP_INTERFACE]);
        this.update();
    }
    update() {
        const width = Math.floor((UserInterface_1.INTERFACE_WIDTH - 4 * GAP) / 3);
        this.graphics.clear();
        [HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER, HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE, HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].forEach((type, i) => {
            this.graphics.lineStyle(0);
            this.graphics.beginFill(Pico8Colors_1.COLOR.RED);
            this.graphics.drawRect(GAP + i * (width + GAP), 0.5, width * this.worldKnowledge.getLevelProgress(type), BAR_HEIGHT);
            this.graphics.endFill();
            this.graphics.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
            this.graphics.drawRect(GAP + i * (width + GAP), 0.5, width, BAR_HEIGHT);
        });
    }
}
exports.LevelDisplayer = LevelDisplayer;
//# sourceMappingURL=LevelDisplayer.js.map