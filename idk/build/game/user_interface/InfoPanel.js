"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const Play_1 = require("../game_state/Play");
const HEIGHT = 80;
const GRAPH_GAP = 2;
class InfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        const top = UserInterface_1.TOP_GAP;
        this.moods = game.add.graphics(left, top, groups[Play_1.GROUP_INTERFACE]);
    }
    update() {
        const graphWidth = UserInterface_1.INTERFACE_WIDTH - 2 * GRAPH_GAP;
        const lastMoods = this.worldKnowledge.getLastMoods();
        this.moods.clear();
        this.moods.lineStyle(1, 0xffffff);
        this.moods.moveTo(0, 0);
        this.moods.lineTo(0, HEIGHT);
        this.moods.lineTo(graphWidth, HEIGHT);
        this.moods.moveTo(graphWidth, HEIGHT - lastMoods[0] * HEIGHT);
        for (let i = 1; i < lastMoods.length; i++) {
            this.moods.lineTo(graphWidth - i, HEIGHT - lastMoods[i] * HEIGHT);
        }
    }
    show() {
        if (!this.visible) {
            this.moods.position.x -= UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.moods.position.x += UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = false;
    }
}
exports.InfoPanel = InfoPanel;
//# sourceMappingURL=InfoPanel.js.map