import { useEffect, useState } from 'react';
import VisualizeBoard from './VisualizeBoard';
// import { Board } from '../Board';

const Board = () => {
  const n = 8;
  const [boardArray, setBoard] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => ''))
  );

  const startindNodePosition: number[] = [];
  const endingNodePosition: number[] = [];

  const contains = (boardArray: string[][], letter: string) => {};

  const handleClick = (x: number, y: number, event: any) => {
    // ?    console.log(event);
    const { button: buttonUsed } = event;
    let copyArray = [...boardArray];
    let letter: string = '';

    if (buttonUsed === 0) {
      startindNodePosition.push(y, x);
      letter = 'S';
    } else if (buttonUsed === 2) {
      endingNodePosition.push(y, x);
      letter = 'E';
    } else {
      letter = '#';
    }
    copyArray[y][x] = letter;
    setBoard(copyArray);
  };

  // useEffect(() => {}, [Board]);

  return (
    <>
      <VisualizeBoard boardArray={boardArray} handleClick={handleClick} />
    </>
  );
};

export default Board;
