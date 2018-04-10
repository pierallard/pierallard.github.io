"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("./HumanStateManager");
const LOSS = -0.05;
const DEFAULT = 0.75;
var MOOD;
(function (MOOD) {
    MOOD[MOOD["RELAXATION"] = 0] = "RELAXATION";
    MOOD[MOOD["HUNGER"] = 1] = "HUNGER";
    MOOD[MOOD["SOCIAL"] = 2] = "SOCIAL";
})(MOOD = exports.MOOD || (exports.MOOD = {}));
class HumanMoodManager {
    constructor() {
        this.moods = {};
        this.moods[MOOD.RELAXATION] = DEFAULT;
        this.moods[MOOD.HUNGER] = DEFAULT;
        this.moods[MOOD.SOCIAL] = DEFAULT;
        this.hasToBeUpdated = true;
    }
    create(game) {
        this.game = game;
    }
    update() {
        if (this.hasToBeUpdated) {
            let moodUpdate = {};
            moodUpdate[MOOD.RELAXATION] = LOSS;
            moodUpdate[MOOD.HUNGER] = LOSS;
            moodUpdate[MOOD.SOCIAL] = LOSS / 2;
            this.updateFromStateInner(moodUpdate);
            this.hasToBeUpdated = false;
            this.game.time.events.add(10 * Phaser.Timer.SECOND, () => {
                this.hasToBeUpdated = true;
            }, this);
        }
    }
    updateFromState(state) {
        this.updateFromStateInner(HumanStateManager_1.HumanStateManager.getMoodGains(state));
    }
    updateFromStateInner(moods) {
        Object.keys(moods).forEach((mood) => {
            this.moods[mood] = Math.max(0, Math.min(1, this.moods[mood] + moods[mood]));
        });
    }
    static getMoods() {
        return [
            MOOD.RELAXATION,
            MOOD.HUNGER,
            MOOD.SOCIAL
        ];
    }
    getMood(mood) {
        return this.moods[mood];
    }
    getGeneralMood() {
        return (this.moods[MOOD.RELAXATION] + this.moods[MOOD.SOCIAL] + this.moods[MOOD.HUNGER]) / 3;
    }
}
exports.HumanMoodManager = HumanMoodManager;
//# sourceMappingURL=HumanMoodManager.js.map