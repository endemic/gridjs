const rows = 10;
const columns = 10;

Grid.init(rows, columns);

Grid.onKeyDown(({ key }) => {
  console.log(`pressed ${key}`);
});

Grid.onPointDown(({ x, y }) => {
  console.debug(`clicked grid cell (${x}, ${y})`);

  /* replace this with your own code! */
  const nextState = Grid.currentState;

  if (Grid.isEmpty(nextState[x][y])) {
    nextState[x][y] = 'highlight';
  } else {
    nextState[x][y] = '';
  }

  Grid.update(nextState);
});
