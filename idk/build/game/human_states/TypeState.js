"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
const SECOND_MIN = 15 * Phaser.Timer.SECOND;
const SECOND_MAX = 40 * Phaser.Timer.SECOND;
class TypeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    constructor(human, worldKnowledge, tries = 0) {
        super(human, worldKnowledge, tries);
        this.percentage = null;
        this.finished = false;
    }
    start(game) {
        this.objectReferer = this.worldKnowledge.getClosestReferer(['Desk'], 1, this.human.getPosition());
        if (this.objectReferer === null) {
            return false;
        }
        this.typeTime = Phaser.Math.random(SECOND_MIN, SECOND_MAX);
        return super.start(game);
    }
    getNextState() {
        if (this.percentage !== null && this.percentage < 1) {
            const diffTime = (new Date()).getTime() - this.lastUpdatedAt;
            const workProgress = this.getWorkProgress(diffTime);
            const levelProgress = this.getLevelProgress(diffTime);
            this.percentage += workProgress;
            this.worldKnowledge.addProgress(this.human, levelProgress, 0);
            this.lastUpdatedAt = (new Date()).getTime();
        }
        if (this.percentage !== null && this.percentage >= 1 && !this.finished) {
            this.finished = true;
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                this.finish();
            }, this));
        }
        return super.getNextState();
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE, this.objectReferer.forceLeftOrientation(), this.objectReferer.forceTopOrientation());
            this.percentage = 0;
            this.lastUpdatedAt = (new Date()).getTime();
        }));
    }
    getActTime() {
        return null;
    }
    getState() {
        return HumanStateManager_1.STATE.TYPE;
    }
    subGetRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.LAPTOP;
    }
    getRetryState() {
        return new TypeState(this.human, this.worldKnowledge, this.tries + 1);
    }
    /**
     * Returns the quantity of work the employee did.
     * Returns a number between 0 and 1 (nothing -> he worked the assigned time)
     *
     * @param {number} diffTime
     * @returns {number}
     */
    getWorkProgress(diffTime) {
        return diffTime / this.typeTime;
    }
    /**
     * Returns the quantity of work the employee did
     * Returns a number between 0 and 1
     * 1 is when the user works the full time and have full experience.
     *
     * @param {number} diffTime
     * @returns {number}
     */
    getLevelProgress(diffTime) {
        return diffTime / SECOND_MAX * this.human.getExperienceRatio() * this.worldKnowledge.getAmbiance(this.human.getPosition());
    }
    getDescription() {
        if (!this.isHumanOnTheRightCell) {
            return super.getDescription();
        }
        else {
            return 'is working (' + Math.round(this.percentage * 100) + '%)';
        }
    }
}
exports.TypeState = TypeState;
//# sourceMappingURL=TypeState.js.map