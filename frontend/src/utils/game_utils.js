import { round } from "./math_utils";

const getNeighbors = (x, y, gameMap) => {
    const neighbors = [];
    if (x>0) neighbors.push([x-1,y]);
    if (y>0) neighbors.push([x,y-1]);
    if (x<gameMap.width-1) neighbors.push([x+1,y]);
    if (y<gameMap.depth-1) neighbors.push([x,y+1]);
    return neighbors;
}

export const djikstra = (gameMap, spawn, goal) => {
    const start = [spawn[0], spawn[1]];
    const final = [goal[0], goal[1]];
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

export const getSteps = (path, heightMap) => {
    let pathIndex = 0;
    const increment = 50;
    let [x,y,z] = [path[0][0], path[0][1], heightMap[path[0][0]][path[0][1]]];
    const steps = [];
    while (pathIndex<path.length-1) {
        const [[xi, yi], [xf, yf]] = [path[pathIndex], path[pathIndex+1]];

        // move from center of curr to boundary
        while (Math.abs(x-xi) <= Math.abs((xf-xi)*.5) && Math.abs(y-yi) <= Math.abs((yf-yi)*.5)) {
            steps.push([x,y,z]);
            x += (xf-xi)/increment;
            y += (yf-yi)/increment;
            x = round(x);
            y = round(y);
        }

        // move from curr height to next height
        const [zi, zf] = [z, heightMap[xf][yf]];
        while (z !== zf) {
            steps.push([x,y,z]);
            z += (zf-zi)/increment; // can divide for slower climb speed
            z = round(z);
        }

        // move from boundary to center of next
        while (Math.abs(x-xi) < Math.abs(xf-xi) || Math.abs(y-yi) < Math.abs(yf-yi)) {
            steps.push([x,y,z]);
            x += (xf-xi)/increment;
            y += (yf-yi)/increment;
            x = round(x);
            y = round(y);
        }

        pathIndex++;
    }
    return steps;
}
