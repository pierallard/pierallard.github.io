"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Verb_1 = require("./Verb");
const app_1 = require("../../app");
const PANEL_WIDTH = 400 - 12 * 4;
const PANEL_HEIGHT = 100;
class VerbRepository {
    constructor(play) {
        this.items = [];
        this.play = play;
    }
    create() {
        this.items = [
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb_1.Verb.WALK_TO),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4 * 3, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb_1.Verb.LOOK_AT),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb_1.Verb.PICK_UP),
            new Verb_1.Verb(this, this.play.game, PANEL_WIDTH / 4 * 3, app_1.SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb_1.Verb.USE)
        ];
        this.items.forEach(function (verb) {
            this.play.add.existing(verb);
        }.bind(this));
        this.setCurrentVerb(this.items[0]);
    }
    update() {
        this.items.forEach(function (verb, i) {
            let f = verb.style;
            f.fill = (verb === this.currentItem) ? '#639bff' : '#306082';
            verb.setStyle(f);
            verb.text = verb.getLabel();
        }.bind(this));
    }
    setCurrentVerb(verb) {
        if (false === this.play.getActionManager().hasAction()) {
            this.currentItem = verb;
            this.play.getSentence().setVerb(this.currentItem);
            this.update();
        }
    }
    getCurrentVerb() {
        return this.currentItem;
    }
    setCurrentVerbName(verbName) {
        this.setCurrentVerb(this.items.find(function (verb) {
            return verb.getName() === verbName;
        }));
    }
}
exports.VerbRepository = VerbRepository;
//# sourceMappingURL=VerbRepository.js.map