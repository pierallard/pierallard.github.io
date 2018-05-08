"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractState {
    constructor(human) {
        this.events = [];
        this.active = false;
        this.human = human;
        this.remainingTime = null;
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
    startTimer(value) {
        this.remainingTime = value;
        this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            this.remainingTime = Math.max(this.remainingTime - Phaser.Timer.SECOND, 0);
        }, this);
    }
    getRemainingSeconds() {
        return Math.round(this.remainingTime / Phaser.Timer.SECOND);
    }
}
exports.AbstractState = AbstractState;
//# sourceMappingURL=AbstractState.js.map