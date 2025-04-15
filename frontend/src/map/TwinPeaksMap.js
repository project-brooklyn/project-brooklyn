import GameMap from '/src/map/GameMap.js';
import { Tile, TileType } from '/src/map/Tile.js';

class TwinPeaksMap extends GameMap {
    constructor() {
        super();
        const width = 10;
        const depth = 10;
        const height = 2;

        // Base
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < depth; y++) {
                for (let z = 0; z <= height; z++) {
                    let tileType;
                    if (z === height) {
                        tileType = TileType.Grass;
                    }
                    else if (z === 0) {
                        tileType = TileType.Bedrock;
                    } else {
                        tileType = TileType.Dirt;
                    }
                    this.addTile(new Tile(x, y, z, tileType));
                }
            }
        }

        // Left peak
        const hw = width / 2;
        for (let x = 0; x < hw; x++) {
            for (let y = 5; y < depth; y++) {
                if (x === 0 && y === 5) continue;
                if (x === 0 && y === depth - 1) continue;
                if (x === hw - 1 && y === 5) continue;
                if (x === hw - 1 && y === depth - 1) continue;

                this.addTile(new Tile(x, y, 3, TileType.Grass));
            }
        }

        for (let x = 1; x < hw - 1; x++) {
            for (let y = 6; y < depth - 1; y++) {
                this.addTile(new Tile(x, y, 4, TileType.Grass));
            }
        }

        this.addTile(new Tile(1, 7, 5, TileType.Grass));
        this.addTile(new Tile(2, 6, 5, TileType.Grass));
        this.addTile(new Tile(2, 7, 5, TileType.Grass));
        this.addTile(new Tile(2, 8, 5, TileType.Grass));
        this.addTile(new Tile(3, 7, 5, TileType.Grass));

        this.addTile(new Tile(2, 7, 6, TileType.Grass));

        // Right peak
        const hd = depth / 2;
        for (let y = 0; y < hd; y++) {
            for (let x = 5; x < depth; x++) {
                if (y === 0 && x === 5) continue;
                if (y === 0 && x === depth - 1) continue;
                if (y === hd - 1 && x === 5) continue;
                if (y === hd - 1 && x === depth - 1) continue;

                this.addTile(new Tile(x, y, 3, TileType.Grass));
            }
        }

        for (let y = 1; y < hd - 1; y++) {
            for (let x = 6; x < width - 1; x++) {
                this.addTile(new Tile(x, y, 4, TileType.Grass));
            }
        }

        this.addTile(new Tile(7, 1, 5, TileType.Grass));
        this.addTile(new Tile(6, 2, 5, TileType.Grass));
        this.addTile(new Tile(7, 2, 5, TileType.Grass));
        this.addTile(new Tile(8, 2, 5, TileType.Grass));
        this.addTile(new Tile(7, 3, 5, TileType.Grass));

        this.addTile(new Tile(7, 2, 6, TileType.Grass));
    }
}

export default TwinPeaksMap;
