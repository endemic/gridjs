const rows = 10;
const columns = 10;

Waffle.init(rows, columns);

Waffle.onKeyDown(({ key }) => {
  console.log(`pressed ${key}`);
});

Waffle.onPointDown(({ x, y }) => {
  console.debug(`clicked cell (${x}, ${y})`);

  /* replace this with your own code! */
  const newState = Waffle.state;

  if (Waffle.isEmpty(newState[x][y])) {
    newState[x][y] = 'highlight';
  } else {
    newState[x][y] = '';
  }

  Waffle.state = newState;
});
