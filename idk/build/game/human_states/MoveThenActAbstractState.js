"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractState_1 = require("./AbstractState");
const PositionTransformer_1 = require("../PositionTransformer");
class MoveThenActAbstractState extends AbstractState_1.AbstractState {
    constructor(human, objectReferer, worldKnowledge, tries = 0) {
        super(human);
        this.objectReferer = objectReferer;
        this.isHumanOnTheRightCell = false;
        this.worldKnowledge = worldKnowledge;
        this.tries = tries;
    }
    start(game) {
        super.start(game);
        if (!this.human.moveToClosest(this.objectReferer.getPosition(), this.objectReferer.getEntries())) {
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
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.act();
            }));
        }
        return super.getNextState();
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.objectReferer.getPosition());
    }
}
exports.MoveThenActAbstractState = MoveThenActAbstractState;
//# sourceMappingURL=MoveThenActAbstractState.js.map