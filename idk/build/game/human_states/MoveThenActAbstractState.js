"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractState_1 = require("./AbstractState");
const PositionTransformer_1 = require("../PositionTransformer");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
const RageState_1 = require("./RageState");
class MoveThenActAbstractState extends AbstractState_1.AbstractState {
    constructor(human, worldKnowledge, tries = 0) {
        super(human);
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.tries = tries;
        this.noPathFound = false;
    }
    start(game) {
        if (!super.start(game)) {
            return false;
        }
        if (!this.human.moveToClosest(this.objectReferer.getPosition(), this.objectReferer.getEntries())) {
            this.noPathFound = true;
            this.active = false;
            this.stop();
            return false;
        }
        return true;
    }
    getNextState() {
        if (!this.isHumanOnTheRightCell) {
            if (!this.worldKnowledge.hasObject(this.objectReferer.getObject()) || this.objectReferer.isUsed()) {
                return this.retry();
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.interactWith(this.objectReferer, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()));
            this.events.push(this.game.time.events.add(this.human.getWalkDuration(), () => {
                this.act();
            }));
        }
        return super.getNextState();
    }
    getDescription() {
        return 'Looking for ' + this.objectReferer.getObject().getDescription().getName();
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.objectReferer.getPosition());
    }
    getRageImage() {
        if (this.noPathFound) {
            return ThoughtBubble_1.RAGE_IMAGE.PATH;
        }
        else {
            return this.subGetRageImage();
        }
    }
    retry() {
        if (this.tries > this.human.getMaxRetries()) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, this);
        }
        else {
            return this.getRetryState();
        }
    }
    finish() {
        this.human.goToFreeCell(this.objectReferer);
        this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
            this.active = false;
        }, this));
    }
}
exports.MoveThenActAbstractState = MoveThenActAbstractState;
//# sourceMappingURL=MoveThenActAbstractState.js.map