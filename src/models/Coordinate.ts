export type Column= 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';
export type Row = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Coordinate = `${Column}${Row}`

export function isValidCoordinate(input: unknown): input is Coordinate {
  if (typeof input !== 'string') { return false }

  const [column, row] = input.split('') as [Column, Row];
  const xNum = parseInt(row, 10);

  if (xNum < 1 || xNum > 9) { return false }
  if (!['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].includes(column)) { return false }

  return true;
}

export default Coordinate;
