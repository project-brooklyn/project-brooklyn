export const pythagorean = (p1, p2) => {
  if (p1.length !== p2.length) throw new Error('Incompatibile Vector Dimensions');

  const sumOfSquares = p1.reduce((acc,curr,idx) => {
      const diff = curr - p2[idx];
      return acc + (diff * diff);
  }, 0);
  return Math.sqrt(sumOfSquares);
}

export const round = (num, decimals=2) => {
  const inverse = 10**decimals;
  return Math.round(num*inverse) / inverse;
}
