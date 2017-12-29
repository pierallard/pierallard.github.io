"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
exports.GROUND_SIZE = 20;
class Ground {
    constructor() {
        this.obstacles = [];
    }
    create(game) {
        this.map = game.add.tilemap('basicmap');
        this.map.addTilesetImage('GrasClif', 'GrasClif');
        this.map.addTilesetImage('GrssMisc', 'GrssMisc');
        let layer = this.map.createLayer('layer');
        layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(layer);
        this.initializeObstacles();
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.x >= this.map.width || position.y < 0 || position.y >= this.map.height) {
            return false;
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === position.x && this.obstacles[i].y === position.y) {
                return false;
            }
        }
        return true;
    }
    getGroundWidth() {
        return this.map.widthInPixels * Play_1.SCALE;
    }
    getGroundHeight() {
        return this.map.heightInPixels * Play_1.SCALE;
    }
    initializeObstacles() {
        for (let x = 0; x < this.map.width; x++) {
            for (let y = 0; y < this.map.height; y++) {
                let index = this.map.getTile(x, y).index;
                if (index !== 13) {
                    this.obstacles.push(new PIXI.Point(x, y));
                }
            }
        }
    }
}
exports.Ground = Ground;
//# sourceMappingURL=Ground.js.map