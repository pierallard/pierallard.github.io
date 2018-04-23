"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractState {
    constructor(human) {
        this.events = [];
        this.active = false;
        this.human = human;
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        this.active = true;
        this.game = game;
        return true;
    }
    stop() {
        this.events.forEach((event) => {
            this.game.time.events.remove(event);
        });
        this.active = false;
    }
}
exports.AbstractState = AbstractState;
//# sourceMappingURL=AbstractState.js.map