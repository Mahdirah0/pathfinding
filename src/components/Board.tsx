import { useEffect, useState } from 'react';
import VisualizeBoard from './VisualizeBoard';
// import { Board } from '../Board';

const Board = () => {
  const n = 8;
  const [boardArray, setBoard] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => ''))
  );

  // const startNodePos: number[] = [];
  const [endNodePos, setEndNodePos] = useState<number[]>();
  const [startNodePos, setStartNodePos] = useState<number[]>();

  const isInBoard = (letter: string) => {
    for (let i = 0; i < boardArray.length; i++) {
      const t = boardArray[i];
      for (let j = 0; j < t.length; j++) {
        if (t[j] === letter) {
          boardArray[i][j] = '';
          return [i, j];
        }
      }
    }

    return [];
    // if its contained remove the element
  };

  const placeNode = (letter: string, x: number, y: number, arr: string[][]) => {
    arr[y][x] = letter;
    setBoard(arr);
  };

  const handleClick = (x: number, y: number, event: any) => {
    // ?    console.log(event);
    const { button: buttonUsed } = event;
    let copyArray = [...boardArray];

    if (buttonUsed === 0) {
      isInBoard('S');
      placeNode('S', x, y, copyArray);
      // startNodePos.push(y, x);
      setStartNodePos([y, x]);
    } else if (buttonUsed === 2) {
      isInBoard('E');
      placeNode('E', x, y, copyArray);
      setEndNodePos([y, x]);
    } else {
      placeNode('#', x, y, copyArray);
    }
  };
  return (
    <>
      <VisualizeBoard boardArray={boardArray} handleClick={handleClick} />
    </>
  );
};

export default Board;
