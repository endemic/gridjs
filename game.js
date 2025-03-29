const rows = 10;
const columns = 10;

Grid.init(rows, columns);

Grid.onKeyDown(({ key }) => {
  console.log(`pressed ${key}`);
});

Grid.onPointDown(({ x, y }) => {
  console.debug(`clicked grid cell (${x}, ${y})`);

  /* replace this with your own code! */
  const newState = Grid.state;

  if (Grid.isEmpty(newState[x][y])) {
    newState[x][y] = 'highlight';
  } else {
    newState[x][y] = '';
  }

  Grid.state = newState;
});
