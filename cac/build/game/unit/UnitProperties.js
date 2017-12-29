"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DATA = {
    Harvester: {
        allowed_by: ['WeaponsFactory', 'TiberiumRefinery'],
        construction_time: 2,
        life: 100,
        options: {
            load_time: 1,
            max_loading: 50,
            unload_time: 1,
        },
        shoot: 0.5,
        shoot_distance: Math.sqrt(2),
        slowness: 0.4,
        sprite_layer: 6,
        sprites: ['Builder2', 'Builder2'],
    },
    MCV: {
        allowed_by: ['WeaponsFactory', 'AdvancedCommandCenter'],
        construction_time: 2,
        life: 1000,
        shoot_distance: -1,
        slowness: 0.8,
        sprite_layer: 6,
        sprites: ['Transprt', 'Transprt'],
    },
    Tank: {
        allowed_by: ['Barracks'],
        construction_time: 2,
        life: 500,
        shoot: 0.5,
        shoot_distance: 4,
        slowness: 0.25,
        sprite_layer: 6,
        sprites: ['Tank11', 'Tank12'],
    },
};
class UnitProperties {
    static getSprite(unitName, playerId) {
        return DATA[unitName].sprites[playerId];
    }
    static getOption(unitName, optionName) {
        return DATA[unitName].options[optionName];
    }
    static getShootDistance(unitName) {
        return DATA[unitName].shoot_distance;
    }
    static getLife(unitName) {
        return DATA[unitName].life;
    }
    static getShootTime(unitName) {
        return DATA[unitName].shoot;
    }
    static getSlownessTime(unitName) {
        return DATA[unitName].slowness;
    }
    static getRequiredBuildings(unitName) {
        return DATA[unitName].allowed_by;
    }
    static getConstructableUnits() {
        return Object.keys(DATA);
    }
    static getSpriteLayer(unitName) {
        return DATA[unitName].sprite_layer;
    }
    static getConstructionTime(unitName) {
        return DATA[unitName].construction_time;
    }
}
exports.UnitProperties = UnitProperties;
//# sourceMappingURL=UnitProperties.js.map