import { round, normalize, pythagorean, quadratic } from "./math_utils";

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

export const getSteps = (path, heightMap, speed) => {
    let pathIndex = 0;
    const increment = 60 / speed; 
    // default speed of 1 splits each step (tile to tile) into 60 increments

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
    steps.push([path.at(-1)[0], path.at(-1)[1], heightMap[path.at(-1)[0]][path.at(-1)[1]]]);
    return steps;
}

const isAboveGround = (x, y, z, heightMap) => {
    const [xIdx, yIdx] = [round(x,0), round(y,0)];
    if (xIdx < 0 || xIdx >= heightMap.length || yIdx < 0 || yIdx >= heightMap[0].length) return false;  
    return z >= heightMap[xIdx][yIdx];
}

export const getStraightPath = (start, end, heightMap, speed=0.1) => {
    // start and end are [x,y,z] coordinates
    // returns a series of points, separated by distance 'speed', that follow a straight path
    // if no straight path through heightMap is possible, returns an empty array
    const unitVector = normalize(start, end);
    const path = [start];
    while (isAboveGround(...path.at(-1), heightMap)) {
        path.push(path.at(-1).map((val,idx) => val + unitVector[idx]*speed));
    }

    if (round(path.at(-1)[0],0) !== end[0] || round(path.at(-1)[1],0) !== end[1]) return [];
    return path;
};

export const getParabolicPath = (start, end, heightMap, timeInterval=0.02) => {
    // start and end are [x,y,z] coordinates
    // returns a series (separated by timeInterval) of points that follow a parabolic path
    // if no parabolic path (starting at the default angle) through heightMap is possible, returns an empty array
    const g = -10; // gravitational acceleration
    const angleToHorizontal = 75 * (Math.PI/180); // 75 degrees to radians

    const heightDifference = end[2] - start[2];
    const horizontalDistance = pythagorean(start.slice(0,2), end.slice(0,2));
    /*
        horizontalDistance = v0*cos(angle)*t
        heightDifference = v0*sin(angle)*t + 0.5*g*t^2

        heightDifference = 0.5*g*t^2 + 0*t + horizontalDistance*tan(angle)
    */
    const times = quadratic(g/2, 0, horizontalDistance*Math.tan(angleToHorizontal) - heightDifference);
    if (!times.length) return [];
    const time = Math.max(...times); // take later time if two solutions
    
    const initialVelocity = horizontalDistance / (time * Math.cos(angleToHorizontal));
    const angleAroundZ = Math.atan2(end[1]-start[1], end[0]-start[0]);

    const path = [start];
    while (isAboveGround(...path.at(-1), heightMap)) {
        const [x,y,z] = path.at(-1);
        const t = (path.length-1)*timeInterval;
        const dx = initialVelocity * Math.cos(angleToHorizontal) * Math.cos(angleAroundZ) * timeInterval;
        const dy = initialVelocity * Math.cos(angleToHorizontal) * Math.sin(angleAroundZ) * timeInterval;
        const dz = (initialVelocity * Math.sin(angleToHorizontal) * timeInterval) + (g * t * timeInterval);
        path.push([x + dx, y + dy, z+dz]);
    };
    
    if (round(path.at(-1)[0],0) !== end[0] || round(path.at(-1)[1],0) !== end[1]) return [];
    return path;
};
