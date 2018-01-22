"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const UnitSprite_1 = require("../sprite/UnitSprite");
exports.SHOOT_COOLDOWN_RATIO = 0.1;
const DATA = {
    Grenadier: {
        allowed_by: ['Barracks'],
        construction_time: 7,
        image_format: UnitSprite_1.IMAGE_FORMAT.FIVE,
        life: 50,
        price: 160,
        shoot_cooldown: 50,
        shoot_distance: 3.25,
        shoot_power: 50,
        shoot_type: 'default',
        sight: 1,
        speed: 10,
        sprite_layer: 20,
        sprites: ['Tank5', 'Tank5'],
    },
    Harvester: {
        allowed_by: ['WeaponsFactory', 'TiberiumRefinery'],
        construction_time: 93,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 600,
        options: {
            load_time: 1,
            max_loading: 500,
            unload_time: 1,
        },
        price: 1400,
        shoot_distance: -1,
        sight: 2,
        speed: 12,
        sprite_layer: 6,
        sprites: ['Builder2', 'Builder2'],
    },
    HummVee: {
        allowed_by: ['WeaponsFactory'],
        construction_time: 27,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 150,
        price: 400,
        shoot_cooldown: 30,
        shoot_distance: 4,
        shoot_power: 15,
        shoot_type: 'default',
        sight: 2,
        speed: 30,
        sprite_layer: 6,
        sprites: ['Tank7', 'Tank7'],
    },
    MCV: {
        allowed_by: ['WeaponsFactory', 'AdvancedCommandCenter'],
        construction_time: 213,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 600,
        price: 5000,
        shoot_distance: -1,
        sight: 2,
        speed: 12,
        sprite_layer: 6,
        sprites: ['Transprt', 'Transprt'],
    },
    MediumTank: {
        allowed_by: ['WeaponsFactory'],
        construction_time: 53,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 400,
        price: 800,
        shoot_cooldown: 50,
        shoot_distance: 4.75,
        shoot_power: 30,
        shoot_type: 'default',
        sight: 3,
        speed: 18,
        sprite_layer: 6,
        sprites: ['Tank11', 'Tank12'],
    },
    MinigunInfantry: {
        allowed_by: ['Barracks'],
        construction_time: 7,
        image_format: UnitSprite_1.IMAGE_FORMAT.THREE,
        life: 50,
        price: 100,
        shoot_cooldown: 20,
        shoot_distance: 2,
        shoot_power: 15,
        shoot_type: 'default',
        sight: 1,
        speed: 8,
        sprite_layer: 6,
        sprites: ['Scout2', 'Scout2'],
    },
    Orca: {
        allowed_by: ['Barracks', 'Helipad'],
        construction_time: 80,
        image_format: UnitSprite_1.IMAGE_FORMAT.ANIMATED,
        life: 125,
        price: 1200,
        shoot_air_power: 30,
        shoot_cooldown: 60,
        shoot_distance: 4,
        shoot_power: 30,
        shoot_type: 'rocket',
        sight: 3,
        speed: 40,
        sprite_layer: 5,
        sprites: ['Copter', 'Copter'],
    },
    RocketSoldier: {
        allowed_by: ['Barracks'],
        construction_time: 17,
        image_format: UnitSprite_1.IMAGE_FORMAT.NINE,
        life: 25,
        price: 300,
        shoot_air_power: 30,
        shoot_cooldown: 60,
        shoot_distance: 4,
        shoot_power: 30,
        shoot_type: 'rocket',
        sight: 2,
        speed: 6,
        sprite_layer: 14,
        sprites: ['Tank3', 'Tank3'],
    },
};
/**
 * Minigun infantry:  Scout2
 * Grenadier:         Tank5
 * Rocket soldier:    Tank3
 * Engineer Infantry: Tank10
 * Commando Infantry: Miner
 * APC:               Tank13
 * Chinook:           Copter2a
 * ORCA:              Copter
 * Humm-vee:          Tank7
 * Medium Tank:       Tank11
 * Rocket Launcher:   TankB2
 * MCV:               Transprt
 * Mammooth Tank:     Artil3
 * Harvester:         Builder2
 */
class UnitProperties {
    static getSprite(unitName, playerId) {
        return DATA[unitName].sprites[playerId];
    }
    static getOption(unitName, optionName) {
        return DATA[unitName].options[optionName];
    }
    static getShootDistance(unitName) {
        return DATA[unitName].shoot_distance * 1.5;
    }
    static getLife(unitName) {
        return DATA[unitName].life;
    }
    static getShootTime(unitName) {
        return DATA[unitName].shoot_cooldown * exports.SHOOT_COOLDOWN_RATIO;
    }
    static getSlownessTime(unitName) {
        return 6 / DATA[unitName].speed;
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
        if (Play_1._DEBUG_FAST_CONSTRUCT) {
            return DATA[unitName].construction_time / 50;
        }
        return DATA[unitName].construction_time / 6;
    }
    static getPrice(unitName) {
        return DATA[unitName].price;
    }
    static getShootPower(unitName) {
        return DATA[unitName].shoot_power;
    }
    static getShootAirPower(unitName) {
        return DATA[unitName].shoot_air_power ? DATA[unitName].shoot_air_power : 0;
    }
    static getImageFormat(unitName) {
        return DATA[unitName].image_format;
    }
    static getShootType(unitName) {
        return DATA[unitName].shoot_type;
    }
    static getSight(buildingName) {
        return DATA[buildingName].sight || 0;
    }
}
exports.UnitProperties = UnitProperties;
//# sourceMappingURL=UnitProperties.js.map