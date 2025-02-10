import { round, normalize, pythagorean, quadratic, manhattan } from "./math_utils";

const getNeighbors = (x, y, gameMap) => {
    const neighbors = [];
    if (x>0) neighbors.push([x-1,y]);
    if (y>0) neighbors.push([x,y-1]);
    if (x<gameMap.width-1) neighbors.push([x+1,y]);
    if (y<gameMap.depth-1) neighbors.push([x,y+1]);
    return neighbors;
}

export const dijkstra = (gameMap, spawn, goal) => {
    const start = [spawn[0], spawn[1]];
    const final = [goal[0], goal[1]];

    const climbTime = 4; // time to climb one tile
    const dropTime = 1; // time to drop one tile
    const walkTime = 1; // time to walk one tile

    const visited = new Set();
    const queue = [{path: [start], time: 0}];

    while (queue) {
        const { path, time } = queue.shift();
        const [x, y] = path.at(-1);
        const z = gameMap.getElevation(x, y, true);

        const cell = [x, y].join(',');
        if (visited.has(cell)) {
            continue;
        }
        visited.add(cell);

        if (x===final[0] && y===final[1]) return path;

        const neighbors = getNeighbors(x, y, gameMap);
        for(let [nx, ny] of neighbors){
            const nz = gameMap.getElevation(nx, ny, true);
            queue.push({
                path: [...path, [nx, ny]],
                time: time + walkTime + (nz>z ? climbTime*(nz-z) : dropTime*(z-nz)),
            })
        }

        queue.sort((a,b) => a.time - b.time); // lazy heap
    }
    throw new Error('No Path Found');
}

export const getSteps = (path, gameMap, speed) => {
    let pathIndex = 0;
    const increment = 60 / speed;
    // default speed of 1 splits each step (tile to tile) into 60 increments

    let [x,y,z] = [path[0][0], path[0][1], gameMap.getElevation(path[0][0], path[0][1])];
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
        [x, y] = [(xi+xf)/2, (yi+yf)/2];

        // move from curr height to next height
        const [zi, zf] = [z, gameMap.getElevation(xf, yf, true)];
        while (Math.abs(z-zi) < Math.abs(zf-zi)) {
            steps.push([x,y,z]);
            z += (zf-zi)/increment; // can divide for slower climb speed
            z = round(z);
        }
        z = zf;

        // move from boundary to center of next
        while (Math.abs(x-xi) < Math.abs(xf-xi) || Math.abs(y-yi) < Math.abs(yf-yi)) {
            steps.push([x,y,z]);
            x += (xf-xi)/increment;
            y += (yf-yi)/increment;
            x = round(x);
            y = round(y);
        }
        [x, y] = [xf, yf];

        pathIndex++;
    }
    steps.push([path.at(-1)[0], path.at(-1)[1], gameMap.getElevation(path.at(-1)[0], path.at(-1)[1])]);
    return steps;
}

const isAboveGround = (x, y, z, gameMap) => {
    const [xIdx, yIdx] = [round(x,0), round(y,0)];
    if (xIdx < 0 || xIdx >= gameMap.width || yIdx < 0 || yIdx >= gameMap.depth) return false;
    return z >= gameMap.getElevation(xIdx, yIdx);
}

export const getStraightPath = (tower, end, gameMap, speed=0.1) => {
    const {x, y, z, minRange, maxRange} = tower;
    const start = [x, y, z + tower.height]; // shoot from top of tower, not ground

    const dist2d = pythagorean([x, y], [end[0], end[1]]);
    // ignoring z for range calculation greatly improves range indicator ux
    if (dist2d < minRange) return [];
    if (dist2d > maxRange) return [];
    if (z + tower.height < end[2]) return []; // prevent shooting upwards (through ground)

    // start and end are [x,y,z] coordinates
    // returns a series of points, separated by distance 'speed', that follow a straight path
    // if no straight path through heightMap is possible, returns an empty array
    const unitVector = normalize(start, end);
    const path = [start];
    while (isAboveGround(...path.at(-1), gameMap)) {
        path.push(path.at(-1).map((val,idx) => val + unitVector[idx]*speed));
    }

    // check if path hits ground within tolerance of target
    const tolerance = 0.5;
    if (pythagorean(path.at(-1), end) > tolerance) return [];
    return path;
}

export const getParabolicPath = (tower, end, gameMap, timeInterval=0.02) => {
    const {x, y, z, minRange, maxRange} = tower;
    const start = [x, y, z + tower.height]; // shoot from top of tower, not ground

    const dist2d = pythagorean([x, y], [end[0], end[1]]);
    if (dist2d < minRange) return [];
    if (dist2d > maxRange) return [];

    // start and end are [x,y,z] coordinates
    // returns a series (separated by timeInterval) of points that follow a parabolic path
    // if no parabolic path (starting at the default angle) through height map is possible, returns an empty array
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
    while (isAboveGround(...path.at(-1), gameMap)) {
        const [x,y,z] = path.at(-1);
        const t = (path.length-1)*timeInterval;
        const dx = initialVelocity * Math.cos(angleToHorizontal) * Math.cos(angleAroundZ) * timeInterval;
        const dy = initialVelocity * Math.cos(angleToHorizontal) * Math.sin(angleAroundZ) * timeInterval;
        const dz = (initialVelocity * Math.sin(angleToHorizontal) * timeInterval) + (g * t * timeInterval);
        path.push([x + dx, y + dy, z+dz]);
    }
    
    // check if path hits ground within tolerance of target
    const tolerance = 0.5;
    if (pythagorean(path.at(-1), end) > tolerance) return [];
    return path;
}

export const getAdjacentTilePath = (tower, end) => {
    const SAW_TICK_DURATION = 20;
    const [endX, endY, endZ] = [round(end[0], 0), round(end[1], 0), end[2]];
    if (manhattan([tower.x, tower.y], [endX, endY]) !== 1) return [];
    if (tower.z + (tower.height/2) < endZ || tower.z > endZ + (tower.height/2)) return [];
    const avgX = (tower.x + endX)/2;
    const avgY = (tower.y + endY)/2;
    return Array(SAW_TICK_DURATION).fill([avgX, avgY, tower.z + (tower.height/2)]);
}

export function isTop(gameMap, x, y, z) {
    return gameMap.getElevation(x, y) === z;
}

export function isBottom(_gameMap, _x, _y, z) {
    return z == 0;
}

export function isOccupied(game, x, y, z) {
    const tower = game.getTower(x, y);
    return tower && (tower.z === z);
}

export function isSameCell(source, target) {
    return round(target[0], 0) === source.x && round(target[1], 0) === source.y;
}
