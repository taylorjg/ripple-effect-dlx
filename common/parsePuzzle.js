const R = require('ramda')

const SAMPLE_PUZZLE_8x8 = [
  'A:- B:- C:- C:3 C:- D:- D:- D:-',
  'E:- B:- F:- G:- H:- H:- D:- I:-',
  'E:- E:- F:- G:- G:- J:- J:2 K:-',
  'E:- L:- L:- G:1 M:- M:3 K:- K:-',
  'L:- L:- N:1 O:- O:5 M:- M:- K:-',
  'P:- L:3 N:- Q:- O:- M:- R:- R:-',
  'P:- S:- T:- O:- O:- R:- R:- U:-',
  'V:- V:- T:- T:- T:2 U:- U:- U:-'
]

const SAMPLE_PUZZLE_10x10 = [
  'AA:- AB:- AC:- AC:- AD:5 AD:4 AD:- AD:- AE:1 AE:-',
  'AA:- AF:- AF:- AG:- AG:- AG:- AH:- AD:- AE:- AE:3',
  'AA:- AI:- AF:- AF:1 AF:3 AJ:- AJ:- AD:- AK:- AE:-',
  'AA:- AL:- AF:- AM:- AM:- AM:- AN:- AD:- AO:- AO:-',
  'AP:- AL:3 AL:- AQ:- AR:- AS:- AN:4 AN:- AN:- AN:-',
  'AT:- AL:- AL:- AR:- AR:- AR:- AU:- AU:- AU:- AV:-',
  'AT:- AW:- AL:- AX:- AY:- AY:- AY:6 AY:- AU:- AV:4',
  'AT:- AZ:- AZ:- BA:- BA:- BA:- BB:- AY:- AU:- AV:-',
  'AT:- BC:- AZ:- AZ:2 AZ:- BD:- BB:- AY:- BE:- AV:3',
  'BF:- BC:- AZ:- BG:- BG:- BG:4 BG:- AY:- BE:- BH:-'
]

const parsePuzzle = lines => {
  const splitLines = lines.map(line => line.split(/\s/).map(s => s.trim()))
  const width = splitLines[0].length
  const height = splitLines.length
  const xs = R.range(0, width)
  const ys = R.range(0, height)
  const cells = R.chain(y => R.map(x => {
    const cellString = splitLines[y][x]
    const [id, initialValueString] = cellString.split(':').map(s => s.trim())
    const initialValue = Number(initialValueString)
    return {
      id,
      coords: { x, y },
      initialValue: Number.isInteger(initialValue) ? initialValue : undefined
    }
  }, xs), ys)
  const groupedCells = R.groupBy(cell => cell.id, cells)
  const rooms = R.values(groupedCells).map(cells => ({
    id: cells[0].id,
    cells: cells.map(cell => ({
      coords: cell.coords,
      initialValue: cell.initialValue
    }))
  }))
  return {
    width,
    height,
    rooms
  }
}

module.exports = {
  parsePuzzle,
  SAMPLE_PUZZLE_8x8,
  SAMPLE_PUZZLE_10x10
}
