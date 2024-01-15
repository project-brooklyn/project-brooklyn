const colors = {
    grass: 0x12b464,
    dirt: 0xce8b55,
    stone: 0x928e85,
    unknown: 0xc23be8,
}

export class TileType {
    static Grass = new TileType('grass')
    static Dirt = new TileType('dirt')
    static Stone = new TileType('stone')

    constructor(name) {
        this.name = name
        this.color = colors[name]
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
