class GameMap {
    constructor(width, depth, height) {
        this.width = width
        this.depth = depth
        this.height = height

        this.mapData = new Array()
    }

    map() {
        return this.mapData;
    }
};

export default GameMap;
