import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class RandomMap extends GameMap {
    constructor() {
        const width = 10;
        const depth = 10;
        const height = 5;
        super(width, depth, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                const tileHeight = Math.floor(Math.random()*3);

                for (let z = 0; z <= tileHeight; z+=0.25) {
                    const tileType = z===tileHeight ? TileType.Grass : TileType.Dirt;
                    this.mapData.push(new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default RandomMap;
