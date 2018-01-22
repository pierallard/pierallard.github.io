"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedGround_1 = require("./map/GeneratedGround");
const Distance_1 = require("./computing/Distance");
const FogSprite_1 = require("./sprite/FogSprite");
const UnitProperties_1 = require("./unit/UnitProperties");
const BuildingProperties_1 = require("./building/BuildingProperties");
const Unit_1 = require("./unit/Unit");
const REFRESH_TIME = 0.25 * Phaser.Timer.SECOND;
const SIGHT_RATIO = 3;
class Fog {
    constructor(worldKnowledge, player) {
        this.hasRenderedRecently = false;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.sprite = null;
        this.knownCells = [];
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            this.knownCells[y] = [];
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                this.knownCells[y][x] = false;
            }
        }
    }
    create(game, group, addSprite) {
        this.timeEvents = game.time.events;
        if (addSprite) {
            this.sprite = new FogSprite_1.FogSprite();
            this.sprite.create(game, group);
            this.updateKnownCells();
            this.sprite.initialize(this.knownCells);
        }
    }
    update() {
        if (!this.hasRenderedRecently) {
            this.updateKnownCells();
            this.hasRenderedRecently = true;
            this.timeEvents.add(REFRESH_TIME, () => {
                this.hasRenderedRecently = false;
            }, this);
            if (this.sprite) {
                this.sprite.update(this.knownCells, true);
            }
        }
        else {
            if (this.sprite) {
                this.sprite.update(this.knownCells, false);
            }
        }
    }
    getPlayer() {
        return this.player;
    }
    getKnownCells() {
        return this.knownCells;
    }
    updateKnownCells() {
        this.worldKnowledge.getPlayerArmies(this.player).forEach((unit) => {
            const sight = ((unit instanceof Unit_1.Unit) ?
                UnitProperties_1.UnitProperties.getSight(unit.constructor.name) :
                BuildingProperties_1.BuildingProperties.getSight(unit.constructor.name)) * SIGHT_RATIO;
            unit.getCellPositions().forEach((unitCell) => {
                Distance_1.Distance.getDisc(sight).forEach((cell) => {
                    const y = unitCell.y + cell.y;
                    if (undefined !== this.knownCells[y]) {
                        const x = unitCell.x + cell.x;
                        if (undefined !== this.knownCells[y][x]) {
                            this.knownCells[y][x] = true;
                        }
                    }
                });
            });
        });
    }
}
exports.Fog = Fog;
//# sourceMappingURL=Fog.js.map