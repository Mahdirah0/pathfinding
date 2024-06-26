import { useEffect, useState } from 'react';
import './grid-view.css';
import { GridConstants } from '../constant';

import { PathfindingAlgorithms } from '../pathfinding';
import { Cell } from './cell';

const TRANSITION_SPEED = 50;

const createInitialGrid = (
  startPosRow: number,
  startPosCol: number,
  endPosRow: number,
  endPosCol: number
) => {
  const initialGrid = Array.from(Array(GridConstants.gridRows), () =>
    new Array(GridConstants.gridCols).fill(1)
  );
  initialGrid[startPosRow][startPosCol] = 2;
  initialGrid[endPosRow][endPosCol] = 3;

  return initialGrid;
};

type SelectedNode = {
  node: 'start' | 'end' | null;
  selected: boolean;
  prevPosition?: {
    value: number;
    row: number;
    col: number;
  };
};

export const Grid = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [startNodePos, setStartNodePos] = useState({
    row: GridConstants.startNode.row,
    col: GridConstants.startNode.col,
  });
  const [endNodePos, setEndNodePos] = useState({
    row: GridConstants.endNode.row,
    col: GridConstants.endNode.col,
  });

  useEffect(() => {
    const { row: startRow, col: startCol } = GridConstants.startNode;
    const { row: endRow, col: endCol } = GridConstants.endNode;
    const initialGrid: number[][] = createInitialGrid(
      startRow,
      startCol,
      endRow,
      endCol
    );
    setGrid(initialGrid);
  }, []);

  const [isMouseDown, setMouseDown] = useState(false);
  const [toggleWallValue, setToggleWallValue] = useState<number>(-1);
  const [selectedNode, setSelectedNode] = useState<SelectedNode>({
    selected: false,
    node: null,
  });
  const [isVisualising, setIsVisualising] = useState(false);

  // const animateVisitedNodes = (
  //   visitedNodes: [],
  //   path: [],
  //   pathFound: boolean
  // ) => {
  //   for (let i = 0; i < visitedNodes.length; i++) {
  //     setTimeout(() => {
  //       const { row, col } = visitedNodes[i];
  //       const div = divRefs.current[row][col];
  //       if (div?.getAttribute('start-node') !== 'true') {
  //         div?.setAttribute('visited-node', 'true');
  //       }
  //       if (i === visitedNodes.length - 1 && pathFound) {
  //         animateShortestPath(path);
  //       }
  //     }, TRANSITION_SPEED * i);
  //   }
  // };

  // const animateShortestPath = (path: any) => {
  //   for (let i = 0; i < path.length; i++) {
  //     setTimeout(() => {
  //       const { row, col } = path[i];
  //       const div = divRefs.current[row][col];
  //       if (
  //         div?.getAttribute('start-node') !== 'true' &&
  //         div?.getAttribute('end-node') !== 'true'
  //       ) {
  //         div?.setAttribute('path-node', 'true');
  //       }
  //     }, TRANSITION_SPEED * i);
  //   }
  // };

  // const onVisualizeClick = () => {
  //   const { visitedNodes, path, pathFound }: any = AStarAlgo(
  //     grid,
  //     startPos,
  //     endPos,
  //     GRID_ROWS,
  //     GRID_COLS
  //   );
  //   animateVisitedNodes(visitedNodes, path, pathFound);
  // };

  const isNotStartOrEndNode = (value: number) => {
    return value !== 2 && value !== 3;
  };

  const handleMouseDown = (value: number, row: number, col: number) => {
    setMouseDown(true);

    if (isNotStartOrEndNode(value)) {
      const setWallValue = grid[row][col] === 1 ? 0 : 1;
      setToggleWallValue(setWallValue);
      setGridValue(setWallValue, row, col);
    }

    if (value === 2) {
      setGridValue(1, row, col);
      setSelectedNode({ node: 'start', selected: true });
    }

    if (value === 3) {
      setGridValue(1, row, col);
      setSelectedNode({ node: 'end', selected: true });
    }
  };

  const handleMouseEnter = (value: number, row: number, col: number) => {
    if (!isMouseDown) {
      return;
    }

    if (selectedNode.selected && selectedNode.node === 'start') {
      setSelectedNode((prev) => ({
        ...prev,
        prevPosition: { value, row, col },
      }));
      if (selectedNode.prevPosition) {
        setGridValue(
          selectedNode.prevPosition.value,
          selectedNode.prevPosition.row,
          selectedNode.prevPosition.col
        );
      }
      setGridValue(2, row, col);
    }

    if (selectedNode.selected && selectedNode.node === 'end') {
      setSelectedNode((prev) => ({
        ...prev,
        prevPosition: { value, row, col },
      }));
      if (selectedNode.prevPosition) {
        setGridValue(
          selectedNode.prevPosition.value,
          selectedNode.prevPosition.row,
          selectedNode.prevPosition.col
        );
      }
      setGridValue(3, row, col);
    }

    if (isNotStartOrEndNode(value) && !selectedNode.selected) {
      setGridValue(toggleWallValue, row, col);
    }
  };

  const handleMouseUp = (value: number, row: number, col: number) => {
    setMouseDown(false);
    setToggleWallValue(-1);

    if (selectedNode.selected && selectedNode.node === 'start') {
      setGridValue(2, row, col);
      setStartNodePos({ row, col });
      setSelectedNode({ node: null, selected: false });
    }

    if (selectedNode.selected && selectedNode.node === 'end') {
      setGridValue(3, row, col);
      setEndNodePos({ row, col });
      setSelectedNode({ node: null, selected: false });
    }
  };

  const setGridValue = (value: any, row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((arr) => arr.slice());
      newGrid[row][col] = value;
      return newGrid;
    });
  };

  const resetGrid = () => {
    const initialGrid: number[][] = createInitialGrid(
      startNodePos.row,
      startNodePos.col,
      endNodePos.row,
      endNodePos.col
    );
    setGrid(initialGrid);
  };

  const animateVisitedNodes = (
    visitedNodes: any[],
    path: any[],
    pathFound: boolean
  ) => {
    console.log(visitedNodes);
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const { row, col } = visitedNodes[i];
        if (isNotStartOrEndNode(grid[row][col])) {
          setGridValue(4, row, col);
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
        if (isNotStartOrEndNode(grid[row][col])) {
          setGridValue(5, row, col);
        }
      }, TRANSITION_SPEED * i);
    }
  };

  const handleVisualiseClick = () => {
    // resetGrid();
    const { path, pathFound, visitedNodes } = PathfindingAlgorithms.aStar({
      board: grid,
      startPosition: startNodePos,
      endPosition: endNodePos,
    });
    animateVisitedNodes(visitedNodes, path, pathFound);
  };

  return (
    <div className='grid-container'>
      <div className='buttons-container'>
        <select name='' id=''>
          <option value='a-star'>A Star</option>
          <option value='dijkastra'>Dijkstra</option>
        </select>
        <button className='visualise' onClick={handleVisualiseClick}>
          Visualize
        </button>
      </div>
      <div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className='rows'>
            {row.map((value, colIndex) => (
              <Cell
                key={colIndex}
                value={value}
                row={rowIndex}
                col={colIndex}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
