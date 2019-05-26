const expect = require('chai').expect
const R = require('ramda')
const { parsePuzzle } = require('../common/parsePuzzle')
const { SAMPLE_PUZZLE_8x8, SAMPLE_PUZZLE_10x10 } = require('../common/samplePuzzles')
const { solve } = require('../common/solve')

const validateSolution = (puzzle, solution) => {

  const maxRoomSize = Math.max(...puzzle.rooms.map(room => room.cells.length))

  const findSolutionRow = (x, y) => solution.find(cell =>
    cell.coords.x === x && cell.coords.y === y)

  const findSolutionRowWithValueNorth = (x, y, value) => {
    const ysNorth = R.reverse(R.range(0, y))
    const rows = ysNorth.map(yNorth => findSolutionRow(x, yNorth))
    return rows.find(row => row.value === value)
  }

  const findSolutionRowWithValueSouth = (x, y, value) => {
    const ysSouth = R.range(y + 1, puzzle.height)
    const rows = ysSouth.map(ySouth => findSolutionRow(x, ySouth))
    return rows.find(row => row.value === value)
  }

  const findSolutionRowWithValueEast = (x, y, value) => {
    const xsEast = R.range(x + 1, puzzle.width)
    const rows = xsEast.map(xEast => findSolutionRow(xEast, y))
    return rows.find(row => row.value === value)
  }

  const findSolutionRowWithValueWest = (x, y, value) => {
    const xsWest = R.reverse(R.range(0, x))
    const rows = xsWest.map(xWest => findSolutionRow(xWest, y))
    return rows.find(row => row.value === value)
  }

  expect(solution).to.have.length(puzzle.width * puzzle.height, 'Invalid solution length')

  solution.forEach(row => {
    const message = `Value ${row.value} out of range at (${row.coords.x}, ${row.coords.y})`
    expect(row.value).to.be.within(1, maxRoomSize, message)
  })

  puzzle.rooms.forEach(room => {
    const expectedRoomValues = R.range(0, room.cells.length).map(R.inc)
    const actualRoomValues = room.cells.map(cell => {
      const row = findSolutionRow(cell.coords.x, cell.coords.y)
      return row.value
    })
    const message = `Room ${room.id} does not contain all required values`
    expect(actualRoomValues).to.have.members(expectedRoomValues, message)
  })

  solution.forEach(({ coords: { x, y }, value }) => {
    const rowNorth = findSolutionRowWithValueNorth(x, y, value)
    const rowSouth = findSolutionRowWithValueSouth(x, y, value)
    const rowEast = findSolutionRowWithValueEast(x, y, value)
    const rowWest = findSolutionRowWithValueWest(x, y, value)
    const message = `Distance constraint not met for value ${value} at (${x}, ${y})`
    expect(!rowNorth || y - rowNorth.coords.y > value).to.equal(true, message)
    expect(!rowSouth || rowSouth.coords.y - y > value).to.equal(true, message)
    expect(!rowEast || rowEast.coords.x - x > value).to.equal(true, message)
    expect(!rowWest || x - rowWest.coords.x > value).to.equal(true, message)
  })
}

describe('common tests', () => {

  describe('parsePuzzle', () => {

    it('correctly parses an 8x8 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_8x8)
      expect(puzzle.width).to.equal(8)
      expect(puzzle.height).to.equal(8)
      expect(puzzle.rooms).to.have.length(22)
      const allCells = R.chain(room => room.cells, puzzle.rooms)
      expect(allCells).to.have.length(8 * 8)
    })

    it('correctly parses an 10x10 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
      expect(puzzle.width).to.equal(10)
      expect(puzzle.height).to.equal(10)
      expect(puzzle.rooms).to.have.length(34)
      const allCells = R.chain(room => room.cells, puzzle.rooms)
      expect(allCells).to.have.length(10 * 10)
    })
  })

  describe('solve', () => {

    it('finds a single solution for an 8x8 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_8x8)
      const solutions = solve(puzzle)
      expect(solutions).to.have.length(1)
      validateSolution(puzzle, solutions[0])
    })

    it('finds a single solution for a 10x10 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
      const solutions = solve(puzzle)
      expect(solutions).to.have.length(1)
      validateSolution(puzzle, solutions[0])
    })
  })
})
