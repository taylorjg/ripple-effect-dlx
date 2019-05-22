import * as R from 'ramda'
// import * as dlxlib from 'dlxlib'
// TEMPORARY: whilst updating dlxlibjs to support secondary columns and options
import * as dlxlib from '../../dlxlibjs/lib'

export const solve = puzzle => {
  const rows = buildRows(puzzle.rooms)
  const matrix = buildMatrix(puzzle, rows)
  console.dir(`Number of matrix rows: ${matrix.length}`)
  console.dir(`Number of matrix columns: ${matrix[0].length}`)
  const numPrimaryColumns = 2 * puzzle.width * puzzle.height
  // const options = {
  //   numPrimaryColumns
  // }
  const solutions = dlxlib.solve(matrix, undefined, undefined, undefined, numPrimaryColumns)
  console.dir(`Number of solutions: ${solutions.length}`)
  return solutions.map(resolveSolution(rows))
}

const buildRows = rooms => R.chain(buildRowsForRoom, rooms)

const buildRowsForRoom = room => {
  const [emptyCells, occupiedCells] =
    R.partition(cell => R.isNil(cell.initialValue), room.cells)
  const rowsForOccupiedCells = occupiedCells.map(cell => ({
    room,
    coords: cell.coords,
    value: cell.initialValue,
    isInitialValue: true
  }))
  const initialValues = occupiedCells.map(cell => cell.initialValue)
  const allValues = R.range(0, room.cells.length).map(R.inc)
  const remainingValues = R.difference(allValues, initialValues)
  const rowsForEmptyCells = R.chain(
    cell =>
      R.map(
        value => ({
          room,
          coords: cell.coords,
          value,
          isInitialValue: false
        }),
        remainingValues),
    emptyCells)
  return R.concat(rowsForOccupiedCells, rowsForEmptyCells)
}

const buildMatrix = (puzzle, rows) => rows.map(row => buildMatrixRow(puzzle, row))

const buildMatrixRow = (puzzle, row) => [
  ...makeLocationColumns(puzzle, row),
  ...makeRoomColumns(puzzle, row),
  ...makeRippleColumns(puzzle, row)
]

const makeLocationColumns = (puzzle, row) => {
  const locationIndex = row.coords.y * puzzle.width + row.coords.x
  return R.range(0, puzzle.width * puzzle.height).map(index =>
    index === locationIndex ? 1 : 0)
}

const makeRoomColumns = (puzzle, row) => {
  const roomIndex = puzzle.rooms.findIndex(room => room.id === row.room.id)
  const previousRooms = R.take(roomIndex, puzzle.rooms)
  const previousRoomSizes = previousRooms.map(room => room.cells.length)
  const roomValueIndex = R.sum(previousRoomSizes) + row.value - 1
  return R.range(0, puzzle.width * puzzle.height).map(index =>
    index === roomValueIndex ? 1 : 0)
}

const makeRippleColumns = (puzzle, row) => {
  const roomSizes = puzzle.rooms.map(room => room.cells.length)
  const maxRoomSize = Math.max(...roomSizes)
  const values = R.range(0, maxRoomSize).map(R.inc)
  return R.chain(
    makeRippleColumnsForValue(puzzle, row),
    values)
}

const makeRippleColumnsForValue = (puzzle, row) => value =>
  R.chain(
    makeRippleColumnsForValueAndDirection(puzzle, row, value),
    [UP, DOWN, LEFT, RIGHT])

const UP = Symbol('UP')
const DOWN = Symbol('DOWN')
const LEFT = Symbol('LEFT')
const RIGHT = Symbol('RIGHT')

const makeRippleColumnsForValueAndDirection = (puzzle, row, value) => direction => {
  const rippleIndices = row.value === value
    ? calculateRippleIndices(puzzle, row, direction)
    : []
  return R.range(0, puzzle.width * puzzle.height)
    .map(index => rippleIndices.includes(index) ? 1 : 0)
}

const isCellInGrid = puzzle => cell =>
  cell.x >= 0 &&
  cell.y >= 0 &&
  cell.x < puzzle.width &&
  cell.y < puzzle.height

const calculateRippleIndices = (puzzle, row, direction) => {
  const x = row.coords.x
  const y = row.coords.y
  // Or maybe we don't need to include offset 0 ?
  // R.range(0, row.value).map(R.inc)
  const offsets = R.range(0, row.value + 1)
  const rippleCells = offsets.map(offset => {
    switch (direction) {
      case UP: return { x, y: y - offset }
      case DOWN: return { x, y: y + offset }
      case LEFT: return { x: x - offset, y }
      case RIGHT: return { x: x + offset, y }
    }
  })
  return rippleCells
    .filter(isCellInGrid(puzzle))
    .map(cell => cell.y * puzzle.width + cell.x)
}

const resolveSolution = rows => solution =>
  solution.map(rowIndex => rows[rowIndex])
