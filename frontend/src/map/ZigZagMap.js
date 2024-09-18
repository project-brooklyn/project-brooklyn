import GameMap from '/src/map/GameMap.js'
import { Tile, TileType } from '/src/map/Tile.js';

class ZigZagMap extends GameMap {
    constructor() {
        super();
        const width = 12;
        const depth = 12;
        const height = 12;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                let tileHeight = 2;
                if (x===1 && y<11) tileHeight = 8;
                if (x===4 && y>0) tileHeight = 7;
                if (x===7 && y<11) tileHeight = 6;
                if (x===10 && y>0) tileHeight = 5;

                for (let z = 0; z <= tileHeight; z++) {
                    const tileType =
                        z===tileHeight ? TileType.Grass :
                        z===0 ? TileType.Stone :
                        TileType.Dirt;
                    this.addTile(x, y, z, new Tile(x, y, z, tileType));
                }
            }
        }
    }
}

export default ZigZagMap;
