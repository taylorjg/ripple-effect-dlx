import { parsePuzzle, SAMPLE_PUZZLE_10x10 } from '../common/parsePuzzle'
import { solve } from '../common/solve'
import { drawInitialGrid, drawSolution } from './svg'

const solveButton = document.getElementById('solve')
const cancelButton = document.getElementById('cancel')

let puzzle = undefined
let solving = false
let queue = undefined
let intervalId = undefined

const onSearchStep = partialSolution =>
  queue.push(partialSolution)

const onSolutionFound = solution =>
  queue.push(solution)

const onInterval = () => {
  if (queue && queue.length) {
    const partialSolution = queue.shift()
    drawSolution(puzzle, partialSolution)
  } else {
    stop()
  }
}

const onSolve = () => {
  queue = []
  intervalId = setInterval(onInterval, 100)
  solving = true
  updateButtonState()
  solve(puzzle, onSearchStep, onSolutionFound)
}

const stop = () => {
  clearInterval(intervalId)
  queue = undefined
  intervalId = undefined
  solving = false
  updateButtonState()
}

const onCancel = () => {
  stop()
}

const updateButtonState = () => {
  solveButton.disabled = solving
  cancelButton.disabled = !solving
}

solveButton.addEventListener('click', onSolve)
cancelButton.addEventListener('click', onCancel)

updateButtonState()
puzzle = parsePuzzle(SAMPLE_PUZZLE_10x10)
drawInitialGrid(puzzle)
