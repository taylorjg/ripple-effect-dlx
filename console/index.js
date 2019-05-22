/* eslint-env node */

const R = require('ramda')
const { parsePuzzle, SAMPLE_PUZZLE } = require('../common/parsePuzzle')
const { solve } = require('../common/solve')

// import * as R  from 'ramda'
// import { solve } from '../common/solve'
// import { parsePuzzle, SAMPLE_PUZZLE } from '../common/parsePuzzle'

const dumpSolution = (puzzle, solution) => {
  const xs = R.range(0, puzzle.width)
  const ys = R.range(0, puzzle.height)
  for (const y of ys) {
    let line = ''
    for (const x of xs) {
      const cell = solution.find(cell => cell.coords.x === x && cell.coords.y === y)
      line += cell.value
    }
    console.log(line)
  }
}

const puzzle = parsePuzzle(SAMPLE_PUZZLE)
const solutions = solve(puzzle)
console.dir(`Number of solutions: ${solutions.length}`)
solutions.forEach(solution => dumpSolution(puzzle, solution))
