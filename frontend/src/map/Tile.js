export class TileType {
    static Grass = new TileType('grass')
    static Dirt = new TileType('dirt')

    constructor(name) {
        this.name = name
    }
};

export class Tile {
    constructor(x, y, z, type) {
        this.x = x
        this.y = y
        this.z = z
        this.type = type
    }
};

export default Tile;
