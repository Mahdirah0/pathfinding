import { useEffect, useState } from 'react';
import VisualizeBoard from './VisualizeGrid';
import './Grid.css';
// import { Board } from '../Board';

const Board = () => {
  const initStartRow = 5;
  const initStartCol = 3;
  const initEndRow = 5;
  const initEndCol = 17;
  const [grid, setGrid] = useState<string[][]>([]);
  const [nodeClicked, setNodeClicked] = useState({
    x: 0,
    y: 0,
    node: '',
  });

  // const startNodePos: number[] = [];
  const [endNodePos, setEndNodePos] = useState<number[]>();
  const [startNodePos, setStartNodePos] = useState<number[]>();

  useEffect(() => {
    const initialGrid: string[][] = createBoard(11, 21);
    setGrid(initialGrid);
  }, []);

  const createBoard = (row: number, col: number) => {
    const initialGrid = Array.from(Array(row), () => new Array(col).fill(''));
    initialGrid[initStartRow][initStartCol] = 'S';
    initialGrid[initEndRow][initEndCol] = 'E';
    return initialGrid;
  };

  const placeNode = (letter: string, x: number, y: number, arr: string[][]) => {
    arr[y][x] = letter;
    setGrid(arr);
  };

  const handleMouseDown = (x: number, y: number, event: any) => {
    console.log(event);
    console.log(`row: ${y}, col: ${x}`);
    let copyArray = [...grid];
    const node = copyArray[y][x];

    if (node === 'W' || node === 'S' || node === 'E') {
      copyArray[y][x] = '';
      setGrid(copyArray);
    } else if (node === '') {
      copyArray[y][x] = 'W';
      setGrid(copyArray);
    }

    setNodeClicked({ node, x, y });
  };

  const handleMouseUp = (x: number, y: number, event: any) => {
    console.log(nodeClicked);
    console.log(y, x);
    const { node } = nodeClicked;
    let copyArray = [...grid];
    copyArray[y][x] = node;
    setGrid(copyArray);

    // let copyArray = [...grid];
    // copyArray[y][x] = 'S';

    // setGrid(copyArray);
    // console.log(grid);
  };

  return (
    <>
      <div className='board'>
        <VisualizeBoard
          board={grid}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>
    </>
  );
};

export default Board;
