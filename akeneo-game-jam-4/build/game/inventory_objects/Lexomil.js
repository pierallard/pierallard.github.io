"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Steak_1 = require("./Steak");
class Lexomil extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Lexomil.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Steak_1.Steak.IDENTIFIER) {
            this.play.getInventory().activeItem('steaklexomil');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'lexomil';
    }
}
exports.Lexomil = Lexomil;
//# sourceMappingURL=Lexomil.js.map