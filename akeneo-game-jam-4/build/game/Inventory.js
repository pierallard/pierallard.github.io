"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const InventoryObject_1 = require("./inventory_objects/InventoryObject");
const Steak_1 = require("./inventory_objects/Steak");
const Lexomil_1 = require("./inventory_objects/Lexomil");
const Battery_1 = require("./inventory_objects/Battery");
const Lamp_1 = require("./inventory_objects/Lamp");
const BouteilleAlcool_1 = require("./inventory_objects/BouteilleAlcool");
const ZippoSec_1 = require("./inventory_objects/ZippoSec");
const Tabac_1 = require("./inventory_objects/Tabac");
const Cannabis_1 = require("./inventory_objects/Cannabis");
const TabacBeuh_1 = require("./inventory_objects/TabacBeuh");
const Feuilles_1 = require("./inventory_objects/Feuilles");
const Rallonge_1 = require("./inventory_objects/Rallonge");
const Couteau_1 = require("./inventory_objects/Couteau");
const INVENTORY_SIZE = (16 + 8) * 4;
const COLUMNS = 4;
const LINES = 2;
class Inventory {
    constructor(play) {
        this.items = [];
        this.play = play;
        this.table = 0;
        this.page = 0;
    }
    create() {
        this.inventoryGroup = this.play.game.add.group();
        for (let i = 0; i < COLUMNS * LINES; i++) {
            let position = Inventory.getPosition(i);
            let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, 'inventory');
            sprite.scale.setTo(app_1.SimpleGame.SCALE);
            sprite.anchor.setTo(0.5);
            this.play.add.existing(sprite);
            this.inventoryGroup.add(sprite);
        }
        let top = new Phaser.Sprite(this.play.game, app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_up');
        top.scale.setTo(app_1.SimpleGame.SCALE);
        top.anchor.setTo(1, 1);
        top.inputEnabled = true;
        top.events.onInputDown.add(this.pageDown, this);
        let bottom = new Phaser.Sprite(this.play.game, app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_down');
        bottom.scale.setTo(app_1.SimpleGame.SCALE);
        bottom.anchor.setTo(1, 0);
        bottom.inputEnabled = true;
        bottom.events.onInputDown.add(this.pageUp, this);
        this.play.add.existing(top);
        this.play.add.existing(bottom);
        this.createObjects();
    }
    createObjects() {
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'icesteak'));
        this.addObject(new Steak_1.Steak(this.play));
        this.addObject(new Lexomil_1.Lexomil(this.play));
        this.addObject(new Battery_1.Battery(this.play));
        this.addObject(new Lamp_1.Lamp(this.play));
        this.addObject(new BouteilleAlcool_1.BouteilleAlcool(this.play));
        this.addObject(new ZippoSec_1.ZippoSec(this.play));
        this.addObject(new Tabac_1.Tabac(this.play));
        this.addObject(new Cannabis_1.Cannabis(this.play));
        this.addObject(new TabacBeuh_1.TabacBeuh(this.play));
        this.addObject(new Feuilles_1.Feuilles(this.play));
        this.addObject(new Rallonge_1.Rallonge(this.play));
        this.addObject(new Couteau_1.Couteau(this.play));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'bedo'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'steaklexomil'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'engrais'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'gode'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'escabeauInventory'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'perceuse'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'sachet'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'lampePiles'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'dvdporno'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'zippo'));
        this.addObject(new InventoryObject_1.InventoryObject(this.play, 'rallongecoupee'));
    }
    pageUp() {
        if (this.page <= 2) {
            this.page++;
            this.update();
        }
    }
    pageDown() {
        if (this.page > 0) {
            this.page--;
            this.update();
        }
    }
    addObject(object) {
        this.items.push(object);
        this.inventoryGroup.add(object.getSprite());
    }
    activeItem(identifier) {
        this.getInventoryObject(identifier).setActive(true);
        this.update();
    }
    removeItem(item) {
        if (this.play.getCursor().getInventoryObject() === item) {
            this.play.getCursor().detach();
        }
        this.items = this.items.filter(function (obj) {
            return item !== obj;
        });
        item.destroy();
        this.update();
    }
    update() {
        let i = 0;
        this.items.forEach(function (item) {
            if (item.isActive()) {
                if (Math.floor(i / (COLUMNS * LINES)) === this.page) {
                    let position = Inventory.getPosition(i);
                    item.setPosition(position.x, position.y);
                    item.display();
                }
                else {
                    item.hide();
                }
                i++;
            }
            else {
                item.hide();
            }
        }.bind(this));
    }
    static getPosition(i) {
        let x = i % (COLUMNS * LINES) % COLUMNS;
        let y = Math.floor(i % (COLUMNS * LINES) / COLUMNS);
        return new Phaser.Point(app_1.SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE + (x + 0.5) * INVENTORY_SIZE, app_1.SimpleGame.HEIGHT - LINES * INVENTORY_SIZE + (y + 0.5) * INVENTORY_SIZE);
    }
    getInventoryObject(identifier) {
        for (let i = 0; i < this.items.length; i++) {
            let object = this.items[i];
            if (object.getIdentifier() === identifier) {
                return object;
            }
        }
        return null;
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=Inventory.js.map