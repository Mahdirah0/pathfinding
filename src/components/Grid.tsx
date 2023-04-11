import { useEffect, useRef, useState } from 'react';
import './Grid.css';
import {
  INTIAL_END_COL,
  INTIAL_END_ROW,
  INTIAL_START_ROW,
  INTIAL_START_COL,
  ROWS,
  COLS,
} from '../constant';

import { AStarAlgo } from '../algorithm/AStarAlgo';

const TRANSITION_SPEED = 50;

type Coordinate = {
  row: number;
  col: number;
};

export const Grid = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const divRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const [selectedCell, setSelectedCells] = useState({
    cell: 0,
    selected: false,
  });

  const [visualizing, setIsVisualizing] = useState(false);
  const [startPos, setStartPos] = useState<Coordinate>({
    row: INTIAL_START_ROW,
    col: INTIAL_START_COL,
  });
  const [endPos, setEndPos] = useState<Coordinate>({
    row: INTIAL_END_ROW,
    col: INTIAL_END_COL,
  });

  useEffect(() => {
    const initialGrid: number[][] = createBoard(ROWS, COLS);
    setGrid(initialGrid);
  }, []);

  const createBoard = (row: number, col: number) => {
    const initialGrid = Array.from(Array(row), () => new Array(col).fill(1));
    initialGrid[INTIAL_START_ROW][INTIAL_START_COL] = 2;
    initialGrid[INTIAL_END_ROW][INTIAL_END_COL] = 3;

    return initialGrid;
  };

  const onClickMove = (row: number, col: number) => {
    let copy = grid;
    const nodeDiv = divRefs.current[row][col];
    const cell = grid[row][col];

    if (selectedCell.selected) {
      if (selectedCell.cell === 2) {
        setStartPos({ row, col });
      } else if (selectedCell.cell === 3) {
        setEndPos({ row, col });
      }

      let color =
        selectedCell.cell === 2 ? 'rgb(61, 226, 61)' : 'rgb(228, 84, 84)';
      let number = selectedCell.cell === 2 ? 2 : 3;

      nodeDiv!.style.backgroundColor = color;
      copy[row][col] = number;

      let selection = {
        cell: 0,
        selected: false,
      };

      setSelectedCells(selection);
    } else if (cell === 0) {
      nodeDiv!.style.backgroundColor = 'white';
      copy[row][col] = 1;
    } else if (cell === 1) {
      nodeDiv!.style.backgroundColor = 'black';
      copy[row][col] = 0;
    } else if (cell === 2 || cell === 3) {
      nodeDiv!.style.backgroundColor = 'white';
      copy[row][col] = 1;

      let selection = {
        cell,
        selected: true,
      };

      setSelectedCells(selection);
    }

    setGrid(copy);
  };

  const animateVisitedNodes = (
    visitedNodes: [],
    path: [],
    pathFound: boolean
  ) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const { row, col } = visitedNodes[i];
        const div = divRefs.current[row][col];
        if (div?.getAttribute('start-node') !== 'true') {
          div?.setAttribute('visited-node', 'true');
        }
        if (i === visitedNodes.length - 1 && pathFound) {
          animateShortestPath(path);
        }
      }, TRANSITION_SPEED * i);
    }
  };

  const animateShortestPath = (path: any) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const { row, col } = path[i];
        const div = divRefs.current[row][col];
        if (
          div?.getAttribute('start-node') !== 'true' &&
          div?.getAttribute('end-node') !== 'true'
        ) {
          div?.setAttribute('path-node', 'true');
        }
      }, TRANSITION_SPEED * i);
    }
  };

  const onVisualizeClick = () => {
    const { visitedNodes, path, pathFound }: any = AStarAlgo(
      grid,
      startPos,
      endPos,
      ROWS,
      COLS
    );
    animateVisitedNodes(visitedNodes, path, pathFound);
  };

  return (
    <>
      <div className='board'>
        <button className='visualize' onClick={onVisualizeClick}>
          Visualize
        </button>
        {grid.map((item: number[], rowIndex: number) => (
          <div key={rowIndex} className='rows' row-number={rowIndex}>
            {item.map((node: number, colIndex: number) => (
              <div
                key={colIndex}
                ref={(el) => {
                  divRefs.current[rowIndex] = divRefs.current[rowIndex] || [];
                  divRefs.current[rowIndex][colIndex] = el;
                }}
                className='cell'
                cell-coordinates={`${rowIndex}-${colIndex}`}
                start-node={node === 2 ? 'true' : undefined}
                end-node={node === 3 ? 'true' : undefined}
                wall-node={node === 0 ? 'true' : undefined}
                onClick={() => onClickMove(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
