"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Translator_1 = require("./translations/Translator");
const app_1 = require("../app");
class LocaleSwitcher {
    constructor(play) {
        this.play = play;
        this.flags = [];
    }
    create() {
        this.createFlag('en', 760, 12);
        this.createFlag('fr', 720, 12);
    }
    createFlag(locale, x, y) {
        let flag = this.play.game.add.sprite(x, y, locale);
        flag.scale.setTo(app_1.SimpleGame.SCALE);
        flag.inputEnabled = true;
        flag.events.onInputDown.add(this.switchLocale, this);
    }
    switchLocale(origin) {
        Translator_1.Translator.setLocale(origin.key);
    }
}
exports.LocaleSwitcher = LocaleSwitcher;
//# sourceMappingURL=LocaleSwitcher.js.map