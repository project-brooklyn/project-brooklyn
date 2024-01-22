const getNeighbors = (x, y, gameMap) => {
    const neighbors = [];
    if (x>0) neighbors.push([x-1,y]);
    if (y>0) neighbors.push([x,y-1]);
    if (x<gameMap.width-1) neighbors.push([x+1,y]);
    if (y<gameMap.depth-1) neighbors.push([x,y+1]);
    return neighbors;
}

export const djikstra = (gameMap) => {
    const start = [0,0];
    const final = [gameMap.width-1, gameMap.depth-1];
    const heightMap = gameMap.heightMap;

    const climbTime = 4; // time to climb one tile
    const dropTime = 1; // time to drop one tile
    const walkTime = 1; // time to walk one tile

    const visited = new Array(gameMap.width).fill().map(() => new Array(gameMap.depth).fill(false));
    const queue = [{path: [start], time: 0}];

    while (queue) {
        const { path, time } = queue.shift();
        const [x, y] = path.at(-1);
        const z = heightMap[x][y];

        if (visited[x][y]) continue;
        visited[x][y] = true;

        if (x===final[0] && y===final[1]) return path;

        const neighbors = getNeighbors(x, y, gameMap);
        for(let [nx, ny] of neighbors){
            const nz = heightMap[nx][ny];
            queue.push({
                path: [...path, [nx, ny]],
                time: time + walkTime + (nz>z ? climbTime*(nz-z) : dropTime*(z-nz)),
            })
        };

        queue.sort((a,b) => a.time - b.time); // lazy heap
    }
    throw new Error('No Path Found');
}

export const pythagorean = (p1, p2) => {
    if (p1.length !== p2.length) throw new Error('Incompatibile Vector Dimensions');

    let sumOfSquares = 0;
    for(let i=0; i<p1.length; i++){
        sumOfSquares += (p1[i]-p2[i])**2;
    }
    return Math.sqrt(sumOfSquares);
}

