"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const RageState_1 = require("./RageState");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
class SitState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextSofaReferer = this.worldKnowledge.getClosestReferer(['Sofa'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextSofaReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human);
        }
        else {
            return new SitState(this.human, nextSofaReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceOrientation(this.objectReferer.getIdentifier()));
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                this.human.goToFreeCell(this.objectReferer);
                this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                    this.active = false;
                }, this));
            }, this));
        }, this));
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
}
exports.SitState = SitState;
//# sourceMappingURL=SitState.js.map