import * as R from 'ramda'
import { parsePuzzle, SAMPLE_PUZZLE_8x8, SAMPLE_PUZZLE_10x10 } from '../common/parsePuzzle'
import { solve } from '../common/solve'
import { drawSolution as drawSolutionSvg } from './svg'

// TODO: move drawSolution in console/index.js to common area and use that
const drawSolutionConsole = (puzzle, solution) => {
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

const solveButton = document.getElementById('solve')
solveButton.addEventListener('click', () => {
  const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
  const solutions = solve(puzzle)
  solutions.forEach(solution => {
    drawSolutionConsole(puzzle, solution)
    drawSolutionSvg(puzzle, solution)
  })
})
