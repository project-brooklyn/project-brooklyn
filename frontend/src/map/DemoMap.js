import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class DemoMap extends GameMap {
    constructor() {
        super();
        const width = 10;
        const depth = 10;
        const height = 1;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                for (let z = 0; z < height; z++) {
                    const tileType = (x == 4 || x == 5) ? TileType.Dirt : TileType.Grass;
                    this.addTile(x, y, z, new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default DemoMap;
