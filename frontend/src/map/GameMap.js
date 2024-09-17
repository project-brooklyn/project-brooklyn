function tileKey(x, y, z) {
    return [x, y, z].join(',');
}

function cellKey(x, y) {
    return [x, y].join(',');
}

class GameMap {
    constructor() {
        // For simplicity, assume for now that the minimum value for each
        // dimension is 0.
        this.maxX = 0;
        this.maxY = 0;
        this.maxZ = 0;

        this.mapData = new Map();
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
        for (let [key, tile] of this.mapData) {
            const coordinates = key.split(',').map((x) => parseInt(x, 10));
            results.push(callbackFn(tile, coordinates));
        }
        return results
    }

    getTile(x, y, z) {
        return this.mapData.get(tileKey(x, y, z)) || undefined;
    }

    isOccupied(x, y, z) {
        return this.getTile(x, y, z) != undefined;
    }

    getElevation(x, y) {
        return this.elevationData.get(cellKey(x, y)) || 0;
    }

    addTile(x, y, z, tile) {
        this.mapData.set(tileKey(x, y, z), tile);

        const cell = cellKey(x, y);
        this.elevationData.set(cell, Math.max(this.elevationData.get(cell) ?? 0, z));

        this.maxX = Math.max(this.maxX, x + 1);
        this.maxY = Math.max(this.maxY, y + 1);
        this.maxZ = Math.max(this.maxZ, z + 1);
    }

    removeTile(x, y, z) {
        // Removing a tile will update the elevation data accordingly but will
        // not reduce the overall max bounds of the map.
        // TODO: Implement
    }
};

export default GameMap;
