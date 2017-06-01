"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const BouteilleAlcool_1 = require("./BouteilleAlcool");
class ZippoSec extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, ZippoSec.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === BouteilleAlcool_1.BouteilleAlcool.IDENTIFIER) {
            this.play.getInventory().activeItem('zippo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'zipposec';
    }
}
exports.ZippoSec = ZippoSec;
//# sourceMappingURL=ZippoSec.js.map