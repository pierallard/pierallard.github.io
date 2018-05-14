"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = require("../human_states/FreezeState");
const SmokeState_1 = require("../human_states/SmokeState");
const SitState_1 = require("../human_states/SitState");
const MoveRandomState_1 = require("../human_states/MoveRandomState");
const TypeState_1 = require("../human_states/TypeState");
const TalkState_1 = require("../human_states/TalkState");
const CoffeeState_1 = require("../human_states/CoffeeState");
const HumanMoodManager_1 = require("./HumanMoodManager");
const SitTalkState_1 = require("../human_states/SitTalkState");
const RageState_1 = require("../human_states/RageState");
const SitPlay_1 = require("../human_states/SitPlay");
const LIMIT = 0.8;
var STATE;
(function (STATE) {
    STATE[STATE["SMOKE"] = 0] = "SMOKE";
    STATE[STATE["FREEZE"] = 1] = "FREEZE";
    STATE[STATE["MOVE_RANDOM"] = 2] = "MOVE_RANDOM";
    STATE[STATE["SIT"] = 3] = "SIT";
    STATE[STATE["TYPE"] = 4] = "TYPE";
    STATE[STATE["TALK"] = 5] = "TALK";
    STATE[STATE["COFFEE"] = 6] = "COFFEE";
    STATE[STATE["RAGE"] = 7] = "RAGE";
    STATE[STATE["SIT_TALK"] = 8] = "SIT_TALK";
    STATE[STATE["SIT_PLAY"] = 9] = "SIT_PLAY";
})(STATE = exports.STATE || (exports.STATE = {}));
class HumanStateManager {
    constructor(human) {
        this.human = human;
        this.state = new FreezeState_1.FreezeState(human);
    }
    create(game, worldKnowledge, animationManager) {
        this.state.start(game);
        this.worldKnowledge = worldKnowledge;
        this.animationManager = animationManager;
    }
    updateState(game) {
        const nextState = this.state.getNextState();
        if (nextState === this.state) {
            return;
        }
        if (nextState !== null) {
            this.state = nextState;
        }
        else {
            // Generates new state
            switch (this.randomNextStepName()) {
                case STATE.SMOKE:
                    this.state = new SmokeState_1.SmokeState(this.human);
                    break;
                case STATE.MOVE_RANDOM:
                    this.state = new MoveRandomState_1.MoveRandomState(this.human, this.worldKnowledge);
                    break;
                case STATE.SIT:
                    this.state = new SitState_1.SitState(this.human, this.worldKnowledge);
                    break;
                case STATE.TYPE:
                    this.state = new TypeState_1.TypeState(this.human, this.worldKnowledge);
                    break;
                case STATE.COFFEE:
                    this.state = new CoffeeState_1.CoffeeState(this.human, this.worldKnowledge);
                    break;
                case STATE.TALK:
                    this.state = new TalkState_1.TalkState(this.human, this.worldKnowledge.getAnotherFreeHuman(this.human), this.worldKnowledge);
                    break;
                case STATE.SIT_TALK:
                    this.state = new SitTalkState_1.SitTalkState(this.human, this.worldKnowledge.getClosestReferer(['Meeting Table'], 4, this.human.getPosition()).getObject(), this.worldKnowledge.getAnotherFreeHumans(this.human, 3), this.worldKnowledge);
                    break;
                case STATE.SIT_PLAY:
                    this.state = new SitPlay_1.SitPlay(this.human, this.worldKnowledge);
                    break;
                case STATE.FREEZE:
                default:
                    this.state = new FreezeState_1.FreezeState(this.human);
            }
        }
        if (this.state.start(game)) {
            // OK !
        }
        else {
            console.log('State ' + this.state.constructor.name + ' failed to start. Rage!');
            this.state = new RageState_1.RageState(this.human, this.state);
            this.state.start(game);
        }
    }
    randomNextStepName() {
        const states = this.getNextProbabilities();
        return HumanStateManager.getRandomWithProbabilities(states);
    }
    static getRandomWithProbabilities(states) {
        const sum = Object.keys(states).reduce((prev, key) => {
            return prev + states[key];
        }, 0);
        const random = Phaser.Math.random(0, sum);
        let counter = 0;
        for (let i = 0; i < Object.keys(states).length; i++) {
            counter += states[Object.keys(states)[i]];
            if (counter > random) {
                return parseInt(Object.keys(states)[i]);
            }
        }
        debugger;
    }
    getNextProbabilities() {
        const states = {};
        if (this.worldKnowledge.getClosestReferer(['Meeting Table'], 4) !== null &&
            this.worldKnowledge.getAnotherFreeHumans(this.human, 3).length === 3) {
            states[STATE.SIT_TALK] = this.getProbability(STATE.SIT_TALK);
        }
        if (this.worldKnowledge.getAnotherFreeHuman(this.human) !== null) {
            states[STATE.TALK] = this.getProbability(STATE.TALK);
        }
        states[STATE.TYPE] = this.getProbability(STATE.TYPE);
        states[STATE.COFFEE] = this.getProbability(STATE.COFFEE);
        states[STATE.SIT] = this.getProbability(STATE.SIT);
        states[STATE.FREEZE] = this.getProbability(STATE.FREEZE);
        states[STATE.MOVE_RANDOM] = this.getProbability(STATE.MOVE_RANDOM);
        states[STATE.SMOKE] = this.getProbability(STATE.SMOKE);
        states[STATE.SIT_PLAY] = this.getProbability(STATE.SIT_PLAY);
        return states;
    }
    getProbability(state) {
        let result = 1;
        switch (state) {
            case STATE.SMOKE:
                result = 5;
                break;
            case STATE.FREEZE:
                result = 3;
                break;
            case STATE.MOVE_RANDOM:
                result = 2;
                break;
            case STATE.TALK:
                result = 8;
                break;
            case STATE.SIT:
                result = 5;
                break;
            case STATE.COFFEE:
                result = 6;
                break;
            case STATE.SIT_TALK:
                result = 6;
                break;
            case STATE.SIT_PLAY:
                result = 3;
                break;
            case STATE.TYPE:
                result = (5 + 3 + 2 + 8 + 5 + 6 + 6 + 3);
                break;
        }
        if (state === this.state.getState()) {
            result = result / 1.5;
        }
        if (this.state instanceof RageState_1.RageState) {
            const rageState = this.state;
            if (rageState.getSourceState().getState() === state) {
                result = result / 3;
            }
        }
        if (state === STATE.TYPE && this.worldKnowledge.getLevelProgress(this.human.getType()) >= 1) {
            result = result / 20;
        }
        HumanMoodManager_1.HumanMoodManager.getMoods().forEach((mood) => {
            if (this.human.getMood(mood) < LIMIT) {
                if (HumanStateManager.getMoodGains(state)[mood] > 0) {
                    let ratio = 1 - this.human.getMood(mood) / LIMIT;
                    ratio = ratio * HumanStateManager.getMoodGains(state)[mood] * 30;
                    result = result * (1 + ratio);
                }
            }
        });
        return result;
    }
    static getMoodGains(state) {
        let result = {};
        switch (state) {
            case STATE.SMOKE:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.1;
                break;
            case STATE.TALK:
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.4;
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.1;
                break;
            case STATE.SIT:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.35;
                break;
            case STATE.COFFEE:
                result[HumanMoodManager_1.MOOD.HUNGER] = 0.5;
                result[HumanMoodManager_1.MOOD.RELAXATION] = -0.1;
                break;
            case STATE.SIT_TALK:
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.6;
                break;
            case STATE.RAGE:
                result[HumanMoodManager_1.MOOD.RELAXATION] = -0.15;
                break;
            case STATE.SIT_PLAY:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.4;
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.2;
                break;
        }
        return result;
    }
    reset(game) {
        this.state.stop();
        this.updateState(game);
    }
    goMeeting(game, meeting) {
        this.state.stop();
        this.state = new TalkState_1.TalkState(this.human, null, this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    goSitMeeting(game, meeting) {
        this.state.stop();
        this.state = new SitTalkState_1.SitTalkState(this.human, meeting.getTable(), meeting.getAnotherHumans(this.human), this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    getStateType() {
        return this.state.getState();
    }
    getState() {
        return this.state;
    }
    static getStr(state) {
        switch (state) {
            case STATE.SMOKE: return 'Smoke';
            case STATE.FREEZE: return 'Freeze';
            case STATE.MOVE_RANDOM: return 'Move';
            case STATE.SIT: return 'Sit';
            case STATE.TYPE: return 'Work';
            case STATE.TALK: return 'Talk';
            case STATE.COFFEE: return 'Coffee';
            case STATE.RAGE: return 'Rage';
            case STATE.SIT_TALK: return 'Meeting';
            case STATE.SIT_PLAY: return 'Play';
        }
    }
}
exports.HumanStateManager = HumanStateManager;
//# sourceMappingURL=HumanStateManager.js.map