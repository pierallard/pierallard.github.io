"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("./HumanStateManager");
const LOSS = -0.05;
const DEFAULT = 0.75;
var HUMOR;
(function (HUMOR) {
    HUMOR[HUMOR["RELAXATION"] = 0] = "RELAXATION";
    HUMOR[HUMOR["HUNGER"] = 1] = "HUNGER";
    HUMOR[HUMOR["SOCIAL"] = 2] = "SOCIAL";
})(HUMOR = exports.HUMOR || (exports.HUMOR = {}));
class HumanHumorManager {
    constructor() {
        this.humors = {};
        this.humors[HUMOR.RELAXATION] = DEFAULT;
        this.humors[HUMOR.HUNGER] = DEFAULT;
        this.humors[HUMOR.SOCIAL] = DEFAULT;
        this.hasToBeUpdated = true;
    }
    create(game) {
        this.game = game;
    }
    update() {
        if (this.hasToBeUpdated) {
            let humorUpdate = {};
            humorUpdate[HUMOR.RELAXATION] = LOSS;
            humorUpdate[HUMOR.HUNGER] = LOSS;
            humorUpdate[HUMOR.SOCIAL] = LOSS;
            this.updateFromStateInner(humorUpdate);
            this.hasToBeUpdated = false;
            this.game.time.events.add(10 * Phaser.Timer.SECOND, () => {
                this.hasToBeUpdated = true;
            }, this);
        }
    }
    updateFromState(state) {
        this.updateFromStateInner(HumanStateManager_1.HumanStateManager.getHumorGains(state));
    }
    updateFromStateInner(humors) {
        Object.keys(humors).forEach((humor) => {
            this.humors[humor] = Math.max(0, Math.min(1, this.humors[humor] + humors[humor]));
        });
    }
    static getHumors() {
        return [
            HUMOR.RELAXATION,
            HUMOR.HUNGER,
            HUMOR.SOCIAL
        ];
    }
    getHumor(humor) {
        return this.humors[humor];
    }
    getGeneralHumor() {
        return (this.humors[HUMOR.RELAXATION] + this.humors[HUMOR.SOCIAL] + this.humors[HUMOR.HUNGER]) / 3;
    }
}
exports.HumanHumorManager = HumanHumorManager;
//# sourceMappingURL=HumanHumorManager.js.map