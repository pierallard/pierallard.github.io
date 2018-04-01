"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../human_stuff/Human");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
class SitState {
    constructor(human, sittable, world) {
        this.human = human;
        this.sittable = sittable;
        this.isHumanOnTheRightCell = false;
        this.world = world;
        this.events = [];
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
            this.human.goToSittable(this.sittable);
            this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN);
                this.events.push(this.game.time.events.add(Phaser.Math.random(3, 10) * Phaser.Timer.SECOND + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                        this.human.goToFreeCell(this.sittable.getEntries());
                        this.events.push(this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                            this.active = false;
                        }, this));
                    }, this));
                }, this));
            }, this));
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
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
}
exports.SitState = SitState;
//# sourceMappingURL=SitState.js.map