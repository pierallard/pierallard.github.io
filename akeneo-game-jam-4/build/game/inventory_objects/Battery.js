"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Lamp_1 = require("./Lamp");
class Battery extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Battery.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp_1.Lamp.IDENTIFIER) {
            this.play.getInventory().activeItem('lampePiles');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'piles';
    }
}
exports.Battery = Battery;
//# sourceMappingURL=Battery.js.map