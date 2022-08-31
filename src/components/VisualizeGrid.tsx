import { FC } from 'react';
import './VisualizeGrid.css';

interface IProps {
  board: string[][];
  // handleClick: (x: number, y: number, event: any) => void;
  onMouseDown: (x: number, y: number, event: any) => void;
  onMouseUp: (x: number, y: number, event: any) => void;
}

const VisualizeBoard: FC<IProps> = ({ board, onMouseDown, onMouseUp }) => {
  return (
    <>
      {board.map((item: any, rowIndex: number) => (
        <div key={rowIndex} className='rows' row-number={rowIndex}>
          {item.map((value: any, colIndex: number) => (
            <div
              key={colIndex}
              className='cols'
              cell-coordinates={`${rowIndex},${colIndex}`}
              start-node={value === 'S' ? 'true' : undefined}
              end-node={value === 'E' ? 'true' : undefined}
              wall-node={value === 'W' ? 'true' : undefined}
              onMouseDown={(event) => onMouseDown(colIndex, rowIndex, event)}
              onMouseUp={(event) => onMouseUp(colIndex, rowIndex, event)}
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default VisualizeBoard;
