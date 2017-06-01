"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
const app_1 = require("../../app");
const Baby_1 = require("../Baby");
const LIMIT_CAMERA = 350;
class MoveAction extends Action_1.Action {
    constructor(play, goalX) {
        super(play);
        this.goalX = goalX;
    }
    execute() {
        let babyPosition = this.play.getBaby().getWorldPosition().x;
        if (babyPosition <= LIMIT_CAMERA) {
            let diff = LIMIT_CAMERA - babyPosition;
            if (this.play.getScene().getPosition().x + diff > MoveAction.leftBorder) {
                diff = -this.play.getScene().getPosition().x + MoveAction.leftBorder;
            }
            diff = Math.max(diff, -Baby_1.Baby.BABY_SPEED);
            this.play.getScene().getPosition().x += diff;
            this.goalX += diff;
        }
        else if (babyPosition >= app_1.SimpleGame.WIDTH - LIMIT_CAMERA) {
            let diff = (app_1.SimpleGame.WIDTH - LIMIT_CAMERA) - babyPosition;
            if (this.play.getScene().getPosition().x + diff < MoveAction.rightBorder) {
                diff = -this.play.getScene().getPosition().x + MoveAction.rightBorder;
            }
            diff = Math.max(diff, -Baby_1.Baby.BABY_SPEED);
            this.play.getScene().setPositionX(this.play.getScene().getPosition().x + diff);
            this.goalX += diff;
        }
        return this.play.getBaby().updatePosition(this.goalX - this.play.getScene().getPosition().x);
    }
    debugText() {
        return 'Move to ' + this.goalX;
    }
    static getLimitsCenter() {
        return (MoveAction.leftBorder + MoveAction.rightBorder) / 2;
    }
    static setLeftBorder(number) {
        this.leftBorder = number;
    }
    static setRightBorder(number) {
        this.rightBorder = number;
    }
}
MoveAction.leftBorder = -(612 + 20);
MoveAction.rightBorder = -(1036 - 20);
exports.MoveAction = MoveAction;
//# sourceMappingURL=MoveAction.js.map