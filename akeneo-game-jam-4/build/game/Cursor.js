"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = require("./verbs/Verb");
const app_1 = require("../app");
class Cursor extends Phaser.Sprite {
    constructor(play_) {
        super(play_.game, 0, 0, 'cursor');
        this.play_ = play_;
        this.anchor.setTo(0.5);
        this.scale.setTo(app_1.SimpleGame.SCALE);
        this.inventoryObject = null;
        play_.game.add.existing(this);
    }
    update() {
        let position = this.game.input.mousePointer;
        let positionX = Math.round(position.worldX / app_1.SimpleGame.SCALE) * app_1.SimpleGame.SCALE + 2;
        let positionY = Math.round(position.worldY / app_1.SimpleGame.SCALE) * app_1.SimpleGame.SCALE + 2;
        this.position.set(positionX, positionY);
        if (this.inventoryObject) {
            this.inventoryObject.updatePosition(positionX, positionY);
        }
    }
    attach(inventoryObject) {
        if (null !== this.inventoryObject) {
            this.detach();
        }
        this.play_.getVerbRepository().setCurrentVerbName(Verb_1.Verb.USE);
        this.play_.getSentence().setObject(inventoryObject);
        this.inventoryObject = inventoryObject;
    }
    detach() {
        if (null !== this.inventoryObject) {
            this.inventoryObject.detach();
            this.inventoryObject = null;
            this.play_.getVerbRepository().setCurrentVerbName(Verb_1.Verb.WALK_TO);
        }
    }
    getInventoryObject() {
        return this.inventoryObject;
    }
}
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map