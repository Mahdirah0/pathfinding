import { FC } from 'react';
import './VisualizeBoard.css';

interface IProps {
  boardArray: string[][];
  handleClick: (x: number, y: number, event: any) => void;
}

const VisualizeBoard: FC<IProps> = ({ boardArray, handleClick }) => {
  return (
    <div className='board'>
      {boardArray.map((item: any, rowIndex: number) => (
        <div key={rowIndex} className='rows' row-number={rowIndex}>
          {item.map((value: any, colIndex: number) => (
            <div
              key={colIndex}
              className='cols'
              cell-coordinates={`${rowIndex},${colIndex}`}
              visited-cell={value === '#' ? 'wall' : 'unvisited'}
              onMouseDown={(event) => handleClick(colIndex, rowIndex, event)}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VisualizeBoard;
