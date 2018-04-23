"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const RageState_1 = require("./RageState");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
class CoffeeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextDispenserReferer = this.worldKnowledge.getClosestReferer(['Dispenser'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextDispenserReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human);
        }
        else {
            return new CoffeeState(this.human, nextDispenserReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK), () => {
            this.human.goToFreeCell(this.objectReferer);
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.active = false;
            }, this));
        }, this));
    }
    getState() {
        return HumanStateManager_1.STATE.COFFEE;
    }
}
exports.CoffeeState = CoffeeState;
//# sourceMappingURL=CoffeeState.js.map