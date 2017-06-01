"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Lamp_1 = require("./Lamp");
const Couteau_1 = require("./Couteau");
const TalkAction_1 = require("../actions/TalkAction");
class Rallonge extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Rallonge.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Couteau_1.Couteau.IDENTIFIER) {
            this.play.getInventory().activeItem('rallongecoupee');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp_1.Lamp.IDENTIFIER) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), "C'est une lampe 12V, pas 220V")];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'rallonge';
    }
}
exports.Rallonge = Rallonge;
//# sourceMappingURL=Rallonge.js.map