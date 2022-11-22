class GridPoint {
  i: number;
  j: number;
  f: number;
  g: number;
  h: number;
  neighbours: number[];
  parent: undefined;
  rows: number;
  cols: number;
  value: number;
  wall: boolean;

  constructor(i: number, j: number, value: number, rows: number, cols: number) {
    this.i = i;
    this.j = j;
    this.value = value;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.cols = cols;
    this.rows = rows;
    this.neighbours = [];
    this.parent = undefined;
    this.wall = false;
    if (value === 0) {
      this.wall = true;
    }
  }

  updateNeighbours(grid: any[][]) {
    let i = this.i;
    let j = this.j;
    if (i < this.cols - 1) {
      this.neighbours.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbours.push(grid[i - 1][j]);
    }
    if (j < this.rows - 1) {
      this.neighbours.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbours.push(grid[i][j - 1]);
    }
  }
}

const openSet: any[] = [];
const closedSet: any[] = [];
const visited: any[] = [];

let path: any[][] = [];

const initGrid = (board: number[][], rows: number, cols: number) => {
  const grid = Array.from(Array(rows), () => new Array(cols).fill(1));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new GridPoint(i, j, board[i][j], rows, cols);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].updateNeighbours(grid);
    }
  }

  return grid;
};

const heuristic = (position0: GridPoint, position1: GridPoint) => {
  let d1 = Math.abs(position1.i - position0.i);
  let d2 = Math.abs(position1.j - position0.j);

  return d1 + d2;
};

export const AStarAlgo = (
  board: number[][],
  startIndex: any,
  endIndex: any
) => {
  // board[i][j] where d -> 0
  const grid = initGrid(board, 15, 15);
  const end = grid[endIndex.i][endIndex.j];
  openSet.push(grid[startIndex.i][startIndex.j]);

  while (openSet.length > 0) {
    let currentIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[currentIndex].f) {
        currentIndex = i;
      }
    }

    let current = openSet[currentIndex];

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log('DONE!');
      // return the traced path
      return { visitedNodes: closedSet, path: path.reverse(), pathFound: true };
    }

    openSet.splice(currentIndex, 1);
    closedSet.push(current);

    let neighbours = current.neighbours;

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        let possibleG = current.g + 1;

        if (!openSet.includes(neighbour)) {
          openSet.push(neighbour);
        } else if (possibleG >= neighbour.g) {
          continue;
        }

        neighbour.g = possibleG;
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.parent = current;
      }
    }
  }

  return { visitedNodes: closedSet, path: [], pathFound: false };
};
