"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectDescription_1 = require("./ObjectDescription");
const InteractivePoint_1 = require("./InteractivePoint");
const Direction_1 = require("../Direction");
const SpriteInfo_1 = require("./SpriteInfo");
const Price_1 = require("./Price");
const PositionTransformer_1 = require("../PositionTransformer");
class ObjectDescriptionRegistry {
    static getObjectDescription(name) {
        if (this.objectDescriptions === null) {
            this.generateObjectDescriptions();
        }
        for (let i = 0; i < this.objectDescriptions.length; i++) {
            if (this.objectDescriptions[i].getName() === name) {
                return this.objectDescriptions[i];
            }
        }
        debugger;
        throw "Impossible to find info for " + name;
    }
    static generateObjectDescriptions() {
        this.objectDescriptions = [];
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Dispenser', 1, [new PIXI.Point(0, 0)], [
            new SpriteInfo_1.SpriteInfo('dispenser', new PIXI.Point(-4, -4), 3)
        ], [
            new SpriteInfo_1.SpriteInfo('dispenser_reverse', new PIXI.Point(-4, -4), 0)
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.RIGHT], new PIXI.Point(5, -3))
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP], new PIXI.Point(5, -PositionTransformer_1.CELL_HEIGHT + 3))
        ], new Price_1.Price(70)));
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Sofa', 1, [new PIXI.Point(0, 0)], [
            new SpriteInfo_1.SpriteInfo('sofa', new PIXI.Point(0, -8), 3, new PIXI.Point(0, 0))
        ], [], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM], new PIXI.Point(0, -7), new PIXI.Point(0, 0), null, false)
        ], [], new Price_1.Price(10)));
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Desk', 1, [new PIXI.Point(0, 0)], [
            new SpriteInfo_1.SpriteInfo('chair', new PIXI.Point(-10, -8), 5),
            new SpriteInfo_1.SpriteInfo('desk', new PIXI.Point(0, 0), 4)
        ], [
            new SpriteInfo_1.SpriteInfo('desk_reverse', new PIXI.Point(0, 0), 10, new PIXI.Point(0, 0)),
            new SpriteInfo_1.SpriteInfo('chair_reverse', new PIXI.Point(-6, -4), 5, new PIXI.Point(0, 0)),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], new PIXI.Point(-10, -11)),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.RIGHT], new PIXI.Point(-3, -8), new PIXI.Point(0, 0), false, true),
        ], new Price_1.Price(20)));
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Meeting Table', 3, [
            new PIXI.Point(0, 0),
            new PIXI.Point(1, 1),
            new PIXI.Point(1, 0),
            new PIXI.Point(0, 1)
        ], [
            new SpriteInfo_1.SpriteInfo('chair2', new PIXI.Point(-8, -9), 5, new PIXI.Point(1, 1)),
            new SpriteInfo_1.SpriteInfo('table', new PIXI.Point(0, 0), 4, new PIXI.Point(1, 1)),
            new SpriteInfo_1.SpriteInfo('chair2', new PIXI.Point(-8, -9), 5, new PIXI.Point(1, 0)),
            new SpriteInfo_1.SpriteInfo('table', new PIXI.Point(0, 0), 4, new PIXI.Point(1, 0)),
            new SpriteInfo_1.SpriteInfo('table_reverse', new PIXI.Point(0, 0), 10, new PIXI.Point(0, 1)),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', new PIXI.Point(6, -5), 5, new PIXI.Point(0, 1)),
            new SpriteInfo_1.SpriteInfo('table_reverse', new PIXI.Point(0, 0), 10, new PIXI.Point(0, 0)),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', new PIXI.Point(6, -5), 5, new PIXI.Point(0, 0)),
        ], [], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], new PIXI.Point(-8, -11), new PIXI.Point(1, 1)),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT], new PIXI.Point(-8, -11), new PIXI.Point(1, 0)),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT], new PIXI.Point(4, -7), new PIXI.Point(0, 1), true, true),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT], new PIXI.Point(4, -7), new PIXI.Point(0, 0), true, true),
        ], [], new Price_1.Price(12)));
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Couch', 2, [
            new PIXI.Point(0, 0),
            new PIXI.Point(0, 1),
        ], [
            new SpriteInfo_1.SpriteInfo('couch_part1', new PIXI.Point(10, 0), 12),
            new SpriteInfo_1.SpriteInfo('couch_part2', new PIXI.Point(10 - PositionTransformer_1.CELL_WIDTH / 2, 10), 22, new PIXI.Point(0, 1))
        ], [
            new SpriteInfo_1.SpriteInfo('couch_reverse_part1', new PIXI.Point(-13, 0), 12),
            new SpriteInfo_1.SpriteInfo('couch_reverse_part2', new PIXI.Point(-(13 - PositionTransformer_1.CELL_WIDTH / 2), 9), 22, new PIXI.Point(1, 0)),
            new SpriteInfo_1.SpriteInfo('couch_reverse_cache', new PIXI.Point(-13, 0), 0),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.RIGHT], new PIXI.Point(0, -8), new PIXI.Point(0, 0)),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.RIGHT], new PIXI.Point(0, -8), new PIXI.Point(0, 1)),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP], new PIXI.Point(-1, -8), new PIXI.Point(0, 0), false, true),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP], new PIXI.Point(-1, -8), new PIXI.Point(1, 0), false, true),
        ], new Price_1.Price(10)));
        this.objectDescriptions.push(new ObjectDescription_1.ObjectDescription('Console', 4, [
            new PIXI.Point(0, 0),
            new PIXI.Point(1, 1),
            new PIXI.Point(1, 0),
            new PIXI.Point(0, 1)
        ], [
            new SpriteInfo_1.SpriteInfo('couch_part1', new PIXI.Point(10 - PositionTransformer_1.CELL_WIDTH / 2, 0 - PositionTransformer_1.CELL_HEIGHT / 2), 12, new PIXI.Point(0, 0)),
            new SpriteInfo_1.SpriteInfo('couch_part2', new PIXI.Point(10 - PositionTransformer_1.CELL_WIDTH / 2 - PositionTransformer_1.CELL_WIDTH / 2, 10 - PositionTransformer_1.CELL_HEIGHT / 2), 22, new PIXI.Point(0, 1)),
            new SpriteInfo_1.SpriteInfo('tv', new PIXI.Point(16, -6), 0, new PIXI.Point(0, 0))
        ], [
            new SpriteInfo_1.SpriteInfo('tv_reverse', new PIXI.Point(-1, -13), 0, new PIXI.Point(0, 1)),
            new SpriteInfo_1.SpriteInfo('couch_reverse_part1', new PIXI.Point(-13 - PositionTransformer_1.CELL_WIDTH / 2, PositionTransformer_1.CELL_HEIGHT / 2), 12, new PIXI.Point(0, 1)),
            new SpriteInfo_1.SpriteInfo('couch_reverse_part2', new PIXI.Point(-(13 - PositionTransformer_1.CELL_WIDTH / 2) - PositionTransformer_1.CELL_WIDTH / 2, 9 + PositionTransformer_1.CELL_HEIGHT / 2), 22, new PIXI.Point(1, 1)),
            new SpriteInfo_1.SpriteInfo('couch_reverse_cache', new PIXI.Point(-13, 0), 0, new PIXI.Point(0, 0)),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM], new PIXI.Point(0 - PositionTransformer_1.CELL_WIDTH / 2, -8 - PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(0, 0)),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP], new PIXI.Point(0 - PositionTransformer_1.CELL_WIDTH / 2, -8 - PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(0, 1)),
        ], [
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT], new PIXI.Point(-1 - PositionTransformer_1.CELL_WIDTH / 2, -8 + PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(0, 1), false, true),
            new InteractivePoint_1.InteractivePoint([Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], new PIXI.Point(-1 - PositionTransformer_1.CELL_WIDTH / 2, -8 + PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(1, 1), false, true),
        ], new Price_1.Price(10)));
    }
    static getSalableObjects(level) {
        if (this.objectDescriptions === null) {
            this.generateObjectDescriptions();
        }
        return this.objectDescriptions.filter((objectDescription) => {
            return objectDescription.getMinLevel() <= level;
        });
    }
}
ObjectDescriptionRegistry.objectDescriptions = null;
exports.ObjectDescriptionRegistry = ObjectDescriptionRegistry;
//# sourceMappingURL=ObjectDescriptionRegistry.js.map