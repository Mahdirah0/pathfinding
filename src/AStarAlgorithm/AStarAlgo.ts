type IAStarAlgo = {
  board: [][];
};

type IPos = {
  x: number;
  y: number;
};

const distanceFromNodes = (startPos: IPos, endPos: IPos): number => {
  const changeInX: number = endPos.x - startPos.x;
  const changeInY: number = endPos.y - startPos.y;
  return Math.sqrt(changeInX * changeInX + changeInY * changeInY);
};

export const AStarAlgo = (board: any, startPos: IPos, endPos: IPos) => {
  // board[i][j] where d -> 0
  // to do this you have to compare prevDistance with currDistance
  // you can't move where there is walls
  // explore "every block" that has the shortest distance

  console.log(board);
  console.log(startPos);
  console.log(endPos);

  let currentDistance: number = 0;

  for (let i = 0; i < 10; i++) {
    let distance: number = distanceFromNodes(startPos, endPos);
    if (currentDistance < distance) {
    }
  }
};
