"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const ObjectDescriptionRegistry_1 = require("./ObjectDescriptionRegistry");
const ObjectReferer_1 = require("./ObjectReferer");
const ObjectOrientation_1 = require("./ObjectOrientation");
const Pico8Colors_1 = require("../Pico8Colors");
exports.SPRITE_DEBUG = false;
class AbstractObject {
    constructor(point, worldKnowledge, orientation) {
        this.position = point;
        this.orientation = orientation;
        this.worldKnowledge = worldKnowledge;
        this.usedIdentifiers = [];
    }
    getDescription() {
        let name = this.constructor.name;
        name = name.split(/(?=[A-Z])/).join(' ');
        return ObjectDescriptionRegistry_1.ObjectDescriptionRegistry.getObjectDescription(name);
    }
    create(game, groups) {
        const infos = this.getDescription();
        this.sprites = [];
        infos.getSpriteInfos(this.orientation).forEach((spriteInfo) => {
            const sprite = game.add.sprite(spriteInfo.getRealPosition(this.position, this.orientation).x, spriteInfo.getRealPosition(this.position, this.orientation).y, spriteInfo.getSpriteKey());
            sprite.anchor.set(spriteInfo.getAnchor(sprite).x, spriteInfo.getAnchor(sprite).y);
            if (ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(this.orientation)) {
                sprite.scale.set(-1, 1);
            }
            this.sprites.push(sprite);
            groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(sprite);
        });
        if (exports.SPRITE_DEBUG) {
            this.debugGraphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INTERFACE]);
            infos.getSpriteInfos(this.orientation).forEach((spriteInfo) => {
                this.debugGraphics.lineStyle(1, Pico8Colors_1.COLOR.LIGHT_GREEN);
                const realPosition = spriteInfo.getRealPosition(this.position, this.orientation);
                this.debugGraphics.moveTo(realPosition.x - 1.5, realPosition.y + 0.5);
                this.debugGraphics.lineTo(realPosition.x + 2.5, realPosition.y + 0.5);
                this.debugGraphics.moveTo(realPosition.x + 0.5, realPosition.y - 1.5);
                this.debugGraphics.lineTo(realPosition.x + 0.5, realPosition.y + 2.5);
            });
        }
    }
    getPositionGap(interactivePointIdentifier) {
        const interactivePointDescription = ObjectDescriptionRegistry_1.ObjectDescriptionRegistry
            .getObjectDescription(this.constructor.name)
            .getInteractivePoints(this.orientation)[interactivePointIdentifier];
        return interactivePointDescription.getInteractionPosition(this.orientation);
    }
    getEntries(objectNumber) {
        return this.getDescription().getInteractivePointEntryPoints(this.orientation, objectNumber);
    }
    getPositions() {
        return this.getDescription().getUniqueCellOffsets(this.orientation).map((gap) => {
            return new PIXI.Point(this.position.x + gap.x, this.position.y + gap.y);
        });
    }
    getSprites() {
        return this.sprites;
    }
    remove() {
        this.worldKnowledge.moveToDepot(this);
        this.worldKnowledge.resetAStar();
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });
        if (this.debugGraphics) {
            this.debugGraphics.destroy(true);
        }
    }
    forceLeftOrientation(interactivePointIdentifier) {
        const infos = this.getDescription();
        return infos.getInteractivePoints(this.orientation)[interactivePointIdentifier].isHumanLeftLooking(this.orientation);
    }
    forceTopOrientation(interactivePointIdentifier) {
        const infos = this.getDescription();
        return infos.getInteractivePoints(this.orientation)[interactivePointIdentifier].isHumanTopLooking();
    }
    getCellPositionSubObject(interactivePointIdentifier) {
        const infos = this.getDescription();
        return new PIXI.Point(this.position.x + infos.getInteractivePointCellOffset(this.orientation, interactivePointIdentifier).x, this.position.y + infos.getInteractivePointCellOffset(this.orientation, interactivePointIdentifier).y);
    }
    isUsed(interactivePointIdentifier) {
        return this.getHumanAt(interactivePointIdentifier) !== null;
    }
    getHumanAt(interactivePointIdentifier) {
        return this.usedIdentifiers[interactivePointIdentifier] ? this.usedIdentifiers[interactivePointIdentifier] : null;
    }
    getOrigin() {
        return this.position;
    }
    setUsed(interactivePointIdentifier, human) {
        if (this.getHumanAt(interactivePointIdentifier)) {
            debugger;
            throw "This subobject is already taken!";
        }
        this.usedIdentifiers[interactivePointIdentifier] = human;
    }
    setUnused(interactivePointIdentifier) {
        this.usedIdentifiers[interactivePointIdentifier] = null;
    }
    getUnusedReferers() {
        let result = [];
        const description = this.getDescription();
        for (let i = 0; i < description.getInteractivePoints(this.orientation).length; i++) {
            if (!this.isUsed(i)) {
                result.push(new ObjectReferer_1.ObjectReferer(this, i));
            }
        }
        return result;
    }
    getOrientation() {
        return this.orientation;
    }
}
exports.AbstractObject = AbstractObject;
//# sourceMappingURL=AbstractObject.js.map