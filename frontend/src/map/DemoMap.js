import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class DemoMap extends GameMap {
    constructor() {
        super();
        const width = 10;
        const depth = 10;
        const height = 4;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                for (let z = 0; z < height; z++) {
                    if (z > 0) {
                        const tileType = (x == 4 || x == 5 || z < height-1) ? TileType.Dirt : TileType.Grass;
                        this.addTile(new Tile(x, y, z, tileType));
                    }
                    else {
                        this.addTile(new Tile(x, y, z, TileType.Bedrock));
                    }
                }
            }
        }

        for (let x = 0; x < 4; x++) {
            for (let z = height-1; z < height+3; z++) {
                this.addTile(new Tile(x, 1, z, TileType.Stone));
            }
        }

        for (let x = 6; x < width; x++) {
            for (let z = height-1; z < height+3; z++) {
                this.addTile(new Tile(x, depth-2, z, TileType.Stone));
            }
        }

        // to show climbing on default map
        this.addTile(new Tile(2, 0, 4, TileType.Stone));
    }
}

export default DemoMap;
