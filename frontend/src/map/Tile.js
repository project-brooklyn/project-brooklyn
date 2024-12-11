const colors = {
    grass: 0x12b464,
    dirt: 0xce8b55,
    stone: 0x928e85,
    bedrock: 0x505050,
    unknown: 0xc23be8,
}

export class TileType {
    static Grass = new TileType('grass')
    static Dirt = new TileType('dirt')
    static Stone = new TileType('stone')
    static Bedrock = new TileType('bedrock')

    constructor(name) {
        this.name = name
        this.material = {
            color: colors[name] ?? colors['unknown']
        }
    }
}

export class Tile {
    constructor(x, y, z, type) {
        this.x = x
        this.y = y
        this.z = z
        this.type = type
    }
}

export default Tile;
