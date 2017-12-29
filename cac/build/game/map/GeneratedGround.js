"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
exports.GROUND_WIDTH = 80;
exports.GROUND_HEIGHT = 80;
var TERRAIN;
(function (TERRAIN) {
    TERRAIN[TERRAIN["SNOW"] = 312] = "SNOW";
    TERRAIN[TERRAIN["ICE"] = 212] = "ICE";
    TERRAIN[TERRAIN["CRATER"] = 412] = "CRATER";
    TERRAIN[TERRAIN["ICE_BREAK2"] = 512] = "ICE_BREAK2";
    TERRAIN[TERRAIN["GRASS"] = 640] = "GRASS";
    TERRAIN[TERRAIN["WATER"] = 612] = "WATER";
    TERRAIN[TERRAIN["MOUNTAIN"] = 712] = "MOUNTAIN";
    TERRAIN[TERRAIN["STONE"] = 930] = "STONE";
})(TERRAIN || (TERRAIN = {}));
class GeneratedGround {
    constructor() {
        this.collisions = [];
        this.tiles = {
            312: [TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW],
            212: [TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE],
            412: [TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER],
            640: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS],
            612: [TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER],
            712: [TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN],
            930: [TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE],
        };
        this.collisions.push(TERRAIN.WATER);
        this.initializeTiles();
    }
    static generateNoises(max) {
        const maps = [];
        for (let i = 0; i <= max; i++) {
            maps.push(this.generateNoise(i));
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                let value = 0;
                let count = 0;
                for (let i = 0; i <= max; i++) {
                    value += maps[i][y][x] * i;
                    count += i;
                }
                resultLine.push(value / count);
            }
            result.push(resultLine);
        }
        return result;
    }
    static generateNoise(power) {
        const littleMapWidth = Math.ceil(exports.GROUND_WIDTH / Math.pow(2, power));
        const littleMapHeight = Math.ceil(exports.GROUND_HEIGHT / Math.pow(2, power));
        const littleMap = [];
        for (let y = 0; y <= littleMapWidth; y++) {
            const littleMapLine = [];
            for (let x = 0; x <= littleMapHeight; x++) {
                littleMapLine.push(Math.random());
            }
            littleMap.push(littleMapLine);
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                resultLine.push(littleMap[Math.floor(y / Math.pow(2, power))][Math.floor(x / Math.pow(2, power))]);
            }
            result.push(resultLine);
        }
        return this.fluzz(result, Math.floor(Math.pow(2, power) / 2));
    }
    static fluzz(cells, radius) {
        const result = [];
        for (let y = 0; y <= exports.GROUND_WIDTH; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_HEIGHT; x++) {
                resultLine.push(this.getAvgAroundCellValues(cells, radius, x, y));
            }
            result.push(resultLine);
        }
        return result;
    }
    static getAvgAroundCellValues(cells, radius, startX, startY) {
        const cellsValues = [];
        for (let y = startY - radius; y <= startY + radius; y++) {
            for (let x = startX - radius; x <= startX + radius; x++) {
                if (y >= 0 && x >= 0 && y <= exports.GROUND_WIDTH && x <= exports.GROUND_HEIGHT) {
                    cellsValues.push(cells[y][x]);
                }
            }
        }
        return cellsValues.reduce((cell, previousval) => {
            return cell + previousval;
        }, 0) / cellsValues.length;
    }
    create(game) {
        this.createFakeData2();
        let data = this.getCSV();
        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);
        this.map = game.add.tilemap('dynamicMap', 20, 20, exports.GROUND_WIDTH, exports.GROUND_HEIGHT);
        this.map.addTilesetImage('GrasClif', 'GrasClif', 20, 20, 0, 0, 0);
        this.map.addTilesetImage('GrssMisc', 'GrssMisc', 20, 20, 0, 0, 100);
        this.map.addTilesetImage('Ice2Snow', 'Ice2Snow', 20, 20, 0, 0, 200);
        this.map.addTilesetImage('Snow', 'Snow', 20, 20, 0, 0, 300);
        this.map.addTilesetImage('Snw2Crtb', 'Snw2Crtb', 20, 20, 0, 0, 400);
        this.map.addTilesetImage('IceBrk2', 'IceBrk2', 20, 20, 0, 0, 500);
        this.map.addTilesetImage('Grs2Watr', 'Grs2Watr', 20, 20, 0, 0, 600);
        this.map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', 20, 20, 0, 0, 700);
        this.map.addTilesetImage('Snw2Mnt', 'Snw2Mnt', 20, 20, 0, 0, 800);
        this.map.addTilesetImage('Stn2SnwB', 'Stn2SnwB', 20, 20, 0, 0, 900);
        let layer = this.map.createLayer(0);
        layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(layer);
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.y < 0) {
            return false;
        }
        const value = this.generatedTiles[position.y][position.x];
        return this.collisions.indexOf(value) <= -1;
    }
    getGroundWidth() {
        return this.map.widthInPixels * Play_1.SCALE;
    }
    getGroundHeight() {
        return this.map.heightInPixels * Play_1.SCALE;
    }
    getCSV() {
        if (this.generatedTiles !== null) {
            this.generatedTiles = [];
            for (let y = 0; y < exports.GROUND_HEIGHT; y++) {
                let line = [];
                for (let x = 0; x < exports.GROUND_WIDTH; x++) {
                    line.push(this.getTileNumber(this.getCorners(x, y)));
                }
                this.generatedTiles.push(line);
            }
        }
        return this.generatedTiles.map((line) => {
            return line.join(',');
        }).join("\n");
    }
    initializeTiles() {
        this.generate(200, TERRAIN.SNOW, TERRAIN.ICE, true);
        this.generate(400, TERRAIN.SNOW, TERRAIN.CRATER, true);
        this.generate(500, TERRAIN.ICE, TERRAIN.ICE_BREAK2, false);
        this.generate(600, TERRAIN.GRASS, TERRAIN.WATER, true, true);
        this.generate(700, TERRAIN.MOUNTAIN, TERRAIN.GRASS, true);
        this.generate(800, TERRAIN.MOUNTAIN, TERRAIN.SNOW, true);
        this.generate(900, TERRAIN.STONE, TERRAIN.SNOW, true);
    }
    generate(startNumber, terrain1, terrain2, rightGap = true, isCollision = false) {
        let result = {};
        result[startNumber] = [terrain1, terrain1, terrain2, terrain1];
        result[startNumber + 2] = [terrain1, terrain1, terrain2, terrain2];
        result[startNumber + 4] = [terrain1, terrain1, terrain1, terrain2];
        result[startNumber + 10] = [terrain1, terrain2, terrain2, terrain1];
        result[startNumber + 14] = [terrain2, terrain1, terrain1, terrain2];
        result[startNumber + 20] = [terrain1, terrain2, terrain1, terrain1];
        result[startNumber + 22] = [terrain2, terrain2, terrain1, terrain1];
        result[startNumber + 24] = [terrain2, terrain1, terrain1, terrain1];
        result[startNumber + (rightGap ? 32 : 30)] = [terrain1, terrain2, terrain2, terrain2];
        result[startNumber + (rightGap ? 34 : 32)] = [terrain2, terrain1, terrain2, terrain2];
        result[startNumber + (rightGap ? 42 : 40)] = [terrain2, terrain2, terrain2, terrain1];
        result[startNumber + (rightGap ? 44 : 42)] = [terrain2, terrain2, terrain1, terrain2];
        if (isCollision) {
            this.collisions.push(startNumber);
            this.collisions.push(startNumber + 2);
            this.collisions.push(startNumber + 4);
            this.collisions.push(startNumber + 10);
            this.collisions.push(startNumber + 14);
            this.collisions.push(startNumber + 20);
            this.collisions.push(startNumber + 22);
            this.collisions.push(startNumber + 24);
            this.collisions.push(startNumber + (rightGap ? 32 : 30));
            this.collisions.push(startNumber + (rightGap ? 34 : 32));
            this.collisions.push(startNumber + (rightGap ? 42 : 40));
            this.collisions.push(startNumber + (rightGap ? 44 : 42));
        }
        this.tiles = Object.assign(this.tiles, result);
    }
    createFakeData2() {
        this.cornersMap = [];
        const noises = GeneratedGround.generateNoises(4);
        let min = 1;
        let max = 0;
        for (let y = 0; y < noises.length; y++) {
            for (let x = 0; x < noises[y].length; x++) {
                min = Math.min(noises[y][x], min);
                max = Math.max(noises[y][x], max);
            }
        }
        const terrains = [TERRAIN.WATER, TERRAIN.GRASS, TERRAIN.MOUNTAIN, TERRAIN.SNOW, TERRAIN.STONE];
        const step = (max - min) / terrains.length;
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            let line = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                let val = 0;
                for (let i = 0; i < 5; i++) {
                    if (noises[y][x] >= min + i * step && noises[y][x] <= min + (i + 1) * step) {
                        val = terrains[i];
                    }
                }
                line.push(val);
            }
            this.cornersMap.push(line);
        }
    }
    getCorners(x, y) {
        return [
            this.cornersMap[y][x],
            this.cornersMap[y][x + 1],
            this.cornersMap[y + 1][x + 1],
            this.cornersMap[y + 1][x],
        ];
    }
    getTileNumber(param) {
        const keys = Object.keys(this.tiles);
        for (let i = 0; i < keys.length; i++) {
            if (this.tiles[keys[i]][0] === param[0] &&
                this.tiles[keys[i]][1] === param[1] &&
                this.tiles[keys[i]][2] === param[2] &&
                this.tiles[keys[i]][3] === param[3]) {
                return parseInt(keys[i]);
            }
        }
        return null;
    }
}
exports.GeneratedGround = GeneratedGround;
//# sourceMappingURL=GeneratedGround.js.map