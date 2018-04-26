"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("./HumanStateManager");
const SmoothValue_1 = require("../SmoothValue");
const LOSS = -0.05;
const DEFAULT = 0.8;
const TIME_BETWEEN_LOSS = 10000;
var MOOD;
(function (MOOD) {
    MOOD[MOOD["RELAXATION"] = 0] = "RELAXATION";
    MOOD[MOOD["HUNGER"] = 1] = "HUNGER";
    MOOD[MOOD["SOCIAL"] = 2] = "SOCIAL";
})(MOOD = exports.MOOD || (exports.MOOD = {}));
class HumanMoodManager {
    constructor() {
        this.moods = {};
        this.moods[MOOD.RELAXATION] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.HUNGER] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.SOCIAL] = new SmoothValue_1.SmoothValue(DEFAULT);
        this.moods[MOOD.RELAXATION].setMaxValue(1);
        this.moods[MOOD.HUNGER].setMaxValue(1);
        this.moods[MOOD.SOCIAL].setMaxValue(1);
        this.moods[MOOD.RELAXATION].setMinValue(0);
        this.moods[MOOD.HUNGER].setMinValue(0);
        this.moods[MOOD.SOCIAL].setMinValue(0);
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
            this.updateFromStateInner(moodUpdate, TIME_BETWEEN_LOSS);
            this.hasToBeUpdated = false;
            this.game.time.events.add(TIME_BETWEEN_LOSS, () => {
                this.hasToBeUpdated = true;
            }, this);
        }
    }
    updateFromState(state) {
        this.updateFromStateInner(HumanStateManager_1.HumanStateManager.getMoodGains(state));
    }
    updateFromStateInner(moods, time = Phaser.Timer.SECOND) {
        Object.keys(moods).forEach((mood) => {
            this.moods[mood].add(moods[mood], time);
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
        return this.moods[mood].getValue();
    }
    getGeneralMood() {
        return (this.moods[MOOD.RELAXATION].getValue() + this.moods[MOOD.SOCIAL].getValue() + this.moods[MOOD.HUNGER].getValue()) / 3;
    }
}
exports.HumanMoodManager = HumanMoodManager;
//# sourceMappingURL=HumanMoodManager.js.map