"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
const WorldKnowledge_1 = require("./WorldKnowledge");
const Play_1 = require("./game_state/Play");
const ALPHA = 0.8;
class Cell {
    constructor(worldKnowledge, point) {
        this.worldKnowledge = worldKnowledge;
        this.position = point;
    }
    create(game, groups) {
        if (WorldKnowledge_1.DEBUG_WORLD) {
            this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'casedefault');
            this.sprite.anchor.setTo(0.5, 1);
            this.sprite.alpha = 0.5;
            groups[Play_1.GROUP_FLOOR].add(this.sprite);
        }
        this.ambianceRed = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'ambiance', 0);
        this.ambianceYellow = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'ambiance', 1);
        this.ambianceGreen = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'ambiance', 2);
        this.ambianceRed.anchor.setTo(0.5, 1);
        this.ambianceYellow.anchor.setTo(0.5, 1);
        this.ambianceGreen.anchor.setTo(0.5, 1);
        groups[Play_1.GROUP_AMBIANCE].add(this.ambianceRed);
        groups[Play_1.GROUP_AMBIANCE].add(this.ambianceYellow);
        groups[Play_1.GROUP_AMBIANCE].add(this.ambianceGreen);
    }
    update() {
        if (this.worldKnowledge.getAmbianceDisplayed()) {
            const ambiance = this.worldKnowledge.getAmbiance(this.position);
            if (ambiance <= 1) {
                this.ambianceRed.alpha = (-1 * ambiance + 1) * ALPHA;
                this.ambianceYellow.alpha = ambiance * ALPHA;
                this.ambianceGreen.alpha = 0;
            }
            else {
                this.ambianceRed.alpha = 0;
                this.ambianceYellow.alpha = (-1 * ambiance + 2) * ALPHA;
                this.ambianceGreen.alpha = (ambiance - 1) * ALPHA;
            }
        }
        else {
            this.ambianceRed.alpha = 0;
            this.ambianceYellow.alpha = 0;
            this.ambianceGreen.alpha = 0;
        }
    }
    getPosition() {
        return this.position;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map