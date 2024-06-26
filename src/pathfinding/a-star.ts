import { GridConstants } from '../constant';

type Coordinate = {
  row: number;
  col: number;
};

class GridPoint {
  row: number;
  col: number;
  f: number;
  g: number;
  h: number;
  neighbours: GridPoint[];
  parent: GridPoint | null;
  rows: number;
  cols: number;
  value: number;
  wall: boolean;

  constructor(
    row: number,
    col: number,
    value: number,
    rows: number,
    cols: number
  ) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.cols = cols;
    this.rows = rows;
    this.neighbours = [];
    this.parent = null;
    this.wall = false;
    if (value === 0) {
      this.wall = true;
    }
  }

  updateNeighbours(grid: GridPoint[][]) {
    let row = this.row;
    let col = this.col;

    if (row < this.rows - 1) {
      this.neighbours.push(grid[row + 1][col]);
    }
    if (row > 0) {
      this.neighbours.push(grid[row - 1][col]);
    }
    if (col < this.cols - 1) {
      this.neighbours.push(grid[row][col + 1]);
    }
    if (col > 0) {
      this.neighbours.push(grid[row][col - 1]);
    }
  }
}

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
  let d1 = Math.abs(position1.row - position0.row);
  let d2 = Math.abs(position1.col - position0.col);

  return d1 + d2;
};

type AStarProps = {
  board: any;
  startPosition: Coordinate;
  endPosition: Coordinate;
};

export const aStar = ({ board, startPosition, endPosition }: AStarProps) => {
  const rows = GridConstants.gridRows;
  const cols = GridConstants.gridCols;
  const grid = initGrid(board, rows, cols);

  let path: GridPoint[] = [];
  const openSet: GridPoint[] = [];
  const closedSet: GridPoint[] = [];

  openSet.push(grid[startPosition.row][startPosition.col]);

  const end = grid[endPosition.row][endPosition.col];

  while (openSet.length > 0) {
    let currentIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[currentIndex].f) {
        currentIndex = i;
      }
    }

    let current: GridPoint = openSet[currentIndex];

    if (current === end) {
      let temp: GridPoint = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
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
