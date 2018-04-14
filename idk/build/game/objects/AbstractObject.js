"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const ObjectInfoRegistry_1 = require("./ObjectInfoRegistry");
class AbstractObject {
    constructor(point, worldKnowledge, leftOriented) {
        this.position = point;
        this.leftOriented = leftOriented;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        this.sprites = [];
        infos.getSpriteInfos().forEach((spriteInfo) => {
            const sprite = game.add.sprite(spriteInfo.getRealPosition(this.position, this.leftOriented).x, spriteInfo.getRealPosition(this.position, this.leftOriented).y, spriteInfo.getSpriteName());
            sprite.anchor.set(spriteInfo.getAnchor(sprite).x, spriteInfo.getAnchor(sprite).y);
            if (this.leftOriented) {
                sprite.scale.set(-1, 1);
            }
            this.sprites.push(sprite);
            groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(sprite);
        });
    }
    getPositionGap() {
        const sittableObjectInfos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getSpriteInfos()[0];
        return sittableObjectInfos.getSittablePosition(this.leftOriented);
    }
    getEntries() {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getEntryPoints(this.leftOriented);
    }
    getPosition() {
        return this.position;
    }
    getSprites() {
        return this.sprites;
    }
    remove() {
        this.worldKnowledge.moveToDepot(this);
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });
    }
    forceOrientation() {
        return this.leftOriented;
    }
}
exports.AbstractObject = AbstractObject;
//# sourceMappingURL=AbstractObject.js.map