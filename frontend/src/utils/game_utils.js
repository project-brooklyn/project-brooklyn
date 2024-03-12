import { round } from "./math_utils";

const getNeighbors = (x, y, gameMap) => {
    const neighbors = [];
    if (x>0) neighbors.push([x-1,y]);
    if (y>0) neighbors.push([x,y-1]);
    if (x<gameMap.width-1) neighbors.push([x+1,y]);
    if (y<gameMap.depth-1) neighbors.push([x,y+1]);
    return neighbors;
}

export const djikstra = (gameMap) => {
    const start = [gameMap.width-1, gameMap.depth-1];
    const final = [0,0];
    const heightMap = gameMap.heightMap;

    const climbTime = 4; // time to climb one tile
    const dropTime = 1; // time to drop one tile
    const walkTime = 1; // time to walk one tile

    const visited = new Array(gameMap.width).fill().map(() => new Array(gameMap.depth).fill(false));
    const queue = [{path: [start], time: 0}];

    while (queue) {
        const { path, time } = queue.shift();
        const [x, z] = path.at(-1);
        const y = heightMap[x][z];

        if (visited[x][z]) continue;
        visited[x][z] = true;

        if (x===final[0] && z===final[1]) return path;

        const neighbors = getNeighbors(x, z, gameMap);
        for(let [nx, nz] of neighbors){
            const ny = heightMap[nx][nz];
            queue.push({
                path: [...path, [nx, nz]],
                time: time + walkTime + (ny>y ? climbTime*(ny-y) : dropTime*(y-ny)),
            })
        };

        queue.sort((a,b) => a.time - b.time); // lazy heap
    }
    throw new Error('No Path Found');
}

export const getSteps = (path, heightMap) => {
    let pathIndex = 0;
    const increment = 50;
    let [x,y,z] = [path[0][0], heightMap[path[0][0]][path[0][1]], path[0][1]];
    const steps = [];
    while (pathIndex<path.length-1) {
        const [[xi, zi], [xf, zf]] = [path[pathIndex], path[pathIndex+1]];

        // move from center of curr to boundary
        while (Math.abs(x-xi) <= Math.abs((xf-xi)*.5) && Math.abs(z-zi) <= Math.abs((zf-zi)*.5)) {
            steps.push([x,y,z]);
            x += (xf-xi)/increment;
            z += (zf-zi)/increment;
            x = round(x);
            z = round(z);
        }

        // move from curr height to next height
        const [yi, yf] = [y, heightMap[xf][zf]];
        while (y !== yf) {
            steps.push([x,y,z]);
            y += (yf-yi)/increment; // can divide for slower climb speed
            y = round(y);
        }

        // move from boundary to center of next
        while (Math.abs(x-xi) < Math.abs(xf-xi) || Math.abs(z-zi) < Math.abs(zf-zi)) {
            steps.push([x,y,z]);
            x += (xf-xi)/increment;
            z += (zf-zi)/increment;
            x = round(x);
            z = round(z);
        }

        pathIndex++;
    }
    return steps;
}
