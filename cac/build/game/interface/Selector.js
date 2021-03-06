"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
class Selector {
    constructor(worldKnowledge, player) {
        this.corner = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.mousePointer = game.input.mousePointer;
        this.camera = game.camera;
        this.leftButton = game.input.activePointer.leftButton;
        this.rightButton = game.input.activePointer.rightButton;
        this.graphics = game.add.graphics(0, 0);
        this.timeEvents = game.time.events;
        // TODO Remove these values
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        game.input.mouse.capture = true;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        game.add.existing(this.graphics);
    }
    getMousePointer() {
        return new PIXI.Point(this.mousePointer.x + this.camera.position.x, this.mousePointer.y + this.camera.position.y);
    }
    update() {
        if (null === this.corner && this.leftButton.isDown) {
            this.corner = this.getMousePointer();
        }
        if (this.corner !== null && this.leftButton.isUp) {
            if (this.corner.x === this.getMousePointer().x && this.corner.y === this.getMousePointer().y) {
                let unitUnderPointer = this.worldKnowledge.getArmyAt(new PIXI.Point(Cell_1.Cell.realToCell(this.corner.x), Cell_1.Cell.realToCell(this.corner.y)));
                if (unitUnderPointer && unitUnderPointer.getPlayer() === this.player && this.isDoubleClick) {
                    this.selectUnitsInside(new PIXI.Point(this.camera.position.x, this.camera.position.y), new PIXI.Point(this.camera.position.x + this.gameWidth, this.camera.position.y + this.gameHeight), unitUnderPointer.constructor);
                }
                else {
                    this.worldKnowledge.getArmies().forEach((army) => {
                        army.setSelected(army === unitUnderPointer);
                    });
                }
            }
            else {
                this.selectUnitsInside(this.corner, this.getMousePointer());
            }
            this.corner = null;
            this.graphics.clear();
            this.isDoubleClick = true;
            if (this.timerDoubleClick) {
                this.timeEvents.remove(this.timerDoubleClick);
            }
            this.timerDoubleClick = this.timeEvents.add(0.3 * Phaser.Timer.SECOND, () => {
                this.isDoubleClick = false;
            }, this);
        }
        if (this.rightButton.isDown) {
            this.worldKnowledge.getSelectedArmies().forEach((source) => {
                source.updateStateAfterClick(new PIXI.Point(Cell_1.Cell.realToCell(this.getMousePointer().x), Cell_1.Cell.realToCell(this.getMousePointer().y)));
            });
        }
        if (null !== this.corner) {
            this.graphics.clear();
            this.graphics.beginFill(0x00ff00);
            this.graphics.alpha = 0.5;
            this.graphics.drawRect(this.corner.x, this.corner.y, this.getMousePointer().x - this.corner.x, this.getMousePointer().y - this.corner.y);
        }
    }
    selectUnitsInside(corner, mousePointer, constructor = null) {
        const left = Math.min(corner.x, mousePointer.x);
        const right = Math.max(corner.x, mousePointer.x);
        const top = Math.min(corner.y, mousePointer.y);
        const bottom = Math.max(corner.y, mousePointer.y);
        this.worldKnowledge.getArmies().forEach((unit) => {
            let isInside = false;
            if (unit.isVisible() &&
                unit.getPlayer() === this.player &&
                (null === constructor || unit.constructor === constructor)) {
                isInside = unit.isInside(left, right, top, bottom);
            }
            unit.setSelected(isInside);
        });
    }
}
exports.Selector = Selector;
//# sourceMappingURL=Selector.js.map