import { useEffect, useState } from 'react';
import VisualizeBoard from './VisualizeBoard';
import './Grid.css';
import {
  INTIAL_END_ROW,
  INTIAL_END_COL,
  INTIAL_START_COL,
  INTIAL_START_ROW,
} from '../constant';

const Board = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [nodeClicked, setNodeClicked] = useState({
    x: 0,
    y: 0,
    node: '',
  });
  const [dragging, setDragging] = useState({
    start: false,
    end: false,
  });

  const [startNodePos, setStartNodePos] = useState({
    x: INTIAL_START_COL,
    y: INTIAL_START_ROW,
  });
  const [endNodePos, setEndNodePos] = useState({
    x: INTIAL_END_COL,
    y: INTIAL_END_ROW,
  });

  useEffect(() => {
    const initialGrid: string[][] = createBoard(11, 21);
    setGrid(initialGrid);
  }, []);

  const createBoard = (row: number, col: number) => {
    const initialGrid = Array.from(Array(row), () => new Array(col).fill(''));
    initialGrid[INTIAL_START_ROW][INTIAL_START_COL] = 'S';
    initialGrid[INTIAL_END_ROW][INTIAL_END_COL] = 'E';
    return initialGrid;
  };

  const placeNode = (letter: string, x: number, y: number, arr: string[][]) => {
    arr[y][x] = letter;
    setGrid(arr);
  };

  const onMouseDown = (x: number, y: number, event: any) => {
    // draggiing to be true when
    // (green node) x != INITIAL_START_COL, y != INTIAL_START_ROW
    // (red node) x != INITIAL_END_COL, y != INTIAL_START_ROW
    // click
    // end click
    if (x === startNodePos.x && y === startNodePos.y) {
      setDragging({ start: true, end: false });
    } else if (x === endNodePos.x && y === endNodePos.y) {
      setDragging({ start: false, end: true });
    }
  };

  const onMouseUp = (x: number, y: number, event: any) => {
    setDragging({ start: false, end: false });
  };

  const onMouseMove = (x: number, y: number, event: any) => {
    console.log(dragging.start, dragging.end);
    if (dragging.start) {
    }
  };

  const onClick = (x: number, y: number, event: any) => {
    // console.log(dragging);
  };

  return (
    <>
      <div className='board'>
        <VisualizeBoard
          board={grid}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onClick}
          onMouseMove={onMouseMove}
        />
      </div>
    </>
  );
};

export default Board;
