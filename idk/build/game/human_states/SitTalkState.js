"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const AbstractState_1 = require("./AbstractState");
const TableMeeting_1 = require("./TableMeeting");
const PositionTransformer_1 = require("../PositionTransformer");
const RageState_1 = require("./RageState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
class SitTalkState extends AbstractState_1.AbstractState {
    constructor(human, table, anotherHumans, worldKnowledge, meeting = null) {
        super(human);
        this.anotherHumans = anotherHumans;
        this.table = table;
        this.worldKnowledge = worldKnowledge;
        this.meetingStarted = false;
        this.meeting = meeting;
        this.isHumanOnTheRightCell = false;
        this.isHumanSit = false;
    }
    getNextState() {
        if (!this.worldKnowledge.hasObject(this.table)) {
            this.active = false;
            this.human.stopWalk();
            return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.TABLE);
        }
        else {
            if (!this.isHumanOnTheRightCell && this.isNeighborPosition()) {
                this.isHumanOnTheRightCell = true;
                this.human.interactWith(this.meeting.getCell(this.human), this.meeting.getTable().forceLeftOrientation(this.meeting.getCell(this.human).getIdentifier()));
                this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                    this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.meeting.getTable().forceLeftOrientation(this.meeting.getCell(this.human).getIdentifier()), this.table.forceTopOrientation(this.meeting.getCell(this.human).getIdentifier()));
                    this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN) + 100, () => {
                        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE_SIT);
                    }, this));
                    this.isHumanSit = true;
                }));
            }
            if (!this.isHumanOnTheRightCell && !this.meetingStarted && this.meeting.aPlaceWasTakenBySomeoneElse()) {
                this.active = false;
                this.human.stopWalk();
                return new RageState_1.RageState(this.human, ThoughtBubble_1.RAGE_IMAGE.TABLE);
            }
            if (this.isHumanSit && !this.meetingStarted && this.meeting.isReady()) {
                this.meetingStarted = true;
                this.game.time.events.add(this.meeting.getTime() + Math.random() * Phaser.Timer.SECOND, this.endMeeting, this); // TODO this will fail
                this.human.updateMoodFromState();
                let animation = HumanAnimationManager_1.ANIMATION.SIT_TALK;
                if (Math.random() > 0.5) {
                    animation = SitTalkState.otherAnimation(animation);
                }
                this.switchAnimation(animation);
            }
        }
        return super.getNextState();
    }
    switchAnimation(animation) {
        if (animation === HumanAnimationManager_1.ANIMATION.SIT_TALK) {
            this.human.showTalkBubble();
        }
        else {
            this.human.hideTalkBubble();
        }
        this.human.loadAnimation(animation);
        this.events.push(this.game.time.events.add(Phaser.Math.random(3, 6) * ((animation !== HumanAnimationManager_1.ANIMATION.SIT_TALK) ? 3 : 1) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(animation), this.switchAnimation, this, SitTalkState.otherAnimation(animation)));
    }
    start(game) {
        super.start(game);
        if (this.meeting === null) {
            this.meeting = new TableMeeting_1.TableMeeting(this.anotherHumans.concat([this.human]), Phaser.Math.random(8, 20) * Phaser.Timer.SECOND, this.table);
            let shouldStop = false;
            this.anotherHumans.forEach((human) => {
                if (!human.goSitMeeting(this.meeting)) {
                    shouldStop = true;
                }
            });
            if (shouldStop) {
                this.stop();
                return false;
            }
        }
        const referer = this.meeting.getCell(this.human);
        if (!this.human.moveToClosest(referer.getPosition(), referer.getEntries())) {
            this.stop();
            return false;
        }
        return true;
    }
    endMeeting() {
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.human.hideTalkBubble();
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP, this.meeting.getTable().forceLeftOrientation(this.meeting.getCell(this.human).getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
            this.human.goToFreeCell(this.meeting.getCell(this.human));
            this.events.push(this.game.time.events.add(this.human.getWalkDuration() + 100, () => {
                this.stop();
            }));
        }));
    }
    getState() {
        return HumanStateManager_1.STATE.SIT_TALK;
    }
    isNeighborPosition() {
        return !this.human.isMoving() &&
            PositionTransformer_1.PositionTransformer.isNeighbor(this.human.getPosition(), this.meeting.getCell(this.human).getPosition());
    }
    static otherAnimation(animation) {
        return animation === HumanAnimationManager_1.ANIMATION.SIT_TALK ? HumanAnimationManager_1.ANIMATION.FREEZE_SIT : HumanAnimationManager_1.ANIMATION.SIT_TALK;
    }
}
exports.SitTalkState = SitTalkState;
//# sourceMappingURL=SitTalkState.js.map