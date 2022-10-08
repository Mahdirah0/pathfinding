import { FC } from 'react';
import './VisualizeBoard.css';

interface IProps {
  board: string[][];
  // handleClick: (x: number, y: number, event: any) => void;
  onMouseDown: (x: number, y: number, event: any) => void;
  onMouseUp: (x: number, y: number, event: any) => void;
  onClick: (x: number, y: number, event: any) => void;
  onMouseMove: (x: number, y: number, event: any) => void;
}

const VisualizeBoard: FC<IProps> = ({
  board,
  onMouseDown,
  onMouseUp,
  onClick,
  onMouseMove,
}) => {
  return (
    <>
      {board.map((item: any, rowIndex: number) => (
        <div key={rowIndex} className='rows' row-number={rowIndex}>
          {item.map((node: any, colIndex: number) => (
            <div
              key={colIndex}
              className='cols'
              cell-coordinates={`${rowIndex},${colIndex}`}
              start-node={node === 'S' ? 'true' : undefined}
              end-node={node === 'E' ? 'true' : undefined}
              wall-node={node === 'W' ? 'true' : undefined}
              onMouseDown={(event) => onMouseDown(colIndex, rowIndex, event)}
              onMouseUp={(event) => onMouseUp(colIndex, rowIndex, event)}
              onClick={(event) => onClick(colIndex, rowIndex, event)}
              onMouseMove={(event) => onMouseMove(colIndex, rowIndex, event)}
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default VisualizeBoard;
