"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Lexomil_1 = require("./Lexomil");
class Steak extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Steak.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lexomil_1.Lexomil.IDENTIFIER) {
            this.play.getInventory().activeItem('steaklexomil');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'steak';
    }
}
exports.Steak = Steak;
//# sourceMappingURL=Steak.js.map