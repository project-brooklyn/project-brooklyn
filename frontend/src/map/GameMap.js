export function tileKey(x, y, z) {
    return [x, y, z].join(',');
}

function cellKey(x, y) {
    return [x, y].join(',');
}

const towerHeight = 2.5;

class GameMap {
    constructor() {
        // For simplicity, assume for now that the minimum value for each
        // dimension is 0.
        this.maxX = 0;
        this.maxY = 0;
        this.maxZ = 0;

        this.towers = new Map();
        this.tileData = new Map();
        this.elevationData = new Map();
    }

    get width() {
        return this.maxX;
    }

    get depth() {
        return this.maxY;
    }

    get height() {
        return this.maxZ;
    }

    forEachTile(callbackFn) {
        let results = []
        for (let [_key, tile] of this.tileData) {
            results.push(callbackFn(tile));
        }
        return results
    }

    getTile(x, y, z) {
        return this.tileData.get(tileKey(x, y, z)) || undefined;
    }

    getTower(x, y) {
        // TODO: Reconsider this.towers (boolean values) and game.towers
        return this.towers.get(cellKey(x, y)) || undefined;
    }

    isOccupied(x, y, z) {
        return this.getTile(x, y, z) != undefined;
    }

    getElevation(x, y, includeTower=false) {
        const cell = cellKey(x, y);
        const mapHeight = this.elevationData.get(cell) || 0;
        const maybeTowerHeight = (includeTower && this.towers.get(cell)) ? towerHeight : 0;

        return mapHeight + maybeTowerHeight ;
    }

    addTile(x, y, z, tile) {
        // Adds (or updates) a tile.
        this.tileData.set(tileKey(x, y, z), tile);

        const cell = cellKey(x, y);
        this.elevationData.set(cell, Math.max(this.elevationData.get(cell) ?? 0, z));

        this.maxX = Math.max(this.maxX, x + 1);
        this.maxY = Math.max(this.maxY, y + 1);
        this.maxZ = Math.max(this.maxZ, z + 1);
    }

    removeTile(x, y, z) {
        // Assumes that tiles can only be removed from the top layer of the map.
        // Removing a tile will update the elevation data accordingly but will
        // not reduce the overall max bounds of the map.
        this.tileData.delete(tileKey(x, y, z));

        const cell = cellKey(x, y);
        this.elevationData.set(cell, this.elevationData.get(cell) - 1);
    }

    addTower(x, y) {
        this.towers.set(cellKey(x, y), true);
    }

    removeTower(x, y) {
        this.towers.delete(cellKey(x, y));
    }
}

export default GameMap;
