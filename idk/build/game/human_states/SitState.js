"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../Human");
class SitState {
    constructor(human, loopTime, world) {
        this.human = human;
        this.loopTime = loopTime;
        this.sofa = world.getRandomSofa();
        this.toto = false;
    }
    isActive() {
        if (!this.toto && this.isNeighborPosition()) {
            this.toto = true;
            console.log('Go to Sofa');
            this.human.goToSofa(this.sofa.getPosition());
            this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                console.log('Sit down');
                this.human.loadAnimation(Human_1.ANIMATION.SIT_DOWN);
                this.game.time.events.add(Phaser.Math.random(1, 3) * Phaser.Timer.SECOND + this.loopTime, () => {
                    console.log('Stand up');
                    this.human.loadAnimation(Human_1.ANIMATION.STAND_UP);
                    this.game.time.events.add(this.loopTime + 100, () => {
                        console.log('Go to free cell');
                        this.human.goToFreeCell();
                        this.game.time.events.add(Human_1.WALK_CELL_DURATION + 100, () => {
                            console.log('Disable');
                            this.active = false;
                        }, this);
                    }, this);
                }, this);
            }, this);
        }
        return this.active;
    }
    start(game) {
        this.active = true;
        this.game = game;
        this.human.moveToClosest(this.sofa.getPosition());
    }
    isNeighborPosition() {
        return !this.human.isMoving() && (this.human.getPosition().x - this.sofa.getPosition().x) * (this.human.getPosition().x - this.sofa.getPosition().x) +
            (this.human.getPosition().y - this.sofa.getPosition().y) * (this.human.getPosition().y - this.sofa.getPosition().y) === 1;
    }
}
exports.SitState = SitState;
//# sourceMappingURL=SitState.js.map