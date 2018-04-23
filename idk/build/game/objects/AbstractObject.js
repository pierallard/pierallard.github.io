"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const ObjectInfoRegistry_1 = require("./ObjectInfoRegistry");
const ObjectReferer_1 = require("./ObjectReferer");
class AbstractObject {
    constructor(point, worldKnowledge, leftOriented) {
        this.position = point;
        this.leftOriented = leftOriented;
        this.worldKnowledge = worldKnowledge;
        this.usedIdentifiers = [];
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
    getPositionGap(subObjectNumber) {
        const sittableObjectInfos = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getObjectInfo(this.constructor.name)
            .getSpriteInfo(subObjectNumber);
        return sittableObjectInfos.getSittablePosition(this.leftOriented);
    }
    getEntries(objectNumber) {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getEntryPoints(this.leftOriented, objectNumber);
    }
    getPositions() {
        return ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name).getCellGaps(this.leftOriented).map((gap) => {
            return new PIXI.Point(this.position.x + gap.x, this.position.y + gap.y);
        });
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
    forceOrientation(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return infos.getSpriteInfo(subObjectNumber).getOrientation(this.leftOriented);
    }
    forceTopOrientation(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return infos.getSpriteInfo(subObjectNumber).getTopOrientation();
    }
    getCellPositionSubObject(subObjectNumber) {
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        return new PIXI.Point(this.position.x + infos.getPositionGapOfSubObject(this.leftOriented, subObjectNumber).x, this.position.y + infos.getPositionGapOfSubObject(this.leftOriented, subObjectNumber).y);
    }
    isUsed(subObjectNumber) {
        return this.getHumanAt(subObjectNumber) !== null;
    }
    getHumanAt(subObjectNumber) {
        return this.usedIdentifiers[subObjectNumber] ? this.usedIdentifiers[subObjectNumber] : null;
    }
    getOrigin() {
        return this.position;
    }
    setUsed(subObjectNumber, human) {
        if (this.getHumanAt(subObjectNumber)) {
            debugger;
            throw "This subobject is already taken!";
        }
        this.usedIdentifiers[subObjectNumber] = human;
    }
    setUnused(subObjectNumber) {
        this.usedIdentifiers[subObjectNumber] = null;
    }
    getUnusedReferers() {
        let result = [];
        const infos = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(this.constructor.name);
        for (let i = 0; i < infos.getSpriteInfos().length; i++) {
            if (infos.getSpriteInfos()[i].getEntryPoints(this.leftOriented).length > 0) {
                if (!this.isUsed(i)) {
                    result.push(new ObjectReferer_1.ObjectReferer(this, i));
                }
            }
        }
        return result;
    }
}
exports.AbstractObject = AbstractObject;
//# sourceMappingURL=AbstractObject.js.map