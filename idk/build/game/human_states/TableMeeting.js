"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableMeeting {
    constructor(humans, time, table) {
        this.time = time;
        this.places = [];
        this.table = table;
        let unusedReferers = table.getUnusedReferers();
        if (unusedReferers.length < humans.length) {
            debugger;
        }
        for (let i = 0; i < unusedReferers.length; i++) {
            this.places.push({
                human: humans[i],
                position: unusedReferers[i]
            });
        }
    }
    getCell(human) {
        for (let i = 0; i < this.places.length; i++) {
            if (human === this.places[i].human) {
                return this.places[i].position;
            }
        }
        debugger;
        throw 'No cell found for this human!';
    }
    isReady() {
        for (let i = 0; i < this.places.length; i++) {
            const human = this.places[i].human;
            const position = this.places[i].position.getPosition();
            if (human.isMoving() || human.getPosition().x !== position.x || human.getPosition().y !== position.y) {
                return false;
            }
        }
        return true;
    }
    getTime() {
        return this.time;
    }
    getAnotherHumans(human) {
        let anotherHumans = [];
        this.places.forEach((place) => {
            if (place.human !== human) {
                anotherHumans.push(place.human);
            }
        });
        return anotherHumans;
    }
    getTable() {
        return this.table;
    }
    aPlaceWasTakenBySomeoneElse() {
        for (let i = 0; i < this.places.length; i++) {
            const currentHuman = this.table.getHumanAt(this.places[i].position.getIdentifier());
            if (currentHuman && currentHuman !== this.places[i].human) {
                console.log('Place ' + i + ' was taken ! Cancel meeting!');
                return true;
            }
        }
        return false;
    }
}
exports.TableMeeting = TableMeeting;
//# sourceMappingURL=TableMeeting.js.map