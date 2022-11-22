import { useEffect, useRef, useState } from 'react';
import './VisualizeBoard.css';
import './Grid.css';
import {
  INTIAL_END_COL,
  INTIAL_END_ROW,
  INTIAL_START_ROW,
  INTIAL_START_COL,
} from '../constant';

import { AStarAlgo } from '../algorithm/AStarAlgo';

const TRANSITION_SPEED = 50;

const Board = () => {
  const [grid, setGrid] = useState<any[][]>([]);
  const divRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const [visualizing, startVisualizing] = useState(false);
  const [selectedWalls, setSelectedWalls] = useState<any>();

  const [dragging, setDragging] = useState({
    start: false,
    end: false,
    wall: false,
  });

  const [startPos, setStartPos] = useState({
    i: INTIAL_START_ROW,
    j: INTIAL_START_COL,
  });
  const [endPos, setEndPos] = useState({
    i: INTIAL_END_ROW,
    j: INTIAL_END_COL,
  });

  useEffect(() => {
    const initialGrid: number[][] = createBoard(15, 15);
    setGrid(initialGrid);
  }, []);

  const createBoard = (row: number, col: number) => {
    const initialGrid = Array.from(Array(row), () => new Array(col).fill(1));
    // initialGrid[3][2] = 0;
    // initialGrid[2][2] = 0;
    // initialGrid[1][2] = 0;
    return initialGrid;
  };

  const onMouseDown = (i: number, j: number) => {
    const node = grid[i][j];
    console.log(node, i, j);

    if (startPos.i === i && startPos.j === j) {
      setDragging({ start: true, end: false, wall: false });
    } else if (endPos.i === i && endPos.j === j) {
      setDragging({ start: false, end: true, wall: false });
    } else {
      setDragging({ start: false, end: false, wall: true });
    }
  };

  const onMouseMove = (i: number, j: number) => {
    const { start, end, wall } = dragging;
    const nodeDiv = divRefs.current[i][j];

    if (start || end) {
      const n = dragging.start ? 'start' : dragging.end ? 'end' : '';
      for (let _i = 0; _i < divRefs.current.length; _i++) {
        for (let _j = 0; _j < divRefs.current.length; _j++) {
          divRefs.current[_i][_j]?.removeAttribute(`${n}-node`);
        }
      }
      nodeDiv?.setAttribute(`${n}-node`, 'true');
    } else if (wall) {
      let copy = [...grid];

      const square = copy[i][j];
      const isStartPos = startPos.i === i && startPos.j === j;
      const isEndPos = endPos.i === i && endPos.j === j;

      if (square === 0) {
        nodeDiv?.removeAttribute('wall-node');
        copy[i][j] = 1;
      } else if (!isStartPos && !isEndPos) {
        nodeDiv?.setAttribute('wall-node', 'true');
        copy[i][j] = 0;
      }

      setSelectedWalls(copy);
    }
  };

  const onMouseUp = (i: number, j: number) => {
    if (dragging.start) {
      setStartPos({ i, j });
    } else if (dragging.end) {
      setEndPos({ i, j });
    } else if (dragging.wall) {
      setGrid(selectedWalls);
    }
    console.log(startPos, endPos);
    console.log(grid);

    setDragging({ start: false, end: false, wall: false });
  };

  const animateVisitedNodes = (
    visitedNodes: any,
    path: any,
    pathFound: boolean
  ) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const { i: x, j: y } = visitedNodes[i];
        const div = divRefs.current[x][y];
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
        const { i: x, j: y } = path[i];
        const div = divRefs.current[x][y];
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
    // console.log(dragging);
    const { visitedNodes, path, pathFound }: any = AStarAlgo(
      grid,
      startPos,
      endPos
    );
    animateVisitedNodes(visitedNodes, path, pathFound);
  };

  return (
    <>
      <div className='board'>
        {grid.map((item: any, rowIndex: number) => (
          <div key={rowIndex} className='rows' row-number={rowIndex}>
            {item.map((node: any, colIndex: number) => (
              <div
                key={colIndex}
                ref={(el) => {
                  divRefs.current[rowIndex] = divRefs.current[rowIndex] || [];
                  divRefs.current[rowIndex][colIndex] = el;
                }}
                className='cols'
                cell-coordinates={`${rowIndex},${colIndex}`}
                start-node={
                  startPos.i === rowIndex && startPos.j === colIndex
                    ? 'true'
                    : undefined
                }
                end-node={
                  endPos.i === rowIndex && endPos.j === colIndex
                    ? 'true'
                    : undefined
                }
                wall-node={node === 0 ? 'true' : undefined}
                onMouseDown={() => onMouseDown(rowIndex, colIndex)}
                onMouseUp={() => onMouseUp(rowIndex, colIndex)}
                onMouseMove={() => onMouseMove(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
        <button onClick={onVisualizeClick}>Visualize</button>
      </div>
    </>
  );
};

export default Board;
