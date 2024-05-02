import GameMap from '/src/map/GameMap.js'
import { Tile, TileType } from '/src/map/Tile.js';

class RectangleMap extends GameMap {
    constructor() {
        const width = 8;
        const depth = 18;
        const height = 3;
        super(width, depth, height);

        this.heightMap = new Array(width).fill().map(() => new Array(depth).fill(2));

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                for (let z = 0; z < height; z++) {
                    const tileType = (z === height-1) ? TileType.Grass : TileType.Dirt;
                    this.mapData.push(new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default RectangleMap;
