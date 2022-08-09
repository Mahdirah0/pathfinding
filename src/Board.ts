const cols: number = 8;
const rows: number = 8;
export const Board = Array(cols)
  .fill(0)
  .map((row) => new Array(rows).fill(''));

export const onClick = (x: number, y: number) => {
  Board[x][y] = '0';
};
