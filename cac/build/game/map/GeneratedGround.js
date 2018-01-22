"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const AlternativePosition_1 = require("../computing/AlternativePosition");
exports.GROUND_WIDTH = 100;
exports.GROUND_HEIGHT = 40;
var TYPE;
(function (TYPE) {
    TYPE[TYPE["NORMAL"] = 0] = "NORMAL";
    TYPE[TYPE["VARIATION"] = 1] = "VARIATION";
})(TYPE || (TYPE = {}));
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
const MIN = 0.2;
const MAX = 0.8;
const TERRAINS = [TERRAIN.WATER, TERRAIN.GRASS, TERRAIN.MOUNTAIN, TERRAIN.SNOW, TERRAIN.STONE];
const STEP = (MAX - MIN) / TERRAINS.length;
class GeneratedGround {
    constructor() {
        this.collisions = [];
        this.tiles = {
            // Plain tiles
            312: [TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TERRAIN.SNOW, TYPE.NORMAL],
            212: [TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TERRAIN.ICE, TYPE.NORMAL],
            412: [TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TERRAIN.CRATER, TYPE.NORMAL],
            640: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.NORMAL],
            612: [TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TERRAIN.WATER, TYPE.NORMAL],
            712: [TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TERRAIN.MOUNTAIN, TYPE.NORMAL],
            930: [TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TERRAIN.STONE, TYPE.NORMAL],
            // Variations
            118: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            120: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            132: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            134: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
            136: [TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TERRAIN.GRASS, TYPE.VARIATION],
        };
        this.collisions.push(TERRAIN.WATER);
        this.initializeTiles();
    }
    static generateNoises(max, predefinedTiles) {
        const maps = [];
        for (let i = 0; i <= max; i++) {
            maps.push(this.generateNoise(i, predefinedTiles));
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
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
    static generateNoise(power, predefinedTiles) {
        const littleMapWidth = Math.ceil(exports.GROUND_WIDTH / Math.pow(2, power));
        const littleMapHeight = Math.ceil(exports.GROUND_HEIGHT / Math.pow(2, power));
        const littleMap = [];
        const littlePredefinedTiles = predefinedTiles.map((predefinedTile) => {
            return [new PIXI.Point(Math.floor(predefinedTile[0].x / Math.pow(2, power)), Math.floor(predefinedTile[0].y / Math.pow(2, power))), predefinedTile[1]];
        });
        for (let y = 0; y <= littleMapHeight; y++) {
            const littleMapLine = [];
            for (let x = 0; x <= littleMapWidth; x++) {
                let value = Math.random();
                littlePredefinedTiles.forEach((predefinedTile) => {
                    const position = predefinedTile[0];
                    if (position.x === x && position.y === y) {
                        value = GeneratedGround.textureToRand(predefinedTile[1]);
                    }
                });
                littleMapLine.push(value);
            }
            littleMap.push(littleMapLine);
        }
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                resultLine.push(littleMap[Math.floor(y / Math.pow(2, power))][Math.floor(x / Math.pow(2, power))]);
            }
            result.push(resultLine);
        }
        return this.fluzz(result, Math.floor(Math.pow(2, power) / 2) + 1);
    }
    static fluzz(cells, radius) {
        const result = [];
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            const resultLine = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
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
                if (y >= 0 && x >= 0 && y <= exports.GROUND_HEIGHT && x <= exports.GROUND_WIDTH) {
                    cellsValues.push(cells[y][x]);
                }
            }
        }
        return cellsValues.reduce((cell, previousval) => {
            return cell + previousval;
        }, 0) / cellsValues.length;
    }
    static randToTexture(rand) {
        let val = TERRAINS[TERRAINS.length - 1];
        if (rand < MIN) {
            return TERRAINS[0];
        }
        for (let i = 0; i < TERRAINS.length; i++) {
            if (rand >= MIN + i * STEP && rand <= MIN + (i + 1) * STEP) {
                val = TERRAINS[i];
            }
        }
        return val;
    }
    static textureToRand(texture) {
        const index = TERRAINS.indexOf(texture);
        return MIN + (index + 0.5) * STEP;
    }
    create(game, startPositions) {
        this.createFakeData2(startPositions.reduce((previous, startPosition) => {
            AlternativePosition_1.AlternativePosition.getSquareClosest(startPosition, 5).forEach((position) => {
                previous.push([position, TERRAIN.GRASS]);
            });
            return previous;
        }, []));
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
        /*
        const zones = AlternativePosition.getZones(this.isGroundCellAccessible.bind(this));
        let graphics = game.add.graphics(0, 0);
        graphics.alpha = 0.5;
        for (let z = 0; z < zones.length; z++) {
            if (zones[z].length > 0) {
                game.add.text(zones[z][0].x * 40, zones[z][0].y * 40, z + '');
            }
            graphics.beginFill(Phaser.Color.getRandomColor(0, 255, 200));
            for (let i = 0; i < zones[z].length; i++) {
                graphics.drawRect(zones[z][i].x * 40, zones[z][i].y * 40, 40, 40);
            }
        }
        */
    }
    isCellAccessible(position) {
        if (position.x < 0 || position.y < 0 || position.x >= exports.GROUND_WIDTH || position.y >= exports.GROUND_HEIGHT) {
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
        this.initializeTerrain(200, TERRAIN.SNOW, TERRAIN.ICE, true);
        this.initializeTerrain(400, TERRAIN.SNOW, TERRAIN.CRATER, true);
        this.initializeTerrain(500, TERRAIN.ICE, TERRAIN.ICE_BREAK2, false);
        this.initializeTerrain(600, TERRAIN.GRASS, TERRAIN.WATER, true, true);
        this.initializeTerrain(700, TERRAIN.MOUNTAIN, TERRAIN.GRASS, true);
        this.initializeTerrain(800, TERRAIN.MOUNTAIN, TERRAIN.SNOW, true);
        this.initializeTerrain(900, TERRAIN.STONE, TERRAIN.SNOW, true);
    }
    initializeTerrain(startNumber, terrain1, terrain2, rightGap = true, isCollision = false) {
        let result = {};
        result[startNumber] = [terrain1, terrain1, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + 2] = [terrain1, terrain1, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + 4] = [terrain1, terrain1, terrain1, terrain2, TYPE.NORMAL];
        result[startNumber + 10] = [terrain1, terrain2, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + 14] = [terrain2, terrain1, terrain1, terrain2, TYPE.NORMAL];
        result[startNumber + 20] = [terrain1, terrain2, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + 22] = [terrain2, terrain2, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + 24] = [terrain2, terrain1, terrain1, terrain1, TYPE.NORMAL];
        result[startNumber + (rightGap ? 32 : 30)] = [terrain1, terrain2, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + (rightGap ? 34 : 32)] = [terrain2, terrain1, terrain2, terrain2, TYPE.NORMAL];
        result[startNumber + (rightGap ? 42 : 40)] = [terrain2, terrain2, terrain2, terrain1, TYPE.NORMAL];
        result[startNumber + (rightGap ? 44 : 42)] = [terrain2, terrain2, terrain1, terrain2, TYPE.NORMAL];
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
    createFakeData2(predefinedTiles) {
        this.cornersMap = [];
        const noises = GeneratedGround.generateNoises(4, predefinedTiles);
        for (let y = 0; y <= exports.GROUND_HEIGHT; y++) {
            let line = [];
            for (let x = 0; x <= exports.GROUND_WIDTH; x++) {
                line.push(GeneratedGround.randToTexture(noises[y][x]));
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
        let normals = [];
        let variations = [];
        const keys = Object.keys(this.tiles);
        for (let i = 0; i < keys.length; i++) {
            if (this.tiles[keys[i]][0] === param[0] &&
                this.tiles[keys[i]][1] === param[1] &&
                this.tiles[keys[i]][2] === param[2] &&
                this.tiles[keys[i]][3] === param[3]) {
                if (this.tiles[keys[i]][4] === TYPE.NORMAL) {
                    normals.push(parseInt(keys[i]));
                }
                else {
                    variations.push(parseInt(keys[i]));
                }
            }
        }
        if (normals.length === 0 && variations.length === 0) {
            return null;
        }
        if (Math.random() > 0.97 && variations.length !== 0 || normals.length === 0) {
            return variations[Math.floor(Math.random() * variations.length)];
        }
        return normals[Math.floor(Math.random() * normals.length)];
    }
}
exports.GeneratedGround = GeneratedGround;
//# sourceMappingURL=GeneratedGround.js.map