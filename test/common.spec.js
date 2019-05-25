const expect = require('chai').expect
const { parsePuzzle, SAMPLE_PUZZLE_8x8, SAMPLE_PUZZLE_10x10 } = require('../common/parsePuzzle')
const { solve } = require('../common/solve')

describe('commob tests', () => {

  describe('parsePuzzle', () => {

    it('correctly parses an 8x8 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_8x8)
      expect(puzzle.width).to.equal(8)
      expect(puzzle.height).to.equal(8)
      expect(puzzle.rooms).to.have.length(22)
    })

    it('correctly parses an 10x10 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
      expect(puzzle.width).to.equal(10)
      expect(puzzle.height).to.equal(10)
      expect(puzzle.rooms).to.have.length(34)
    })
  })

  describe('solve', () => {

    it('finds a single solution for an 8x8 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_8x8)
      const solutions = solve(puzzle)
      expect(solutions).to.have.length(1)
    })

    it('finds a single solution for a 10x10 puzzle', () => {
      const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
      const solutions = solve(puzzle)
      expect(solutions).to.have.length(1)
    })
  })
})
