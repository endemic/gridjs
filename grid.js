class Grid {
    // our grid contains simple integers to represent game objects;
    // this map translates the numbers to a string, that can then be used as
    // human-readable reference or CSS class (for display purposes)
    cssClassMap = {};

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        // set up 2D array to use as data store for game logic & display
        this.displayState = Array(columns).fill().map(_ => Array(rows).fill());

        // set up 2D array to store references to DOM nodes
        this.gridRef = Array(columns).fill().map(_ => Array(rows).fill());

        let grid = document.querySelector('#grid');

        // set appropriate CSS rules
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
        grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;
        grid.style.aspectRatio = columns / rows;

        // create the grid in our HTML page
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
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

    render(nextDisplayState) {
        // enumerate through the current/new display state arrays to update the changed values
        this.displayState.forEach((column, x) => {
            column.forEach((row, y) => {
                if (this.displayState[x][y] === nextDisplayState[x][y]) {
                    return;
                }

                // update the CSS class of the cell 
                this.gridRef[x][y].classList = this.cssClassMap[nextDisplayState[x][y]];
            });
        });

        // set the next state as current state
        this.displayState = nextDisplayState;
    }

    // Returns a deep copy of the current display state
    displayStateCopy() {
        return JSON.parse(JSON.stringify(this.displayState));
    }

    // helper method to quickly fill a 2D array
    fill(grid, value) {
        return grid.map(row => row.fill(value));
    }

    randomPoint() {
        return {
            x: Math.floor(Math.random() * this.columns),
            y: Math.floor(Math.random() * this.rows)
        };
    }
}
