"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Feuilles_1 = require("./Feuilles");
class TabacBeuh extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, TabacBeuh.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Feuilles_1.Feuilles.IDENTIFIER) {
            this.play.getInventory().activeItem('bedo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'tabacbeuh';
    }
}
exports.TabacBeuh = TabacBeuh;
//# sourceMappingURL=TabacBeuh.js.map