type CellProps = {
  value: number;
  row: number;
  col: number;
  handleMouseDown: (value: number, row: number, col: number) => void;
  handleMouseUp: (value: number, row: number, col: number) => void;
  handleMouseEnter: (value: number, row: number, col: number) => void;
};

export const Cell = ({
  value,
  row,
  col,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: CellProps) => {
  const appendClassname = () => {
    const options = ['wall', '', 'start', 'end', 'visited', 'path'];

    return options[value];
  };

  return (
    <div
      className={`cell ${appendClassname()}`}
      onClick={() => {}}
      onMouseDown={() => handleMouseDown(value, row, col)}
      onMouseEnter={() => handleMouseEnter(value, row, col)}
      onMouseUp={() => handleMouseUp(value, row, col)}
    ></div>
  );
};
