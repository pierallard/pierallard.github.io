"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const RageState_1 = require("./RageState");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const Price_1 = require("../objects/Price");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
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
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE);
            this.worldKnowledge.addProgress(this.human.getType(), 1);
            this.worldKnowledge.addMoneyInWallet(new Price_1.Price(100));
            this.events.push(this.game.time.events.add(Phaser.Math.random(15, 60) * Phaser.Timer.SECOND, () => {
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