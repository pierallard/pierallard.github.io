"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const Play_1 = require("../game_state/Play");
const TiberiumPlant_1 = require("../sprite/TiberiumPlant");
const Distance_1 = require("../computing/Distance");
const RADIUS = 6;
class TiberiumSource {
    constructor(worldKnowledge, cellPosition) {
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.plants = [];
    }
    create(game, groups) {
        this.game = game;
        this.group = groups[Play_1.GROUP.UNIT];
        this.sprite = game.add.sprite(Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'GrssMisc-2060', 0);
        this.sprite.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.sprite.anchor.setTo(0.5, 5 / 6);
        groups[Play_1.GROUP.GROUND].add(this.sprite);
        for (let i = 0; i < 20; i++) {
            this.spread();
        }
    }
    spread() {
        let attempts = 100;
        let spreaded = false;
        while (!spreaded && attempts > 0) {
            const newTry = new PIXI.Point(Math.ceil(RADIUS * 2 * Math.random() + this.cellPosition.x - RADIUS), Math.ceil(RADIUS * 2 * Math.random() + this.cellPosition.y - RADIUS));
            if (Distance_1.Distance.to(this.cellPosition, newTry) <= RADIUS && null === this.worldKnowledge.getGroundAt(newTry)) {
                const newPlant = new TiberiumPlant_1.TiberiumPlant(this, this.game, newTry.x, newTry.y);
                this.worldKnowledge.addGroundElement(newPlant);
                this.plants.push(newPlant);
                spreaded = true;
            }
            attempts--;
        }
    }
    setVisible(value) {
    }
    isVisible() {
        return true;
    }
    getPlayer() {
        return null;
    }
    destroy() {
    }
    getCellPositions() {
        return [this.cellPosition];
    }
    isEmpty() {
        for (let i = 0; i < this.plants.length; i++) {
            if (!this.plants[i].isEmpty()) {
                return false;
            }
        }
        return true;
    }
    getFreePlants(harvester) {
        return this.plants.filter((plant) => {
            const unit = this.worldKnowledge.getGroundArmyAt(plant.getCellPositions()[0]);
            return unit === null || unit === harvester;
        });
    }
    remove(tiberiumPlant) {
        const index = this.plants.indexOf(tiberiumPlant);
        this.plants.splice(index, 1);
    }
    update() {
        // TODO Do Spread every x seconds
    }
    isSelected() {
        return false;
    }
    setSelected(b) {
    }
    updateStateAfterClick(point) {
    }
    isInside(left, right, top, bottom) {
        return false;
    }
    lostLife(life) {
    }
    isAlive() {
        return true;
    }
    isOnGround() {
        return true;
    }
}
exports.TiberiumSource = TiberiumSource;
//# sourceMappingURL=TiberiumSource.js.map