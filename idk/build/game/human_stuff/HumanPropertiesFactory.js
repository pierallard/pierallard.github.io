"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanProperties_1 = require("./HumanProperties");
const NAMES = [
    'Michel',
    'Jean-Paul',
    'Jean-Louis',
    'Patrick',
    'Albert'
];
var EMPLOYEE_TYPE;
(function (EMPLOYEE_TYPE) {
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["DEVELOPER"] = 0] = "DEVELOPER";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["MARKETING"] = 1] = "MARKETING";
    EMPLOYEE_TYPE[EMPLOYEE_TYPE["SALE"] = 2] = "SALE";
})(EMPLOYEE_TYPE = exports.EMPLOYEE_TYPE || (exports.EMPLOYEE_TYPE = {}));
const USE_API = false;
class HumanPropertiesFactory {
    static create() {
        return new HumanProperties_1.HumanProperties([EMPLOYEE_TYPE.DEVELOPER, EMPLOYEE_TYPE.MARKETING, EMPLOYEE_TYPE.SALE][Math.floor(Math.random() * 3)], USE_API ? this.generateName() : NAMES[Math.floor(Math.random() * NAMES.length)], Math.random(), Math.random(), Math.random(), Math.random());
    }
    static generateName() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?nat=fr,en,de&inc=gender,name,nat', false);
        xhr.send();
        const result = JSON.parse(xhr.response).results[0];
        return (result.name.first + ' ' + result.name.last).substr(0, 15);
    }
}
exports.HumanPropertiesFactory = HumanPropertiesFactory;
//# sourceMappingURL=HumanPropertiesFactory.js.map