"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../human_stuff/Human");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
class TypeState {
    constructor(human, loopTime, sittable, world) {
        this.human = human;
        this.loopTime = loopTime;
        this.sittable = sittable;
        this.isHumanOnTheRightCell = false;
        this.world = world;
    }
    isActive() {
        if (!this.isHumanOnTheRightCell) {
            if (this.world.isSittableTaken(this.sittable)) {
                this.active = false;
                return false;
            }
        }
        if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
            this.isHumanOnTheRightCell = true;
            this.human.goToSittable(this.sittable, this.sittable.forceOrientation());
            this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.sittable.forceOrientation());
                this.game.time.events.add(this.loopTime, () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE);
                    this.game.time.events.add(Phaser.Math.random(5, 10) * Phaser.Timer.SECOND, () => {
                        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                        this.game.time.events.add(this.loopTime + 100, () => {
                            this.human.goToFreeCell(this.sittable.getEntries());
                            this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                                this.active = false;
                            }, this);
                        }, this);
                    }, this);
                });
            }, this);
        }
        return this.active;
    }
    start(game) {
        this.active = true;
        this.game = game;
        this.human.moveToClosest(this.sittable.getPosition(), this.sittable.getEntries());
    }
    isNeighborPosition() {
        return !this.human.isMoving() && (this.human.getPosition().x - this.sittable.getPosition().x) * (this.human.getPosition().x - this.sittable.getPosition().x) +
            (this.human.getPosition().y - this.sittable.getPosition().y) * (this.human.getPosition().y - this.sittable.getPosition().y) === 1;
    }
}
exports.TypeState = TypeState;
//# sourceMappingURL=TypeState.js.map