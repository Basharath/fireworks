function randomIntBetween(min, max) {
  return Math.ceil(Math.random() * (max - min - 1) + min);
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  const squareSum = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
  const distance = Math.sqrt(squareSum);

  return distance;
}

export default { randomIntBetween, randomIntFromRange, randomColor, distance };
