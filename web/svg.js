import * as R from 'ramda'
import { calculateBoundary } from './boundaryUtils'

const GRID_LINE_WIDTH = 1
const ROOM_BORDER_WIDTH = 4
const TX = ROOM_BORDER_WIDTH / 2
const TY = ROOM_BORDER_WIDTH / 2

const createSvgElement = (elementName, additionalAttributes = {}) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', elementName)
  Object.entries(additionalAttributes).forEach(([name, value]) =>
    element.setAttribute(name, value))
  return element
}

const drawHorizontalGridLines = (gridElement, size, puzzle) => {
  const squareSize = (size - 2 * TX) / puzzle.width
  const ys = R.range(0, puzzle.height + 1)
  ys.forEach(y => {
    const gridLine = createSvgElement('line', {
      x1: 0,
      y1: TY + y * squareSize,
      x2: size,
      y2: TY + y * squareSize,
      'class': 'grid-line',
      'stroke-width': GRID_LINE_WIDTH
    })
    gridElement.appendChild(gridLine)
  })
}

const drawVerticalGridLines = (gridElement, size, puzzle) => {
  const squareSize = (size - 2 * TY) / puzzle.height
  const xs = R.range(0, puzzle.width + 1)
  xs.forEach(x => {
    const gridLine = createSvgElement('line', {
      x1: TX + x * squareSize,
      y1: 0,
      x2: TX + x * squareSize,
      y2: size,
      'class': 'grid-line',
      'stroke-width': GRID_LINE_WIDTH
    })
    gridElement.appendChild(gridLine)
  })
}

const toSvgPoints = (size, puzzle, lines) => {
  const squareSize = (size - 2 * TY) / puzzle.width
  const points = lines
    .map(line => line.p1)
  const p0 = R.head(points)
  const closedPoints = R.append(p0, points)
  const svgPoints = closedPoints
    .map(p => ({
      x: TX + p.x * squareSize,
      y: TY + p.y * squareSize
    }))
  return svgPoints.map(p => `${p.x},${p.y}`).join(' ')
}

const drawRoomBoundary = (gridElement, size, puzzle, room) => {
  const location = { x: 0, y: 0 }
  const cells = room.cells.map(cell => cell.coords)
  const lines = calculateBoundary(location, cells)
  const points = toSvgPoints(size, puzzle, lines)
  const polylineElement = createSvgElement('polyline', {
    points,
    'stroke-width': ROOM_BORDER_WIDTH,
    'class': 'room-border'
  })
  gridElement.appendChild(polylineElement)
}

const drawRoomBoundaries = (gridElement, size, puzzle) =>
  puzzle.rooms.map(room => drawRoomBoundary(gridElement, size, puzzle, room))

const drawValue = (gridElement, size, puzzle, coords, value, isInitialValue) => {
  const squareSize = (size - GRID_LINE_WIDTH) / puzzle.width
  const textElement = createSvgElement('text', {
    x: TX + coords.x * squareSize + squareSize / 2,
    y: TY + coords.y * squareSize + squareSize / 2,
    'dominant-baseline': 'central',
    'text-anchor': 'middle',
    'class': isInitialValue ? 'initial-value' : 'calculated-value'
  })
  const textNode = document.createTextNode(value)
  textElement.appendChild(textNode)
  gridElement.appendChild(textElement)
}

const drawInitialValues = (gridElement, size, puzzle) => {
  const cellsWithInitialValues = R.chain(
    room => R.filter(
      cell => !!cell.initialValue,
      room.cells
    ),
    puzzle.rooms)
  cellsWithInitialValues.forEach(cell =>
    drawValue(gridElement, size, puzzle, cell.coords, cell.initialValue, true))
}

const drawCalculatedValues = (gridElement, size, puzzle, solution) => {
  const cellsWithCalculatedValues = solution.filter(cell => !cell.isInitialValue)
  cellsWithCalculatedValues.forEach(cell =>
    drawValue(gridElement, size, puzzle, cell.coords, cell.value, false))
}

export const drawInitialGrid = (puzzle) => {
  const gridElement = document.getElementById('grid')
  const size = gridElement.getBoundingClientRect().width
  gridElement.style.height = size
  drawHorizontalGridLines(gridElement, size, puzzle)
  drawVerticalGridLines(gridElement, size, puzzle)
  drawRoomBoundaries(gridElement, size, puzzle)
  drawInitialValues(gridElement, size, puzzle)
}

export const drawSolution = (puzzle, solution) => {
  const gridElement = document.getElementById('grid')
  const size = gridElement.getBoundingClientRect().width
  drawCalculatedValues(gridElement, size, puzzle, solution)
}
