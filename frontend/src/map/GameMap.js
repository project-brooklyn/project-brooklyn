import { TOWERS } from "../entities/buildables";
import { Status } from "../entities/towers/Tower";
import Tile, { TileType } from "./Tile";

export function tileKey(x, y, z) {
    return [x, y, z].join(',');
}

function cellKey(x, y) {
    return [x, y].join(',');
}

export class GameMap {
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
        let results = [];
        for (let [_key, tile] of this.tileData) {
            results.push(callbackFn(tile));
        }
        return results;
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

    getElevation(x, y, includeTower = false) {
        const cell = cellKey(x, y);
        const mapHeight = this.elevationData.get(cell) || 0;
        const tower = this.towers.get(cell);
        const maybeTowerHeight = (includeTower && tower) ? tower.height : 0;

        return mapHeight + maybeTowerHeight;
    }

    addTile(tile) {
        // Adds (or updates) a tile.
        const { x, y, z } = tile;
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

    addTower(x, y, tower) {
        this.towers.set(cellKey(x, y), tower);
    }

    removeTower(x, y) {
        this.towers.delete(cellKey(x, y));
    }

    toJSON() {
        const towers = new Array(this.maxY).fill(null).map(() => new Array(this.maxX).fill(null));
        const tiles = new Array(this.maxZ).fill(null).map(() => new Array(this.maxY).fill(null).map(() => new Array(this.maxX).fill(null)));

        for (let [key, tile] of this.tileData) {
            const [x, y, z] = key.split(',').map(Number);
            tiles[z][y][x] = tile.type.name;
        }

        for (let [key, tower] of this.towers) {
            const [x, y] = key.split(',').map(Number);
            towers[y][x] = tower.name;
        }

        return {
            maxX: this.maxX,
            maxY: this.maxY,
            maxZ: this.maxZ,
            towers,
            tiles,
        }
    }

    static from(json) {
        try {
            const { maxX, maxY, maxZ, towers, tiles } = json;

            const gameMap = new GameMap();
            gameMap.maxX = maxX;
            gameMap.maxY = maxY;
            gameMap.maxZ = maxZ;

            const tileTypes = {
                grass: TileType.Grass,
                dirt: TileType.Dirt,
                stone: TileType.Stone,
                bedrock: TileType.Bedrock,
            }

            for (let x = 0; x < maxX; x++) {
                for (let y = 0; y < maxY; y++) {
                    for (let z = 0; z < maxZ; z++) {
                        if (tiles[z][y][x]) {
                            const tile = new Tile(x, y, z, tileTypes[tiles[z][y][x]]);
                            gameMap.addTile(tile);
                        }
                    }
                }
            }

            for (let y = 0; y < maxY; y++) {
                for (let x = 0; x < maxX; x++) {
                    const towerName = towers[y][x];
                    if (towerName && TOWERS.has(towerName)) { // skip portal and castle
                        const TowerConstructor = TOWERS.get(towerName).create;
                        const z = gameMap.getElevation(x, y);

                        gameMap.addTower(x, y, new TowerConstructor(x, y, z, Status.BUILT));
                    }
                }

            }
            return gameMap;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GameMap;
