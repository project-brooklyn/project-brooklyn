class GameMap {
    constructor(width, depth, height) {
        this.width = width
        this.depth = depth
        this.height = height

        this.tileConfig = {
            width: 1.0,
            height: 0.25,
        }

        this.mapData = new Array()
    }

    map() {
        return this.mapData;
    }
};

export default GameMap;
