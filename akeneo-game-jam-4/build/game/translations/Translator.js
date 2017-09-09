"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileLoader_1 = require("./FileLoader");
class Translator {
    static setLocale(locale) {
        this.locale = locale;
    }
    static initialize() {
        this.translations = [];
        FileLoader_1.getContent("translations/fr.json", data => {
            this.translations['fr'] = data;
        });
        FileLoader_1.getContent("translations/en.json", data => {
            this.translations['en'] = data;
        });
        FileLoader_1.getContent("translations/es.json", data => {
            this.translations['es'] = data;
        });
    }
    static t(key) {
        key = this.locale + '.' + key;
        let result = key;
        try {
            result = key.split('.').reduce((tree, key) => tree[key], this.translations);
        }
        catch (e) {
            console.log('Missing translation: "' + result + '"');
        }
        if (undefined === result) {
            return key;
        }
        return result;
    }
}
Translator.locale = 'fr';
exports.Translator = Translator;
//# sourceMappingURL=Translator.js.map