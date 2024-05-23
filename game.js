import { Grid } from "./grid.js";

const rows = 10;
const columns = 10;

Grid.init(rows, columns);

/* replace this with your own code! */
document.querySelector("#grid").addEventListener("click", (e) => {
  const node = e.target;
  const { x, y } = node.dataset;

  console.log(`clicked grid cell (${x}, ${y})`);

  node.classList.toggle("highlight");
});
