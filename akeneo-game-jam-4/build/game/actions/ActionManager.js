"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = require("../verbs/Verb");
class ActionManager {
    constructor(play) {
        this.play = play;
        this.actions = [];
    }
    execute() {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
            if (!this.actions.length) {
                this.play.getVerbRepository().setCurrentVerbName(Verb_1.Verb.WALK_TO);
            }
        }
    }
    addAction(action) {
        this.addActions([action]);
    }
    addActions(actions) {
        if (this.hasAction()) {
            return;
        }
        this.actions = this.actions.concat(actions);
    }
    hasAction() {
        return this.actions.length > 0;
    }
    getActions() {
        return this.actions;
    }
}
exports.ActionManager = ActionManager;
//# sourceMappingURL=ActionManager.js.map