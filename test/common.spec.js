const expect = require('chai').expect
const R = require('ramda')
const { parsePuzzle } = require('../common/parsePuzzle')
const { SAMPLE_PUZZLE_8x8, SAMPLE_PUZZLE_10x10 } = require('../common/samplePuzzles')
const { solve } = require('../common/solve')

describe('commob tests', () => {

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
      expect(solutions[0]).to.have.length(8 * 8)
    })

    it('finds a single solution for a 10x10 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
      const solutions = solve(puzzle)
      expect(solutions).to.have.length(1)
      expect(solutions[0]).to.have.length(10 * 10)
    })
  })
})
