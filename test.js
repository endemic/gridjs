Grid.init(10, 10);

console.assert(Grid.state.flatMap(x => x).length === 100);

Grid.fill('hello');

console.assert(Grid.state.flatMap(x => x).every(x => x === 'hello'));

const inBoundsPoints = [
  {x: -1, y: -1},
  {x: 0, y: 0},
  {x: 9, y: 9},
  {x: 10, y: 10}
].filter(Grid.withinBounds);

console.assert(inBoundsPoints.length === 2);

for (let i = 0; i < 100; i += 1) {
  let point = Grid.randomPoint;

  console.assert(Grid.withinBounds(point));
}

let neighbors = Grid.getNeighbors({x: 4, y: 4});
let expectedNeighbors = [
  {x: 4, y: 3},
  {x: 3, y: 4},
  {x: 5, y: 4},
  {x: 4, y: 5},
];

for (let i = 0; i < neighbors.length; i += 1) {
  console.assert(neighbors[i].x === expectedNeighbors[i].x && neighbors[i].y === expectedNeighbors[i].y);
}

neighbors = Grid.getNeighbors({x: 0, y: 0}, true);
expectedNeighbors = [
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: 1, y: 1}
];

for (let i = 0; i < neighbors.length; i += 1) {
  console.assert(neighbors[i].x === expectedNeighbors[i].x && neighbors[i].y === expectedNeighbors[i].y);
}

console.assert(Grid.isEmpty(''));
console.assert(Grid.isEmpty(null));
console.assert(Grid.isEmpty());
console.assert(Grid.isEmpty('   '));

Grid.onPointDown(({x, y}) => {
  console.log(`Point down on ${x}, ${y}`);
});

Grid.onPointMove(({x, y}) => {
  console.log(`Point move on ${x}, ${y}`);
});

Grid.onPointUp(({x, y}) => {
  console.log(`Point up on ${x}, ${y}`);
});

Grid.onKeyDown(({ key, shift, meta, control }) => {
  console.log(`Pressed ${key} (shift: ${shift}, meta: ${meta}, control: ${control})`);
});

Grid.onKeyUp(({ key, shift, meta, control }) => {
  console.log(`Released ${key} (shift: ${shift}, meta: ${meta}, control: ${control})`);
});
