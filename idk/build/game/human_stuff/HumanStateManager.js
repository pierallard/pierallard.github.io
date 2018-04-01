"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = require("../human_states/FreezeState");
const SmokeState_1 = require("../human_states/SmokeState");
const SitState_1 = require("../human_states/SitState");
const MoveRandomState_1 = require("../human_states/MoveRandomState");
const TypeState_1 = require("../human_states/TypeState");
const TalkState_1 = require("../human_states/TalkState");
const CoffeeState_1 = require("../human_states/CoffeeState");
var STATE;
(function (STATE) {
    STATE[STATE["SMOKE"] = 0] = "SMOKE";
    STATE[STATE["FREEZE"] = 1] = "FREEZE";
    STATE[STATE["MOVE_RANDOM"] = 2] = "MOVE_RANDOM";
    STATE[STATE["SIT"] = 3] = "SIT";
    STATE[STATE["TYPE"] = 4] = "TYPE";
    STATE[STATE["TALK"] = 5] = "TALK";
    STATE[STATE["COFFEE"] = 6] = "COFFEE";
})(STATE = exports.STATE || (exports.STATE = {}));
class HumanStateManager {
    constructor(human) {
        this.human = human;
        this.state = new FreezeState_1.FreezeState(human);
    }
    create(game, world, animationManager) {
        this.state.start(game);
        this.world = world;
        this.animationManager = animationManager;
    }
    updateState(game) {
        if (!this.state.isActive()) {
            switch (this.randomNextStepName()) {
                case STATE.SMOKE:
                    this.state = new SmokeState_1.SmokeState(this.human);
                    break;
                case STATE.MOVE_RANDOM:
                    this.state = new MoveRandomState_1.MoveRandomState(this.human, this.world);
                    break;
                case STATE.SIT:
                    this.state = new SitState_1.SitState(this.human, this.world.getRandomFreeSofa(), this.world);
                    break;
                case STATE.TYPE:
                    this.state = new TypeState_1.TypeState(this.human, this.world.getRandomFreeDesk(), this.world);
                    break;
                case STATE.COFFEE:
                    this.state = new CoffeeState_1.CoffeeState(this.human, this.world.getRandomFreeDispenser(), this.world);
                    break;
                case STATE.TALK:
                    this.state = new TalkState_1.TalkState(this.human, this.world.getAnotherFreeHuman(this.human), game, this.world);
                    break;
                case STATE.FREEZE:
                default:
                    this.state = new FreezeState_1.FreezeState(this.human);
            }
            if (this.state.start(game)) {
                console.log('New state: ' + this.state.constructor.name);
            }
            else {
                console.log('State ' + this.state.constructor.name + ' failed. Retry.');
                this.updateState(game);
            }
        }
    }
    randomNextStepName() {
        const states = [];
        states.push({ state: STATE.SMOKE, probability: 5 });
        states.push({ state: STATE.FREEZE, probability: 1 });
        states.push({ state: STATE.MOVE_RANDOM, probability: 2 });
        if (this.world.getAnotherFreeHuman(this.human) !== null) {
            states.push({ state: STATE.TALK, probability: 8 });
        }
        if (this.world.getRandomFreeSofa() !== null) {
            states.push({ state: STATE.SIT, probability: 2 });
        }
        if (this.world.getRandomFreeDesk() !== null) {
            states.push({ state: STATE.TYPE, probability: 25 });
        }
        if (this.world.getRandomFreeDispenser() !== null) {
            states.push({ state: STATE.COFFEE, probability: 6 });
        }
        states.forEach((state) => {
            if (state.state === this.state.getState()) {
                state.probability = state.probability / 10;
            }
        });
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
    reset(game) {
        this.state.stop(game);
        this.updateState(game);
    }
    goMeeting(game, meeting) {
        this.state.stop(game);
        this.state = new TalkState_1.TalkState(this.human, null, game, this.world, meeting);
        return this.state.start(game);
    }
    getState() {
        return this.state.getState();
    }
}
exports.HumanStateManager = HumanStateManager;
//# sourceMappingURL=HumanStateManager.js.map