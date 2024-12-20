export const pythagorean = (p1, p2) => {
    if (p1.length !== p2.length) throw new Error('Incompatibile Vector Dimensions');

    const sumOfSquares = p1.reduce((acc,curr,idx) => {
        const diff = curr - p2[idx];
        return acc + (diff * diff);
    }, 0);
    return Math.sqrt(sumOfSquares);
};

export const manhattan = (p1, p2) => {
    if (p1.length !== p2.length) throw new Error('Incompatibile Vector Dimensions');
    return p1.reduce((acc,curr,idx) => acc + Math.abs(curr - p2[idx]), 0);
};

export const round = (num, decimals=5) => {
    const inverse = 10**decimals;
    return Math.round(num*inverse) / inverse;
};

export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const normalize = (orig, dest) => {
    const magnitude = pythagorean(orig, dest);
    const vector = dest.map((val, idx) => val - orig[idx]);
    return vector.map((val) => val/magnitude);
};

export const quadratic = (a, b, c) => {
    const discriminant = b**2 - 4*a*c;
    if (discriminant < 0) return [];
    if (discriminant === 0) return [-b/(2*a)];
    return [(-b + Math.sqrt(discriminant))/(2*a), (-b - Math.sqrt(discriminant))/(2*a)];
};
