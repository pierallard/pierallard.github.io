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

export class UnitProperties {
    static getSprite(unitName: string, playerId: number): string {
        return DATA[unitName].sprites[playerId];
    }

    static getOption(unitName: string, optionName: string): any {
        return DATA[unitName].options[optionName];
    }

    static getShootDistance(unitName: string): number {
        return DATA[unitName].shoot_distance;
    }

    static getLife(unitName: string): number {
        return DATA[unitName].life;
    }

    static getShootTime(unitName: string): number {
        return DATA[unitName].shoot;
    }

    static getSlownessTime(unitName: string): number {
        return DATA[unitName].slowness;
    }

    static getRequiredBuildings(unitName: string): string[] {
        return DATA[unitName].allowed_by;
    }

    static getConstructableUnits(): string[] {
        return Object.keys(DATA);
    }

    static getSpriteLayer(unitName: string): number {
        return DATA[unitName].sprite_layer;
    }

    static getConstructionTime(unitName: string): number {
        return DATA[unitName].construction_time;
    }
}
