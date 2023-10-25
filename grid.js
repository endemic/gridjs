class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        // set up 2D array to use as data store for game logic & display
        this.state = Array(columns).fill().map(_ => Array(rows).fill());

        // set up 2D array to store references to DOM nodes
        this.gridRef = Array(columns).fill().map(_ => Array(rows).fill());

        // the base HTML page needs to have an element with `id="grid"`
        let grid = document.querySelector('#grid');

        // set appropriate CSS rules
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
        grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;
        grid.style.aspectRatio = columns / rows;

        // fill the grid with `<div>` elements
        for (let y = 0; y < this.rows; y += 1) {
            for (let x = 0; x < this.columns; x += 1) {
                // create a DOM node for each element in the backing array
                let node = document.createElement('div');

                // For games that use the mouse, set `data-` attributes
                // to easily reference the clicked node
                node.dataset.x = x;
                node.dataset.y = y;

                // save a reference to the node, so it can be quickly updated later
                this.gridRef[x][y] = node;

                // add the node to the actual page
                grid.appendChild(node);
            }
        }
    }

    render(nextState) {
        // enumerate through the current/new state arrays to update the changed values
        for (let x = 0; x < this.columns; x += 1) {
            for (let y = 0; y < this.rows; y += 1) {
                // if old state & new state are the same, nothing needs to be updated
                if (this.state[x][y] === nextState[x][y]) {
                    continue;
                }

                // otherwise, update the CSS class of the grid cell
                this.gridRef[x][y].classList = nextState[x][y];
            }
        }

        // set the new current state
        this.state = nextState;
    }

    // Returns a deep copy of the current state
    get currentState() {
        return JSON.parse(JSON.stringify(this.state));
    }

    // helper method to quickly fill a 2D array
    fill(grid, value) {
        return grid.map(row => row.fill(value));
    }

    // helper method to get a random point in the grid
    randomPoint() {
        return {
            x: Math.floor(Math.random() * this.columns),
            y: Math.floor(Math.random() * this.rows)
        };
    }

    // helper method to determine if point is in grid
    withinBounds({ x, y }) {
        return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
    }
}
