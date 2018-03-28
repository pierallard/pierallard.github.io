"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("./Human");
const FreezeState_1 = require("../human_states/FreezeState");
const SmokeState_1 = require("../human_states/SmokeState");
const SitState_1 = require("../human_states/SitState");
const MoveRandomState_1 = require("../human_states/MoveRandomState");
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
            const states = [
                new SmokeState_1.SmokeState(this.human, this.animationManager.getAnimationTime(Human_1.ANIMATION.SMOKE)),
                new FreezeState_1.FreezeState(this.human),
                new MoveRandomState_1.MoveRandomState(this.human, this.world)
            ];
            const randomSofa = this.world.getRandomFreeSofa();
            if (randomSofa !== null) {
                states.push(new SitState_1.SitState(this.human, this.animationManager.getAnimationTime(Human_1.ANIMATION.SIT_DOWN), randomSofa, this.world));
            }
            const randomDesk = this.world.getRandomFreeDesk();
            if (randomDesk !== null) {
                states.push(new SitState_1.SitState(this.human, this.animationManager.getAnimationTime(Human_1.ANIMATION.SIT_DOWN), randomDesk, this.world));
            }
            this.state = states[Math.floor(Math.random() * states.length)];
            this.state.start(game);
            console.log('New state: ' + this.state.constructor.name);
        }
    }
}
exports.HumanStateManager = HumanStateManager;
//# sourceMappingURL=HumanStateManager.js.map