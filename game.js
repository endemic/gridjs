const rows = 10;
const columns = 10;

Waffle.init(rows, columns);

Waffle.onKeyDown(({ key }) => {
  console.log(`pressed ${key}`);
});

Waffle.onPointDown(({ x, y }, { primary, secondary }) => {
  console.log(`${secondary ? 'right' : 'left'}-clicked cell (${x}, ${y})`);

  /* replace this with your own code! */
  const state = Waffle.state;

  if (Waffle.isEmpty(state[x][y])) {
    state[x][y] = 'highlight';
  } else {
    state[x][y] = '';
  }

  Waffle.state = state;
});
