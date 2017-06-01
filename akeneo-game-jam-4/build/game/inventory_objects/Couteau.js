"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Rallonge_1 = require("./Rallonge");
class Couteau extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Couteau.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Rallonge_1.Rallonge.IDENTIFIER) {
            this.play.getInventory().activeItem('rallongecoupee');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'knife';
    }
}
exports.Couteau = Couteau;
//# sourceMappingURL=Couteau.js.map