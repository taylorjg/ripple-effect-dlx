import * as R from 'ramda'

const createSvgElement = (elementName, additionalAttributes = {}) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', elementName)
  Object.entries(additionalAttributes).forEach(([name, value]) =>
    element.setAttribute(name, value))
  return element
}

const drawHorizontalGridLines = (gridElement, width, puzzle) => {
  const squareSize = width / puzzle.width
  const ys = R.range(0, puzzle.height + 1)
  ys.forEach(y => {
    const gridLine = createSvgElement('line', {
      x1: 0,
      y1: y * squareSize,
      x2: width,
      y2: y * squareSize,
      'class': 'grid-line'
    })
    gridElement.appendChild(gridLine)
  })
}

const drawVerticalGridLines = (gridElement, height, puzzle) => {
  const squareSize = height / puzzle.height
  const xs = R.range(0, puzzle.width + 1)
  xs.forEach(x => {
    const gridLine = createSvgElement('line', {
      x1: x * squareSize,
      y1: 0,
      x2: x * squareSize,
      y2: height,
      'class': 'grid-line'
    })
    gridElement.appendChild(gridLine)
  })
}

const drawRooms = (gridElement, puzzle) => {
}

const drawInitialValues = (gridElement, puzzle) => {
}

const drawCalculatedValues = (gridElement, puzzle, solution) => {
}

export const drawSolution = (puzzle, solution) => {
  const gridElement = document.getElementById('grid')
  const width = gridElement.getBoundingClientRect().width
  gridElement.style.height = width
  drawHorizontalGridLines(gridElement, width, puzzle)
  drawVerticalGridLines(gridElement, width, puzzle)
  drawRooms(gridElement, puzzle)
  drawInitialValues(gridElement, puzzle)
  drawCalculatedValues(gridElement, puzzle, solution)
}
