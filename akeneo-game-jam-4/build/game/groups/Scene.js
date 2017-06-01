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
const Verb_1 = require("../verbs/Verb");
const FinalAnim_1 = require("../scene_objects/FinalAnim");
class Scene {
    constructor(play) {
        this.play = play;
        this.objects = [];
        this.group = new Phaser.Group(this.play.game, null, 'Main Group');
        this.group.x = MoveAction_1.MoveAction.getLimitsCenter();
    }
    createWithBaby(baby) {
        this.play.game.add.existing(this.group);
        this.createClouds();
        let sprite = this.play.game.add.sprite(0, 0, 'background', null, this.group);
        sprite.scale.setTo(app_1.SimpleGame.SCALE);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);
        this.createObjects();
        this.group.addMultiple(baby.getSprites());
        this.createObjectSecond();
    }
    move(ignore, pointer) {
        if (this.play.getVerbRepository().getCurrentVerb().getName() === Verb_1.Verb.WALK_TO) {
            this.play.getActionManager().addAction(new MoveAction_1.MoveAction(this.play, pointer.position.x));
        }
    }
    update() {
        this.group.update();
        this.clouds.x = (this.clouds.x + 0.2) % (169 * app_1.SimpleGame.SCALE);
    }
    getPosition() {
        return this.group.position;
    }
    setPositionX(x) {
        this.group.x = x;
    }
    createClouds() {
        this.clouds = new Phaser.TileSprite(this.play.game, 0, 48, 590 * app_1.SimpleGame.SCALE, 54, 'clouds');
        this.clouds.scale = new Phaser.Point(app_1.SimpleGame.SCALE, app_1.SimpleGame.SCALE);
        this.group.add(this.clouds);
    }
    addObject(object) {
        this.group.add(object.getSprite());
        this.objects.push(object);
    }
    createObjects() {
        this.addObject(new Prise_1.Prise(this.play));
        this.addObject(new Fridge_1.Fridge(this.play));
        this.addObject(new Cupboard_1.Cupboard(this.play));
        this.addObject(new Microwave_1.Microwave(this.play));
        this.addObject(new Bowl_1.Bowl(this.play));
        this.addObject(new GarageDoor_1.GarageDoor(this.play));
        this.addObject(new Dog_1.Dog(this.play));
        this.addObject(new BedroomDoor_1.BedroomDoor(this.play));
        this.addObject(new Chain_1.Chain(this.play));
        this.addObject(new Pot_1.Pot(this.play));
        this.addObject(new Four_1.Four(this.play));
        this.addObject(new Bouteille_1.Bouteille(this.play));
        this.addObject(new Father_1.Father(this.play));
        this.addObject(new Mother_1.Mother(this.play));
        this.addObject(new OutDoor_1.OutDoor(this.play));
        this.addObject(new FinalAnim_1.FinalAnim(this.play));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'lexomil', 380 * app_1.SimpleGame.SCALE, 55 * app_1.SimpleGame.SCALE, 'lexomil', 'lexomil'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'coldMeat', 295 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'icesteak', 'icesteak', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'engrais', 270 * app_1.SimpleGame.SCALE, 45 * app_1.SimpleGame.SCALE, 'engrais', 'engrais', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'feuilles', 45 * app_1.SimpleGame.SCALE, 47 * app_1.SimpleGame.SCALE, 'feuilles', 'feuilles'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'knife', 234 * app_1.SimpleGame.SCALE, 26 * app_1.SimpleGame.SCALE, 'knife', 'knife'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'neon', 42 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'neon', 'neon'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'gode', 516 * app_1.SimpleGame.SCALE, 29 * app_1.SimpleGame.SCALE, 'gode', 'gode'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'rallonge', 71 * app_1.SimpleGame.SCALE, 46 * app_1.SimpleGame.SCALE, 'rallonge', 'rallonge'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'tabac', 570 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'tabac', 'tabac'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'escabeau', 5 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'escabeau', 'escabeauInventory'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'perceuse', 89 * app_1.SimpleGame.SCALE, 30 * app_1.SimpleGame.SCALE, 'perceuse', 'perceuse'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'sachet', 395 * app_1.SimpleGame.SCALE, 51 * app_1.SimpleGame.SCALE, 'sachet', 'sachet'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'potfull', 218 * app_1.SimpleGame.SCALE, 36 * app_1.SimpleGame.SCALE, 'potfull', 'cannabis', false));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'zipposec', 254 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'zipposec', 'zipposec'));
        this.addObject(new PickableObject_1.PickableObject(this.play, 'dvdporno', 500 * app_1.SimpleGame.SCALE, 25 * app_1.SimpleGame.SCALE, 'dvdporno', 'dvdporno'));
    }
    createObjectSecond() {
        this.addObject(new DVDPlayer_1.DVDPlayer(this.play));
        let walls = new Phaser.Sprite(this.play.game, 0, 0, 'backgroundwalls');
        walls.scale.set(app_1.SimpleGame.SCALE);
        this.group.add(walls);
    }
    getObject(objectIdentifier) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getIdentifier() === objectIdentifier) {
                return this.objects[i];
            }
        }
        return null;
    }
}
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map