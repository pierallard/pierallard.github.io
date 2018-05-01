"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanProperties_1 = require("./HumanProperties");
const Employee_1 = require("./Employee");
const MEN = [
    'Michel',
    'Jean-Paul',
    'Jean-Louis',
    'Patrick',
    'Albert'
];
const WOMEN = [
    'Micheline',
    'Paulette',
    'Louisette',
    'Patricia',
];
var EMPLOYEE_TYPE;
(function (EMPLOYEE_TYPE) {
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["DEVELOPER"] = 0] = "DEVELOPER";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["MARKETING"] = 1] = "MARKETING";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["SALE"] = 2] = "SALE";
})(EMPLOYEE_TYPE = exports.EMPLOYEE_TYPE || (exports.EMPLOYEE_TYPE = {}));
const USE_API = false;
class HumanPropertiesFactory {
    static create(types = [
            EMPLOYEE_TYPE.DEVELOPER,
            EMPLOYEE_TYPE.MARKETING,
            EMPLOYEE_TYPE.SALE
        ]) {
        const variation = Employee_1.HUMAN_SPRITE_VARIATIONS[Math.floor(Math.random() * Employee_1.HUMAN_SPRITE_VARIATIONS.length)];
        const isWoman = ['human3'].indexOf(variation) > -1;
        const names = isWoman ? WOMEN : MEN;
        return new HumanProperties_1.HumanProperties(variation, types[Math.floor(Math.random() * types.length)], USE_API ? this.generateName(isWoman) : names[Math.floor(Math.random() * names.length)], Math.random(), Math.random(), Math.random());
    }
    static generateName(isWoman) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?gender=' + (isWoman ? 'female' : 'male') + '&nat=fr,en,de&inc=gender,name,nat', false);
        xhr.send();
        const result = JSON.parse(xhr.response).results[0];
        return (result.name.first + ' ' + result.name.last).substr(0, 15);
    }
}
exports.HumanPropertiesFactory = HumanPropertiesFactory;
//# sourceMappingURL=HumanPropertiesFactory.js.map