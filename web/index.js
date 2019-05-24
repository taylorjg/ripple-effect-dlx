import { parsePuzzle, SAMPLE_PUZZLE_10x10 } from '../common/parsePuzzle'
import { solve } from '../common/solve'
import { drawInitialGrid, drawSolution } from './svg'

const solveButton = document.getElementById('solve')
solveButton.addEventListener('click', () => {
  const solutions = solve(puzzle)
  solutions.forEach(solution => {
    drawSolution(puzzle, solution)
  })
})

const puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
drawInitialGrid(puzzle)
