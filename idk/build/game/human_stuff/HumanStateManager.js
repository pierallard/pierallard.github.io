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
            // Do nothing, current state is not ended.
            return;
        }
        if (nextState !== null) {
            // Next state is forced.
            this.state = nextState;
            this.state.start(game);
            console.log('New forced state: ' + this.state.constructor.name);
            return;
        }
        // Generates new state
        switch (this.randomNextStepName()) {
            case STATE.SMOKE:
                this.state = new SmokeState_1.SmokeState(this.human);
                break;
            case STATE.MOVE_RANDOM:
                this.state = new MoveRandomState_1.MoveRandomState(this.human, this.worldKnowledge);
                break;
            case STATE.SIT:
                this.state = new SitState_1.SitState(this.human, this.worldKnowledge.getRandomFreeSittable(), this.worldKnowledge);
                break;
            case STATE.TYPE:
                this.state = new TypeState_1.TypeState(this.human, this.worldKnowledge.getClosestFreeDesk(this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.COFFEE:
                this.state = new CoffeeState_1.CoffeeState(this.human, this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition()), this.worldKnowledge);
                break;
            case STATE.TALK:
                this.state = new TalkState_1.TalkState(this.human, this.worldKnowledge.getAnotherFreeHuman(this.human), game, this.worldKnowledge);
                break;
            case STATE.FREEZE:
            default:
                this.state = new FreezeState_1.FreezeState(this.human);
        }
        if (this.state.start(game)) {
            console.log('New random state: ' + this.state.constructor.name);
        }
        else {
            console.log('State ' + this.state.constructor.name + ' failed. Retry.');
            this.updateState(game);
        }
    }
    randomNextStepName() {
        const states = [];
        states.push({ state: STATE.SMOKE, probability: this.getProbability(STATE.SMOKE) });
        states.push({ state: STATE.FREEZE, probability: this.getProbability(STATE.FREEZE) });
        states.push({ state: STATE.MOVE_RANDOM, probability: this.getProbability(STATE.MOVE_RANDOM) });
        if (this.worldKnowledge.getAnotherFreeHuman(this.human) !== null) {
            states.push({ state: STATE.TALK, probability: this.getProbability(STATE.TALK) });
        }
        if (this.worldKnowledge.getRandomFreeSittable() !== null) {
            states.push({ state: STATE.SIT, probability: this.getProbability(STATE.SIT) });
        }
        if (this.worldKnowledge.getClosestFreeDesk(this.human.getPosition()) !== null) {
            states.push({ state: STATE.TYPE, probability: this.getProbability(STATE.TYPE) });
        }
        if (this.worldKnowledge.getClosestFreeDispenser(this.human.getPosition()) !== null) {
            states.push({ state: STATE.COFFEE, probability: this.getProbability(STATE.COFFEE) });
        }
        let debug = '';
        debug += 'Rlx[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.RELAXATION) * 100) + '%], ';
        debug += 'Hng[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.HUNGER) * 100) + '%], ';
        debug += 'Soc[' + Math.ceil(this.human.getMood(HumanMoodManager_1.MOOD.SOCIAL) * 100) + '%] ---> ';
        debug += 'Smk(' + Math.ceil(this.getProbability(STATE.SMOKE)) + '), ';
        debug += 'Frz(' + Math.ceil(this.getProbability(STATE.FREEZE)) + '), ';
        debug += 'MvR(' + Math.ceil(this.getProbability(STATE.MOVE_RANDOM)) + '), ';
        debug += 'Tak(' + Math.ceil(this.getProbability(STATE.TALK)) + '), ';
        debug += 'Sit(' + Math.ceil(this.getProbability(STATE.SIT)) + '), ';
        debug += 'Typ(' + Math.ceil(this.getProbability(STATE.TYPE)) + '), ';
        debug += 'Cof(' + Math.ceil(this.getProbability(STATE.COFFEE)) + '), ';
        console.log(debug);
        const sum = states.reduce((prev, state) => {
            return prev + state.probability;
        }, 0);
        const random = Phaser.Math.random(0, sum);
        let counter = 0;
        for (let i = 0; i < states.length; i++) {
            counter += states[i].probability;
            if (counter > random) {
                return states[i].state;
            }
        }
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
                result = 4;
                break;
            case STATE.COFFEE:
                result = 6;
                break;
            case STATE.TYPE:
                result = (5 + 1 + 2 + 8 + 2 + 6) * 2;
                break;
        }
        if (state === this.state.getState()) {
            result = result / 2;
        }
        HumanMoodManager_1.HumanMoodManager.getMoods().forEach((mood) => {
            if (this.human.getMood(mood) < 0.5) {
                if (HumanStateManager.getMoodGains(state)[mood] > 0) {
                    result = result * HumanStateManager.getMoodGains(state)[mood] * 8;
                    result = result * (1 - this.human.getMood(mood)) * 3;
                }
            }
        });
        return result;
    }
    static getMoodGains(state) {
        let result = {};
        switch (state) {
            case STATE.SMOKE:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.4;
                break;
            case STATE.TALK:
                result[HumanMoodManager_1.MOOD.SOCIAL] = 0.5;
                break;
            case STATE.SIT:
                result[HumanMoodManager_1.MOOD.RELAXATION] = 0.2;
                break;
            case STATE.COFFEE:
                result[HumanMoodManager_1.MOOD.HUNGER] = 0.5;
                break;
        }
        return result;
    }
    reset(game) {
        this.state.stop(game);
        this.updateState(game);
    }
    goMeeting(game, meeting) {
        this.state.stop(game);
        this.state = new TalkState_1.TalkState(this.human, null, game, this.worldKnowledge, meeting);
        return this.state.start(game);
    }
    getState() {
        return this.state.getState();
    }
}
exports.HumanStateManager = HumanStateManager;
//# sourceMappingURL=HumanStateManager.js.map