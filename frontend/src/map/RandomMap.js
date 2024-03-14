import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class RandomMap extends GameMap {
    constructor() {
        const width = 10;
        const depth = 10;
        const height = 10;
        super(width, depth, height);

        this.heightMap = [];

        for (let x = 0; x < width; x++) {
            const heightRow = [];
            for (let y = 0; y < depth; y++) {
                const tileHeight = Math.floor(Math.random()*(height-2)) + 2; // +2 and -2 for at least one layer of dirt and stone

                for (let z = 0; z <= tileHeight; z++) {
                    const tileType =
                        z===tileHeight ? TileType.Grass :
                        z===0 ? TileType.Stone :
                        TileType.Dirt;
                    this.mapData.push(new Tile(x, y, z, tileType));
                }
                heightRow.push(tileHeight);
            }
            this.heightMap.push(heightRow);
        }
    }
}

export default RandomMap;
