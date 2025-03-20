const Grid = {
  init(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    // set up 2D array to use as data store for game logic & display
    this._state = Array(columns).fill().map(_ => Array(rows).fill(''));

    // set up 2D array to store references to DOM nodes
    this.gridRef = Array(columns).fill().map(_ => Array(rows).fill());

    // the base HTML page needs to have an element with `id="grid"`
    this.grid = document.querySelector('#grid');

    // set appropriate CSS rules
    this.grid.style.display = 'grid';
    this.grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
    this.grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    this.grid.style.aspectRatio = columns / rows;

    // fill the grid with `<div>` elements
    for (let y = 0; y < this.rows; y += 1) {
      for (let x = 0; x < this.columns; x += 1) {
        // create a DOM node for each element in the backing array
        const node = document.createElement('div');

        // For games that use the mouse, set `data-` attributes
        // to easily reference the clicked node
        node.dataset.x = x;
        node.dataset.y = y;

        // save a reference to the node, so it can be quickly updated later
        this.gridRef[x][y] = node;

        // add the node to the actual page
        this.grid.appendChild(node);
      }
    }
  },

  set state(newState) {
    // enumerate through the current/new state arrays to update the changed values
    for (let x = 0; x < this.columns; x += 1) {
      for (let y = 0; y < this.rows; y += 1) {
        // if old state & new state are different...
        if (this._state[x][y] !== newState[x][y]) {
          // update the DOM to show the change
          this.gridRef[x][y].classList = newState[x][y];
        }
      }
    }

    // set the new state value
    this._state = newState;
  },

  // Returns a deep copy of the current state
  get state() {
    return JSON.parse(JSON.stringify(this._state));
  },

  // Get a random point in the grid
  get randomPoint() {
    return {
      x: Math.floor(Math.random() * this.columns),
      y: Math.floor(Math.random() * this.rows)
    };
  },

  // Fill the grid with supplied value (good for initialization)
  fill(value) {
    const newState = this.state;
    newState.map(row => row.fill(value));
    this.state = newState;
  },

  // get 4-way/8-way neighbors
  getNeighbors({ x, y }, includeDiagonals = false) {
    let cells = [
      { x: x, y: y - 1 }, // top
      { x: x - 1, y: y }, // left
      { x: x + 1, y: y }, // right
      { x: x, y: y + 1 }  // bottom
    ];

    if (includeDiagonals) {
      cells.push(...[
        { x: x - 1, y: y - 1 }, // upper left
        { x: x + 1, y: y - 1 }, // upper right
        { x: x - 1, y: y + 1 }, // lower left
        { x: x + 1, y: y + 1 }  // lower right
      ]);
    }

    return cells.filter(Grid.withinBounds);
  },

  // Determine if point is in grid
  withinBounds({ x, y }) {
    return x >= 0 && x < Grid.columns && y >= 0 && y < Grid.rows;
  },

  // Get (x,y) coords of a clicked/tapped square
  getCoordinates(event) {
    const [x, y] = ['x', 'y'].map(coord => parseInt(event.target.dataset[coord], 10));

    return {x, y};
  },

  // Determine if a cell/value is considered "empty"
  isEmpty(value) {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
  },

  // Syntactic sugar for interactive event handlers
  onPointDown(callback) {
    this.grid.addEventListener('mousedown', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });

    this.grid.addEventListener('touchstart', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });
  },

  onPointMove(callback) {
    this.grid.addEventListener('mousemove', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });

    this.grid.addEventListener('touchmove', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });
  },

  onPointUp(callback) {
    this.grid.addEventListener('mouseup', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });

    this.grid.addEventListener('touchend', e => {
      e.preventDefault();
      callback(this.getCoordinates(e));
    });
  },

  onKeyDown(callback) {
    window.addEventListener('keydown', e => {
      e.preventDefault();
      callback({
        key: e.key,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey
      });
    });
  },

  onKeyUp(callback) {
    window.addEventListener('keyup', e => {
      e.preventDefault();
      callback({
        key: e.key,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey
      });
    });
  }
};
