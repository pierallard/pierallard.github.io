"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Tabac_1 = require("./Tabac");
class Cannabis extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Cannabis.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Tabac_1.Tabac.IDENTIFIER) {
            this.play.getInventory().activeItem('tabacbeuh');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'cannabis';
    }
}
exports.Cannabis = Cannabis;
//# sourceMappingURL=Cannabis.js.map