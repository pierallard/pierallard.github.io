"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = require("../actions/MoveAction");
const Fridge_1 = require("../scene_objects/Fridge");
const Cupboard_1 = require("../scene_objects/Cupboard");
const Microwave_1 = require("../scene_objects/Microwave");
const Bowl_1 = require("../scene_objects/Bowl");
const GarageDoor_1 = require("../scene_objects/GarageDoor");
const Dog_1 = require("../scene_objects/Dog");
const PickableObject_1 = require("../scene_objects/PickableObject");
const Chain_1 = require("../scene_objects/Chain");
const BedroomDoor_1 = require("../scene_objects/BedroomDoor");
const Pot_1 = require("../scene_objects/Pot");
const Four_1 = require("../scene_objects/Four");
const Bouteille_1 = require("../scene_objects/Bouteille");
const DVDPlayer_1 = require("../scene_objects/DVDPlayer");
const Father_1 = require("../scene_objects/Father");
const Mother_1 = require("../scene_objects/Mother");
const OutDoor_1 = require("../scene_objects/OutDoor");
const Prise_1 = require("../scene_objects/Prise");
const app_1 = require("../../app");
class MainGroup extends Phaser.Group {
    constructor(play) {
        super(play.game, null, 'Main Group');
        this.play = play;
        this.x = MoveAction_1.MoveAction.getLimitsCenter();
    }
    update() {
        super.update();
        this.clouds.x = (this.clouds.x + 0.2) % (169 * app_1.SimpleGame.SCALE);
    }
    createBackground() {
        this.clouds = new Phaser.TileSprite(this.play.game, 0, 48, 590 * app_1.SimpleGame.SCALE, 54, 'clouds');
        this.clouds.scale = new Phaser.Point(app_1.SimpleGame.SCALE, app_1.SimpleGame.SCALE);
        this.add(this.clouds);
    }
    createObjects() {
        this.add(new Prise_1.Prise(this.play));
        this.add(new Fridge_1.Fridge(this.play));
        this.add(new Cupboard_1.Cupboard(this.play));
        this.add(new Microwave_1.Microwave(this.play));
        this.add(new Bowl_1.Bowl(this.play));
        this.add(new GarageDoor_1.GarageDoor(this.play));
        this.add(new Dog_1.Dog(this.play));
        this.add(new BedroomDoor_1.BedroomDoor(this.play));
        this.add(new Chain_1.Chain(this.play));
        this.add(new Pot_1.Pot(this.play));
        this.add(new Four_1.Four(this.play));
        this.add(new Bouteille_1.Bouteille(this.play));
        this.add(new Father_1.Father(this.play));
        this.add(new Mother_1.Mother(this.play));
        this.add(new OutDoor_1.OutDoor(this.play));
        this.add(new PickableObject_1.PickableObject(this.play, 'lexomil', 'un medicament', 380 * app_1.SimpleGame.SCALE, 55 * app_1.SimpleGame.SCALE, 'lexomil', 'lexomil'));
        this.add(new PickableObject_1.PickableObject(this.play, 'coldMeat', 'le steak surgele', 295 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'icesteak', 'icesteak', false));
        this.add(new PickableObject_1.PickableObject(this.play, 'engrais', 'la bouteille', 270 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'engrais', 'engrais', false));
        this.add(new PickableObject_1.PickableObject(this.play, 'feuilles', 'les feuilles', 45 * app_1.SimpleGame.SCALE, 47 * app_1.SimpleGame.SCALE, 'feuilles', 'feuilles'));
        this.add(new PickableObject_1.PickableObject(this.play, 'knife', 'le couteau', 234 * app_1.SimpleGame.SCALE, 26 * app_1.SimpleGame.SCALE, 'knife', 'knife'));
        this.add(new PickableObject_1.PickableObject(this.play, 'neon', 'une lampe', 42 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'neon', 'neon'));
        this.add(new PickableObject_1.PickableObject(this.play, 'gode', 'un jouet', 516 * app_1.SimpleGame.SCALE, 29 * app_1.SimpleGame.SCALE, 'gode', 'gode'));
        this.add(new PickableObject_1.PickableObject(this.play, 'rallonge', 'une rallonge', 71 * app_1.SimpleGame.SCALE, 46 * app_1.SimpleGame.SCALE, 'rallonge', 'rallonge'));
        this.add(new PickableObject_1.PickableObject(this.play, 'tabac', 'une clope', 570 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'tabac', 'tabac'));
        this.add(new PickableObject_1.PickableObject(this.play, 'escabeau', "l'escabeau", 5 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'escabeau', 'escabeauInventory'));
        this.add(new PickableObject_1.PickableObject(this.play, 'perceuse', 'la perceuse', 89 * app_1.SimpleGame.SCALE, 30 * app_1.SimpleGame.SCALE, 'perceuse', 'perceuse'));
        this.add(new PickableObject_1.PickableObject(this.play, 'sachet', 'le sachet de graines', 395 * app_1.SimpleGame.SCALE, 51 * app_1.SimpleGame.SCALE, 'sachet', 'sachet'));
        this.add(new PickableObject_1.PickableObject(this.play, 'potfull', 'la tournee de beuh', 218 * app_1.SimpleGame.SCALE, 36 * app_1.SimpleGame.SCALE, 'potfull', 'cannabis', false));
        this.add(new PickableObject_1.PickableObject(this.play, 'zipposec', 'le zippo sec', 254 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'zipposec', 'zipposec'));
        this.add(new PickableObject_1.PickableObject(this.play, 'dvdporno', 'le DVD', 500 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'dvdporno', 'dvdporno'));
    }
    createObjectSecond() {
        this.add(new DVDPlayer_1.DVDPlayer(this.play));
        let walls = new Phaser.Sprite(this.play.game, 0, 0, 'backgroundwalls');
        walls.scale.set(app_1.SimpleGame.SCALE);
        this.add(walls);
    }
    getObject(objectIdentifier) {
        for (let i = 0; i < this.children.length; i++) {
            if (typeof this.children[i]['getIdentifier'] == 'function') {
                let object = this.children[i];
                if (object.getIdentifier() === objectIdentifier) {
                    return object;
                }
            }
        }
        return null;
    }
}
exports.MainGroup = MainGroup;
//# sourceMappingURL=MainGroup.js.map