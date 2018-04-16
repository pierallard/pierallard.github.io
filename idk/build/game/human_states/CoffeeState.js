"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const PositionTransformer_1 = require("../PositionTransformer");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const RageState_1 = require("./RageState");
class CoffeeState {
    constructor(human, dispenser, worldKnowledge, tries = 0) {
        this.human = human;
        this.dispenser = dispenser;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.events = [];
        this.tries = tries;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.dispenser) || this.worldKnowledge.isObjectUsed(this.dispenser)) {
                const nextDispenser = this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition());
                if (this.tries > this.human.getMaxRetries() || nextDispenser === null) {
                    this.active = false;
                    this.human.stopWalk();
                    return new RageState_1.RageState(this.human);
                }
                else {
                    return new CoffeeState(this.human, nextDispenser, this.worldKnowledge, this.tries + 1);
                }
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.dispenser, this.dispenser.forceOrientation());
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
                this.human.updateMoodFromState();
                this.events.push(this.game.time.events.add(Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK), () => {
                    this.human.goToFreeCell(this.dispenser.getEntries());
                    this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                        this.active = false;
                    }, this));
                }, this));
            }));
        }
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        if (!this.human.moveToClosest(this.dispenser.getPosition(), this.dispenser.getEntries())) {
            this.active = false;
            this.stop(game);
            return false;
        }
        return true;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.dispenser.getPosition());
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.COFFEE;
    }
}
exports.CoffeeState = CoffeeState;
//# sourceMappingURL=CoffeeState.js.map