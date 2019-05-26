import { parsePuzzle } from '../common/parsePuzzle'
import { SAMPLE_PUZZLE_8x8, SAMPLE_PUZZLE_10x10 } from '../common/samplePuzzles'
import { solve } from '../common/solve'
import { drawInitialGrid, drawSolution, clearGrid } from './svg'

const selectPuzzleElement = document.getElementById('selectPuzzle')
const solveButtonElement = document.getElementById('solve')
const cancelButtonElement = document.getElementById('cancel')

let puzzle = undefined
let solving = false
let queue = undefined
let intervalId = undefined

const selectPuzzle = selectedPuzzle => {
  puzzle = parsePuzzle(selectedPuzzle)
  clearGrid()
  drawInitialGrid(puzzle)
  updateUiState()
}

const onSelectPuzzle = e => {
  switch (e.target.value) {
    case "8x8": return selectPuzzle(SAMPLE_PUZZLE_8x8)
    case "10x10": return selectPuzzle(SAMPLE_PUZZLE_10x10)
  }
}

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
  updateUiState()
  solve(puzzle, onSearchStep, onSolutionFound)
}

const stop = () => {
  clearInterval(intervalId)
  queue = undefined
  intervalId = undefined
  solving = false
  updateUiState()
}

const onCancel = () => {
  stop()
}

const updateUiState = () => {
  solveButtonElement.disabled = solving
  cancelButtonElement.disabled = !solving
  selectPuzzleElement.disabled = solving
}

selectPuzzleElement.addEventListener('change', onSelectPuzzle)
solveButtonElement.addEventListener('click', onSolve)
cancelButtonElement.addEventListener('click', onCancel)

selectPuzzle(SAMPLE_PUZZLE_8x8)
