import GameMap from '/src/map/GameMap.js'
import { Tile, TileType } from '/src/map/Tile.js';

class RectangleMap extends GameMap {
    constructor() {
        super();
        const width = 8;
        const depth = 18;
        const height = 3;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                for (let z = 0; z < height; z++) {
                    const tileType = (z === height-1) ? TileType.Grass : TileType.Dirt;
                    this.addTile(new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default RectangleMap;
