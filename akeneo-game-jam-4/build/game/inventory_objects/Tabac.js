"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Cannabis_1 = require("./Cannabis");
class Tabac extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Tabac.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Cannabis_1.Cannabis.IDENTIFIER) {
            this.play.getInventory().activeItem('tabacbeuh');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'tabac';
    }
}
exports.Tabac = Tabac;
//# sourceMappingURL=Tabac.js.map