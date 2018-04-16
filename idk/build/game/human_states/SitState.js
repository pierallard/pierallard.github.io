"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const PositionTransformer_1 = require("../PositionTransformer");
const RageState_1 = require("./RageState");
class SitState {
    constructor(human, interactiveObject, worldKnowledge, tries = 0) {
        this.human = human;
        this.interactiveObject = interactiveObject;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
        this.tries = tries;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.interactiveObject) || this.worldKnowledge.isObjectUsed(this.interactiveObject)) {
                const nextSofa = this.worldKnowledge.getRandomFreeSittable();
                if (this.tries > this.human.getMaxRetries() || nextSofa === null) {
                    this.active = false;
                    this.human.stopWalk();
                    return new RageState_1.RageState(this.human);
                }
                else {
                    return new SitState(this.human, nextSofa, this.worldKnowledge, this.tries + 1);
                }
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.interactiveObject, this.interactiveObject.forceOrientation());
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.interactiveObject.forceOrientation());
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                        this.human.goToFreeCell(this.interactiveObject.getEntries());
                        this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                            this.active = false;
                        }, this));
                    }, this));
                }, this));
            }, this));
        }
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        if (!this.human.moveToClosest(this.interactiveObject.getPosition(), this.interactiveObject.getEntries())) {
            this.active = false;
            this.stop(game);
            return false;
        }
        return true;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.interactiveObject.getPosition());
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
}
exports.SitState = SitState;
//# sourceMappingURL=SitState.js.map