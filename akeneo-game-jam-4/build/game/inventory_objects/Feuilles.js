"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const TabacBeuh_1 = require("./TabacBeuh");
class Feuilles extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Feuilles.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === TabacBeuh_1.TabacBeuh.IDENTIFIER) {
            this.play.getInventory().activeItem('bedo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'feuilles';
    }
}
exports.Feuilles = Feuilles;
//# sourceMappingURL=Feuilles.js.map