"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreezeState_1 = require("../human_states/FreezeState");
const SmokeState_1 = require("../human_states/SmokeState");
const SitState_1 = require("../human_states/SitState");
const MoveRandomState_1 = require("../human_states/MoveRandomState");
const HumanAnimationManager_1 = require("./HumanAnimationManager");
const TypeState_1 = require("../human_states/TypeState");
var STATE;
(function (STATE) {
    STATE[STATE["SMOKE"] = 0] = "SMOKE";
    STATE[STATE["FREEZE"] = 1] = "FREEZE";
    STATE[STATE["MOVE_RANDOM"] = 2] = "MOVE_RANDOM";
    STATE[STATE["SIT"] = 3] = "SIT";
    STATE[STATE["TYPE"] = 4] = "TYPE";
})(STATE || (STATE = {}));
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
                    this.state = new SmokeState_1.SmokeState(this.human, this.animationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SMOKE));
                    break;
                case STATE.MOVE_RANDOM:
                    this.state = new MoveRandomState_1.MoveRandomState(this.human, this.world);
                    break;
                case STATE.SIT:
                    this.state = new SitState_1.SitState(this.human, this.animationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), this.world.getRandomFreeSofa(), this.world);
                    break;
                case STATE.TYPE:
                    this.state = new TypeState_1.TypeState(this.human, this.animationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), this.world.getRandomFreeDesk(), this.world);
                    break;
                case STATE.FREEZE:
                default:
                    this.state = new FreezeState_1.FreezeState(this.human);
            }
            this.state.start(game);
            console.log('New state: ' + this.state.constructor.name);
        }
    }
    randomNextStepName() {
        const states = [];
        states.push({ state: STATE.SMOKE, probability: 5 });
        states.push({ state: STATE.FREEZE, probability: 5 });
        states.push({ state: STATE.MOVE_RANDOM, probability: 2 });
        if (this.world.getRandomFreeSofa() !== null) {
            states.push({ state: STATE.SIT, probability: 2 });
        }
        if (this.world.getRandomFreeDesk() !== null) {
            states.push({ state: STATE.TYPE, probability: 20 });
        }
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
}
exports.HumanStateManager = HumanStateManager;
//# sourceMappingURL=HumanStateManager.js.map