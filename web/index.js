import { parsePuzzle, SAMPLE_PUZZLE_10x10 } from '../common/parsePuzzle'
import { solve } from '../common/solve'
import { drawSolution } from './svg'

const solveButton = document.getElementById('solve')
solveButton.addEventListener('click', () => {
  const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
  const solutions = solve(puzzle)
  solutions.forEach(solution => {
    drawSolution(puzzle, solution)
  })
})
