const { parsePuzzle, SAMPLE_PUZZLE_10x10 } = require('../common/parsePuzzle')
const { solve } = require('../common/solve')
const { drawSolution } = require('./draw')

const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
const solutions = solve(puzzle)
solutions.forEach(solution => drawSolution(puzzle, solution))
