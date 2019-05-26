const R = require('ramda')

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
  parsePuzzle
}
