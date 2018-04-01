"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const Meeting_1 = require("./Meeting");
const Direction_1 = require("../Direction");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
class TalkState {
    constructor(human, anotherHuman, game, world, meeting = null) {
        this.human = human;
        this.anotherHuman = anotherHuman;
        this.game = game;
        this.world = world;
        this.meetingStarted = false;
        this.events = [];
        this.meeting = meeting;
    }
    isActive() {
        if (!this.meetingStarted) {
            if (this.meeting.isReady()) {
                this.meetingStarted = true;
                this.game.time.events.add(this.meeting.getTime() + Math.random() * Phaser.Timer.SECOND, this.end, this);
                let animation = HumanAnimationManager_1.ANIMATION.TALK;
                if (Math.random() > 0.5) {
                    animation = TalkState.otherAnimation(animation);
                }
                this.switchAnimation(animation);
            }
            else if (!this.human.isMoving()) {
                const direction = Direction_1.Direction.getNeighborDirection(this.human.getPosition(), this.meeting.getAnotherHuman(this.human).getPosition());
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, Direction_1.Direction.isLeft(direction), Direction_1.Direction.isTop(direction));
            }
        }
        return this.active;
    }
    switchAnimation(animation) {
        const direction = Direction_1.Direction.getNeighborDirection(this.human.getPosition(), this.meeting.getAnotherHuman(this.human).getPosition());
        this.human.loadAnimation(animation, Direction_1.Direction.isLeft(direction), Direction_1.Direction.isTop(direction));
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 6) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(animation), this.switchAnimation, this, TalkState.otherAnimation(animation)));
    }
    start(game) {
        this.active = true;
        if (this.meeting === null) {
            this.meeting = new Meeting_1.Meeting([this.human, this.anotherHuman], Phaser.Math.random(8, 20) * Phaser.Timer.SECOND, this.world);
            if (!this.anotherHuman.goMeeting(this.meeting)) {
                this.end();
                return false;
            }
        }
        if (!this.human.moveTo(this.meeting.getCell(this.human))) {
            this.end();
            return false;
        }
        return true;
    }
    end() {
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.active = false;
    }
    stop(game) {
        this.end();
    }
    getState() {
        return HumanStateManager_1.STATE.TALK;
    }
    static otherAnimation(animation) {
        return animation === HumanAnimationManager_1.ANIMATION.TALK ? HumanAnimationManager_1.ANIMATION.FREEZE : HumanAnimationManager_1.ANIMATION.TALK;
    }
}
exports.TalkState = TalkState;
//# sourceMappingURL=TalkState.js.map