"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const ZippoSec_1 = require("./ZippoSec");
class BouteilleAlcool extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, BouteilleAlcool.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === ZippoSec_1.ZippoSec.IDENTIFIER) {
            this.play.getInventory().activeItem('zippo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'bouteille';
    }
}
exports.BouteilleAlcool = BouteilleAlcool;
//# sourceMappingURL=BouteilleAlcool.js.map