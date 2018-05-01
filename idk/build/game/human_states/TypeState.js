"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const RageState_1 = require("./RageState");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
const SECOND_MAX = 60 * Phaser.Timer.SECOND;
class TypeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    retry() {
        const nextDeskReferer = this.worldKnowledge.getClosestReferer(['Desk'], 1, this.human.getPosition());
        if (this.tries > this.human.getMaxRetries() || nextDeskReferer === null) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.LAPTOP);
        }
        else {
            return new TypeState(this.human, nextDeskReferer, this.worldKnowledge, this.tries + 1);
        }
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE, this.objectReferer.forceLeftOrientation(), this.objectReferer.forceTopOrientation());
            const time = Phaser.Math.random(15 * Phaser.Timer.SECOND, SECOND_MAX);
            this.worldKnowledge.addProgress(this.human.getType(), time / SECOND_MAX, time);
            this.events.push(this.game.time.events.add(time, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                    this.human.goToFreeCell(this.objectReferer);
                    this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                        this.active = false;
                    }, this));
                }, this));
            }, this));
        }));
    }
    getState() {
        return HumanStateManager_1.STATE.TYPE;
    }
}
exports.TypeState = TypeState;
//# sourceMappingURL=TypeState.js.map