import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class RandomMap extends GameMap {
    constructor() {
        const width = 12;
        const depth = 12;
        const height = 5;
        super(width, depth, height);

        for (let x = -width/2; x < width/2; x++) {
            for (let y = -depth/2; y < depth/2; y++) {
                const tileHeight = Math.floor(Math.random()*(height-2)) + 2; // +2 and -2 for at least one layer of dirt and stone

                for (let z = 0; z <= tileHeight; z++) {
                    const tileType =
                        z===tileHeight ? TileType.Grass :
                        z===0 ? TileType.Stone :
                        TileType.Dirt;
                    this.mapData.push(new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default RandomMap;
