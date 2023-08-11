export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';
export type Column = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Coordinate = `${Row}${Column}`

export function isValidCoordinate(input: unknown): input is Coordinate {
  if (typeof input !== 'string') { return false }

  const [row, column] = input.split('') as [Row, Column];
  const xNum = parseInt(column, 10);

  if (xNum < 1 || xNum > 9) { return false }
  if (!['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].includes(row)) { return false }

  return true;
}

export default Coordinate;
